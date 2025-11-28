/**
 * Cloud Functions for Flares App
 * Handles push notifications when Flares are sent
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Send push notification when a new Flare is added to a user's inbox
 * Triggers on: users/{userId}/inbox/{flareId}
 */
exports.sendFlareNotification = onDocumentCreated('users/{userId}/inbox/{flareId}', async (event) => {
        const userId = event.params.userId;
        const flareId = event.params.flareId;
        const flareData = event.data.data();

        console.log(`New flare for user ${userId}:`, flareData);

        try {
            // Get the recipient's FCM token from their user document
            const userDoc = await admin.firestore()
                .collection('users')
                .doc(userId)
                .get();

            if (!userDoc.exists) {
                console.log(`User ${userId} document not found`);
                return null;
            }

            const userData = userDoc.data();
            const fcmToken = userData.fcmToken;

            if (!fcmToken) {
                console.log(`No FCM token for user ${userId}`);
                return null;
            }

            // Prepare notification payload
            const moodEmoji = {
                'green': '🟢',
                'orange': '🟠',
                'red': '🔴'
            }[flareData.mood] || '💬';

            const notificationTitle = flareData.title || `${flareData.senderName} sent a Flare`;
            const notificationBody = flareData.body || 'Check on them';

            const message = {
                token: fcmToken,
                notification: {
                    title: notificationTitle,
                    body: notificationBody,
                    icon: '/icons/icon-192x192.png',
                    badge: '/icons/icon-72x72.png'
                },
                data: {
                    flareId: flareId,
                    senderId: flareData.senderId,
                    senderName: flareData.senderName,
                    mood: flareData.mood,
                    type: 'flare',
                    click_action: `/#/inbox/${flareId}`
                },
                webpush: {
                    notification: {
                        icon: '/icons/icon-192x192.png',
                        badge: '/icons/icon-72x72.png',
                        vibrate: [200, 100, 200],
                        tag: 'flare-notification',
                        requireInteraction: true,
                        actions: [
                            { action: 'open', title: 'View Flare' },
                            { action: 'dismiss', title: 'Dismiss' }
                        ]
                    },
                    fcmOptions: {
                        link: `https://p3psie.github.io/#/inbox/${flareId}`
                    }
                }
            };

            // Send the notification
            const response = await admin.messaging().send(message);
            console.log(`Successfully sent notification to user ${userId}:`, response);

            return response;

        } catch (error) {
            console.error('Error sending notification:', error);
            return null;
        }
    });

/**
 * Clean up old inbox items (optional)
 * Runs daily to remove read items older than 30 days
 */
exports.cleanupOldFlares = onSchedule('every 24 hours', async (event) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const usersSnapshot = await admin.firestore()
            .collection('users')
            .get();

        let deletedCount = 0;

        for (const userDoc of usersSnapshot.docs) {
            const inboxSnapshot = await admin.firestore()
                .collection('users')
                .doc(userDoc.id)
                .collection('inbox')
                .where('read', '==', true)
                .where('createdAt', '<', thirtyDaysAgo.toISOString())
                .get();

            const batch = admin.firestore().batch();
            inboxSnapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
                deletedCount++;
            });

            await batch.commit();
        }

        console.log(`Cleaned up ${deletedCount} old flares`);
        return null;
    });
