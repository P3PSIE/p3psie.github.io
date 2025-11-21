// Flares - Mood Tracking App
// Architecture: Modular design with future Firebase integration support

// ============================================================================
// Data Structures & Configuration
// ============================================================================

const EMOJI_DATA = {
    green: [
        { emoji: '😊', label: 'Happy' },
        { emoji: '😌', label: 'Calm' },
        { emoji: '🙂', label: 'Content' },
        { emoji: '😄', label: 'Joyful' },
        { emoji: '🥰', label: 'Loved' },
        { emoji: '😎', label: 'Confident' },
        { emoji: '🤗', label: 'Grateful' },
        { emoji: '✨', label: 'Positive' }
    ],
    orange: [
        { emoji: '😕', label: 'Confused' },
        { emoji: '😟', label: 'Worried' },
        { emoji: '😔', label: 'Sad' },
        { emoji: '😬', label: 'Awkward' },
        { emoji: '😓', label: 'Stressed' },
        { emoji: '🥺', label: 'Vulnerable' },
        { emoji: '😞', label: 'Disappointed' },
        { emoji: '😖', label: 'Frustrated' }
    ],
    red: [
        { emoji: '😰', label: 'Anxious' },
        { emoji: '😢', label: 'Crying' },
        { emoji: '😭', label: 'Very Upset' },
        { emoji: '😱', label: 'Panicked' },
        { emoji: '😤', label: 'Angry' },
        { emoji: '💔', label: 'Heartbroken' },
        { emoji: '😵', label: 'Overwhelmed' },
        { emoji: '🆘', label: 'Need Help' }
    ]
};

const TRIGGERS_DATA = {
    green: [
        { id: 'good_news', label: 'Good news', icon: '📰' },
        { id: 'social_time', label: 'Quality time with others', icon: '👥' },
        { id: 'exercise', label: 'Exercise or movement', icon: '🏃' },
        { id: 'achievement', label: 'Accomplished something', icon: '🎯' },
        { id: 'rest', label: 'Good rest', icon: '😴' },
        { id: 'nature', label: 'Time in nature', icon: '🌳' }
    ],
    orange: [
        { id: 'work_stress', label: 'Work pressure', icon: '💼' },
        { id: 'social_conflict', label: 'Social conflict', icon: '💬' },
        { id: 'lack_sleep', label: 'Lack of sleep', icon: '😴' },
        { id: 'financial', label: 'Financial concerns', icon: '💰' },
        { id: 'health_concern', label: 'Health concerns', icon: '🏥' },
        { id: 'change', label: 'Unexpected changes', icon: '🔄' },
        { id: 'deadlines', label: 'Deadlines', icon: '⏰' },
        { id: 'isolation', label: 'Feeling isolated', icon: '🚪' }
    ],
    red: [
        { id: 'loud_noises', label: 'Overwhelming sounds', icon: '🔊' },
        { id: 'bright_lights', label: 'Too many bright lights', icon: '💡' },
        { id: 'crowds', label: 'Crowded spaces', icon: '👥' },
        { id: 'confrontation', label: 'Confrontation', icon: '⚠️' },
        { id: 'loss', label: 'Loss or grief', icon: '💔' },
        { id: 'panic', label: 'Panic attack', icon: '😱' },
        { id: 'sensory_overload', label: 'Sensory overload', icon: '🎆' },
        { id: 'trauma_trigger', label: 'Trauma reminder', icon: '🚨' },
        { id: 'physical_pain', label: 'Physical pain', icon: '🤕' },
        { id: 'intrusive_thoughts', label: 'Intrusive thoughts', icon: '🌀' }
    ]
};

// Common emoji list for picker
const COMMON_EMOJIS = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
    '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝',
    '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄',
    '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
    '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁',
    '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭',
    '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈',
    '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '💪', '🦾',
    '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄',
    '💋', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
    '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️',
    '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏',
    '♐', '♑', '♒', '♓', '🆔', '⚛️', '✨', '⭐', '🌟', '💫', '⚡', '🔥', '💥', '☄️'
];

// ============================================================================
// Custom Emoji Manager
// ============================================================================

class CustomEmojiManager {
    static STORAGE_KEY = 'flares_custom_emojis';

    static getCustomEmojis() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static saveCustomEmojis(emojis) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(emojis));
    }

    static addCustomEmoji(emoji, label, associatedColors) {
        const customEmojis = this.getCustomEmojis();
        customEmojis.push({
            id: Date.now(),
            emoji,
            label,
            associatedColors // array of 'green', 'orange', 'red'
        });
        this.saveCustomEmojis(customEmojis);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return customEmojis;
    }

    static deleteCustomEmoji(id) {
        const customEmojis = this.getCustomEmojis().filter(e => e.id !== id);
        this.saveCustomEmojis(customEmojis);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return customEmojis;
    }

    static getEmojisForMood(mood) {
        const customEmojis = this.getCustomEmojis();
        return customEmojis.filter(e => e.associatedColors.includes(mood));
    }
}

// ============================================================================
// Custom Trigger/Reason Manager
// ============================================================================

class CustomTriggerManager {
    static STORAGE_KEY = 'flares_custom_triggers';

    static CATEGORIES = {
        sensory: { label: 'Sensory', icon: '👂' },
        physical: { label: 'Physical', icon: '🏃' },
        emotional: { label: 'Emotional', icon: '❤️' },
        cognitive: { label: 'Cognitive', icon: '🧠' }
    };

    static getCustomTriggers() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static saveCustomTriggers(triggers) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(triggers));
    }

    static addCustomTrigger(label, category) {
        const customTriggers = this.getCustomTriggers();
        customTriggers.push({
            id: 'custom_' + Date.now(),
            label,
            category,
            icon: this.CATEGORIES[category].icon
        });
        this.saveCustomTriggers(customTriggers);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return customTriggers;
    }

    static deleteCustomTrigger(id) {
        const customTriggers = this.getCustomTriggers().filter(t => t.id !== id);
        this.saveCustomTriggers(customTriggers);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return customTriggers;
    }
}

// ============================================================================
// Authentication Manager (Firebase)
// ============================================================================

class AuthManager {
    static currentUser = null;
    static isGuest = false;
    static listeners = [];

