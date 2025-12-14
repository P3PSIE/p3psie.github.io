// Firebase Cloud Messaging Service Worker
// This file is required for Firebase Cloud Messaging to work

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
    apiKey: "AIzaSyBAP0mJC-7jDRZzpv4dWT11A7EhSDFbfSo",
    authDomain: "flare-a0418.firebaseapp.com",
    projectId: "flare-a0418",
    storageBucket: "flare-a0418.firebasestorage.app",
    messagingSenderId: "311211387060",
    appId: "1:311211387060:web:45f0ca4374d5d449054fe1"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'New Flare';
    const notificationOptions = {
        body: payload.notification?.body || 'Someone sent you a Flare',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'flare-notification',
        data: payload.data,
        vibrate: [200, 100, 200],
        requireInteraction: true,
        actions: [
            { action: 'open', title: 'View Flare' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('[firebase-messaging-sw.js] Notification clicked:', event);
    event.notification.close();

    if (event.action === 'dismiss') {
        return;
    }

    const flareId = event.notification.data?.flareId || event.notification.data?.id;
    const urlToOpen = flareId
        ? `${self.location.origin}/#/inbox/${flareId}`
        : `${self.location.origin}/#/inbox`;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Focus existing window if open
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus().then(() => {
                            client.postMessage({
                                type: 'NAVIGATE_TO_INBOX',
                                flareId: flareId
                            });
                            return client;
                        });
                    }
                }
                // Open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