    static async init() {
        return new Promise((resolve) => {
            // Wait for Firebase to be ready
            if (window.firebaseAuth) {
                this.setupAuthListener();
                resolve();
            } else {
                window.addEventListener('firebaseReady', () => {
                    this.setupAuthListener();
                    resolve();
                });
                // Timeout fallback - if Firebase fails to load, continue as guest
                setTimeout(() => {
                    if (!window.firebaseAuth) {
                        console.warn('Firebase not loaded, continuing in offline mode');
                        this.isGuest = true;
                        resolve();
                    }
                }, 5000);
            }
        });
    }

    static setupAuthListener() {
        if (!window.firebaseAuth || !window.firebaseAuthFunctions) return;

        const { onAuthStateChanged } = window.firebaseAuthFunctions;
        onAuthStateChanged(window.firebaseAuth, (user) => {
            this.currentUser = user;
            this.isGuest = !user;
            this.notifyListeners(user);

            // Sync data when user logs in
            if (user) {
                CloudStorageManager.syncFromCloud();
            }
        });
    }

    static onAuthChange(callback) {
        this.listeners.push(callback);
        // Call immediately with current state
        callback(this.currentUser);
    }

    static notifyListeners(user) {
        this.listeners.forEach(callback => callback(user));
    }

    static async signUp(email, password, displayName) {
        if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
            throw new Error('Firebase not available');
        }

        const { createUserWithEmailAndPassword, updateProfile } = window.firebaseAuthFunctions;

        try {
            const userCredential = await createUserWithEmailAndPassword(window.firebaseAuth, email, password);

            // Set display name
            if (displayName) {
                await updateProfile(userCredential.user, { displayName });
            }

            // Initialize user data in Firestore
            await CloudStorageManager.initUserData(userCredential.user.uid);

            return userCredential.user;
        } catch (error) {
            throw this.parseError(error);
        }
    }

    static async signIn(email, password) {
        if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
            throw new Error('Firebase not available');
        }

        const { signInWithEmailAndPassword } = window.firebaseAuthFunctions;

        try {
            const userCredential = await signInWithEmailAndPassword(window.firebaseAuth, email, password);
            return userCredential.user;
        } catch (error) {
            throw this.parseError(error);
        }
    }

    static async signOut() {
        if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
            throw new Error('Firebase not available');
        }

        const { signOut } = window.firebaseAuthFunctions;
        await signOut(window.firebaseAuth);
        this.isGuest = true;
    }

    static continueAsGuest() {
        this.isGuest = true;
        this.currentUser = null;
        localStorage.setItem('flares_guest_mode', 'true');
    }

    static isGuestMode() {
        return this.isGuest || !this.currentUser;
    }

    static parseError(error) {
        const errorMap = {
            'auth/email-already-in-use': 'This email is already registered',
            'auth/weak-password': 'Password should be at least 6 characters',
            'auth/invalid-email': 'Please enter a valid email address',
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/too-many-requests': 'Too many attempts. Please try again later',
            'auth/network-request-failed': 'Network error. Please check your connection'
        };

        return new Error(errorMap[error.code] || error.message);
    }
}

// ============================================================================
// Cloud Storage Manager (Firestore)
// ============================================================================

class CloudStorageManager {
    static async initUserData(userId) {
        if (!window.firebaseDb || !window.firebaseDbFunctions) return;

        const { doc, setDoc, getDoc } = window.firebaseDbFunctions;
        const userDocRef = doc(window.firebaseDb, 'users', userId);

        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            // Initialize with local data if exists
            const localSupports = StorageManager.getSupports();
            const localHistory = StorageManager.getHistory();
            const localCustomEmojis = CustomEmojiManager.getCustomEmojis();
            const localCustomTriggers = CustomTriggerManager.getCustomTriggers();

            await setDoc(userDocRef, {
                supports: localSupports,
                history: localHistory,
                customEmojis: localCustomEmojis,
                customTriggers: localCustomTriggers,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
    }

    static async syncFromCloud() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) return;

        try {
            const { doc, getDoc } = window.firebaseDbFunctions;
            const userDocRef = doc(window.firebaseDb, 'users', AuthManager.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();

                // Sync to localStorage (localStorage acts as cache)
                if (data.supports) StorageManager.saveSupports(data.supports);
                if (data.history) StorageManager.saveHistory(data.history);
                if (data.customEmojis) CustomEmojiManager.saveCustomEmojis(data.customEmojis);
                if (data.customTriggers) CustomTriggerManager.saveCustomTriggers(data.customTriggers);

                console.log('Data synced from cloud');
            }
        } catch (error) {
            console.error('Error syncing from cloud:', error);
        }
    }

    static async syncToCloud() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) return;

        try {
            const { doc, setDoc } = window.firebaseDbFunctions;
            const userDocRef = doc(window.firebaseDb, 'users', AuthManager.currentUser.uid);

            await setDoc(userDocRef, {
                supports: StorageManager.getSupports(),
                history: StorageManager.getHistory(),
                customEmojis: CustomEmojiManager.getCustomEmojis(),
                customTriggers: CustomTriggerManager.getCustomTriggers(),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            console.log('Data synced to cloud');
        } catch (error) {
            console.error('Error syncing to cloud:', error);
        }
    }

    static async addHistoryEntry(entry) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) return;

        try {
            const { collection, addDoc } = window.firebaseDbFunctions;
            await addDoc(
                collection(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'history'),
                {
                    ...entry,
                    createdAt: new Date().toISOString()
                }
            );
            // Also sync the full data
            await this.syncToCloud();
        } catch (error) {
            console.error('Error adding history entry:', error);
        }
    }
}

// ============================================================================
// Push Notification Manager (FCM)
// ============================================================================

class PushNotificationManager {
    static fcmToken = null;

    static async init() {
        if (!window.firebaseMessaging || !window.firebaseMessagingFunctions) {
            console.warn('FCM not available');
            return;
        }

        // Request notification permission
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                await this.getAndSaveToken();
                this.setupForegroundHandler();
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }

    static async getAndSaveToken() {
        if (!window.firebaseMessaging || !window.firebaseMessagingFunctions) return null;

        try {
            const { getToken } = window.firebaseMessagingFunctions;
            // You'll need to add your VAPID key from Firebase Console > Cloud Messaging
            const token = await getToken(window.firebaseMessaging, {
                vapidKey: 'YOUR_VAPID_KEY' // Replace with actual VAPID key
            });

            if (token) {
                this.fcmToken = token;
                // Save token to user's Firestore document
                if (AuthManager.currentUser) {
                    await this.saveTokenToFirestore(token);
                }
                console.log('FCM Token:', token);
                return token;
            }
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
        return null;
    }

    static async saveTokenToFirestore(token) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) return;

        const { doc, setDoc } = window.firebaseDbFunctions;
        const userDocRef = doc(window.firebaseDb, 'users', AuthManager.currentUser.uid);

        await setDoc(userDocRef, {
            fcmToken: token,
            tokenUpdatedAt: new Date().toISOString()
        }, { merge: true });
    }

    static setupForegroundHandler() {
        if (!window.firebaseMessaging || !window.firebaseMessagingFunctions) return;

        const { onMessage } = window.firebaseMessagingFunctions;
        onMessage(window.firebaseMessaging, (payload) => {
            console.log('Foreground message received:', payload);

            // Show in-app notification
            this.showInAppNotification(payload);
        });
    }

    static showInAppNotification(payload) {
        // Create a toast notification
        const toast = document.createElement('div');
        toast.className = 'flare-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${payload.data?.mood === 'red' ? '🔴' : payload.data?.mood === 'orange' ? '🟠' : '🟢'}</div>
                <div class="toast-text">
                    <strong>${payload.notification?.title || 'Flare Received'}</strong>
                    <p>${payload.notification?.body || 'Someone sent you a flare'}</p>
                </div>
            </div>
        `;
        document.body.appendChild(toast);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// ============================================================================
// Linking Manager (Connect users via codes)
// ============================================================================

class LinkingManager {
    static LINK_CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes

    // Generate a 6-digit link code
    static generateLinkCode() {
        return Math.random().toString().slice(2, 8);
    }

    // Create a link code for the current user
    static async createLinkCode() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            throw new Error('Must be logged in to create a link code');
        }

        const { doc, setDoc } = window.firebaseDbFunctions;
        const code = this.generateLinkCode();
        const expiresAt = Date.now() + this.LINK_CODE_EXPIRY;

        // Store the link code in Firestore
        const linkCodeRef = doc(window.firebaseDb, 'linkCodes', code);
        await setDoc(linkCodeRef, {
            userId: AuthManager.currentUser.uid,
            displayName: AuthManager.currentUser.displayName || 'User',
            email: AuthManager.currentUser.email,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt
        });

        return { code, expiresAt };
    }

    // Link with another user using their code
    static async linkWithCode(code) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            throw new Error('Must be logged in to link');
        }

        const { doc, getDoc, setDoc, deleteDoc } = window.firebaseDbFunctions;

        // Get the link code document
        const linkCodeRef = doc(window.firebaseDb, 'linkCodes', code);
        const linkCodeDoc = await getDoc(linkCodeRef);

        if (!linkCodeDoc.exists()) {
            throw new Error('Invalid or expired link code');
        }

        const linkData = linkCodeDoc.data();

        // Check if expired
        if (Date.now() > linkData.expiresAt) {
            await deleteDoc(linkCodeRef);
            throw new Error('Link code has expired');
        }

        // Can't link with yourself
        if (linkData.userId === AuthManager.currentUser.uid) {
            throw new Error("You can't link with yourself");
        }

        // Create bidirectional link
        const myUid = AuthManager.currentUser.uid;
        const theirUid = linkData.userId;

        // Add them to my linked contacts
        const myLinksRef = doc(window.firebaseDb, 'users', myUid, 'linkedContacts', theirUid);
        await setDoc(myLinksRef, {
            userId: theirUid,
            displayName: linkData.displayName,
            email: linkData.email,
            linkedAt: new Date().toISOString()
        });

        // Add me to their linked contacts
        const theirLinksRef = doc(window.firebaseDb, 'users', theirUid, 'linkedContacts', myUid);
        await setDoc(theirLinksRef, {
            userId: myUid,
            displayName: AuthManager.currentUser.displayName || 'User',
            email: AuthManager.currentUser.email,
            linkedAt: new Date().toISOString()
        });

        // Delete the used link code
        await deleteDoc(linkCodeRef);

        return {
            userId: theirUid,
            displayName: linkData.displayName,
            email: linkData.email
        };
    }

    // Get all linked contacts
    static async getLinkedContacts() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return [];
        }

        const { collection, getDocs } = window.firebaseDbFunctions;

        try {
            const linksRef = collection(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'linkedContacts');
            const snapshot = await getDocs(linksRef);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting linked contacts:', error);
            return [];
        }
    }

    // Remove a linked contact
    static async unlinkContact(contactId) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        const { doc, deleteDoc } = window.firebaseDbFunctions;
        const myUid = AuthManager.currentUser.uid;

        // Remove from my links
        const myLinkRef = doc(window.firebaseDb, 'users', myUid, 'linkedContacts', contactId);
        await deleteDoc(myLinkRef);

        // Remove me from their links
        const theirLinkRef = doc(window.firebaseDb, 'users', contactId, 'linkedContacts', myUid);
        await deleteDoc(theirLinkRef);
    }

    // Send a Flare notification to all linked contacts
    static async sendFlareToLinkedContacts(sessionData) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        const { collection, addDoc } = window.firebaseDbFunctions;
        const linkedContacts = await this.getLinkedContacts();

        if (linkedContacts.length === 0) {
            console.log('No linked contacts to notify');
            return;
        }

        // Create notification requests in Firestore
        // A Cloud Function will pick these up and send FCM notifications
        const moodLabels = {
            green: 'Stable',
            orange: 'Struggling',
            red: 'Overwhelmed'
        };

        const senderName = AuthManager.currentUser.displayName || 'Someone';

        for (const contact of linkedContacts) {
            try {
                await addDoc(collection(window.firebaseDb, 'notificationQueue'), {
                    recipientId: contact.userId,
                    senderId: AuthManager.currentUser.uid,
                    senderName: senderName,
                    type: 'flare',
                    mood: sessionData.mood,
                    title: `${senderName} sent a ${moodLabels[sessionData.mood]} Flare`,
                    body: sessionData.emojis.map(e => e.emoji).join(' ') || 'Check on them',
                    data: {
                        mood: sessionData.mood,
                        timestamp: sessionData.timestamp
                    },
                    createdAt: new Date().toISOString(),
                    sent: false
                });
            } catch (error) {
                console.error(`Error queueing notification for ${contact.userId}:`, error);
            }
        }

        console.log(`Queued notifications for ${linkedContacts.length} contacts`);
    }
}

// ============================================================================
// State Management
// ============================================================================

class AppState {
    constructor() {
        this.currentScreen = 'moodScreen';
        this.sessionData = {
            mood: null,
            emojis: [],
            triggers: [],
            timestamp: null
        };
    }

    setMood(mood) {
        this.sessionData.mood = mood;
        this.sessionData.timestamp = new Date().toISOString();
    }

    toggleEmoji(emoji, label) {
        const index = this.sessionData.emojis.findIndex(e => e.emoji === emoji);
        if (index > -1) {
            this.sessionData.emojis.splice(index, 1);
        } else {
            this.sessionData.emojis.push({ emoji, label });
        }
    }

    toggleTrigger(id, label, icon) {
        const index = this.sessionData.triggers.findIndex(t => t.id === id);
        if (index > -1) {
            this.sessionData.triggers.splice(index, 1);
        } else {
            this.sessionData.triggers.push({ id, label, icon });
        }
    }

    reset() {
        this.sessionData = {
            mood: null,
            emojis: [],
            triggers: [],
            timestamp: null
        };
    }

    // Save session and sync with Firebase if authenticated
    async save() {
        const history = StorageManager.getHistory();
        history.push({...this.sessionData});
        StorageManager.saveHistory(history);

        // Sync to cloud if logged in
        if (!AuthManager.isGuestMode()) {
            await CloudStorageManager.addHistoryEntry(this.sessionData);
        }
    }
}

// ============================================================================
// Local Storage Manager (Can be replaced/extended with Firebase)
// ============================================================================

class StorageManager {
    static KEYS = {
        SUPPORTS: 'flares_supports',
        HISTORY: 'flares_history'
    };

    static getSupports() {
        const data = localStorage.getItem(this.KEYS.SUPPORTS);
        return data ? JSON.parse(data) : [];
    }

    static saveSupports(supports) {
        localStorage.setItem(this.KEYS.SUPPORTS, JSON.stringify(supports));
    }

    static addSupport(name, email) {
        const supports = this.getSupports();
        supports.push({ id: Date.now(), name, email });
        this.saveSupports(supports);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return supports;
    }

    static removeSupport(id) {
        const supports = this.getSupports().filter(s => s.id !== id);
        this.saveSupports(supports);
        // Sync to cloud
        CloudStorageManager.syncToCloud();
        return supports;
    }

    static getHistory() {
        const data = localStorage.getItem(this.KEYS.HISTORY);
        return data ? JSON.parse(data) : [];
    }

    static saveHistory(history) {
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
    }

    static clearHistory() {
        localStorage.setItem(this.KEYS.HISTORY, JSON.stringify([]));
    }
}

// ============================================================================
// Screen Navigation
// ============================================================================

class ScreenManager {
    static showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        window.scrollTo(0, 0);
    }

    static showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    static hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
}

// ============================================================================
// Notification Manager (Email & URL Sharing)
// ============================================================================

class NotificationManager {
    static generateMessage(sessionData) {
        const moodLabels = {
            green: 'Stable 🟢',
            orange: 'Struggling 🟡',
            red: 'Overwhelmed 🔴'
        };

        const timestamp = new Date(sessionData.timestamp).toLocaleString();
        const emojis = sessionData.emojis.map(e => `${e.emoji} ${e.label}`).join(', ');
        const triggers = sessionData.triggers.length > 0
            ? sessionData.triggers.map(t => `${t.icon} ${t.label}`).join(', ')
            : 'None specified';

        return `
Flares Check-in
${timestamp}

Current State: ${moodLabels[sessionData.mood]}

Emotions: ${emojis || 'Not specified'}

Contributing Factors: ${triggers}

---
This is an automated message from Flares mood tracking app.
        `.trim();
    }

    static sendViaEmail(sessionData, supports) {
        const message = this.generateMessage(sessionData);
        const emails = supports.map(s => s.email).join(',');
        const subject = `Flares Check-in: ${sessionData.mood === 'red' ? 'Need Support 🔴' : sessionData.mood === 'orange' ? 'Struggling 🟡' : 'Update 🟢'}`;

        const mailtoLink = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
    }

    static sendViaSMS(sessionData) {
        const message = this.generateMessage(sessionData);
        const smsLink = `sms:?&body=${encodeURIComponent(message)}`;
        window.location.href = smsLink;
    }

    static generateShareableLink(sessionData) {
        const baseUrl = window.location.origin + window.location.pathname;
        const data = btoa(JSON.stringify(sessionData));
        return `${baseUrl}?share=${data}`;
    }

    static parseSharedLink() {
        const urlParams = new URLSearchParams(window.location.search);
        const shareData = urlParams.get('share');

        if (shareData) {
            try {
                return JSON.parse(atob(shareData));
            } catch (e) {
                console.error('Invalid share link', e);
            }
        }
        return null;
    }

    // Future: Add Firebase Cloud Messaging for push notifications
    static async sendPushNotification(sessionData, supports) {
        // TODO: Implement Firebase Cloud Messaging
        console.log('Push notifications will be implemented with Firebase');
    }
}

// ============================================================================
// UI Renderers
// ============================================================================

class UIRenderer {
    static renderEmojis(mood) {
        const grid = document.getElementById('emojiGrid');
        grid.innerHTML = '';

        // Combine default emojis with custom emojis for this mood
        const defaultEmojis = EMOJI_DATA[mood];
        const customEmojis = CustomEmojiManager.getEmojisForMood(mood);
        const allEmojis = [...defaultEmojis, ...customEmojis];

        allEmojis.forEach(({ emoji, label }) => {
            const btn = document.createElement('button');
            btn.className = 'emoji-btn';
            btn.dataset.emoji = emoji;
            btn.dataset.label = label;
            btn.innerHTML = `
                <span class="emoji-icon">${emoji}</span>
                <span class="emoji-label">${label}</span>
            `;
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                appState.toggleEmoji(emoji, label);
            });
            grid.appendChild(btn);
        });
    }

    static renderTriggers(mood) {
        const grid = document.getElementById('triggersGrid');
        grid.innerHTML = '';

        // Combine default triggers with custom triggers
        const defaultTriggers = TRIGGERS_DATA[mood];
        const customTriggers = CustomTriggerManager.getCustomTriggers();
        const allTriggers = [...defaultTriggers, ...customTriggers];

        allTriggers.forEach(({ id, label, icon }) => {
            const btn = document.createElement('button');
            btn.className = 'trigger-btn';
            btn.dataset.triggerId = id;
            btn.innerHTML = `
                <span class="trigger-icon">${icon}</span>
                <span class="trigger-label">${label}</span>
            `;
            btn.addEventListener('click', () => {
                btn.classList.toggle('selected');
                appState.toggleTrigger(id, label, icon);
            });
            grid.appendChild(btn);
        });
    }

    static renderPreview(sessionData) {
        const preview = document.getElementById('notificationPreview');
        const moodInfo = {
            green: { label: 'Stable', color: '#10b981', emoji: '🟢' },
            orange: { label: 'Struggling', color: '#f59e0b', emoji: '🟡' },
            red: { label: 'Overwhelmed', color: '#ef4444', emoji: '🔴' }
        };

        const mood = moodInfo[sessionData.mood];
        const timestamp = new Date(sessionData.timestamp).toLocaleString();

        preview.innerHTML = `
            <div class="preview-mood" style="border-color: ${mood.color}">
                <div class="preview-mood-indicator" style="background: ${mood.color}">${mood.emoji}</div>
                <div>
                    <h3>${mood.label}</h3>
                    <p class="preview-time">${timestamp}</p>
                </div>
            </div>

            ${sessionData.emojis.length > 0 ? `
                <div class="preview-section">
                    <h4>Emotions</h4>
                    <div class="preview-tags">
                        ${sessionData.emojis.map(e => `<span class="tag">${e.emoji} ${e.label}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${sessionData.triggers.length > 0 ? `
                <div class="preview-section">
                    <h4>Contributing Factors</h4>
                    <div class="preview-tags">
                        ${sessionData.triggers.map(t => `<span class="tag">${t.icon} ${t.label}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    static renderSupports(supports) {
        const container = document.getElementById('supportsContainer');
        const emailBtn = document.getElementById('sendNotification');
        const smsBtn = document.getElementById('sendViaSMS');

        if (supports.length === 0) {
            container.innerHTML = '<p class="empty-state">No support contacts yet. Add some in settings or send via SMS.</p>';
            // Hide email button, show SMS button
            emailBtn.style.display = 'none';
            smsBtn.style.display = 'inline-block';
            return;
        }

        // Show email button, hide SMS button
        emailBtn.style.display = 'inline-block';
        smsBtn.style.display = 'none';

        container.innerHTML = supports.map(support => `
            <label class="support-item">
                <input type="checkbox" class="support-checkbox" data-id="${support.id}" checked>
                <span class="support-name">${support.name}</span>
                <span class="support-email">${support.email}</span>
            </label>
        `).join('');
    }

    static renderContactsList() {
        const list = document.getElementById('contactsList');
        const supports = StorageManager.getSupports();

        if (supports.length === 0) {
            list.innerHTML = '<p class="empty-state">No contacts yet</p>';
            return;
        }

        list.innerHTML = supports.map(support => `
            <div class="contact-item">
                <div>
                    <div class="contact-name">${support.name}</div>
                    <div class="contact-email">${support.email}</div>
                </div>
                <button class="btn-icon-delete" data-id="${support.id}">×</button>
            </div>
        `).join('');

        // Add delete handlers
        list.querySelectorAll('.btn-icon-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                StorageManager.removeSupport(id);
                UIRenderer.renderContactsList();
                UIRenderer.renderSupports(StorageManager.getSupports());
            });
        });
    }

    static renderHistory() {
        const list = document.getElementById('historyList');
        const history = StorageManager.getHistory().reverse().slice(0, 10);

        if (history.length === 0) {
            list.innerHTML = '<p class="empty-state">No history yet</p>';
            return;
        }

        const moodLabels = {
            green: '🟢 Stable',
            orange: '🟡 Struggling',
            red: '🔴 Overwhelmed'
        };

        list.innerHTML = history.map(entry => {
            const date = new Date(entry.timestamp).toLocaleString();
            return `
                <div class="history-item">
                    <div class="history-mood">${moodLabels[entry.mood]}</div>
                    <div class="history-time">${date}</div>
                    <div class="history-emojis">${entry.emojis.map(e => e.emoji).join(' ')}</div>
                </div>
            `;
        }).join('');
    }
}

// ============================================================================
// App Initialization & Event Handlers
// ============================================================================

const appState = new AppState();

async function initApp() {
    // Check for shared link
    const sharedData = NotificationManager.parseSharedLink();
    if (sharedData) {
        showSharedDataView(sharedData);
        return;
    }

    // Initialize authentication
    await AuthManager.init();

    // Setup auth state listener
    AuthManager.onAuthChange((user) => {
        updateUIForAuthState(user);
    });

    // Check if user should see auth screen
    const wasGuest = localStorage.getItem('flares_guest_mode') === 'true';
    if (!AuthManager.currentUser && !wasGuest) {
        // Show auth screen for new users
        ScreenManager.showScreen('authScreen');
    } else {
        // Continue to main app
        ScreenManager.showScreen('moodScreen');
    }

    // Setup auth UI handlers
    setupAuthHandlers();

    // Mood Selection
    document.querySelectorAll('.flare-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mood = e.currentTarget.dataset.mood;
            appState.setMood(mood);
            UIRenderer.renderEmojis(mood);
            ScreenManager.showScreen('emojiScreen');
        });
    });

    // Navigation buttons
    document.getElementById('backToMood').addEventListener('click', () => {
        ScreenManager.showScreen('moodScreen');
    });

    document.getElementById('continueToTriggers').addEventListener('click', () => {
        if (appState.sessionData.emojis.length === 0) {
            alert('Please select at least one emotion');
            return;
        }
        UIRenderer.renderTriggers(appState.sessionData.mood);
        ScreenManager.showScreen('triggersScreen');
    });

    document.getElementById('backToEmoji').addEventListener('click', () => {
        ScreenManager.showScreen('emojiScreen');
    });

    document.getElementById('continueToPreview').addEventListener('click', () => {
        UIRenderer.renderPreview(appState.sessionData);
        UIRenderer.renderSupports(StorageManager.getSupports());
        ScreenManager.showScreen('previewScreen');
    });

    document.getElementById('backToTriggers').addEventListener('click', () => {
        ScreenManager.showScreen('triggersScreen');
    });

    // Send notification via email
    document.getElementById('sendNotification').addEventListener('click', async () => {
        const selectedSupports = Array.from(document.querySelectorAll('.support-checkbox:checked'))
            .map(cb => {
                const id = parseInt(cb.dataset.id);
                return StorageManager.getSupports().find(s => s.id === id);
            });

        if (selectedSupports.length === 0) {
            alert('Please select at least one support contact or add contacts in settings');
            return;
        }

        await appState.save();

        // Send push notifications to linked contacts
        await LinkingManager.sendFlareToLinkedContacts(appState.sessionData);

        // Send email to selected supports
        NotificationManager.sendViaEmail(appState.sessionData, selectedSupports);

        ScreenManager.showModal('successModal');
    });

    // Send notification via SMS
    document.getElementById('sendViaSMS').addEventListener('click', async () => {
        await appState.save();

        // Send push notifications to linked contacts
        await LinkingManager.sendFlareToLinkedContacts(appState.sessionData);

        // Open SMS app
        NotificationManager.sendViaSMS(appState.sessionData);
        ScreenManager.showModal('successModal');
    });

    // Share via link
    document.getElementById('shareViaLink').addEventListener('click', () => {
        const link = NotificationManager.generateShareableLink(appState.sessionData);
        document.getElementById('shareLink').value = link;
        ScreenManager.showModal('shareLinkModal');
    });

    document.getElementById('copyLinkBtn').addEventListener('click', () => {
        const input = document.getElementById('shareLink');
        input.select();
        document.execCommand('copy');

        const btn = document.getElementById('copyLinkBtn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });

    document.getElementById('closeShareLink').addEventListener('click', () => {
        ScreenManager.hideModal('shareLinkModal');
    });

    // Done button - reset and go back to start
    document.getElementById('doneBtn').addEventListener('click', () => {
        ScreenManager.hideModal('successModal');
        appState.reset();
        ScreenManager.showScreen('moodScreen');
    });

    // Settings
    document.getElementById('settingsBtn').addEventListener('click', () => {
        UIRenderer.renderContactsList();
        UIRenderer.renderHistory();
        ScreenManager.showModal('settingsModal');
    });

    document.getElementById('manageSupportBtn').addEventListener('click', () => {
        UIRenderer.renderContactsList();
        UIRenderer.renderHistory();
        ScreenManager.showModal('settingsModal');
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
        ScreenManager.hideModal('settingsModal');
    });

    // Add contact
    document.getElementById('addContactBtn').addEventListener('click', () => {
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();

        if (!name || !email) {
            alert('Please enter both name and email');
            return;
        }

        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        StorageManager.addSupport(name, email);
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        UIRenderer.renderContactsList();
        UIRenderer.renderSupports(StorageManager.getSupports());
    });

    // Clear history
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your history?')) {
            StorageManager.clearHistory();
            UIRenderer.renderHistory();
        }
    });

    // Linking System Handlers
    setupLinkingHandlers();

    // Custom Emojis Management
    document.getElementById('manageCustomEmojisBtn').addEventListener('click', () => {
        renderCustomEmojisList();
        ScreenManager.showModal('customEmojisModal');
    });

    document.getElementById('closeCustomEmojis').addEventListener('click', () => {
        ScreenManager.hideModal('customEmojisModal');
    });

    document.getElementById('addCustomEmojiBtn').addEventListener('click', () => {
        // Reset form
        document.getElementById('selectedEmojiDisplay').textContent = 'Tap to select emoji';
        document.getElementById('selectedEmojiDisplay').dataset.emoji = '';
        document.getElementById('emojiLabelInput').value = '';
        document.querySelectorAll('.emoji-color-cb').forEach(cb => cb.checked = false);

        ScreenManager.showModal('addEmojiModal');
    });

    document.getElementById('closeAddEmoji').addEventListener('click', () => {
        ScreenManager.hideModal('addEmojiModal');
    });

    document.getElementById('cancelAddEmoji').addEventListener('click', () => {
        ScreenManager.hideModal('addEmojiModal');
    });

    document.getElementById('emojiPickerBtn').addEventListener('click', () => {
        renderEmojiPicker();
        ScreenManager.showModal('emojiPickerModal');
    });

    document.getElementById('closeEmojiPicker').addEventListener('click', () => {
        ScreenManager.hideModal('emojiPickerModal');
    });

    document.getElementById('saveCustomEmoji').addEventListener('click', () => {
        const emojiDisplay = document.getElementById('selectedEmojiDisplay');
        const emoji = emojiDisplay.dataset.emoji;
        const label = document.getElementById('emojiLabelInput').value.trim();
        const selectedColors = Array.from(document.querySelectorAll('.emoji-color-cb:checked'))
            .map(cb => cb.value);

        if (!emoji) {
            alert('Please select an emoji');
            return;
        }

        if (!label) {
            alert('Please enter a feeling/emotion label');
            return;
        }

        if (selectedColors.length === 0) {
            alert('Please select at least one mood color');
            return;
        }

        CustomEmojiManager.addCustomEmoji(emoji, label, selectedColors);
        ScreenManager.hideModal('addEmojiModal');
        renderCustomEmojisList();
    });

    // Custom Triggers Management
    document.getElementById('manageCustomTriggersBtn').addEventListener('click', () => {
        renderCustomTriggersList();
        ScreenManager.showModal('customTriggersModal');
    });

    document.getElementById('closeCustomTriggers').addEventListener('click', () => {
        ScreenManager.hideModal('customTriggersModal');
    });

    document.getElementById('addCustomTriggerBtn').addEventListener('click', () => {
        // Reset form
        document.getElementById('triggerLabelInput').value = '';
        document.querySelectorAll('input[name="triggerCategory"]').forEach(r => r.checked = false);

        ScreenManager.showModal('addTriggerModal');
    });

    document.getElementById('closeAddTrigger').addEventListener('click', () => {
        ScreenManager.hideModal('addTriggerModal');
    });

    document.getElementById('cancelAddTrigger').addEventListener('click', () => {
        ScreenManager.hideModal('addTriggerModal');
    });

    document.getElementById('saveCustomTrigger').addEventListener('click', () => {
        const label = document.getElementById('triggerLabelInput').value.trim();
        const categoryInput = document.querySelector('input[name="triggerCategory"]:checked');

        if (!label) {
            alert('Please enter a trigger/reason');
            return;
        }

        if (!categoryInput) {
            alert('Please select a category');
            return;
        }

        const category = categoryInput.value;
        CustomTriggerManager.addCustomTrigger(label, category);
        ScreenManager.hideModal('addTriggerModal');
        renderCustomTriggersList();
    });

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Helper function to render custom emojis list
function renderCustomEmojisList() {
    const list = document.getElementById('customEmojisList');
    const customEmojis = CustomEmojiManager.getCustomEmojis();

    if (customEmojis.length === 0) {
        list.innerHTML = '<p class="empty-state">No custom emojis yet. Add your own!</p>';
        return;
    }

    list.innerHTML = customEmojis.map(emoji => {
        const colorDots = emoji.associatedColors.map(color => {
            const colorMap = { green: '#10b981', orange: '#f59e0b', red: '#ef4444' };
            return `<span class="color-dot" style="background: ${colorMap[color]}"></span>`;
        }).join('');

        return `
            <div class="custom-item">
                <span class="custom-emoji">${emoji.emoji}</span>
                <div class="custom-info">
                    <span class="custom-label">${emoji.label}</span>
                    <div class="custom-colors">${colorDots}</div>
                </div>
                <button class="btn-icon-delete" data-id="${emoji.id}" onclick="deleteCustomEmoji(${emoji.id})">×</button>
            </div>
        `;
    }).join('');
}

// Helper function to render emoji picker
function renderEmojiPicker() {
    const grid = document.getElementById('emojiPickerGrid');
    grid.innerHTML = COMMON_EMOJIS.map(emoji => `
        <button class="emoji-picker-item" onclick="selectEmoji('${emoji}')">${emoji}</button>
    `).join('');
}

// Helper function to select emoji from picker
function selectEmoji(emoji) {
    document.getElementById('selectedEmojiDisplay').textContent = emoji;
    document.getElementById('selectedEmojiDisplay').dataset.emoji = emoji;
    ScreenManager.hideModal('emojiPickerModal');
}

// Helper function to delete custom emoji
function deleteCustomEmoji(id) {
    if (confirm('Are you sure you want to delete this custom emoji?')) {
        CustomEmojiManager.deleteCustomEmoji(id);
        renderCustomEmojisList();
    }
}

// Helper function to render custom triggers list
function renderCustomTriggersList() {
    const list = document.getElementById('customTriggersList');
    const customTriggers = CustomTriggerManager.getCustomTriggers();

    if (customTriggers.length === 0) {
        list.innerHTML = '<p class="empty-state">No custom triggers yet. Add your own!</p>';
        return;
    }

    list.innerHTML = customTriggers.map(trigger => {
        const categoryLabel = CustomTriggerManager.CATEGORIES[trigger.category].label;
        return `
            <div class="custom-item">
                <span class="custom-icon">${trigger.icon}</span>
                <div class="custom-info">
                    <span class="custom-label">${trigger.label}</span>
                    <span class="custom-category">${categoryLabel}</span>
                </div>
                <button class="btn-icon-delete" data-id="${trigger.id}" onclick="deleteCustomTrigger('${trigger.id}')">×</button>
            </div>
        `;
    }).join('');
}

// Helper function to delete custom trigger
function deleteCustomTrigger(id) {
    if (confirm('Are you sure you want to delete this custom trigger?')) {
        CustomTriggerManager.deleteCustomTrigger(id);
        renderCustomTriggersList();
    }
}

// ============================================================================
// Linking System Handlers
// ============================================================================

function setupLinkingHandlers() {
    // Generate link code
    const generateBtn = document.getElementById('generateLinkCodeBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            try {
                const { code, expiresAt } = await LinkingManager.createLinkCode();
                document.querySelector('#linkCodeDisplay .link-code').textContent = code;

                // Update expiry countdown
                updateCodeExpiry(expiresAt);

                ScreenManager.showModal('generateCodeModal');
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Copy code button
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const code = document.querySelector('#linkCodeDisplay .link-code').textContent;
            navigator.clipboard.writeText(code);
            copyCodeBtn.textContent = 'Copied!';
            setTimeout(() => copyCodeBtn.textContent = 'Copy Code', 2000);
        });
    }

    // Close generate code modal
    const closeGenerateCode = document.getElementById('closeGenerateCode');
    if (closeGenerateCode) {
        closeGenerateCode.addEventListener('click', () => {
            ScreenManager.hideModal('generateCodeModal');
        });
    }

    // Enter link code button
    const enterCodeBtn = document.getElementById('enterLinkCodeBtn');
    if (enterCodeBtn) {
        enterCodeBtn.addEventListener('click', () => {
            document.getElementById('linkCodeInput').value = '';
            document.getElementById('linkCodeError').textContent = '';
            ScreenManager.showModal('enterCodeModal');
        });
    }

    // Close enter code modal
    const closeEnterCode = document.getElementById('closeEnterCode');
    if (closeEnterCode) {
        closeEnterCode.addEventListener('click', () => {
            ScreenManager.hideModal('enterCodeModal');
        });
    }

    const cancelEnterCode = document.getElementById('cancelEnterCode');
    if (cancelEnterCode) {
        cancelEnterCode.addEventListener('click', () => {
            ScreenManager.hideModal('enterCodeModal');
        });
    }

    // Submit link code
    const submitLinkCode = document.getElementById('submitLinkCode');
    if (submitLinkCode) {
        submitLinkCode.addEventListener('click', async () => {
            const code = document.getElementById('linkCodeInput').value.trim();
            const errorEl = document.getElementById('linkCodeError');

            if (!code || code.length !== 6) {
                errorEl.textContent = 'Please enter a valid 6-digit code';
                return;
            }

            submitLinkCode.classList.add('loading');
            errorEl.textContent = '';

            try {
                const linkedUser = await LinkingManager.linkWithCode(code);
                ScreenManager.hideModal('enterCodeModal');
                alert(`Successfully linked with ${linkedUser.displayName}!`);
                renderLinkedContactsList();
            } catch (error) {
                errorEl.textContent = error.message;
            } finally {
                submitLinkCode.classList.remove('loading');
            }
        });
    }
}

function updateCodeExpiry(expiresAt) {
    const expiryEl = document.getElementById('linkCodeExpiry');
    if (!expiryEl) return;

    const updateTimer = () => {
        const remaining = expiresAt - Date.now();
        if (remaining <= 0) {
            expiryEl.textContent = 'Code expired';
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        expiryEl.textContent = `Expires in ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (remaining > 0) {
            setTimeout(updateTimer, 1000);
        }
    };

    updateTimer();
}

async function renderLinkedContactsList() {
    const list = document.getElementById('linkedContactsList');
    if (!list) return;

    const linkedContacts = await LinkingManager.getLinkedContacts();

    if (linkedContacts.length === 0) {
        list.innerHTML = '<p class="empty-state">No linked contacts yet. Generate a code or enter someone\'s code to connect!</p>';
        return;
    }

    list.innerHTML = linkedContacts.map(contact => `
        <div class="linked-contact-item">
            <div class="linked-contact-avatar">${(contact.displayName || 'U').charAt(0).toUpperCase()}</div>
            <div class="linked-contact-info">
                <div class="linked-contact-name">${contact.displayName || 'User'}</div>
                <div class="linked-contact-email">${contact.email || ''}</div>
            </div>
            <button class="btn-icon-delete" onclick="unlinkContact('${contact.id}')">×</button>
        </div>
    `).join('');
}

async function unlinkContact(contactId) {
    if (confirm('Are you sure you want to unlink this contact?')) {
        await LinkingManager.unlinkContact(contactId);
        renderLinkedContactsList();
    }
}

function showSharedDataView(data) {
    // Show a special view for shared links
    document.querySelector('.flares-app').innerHTML = `
        <nav class="flares-nav">
            <div class="nav-container">
                <a href="flares.html" class="back-btn">← Back</a>
                <div class="logo">Flares</div>
            </div>
        </nav>
        <div class="screen active">
            <div class="screen-content">
                <h1 class="screen-title">Someone shared their state with you</h1>
                <div class="notification-preview" id="sharedPreview"></div>
                <div class="screen-actions">
                    <a href="flares.html" class="btn btn-primary">Go to Flares</a>
                </div>
            </div>
        </div>
    `;

    UIRenderer.renderPreview(data);
    const preview = document.getElementById('notificationPreview');
    document.getElementById('sharedPreview').innerHTML = preview.innerHTML;
}

// ============================================================================
// Auth UI Handlers
// ============================================================================

function setupAuthHandlers() {
    // Toggle between login and signup forms
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            signupForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Login handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const errorEl = document.getElementById('loginError');

            errorEl.textContent = '';

            if (!email || !password) {
                errorEl.textContent = 'Please enter email and password';
                return;
            }

            loginBtn.classList.add('loading');

            try {
                await AuthManager.signIn(email, password);
                localStorage.removeItem('flares_guest_mode');
                ScreenManager.showScreen('moodScreen');
            } catch (error) {
                errorEl.textContent = error.message;
            } finally {
                loginBtn.classList.remove('loading');
            }
        });
    }

    // Signup handler
    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', async () => {
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            const errorEl = document.getElementById('signupError');

            errorEl.textContent = '';

            if (!name || !email || !password) {
                errorEl.textContent = 'Please fill in all fields';
                return;
            }

            if (password !== confirm) {
                errorEl.textContent = 'Passwords do not match';
                return;
            }

            if (password.length < 6) {
                errorEl.textContent = 'Password must be at least 6 characters';
                return;
            }

            signupBtn.classList.add('loading');

            try {
                await AuthManager.signUp(email, password, name);
                localStorage.removeItem('flares_guest_mode');
                ScreenManager.showScreen('moodScreen');
            } catch (error) {
                errorEl.textContent = error.message;
            } finally {
                signupBtn.classList.remove('loading');
            }
        });
    }

    // Skip auth (continue as guest)
    const skipAuthBtn = document.getElementById('skipAuthBtn');
    if (skipAuthBtn) {
        skipAuthBtn.addEventListener('click', () => {
            AuthManager.continueAsGuest();
            ScreenManager.showScreen('moodScreen');
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await AuthManager.signOut();
                localStorage.removeItem('flares_guest_mode');
                ScreenManager.hideModal('settingsModal');
                ScreenManager.showScreen('authScreen');
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }

    // Create account from guest mode
    const createAccountBtn = document.getElementById('createAccountBtn');
    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', () => {
            localStorage.removeItem('flares_guest_mode');
            ScreenManager.hideModal('settingsModal');
            ScreenManager.showScreen('authScreen');
        });
    }
}

function updateUIForAuthState(user) {
    const userProfileSection = document.getElementById('userProfileSection');
    const guestModeNotice = document.getElementById('guestModeNotice');
    const linkedContactsSection = document.getElementById('linkedContactsSection');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');

    if (user) {
        // Logged in - show profile and linked contacts
        if (userProfileSection) userProfileSection.style.display = 'block';
        if (guestModeNotice) guestModeNotice.style.display = 'none';
        if (linkedContactsSection) linkedContactsSection.style.display = 'block';

        // Update user info
        if (userAvatar) {
            const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
            userAvatar.textContent = initial;
        }
        if (userName) userName.textContent = user.displayName || 'User';
        if (userEmail) userEmail.textContent = user.email;

        // Initialize push notifications and render linked contacts
        PushNotificationManager.init();
        renderLinkedContactsList();
    } else if (AuthManager.isGuest) {
        // Guest mode - show notice, hide linked contacts
        if (userProfileSection) userProfileSection.style.display = 'none';
        if (guestModeNotice) guestModeNotice.style.display = 'block';
        if (linkedContactsSection) linkedContactsSection.style.display = 'none';
    } else {
        // Not logged in, not guest - hide all
        if (userProfileSection) userProfileSection.style.display = 'none';
        if (linkedContactsSection) linkedContactsSection.style.display = 'none';
        if (guestModeNotice) guestModeNotice.style.display = 'none';
    }
}

// Helper to sync data changes to cloud
async function syncDataToCloud() {
    if (!AuthManager.isGuestMode()) {
        await CloudStorageManager.syncToCloud();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
