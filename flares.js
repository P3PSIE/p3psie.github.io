// Flares - Mood Tracking App
// Architecture: Modular design with future Firebase integration support

// ============================================================================
// Data Structures & Configuration
// ============================================================================
// These reference FLARES_CONFIG from config.js - edit that file to customize

const EMOJI_DATA = typeof FLARES_CONFIG !== 'undefined' ? FLARES_CONFIG.emojis : {
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

// Trigger categories
const TRIGGER_CATEGORIES = typeof FLARES_CONFIG !== 'undefined' && FLARES_CONFIG.triggerCategories ? FLARES_CONFIG.triggerCategories : {
    sensory: { label: 'Sensory', icon: '👂' },
    physical: { label: 'Physical', icon: '🏃' },
    emotional: { label: 'Emotional', icon: '❤️' },
    cognitive: { label: 'Cognitive', icon: '🧠' }
};

// Triggers organized by category
const TRIGGERS_DATA = typeof FLARES_CONFIG !== 'undefined' ? FLARES_CONFIG.triggers : {
    sensory: [
        { id: 'loud_noises', label: 'Overwhelming sounds', icon: '🔊' },
        { id: 'bright_lights', label: 'Bright lights', icon: '💡' },
        { id: 'crowds', label: 'Crowded spaces', icon: '👥' },
        { id: 'sensory_overload', label: 'Sensory overload', icon: '🎆' }
    ],
    physical: [
        { id: 'exercise', label: 'Exercise or movement', icon: '🏃' },
        { id: 'lack_sleep', label: 'Lack of sleep', icon: '😴' },
        { id: 'rest', label: 'Good rest', icon: '🛏️' },
        { id: 'physical_pain', label: 'Physical pain', icon: '🤕' }
    ],
    emotional: [
        { id: 'social_time', label: 'Quality time with others', icon: '👥' },
        { id: 'social_conflict', label: 'Social conflict', icon: '💬' },
        { id: 'isolation', label: 'Feeling isolated', icon: '🚪' },
        { id: 'loss', label: 'Loss or grief', icon: '💔' }
    ],
    cognitive: [
        { id: 'work_stress', label: 'Work pressure', icon: '💼' },
        { id: 'deadlines', label: 'Deadlines', icon: '⏰' },
        { id: 'financial', label: 'Financial concerns', icon: '💰' },
        { id: 'intrusive_thoughts', label: 'Intrusive thoughts', icon: '🌀' }
    ]
};

// Common emoji list for picker
const COMMON_EMOJIS = typeof FLARES_CONFIG !== 'undefined' ? FLARES_CONFIG.commonEmojis : [
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
// Haptic Feedback Utility
// ============================================================================

class Haptics {
    static vibrate(pattern = 10) {
        // Try native vibration API (Android only - iOS doesn't support it)
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (e) {
                // Silently fail
            }
        }
    }

    static light(element = null) {
        this.vibrate(10);
        this.visualFeedback(element, 'light');
    }

    static medium(element = null) {
        this.vibrate(25);
        this.visualFeedback(element, 'medium');
    }

    static heavy(element = null) {
        this.vibrate([30, 10, 30]);
        this.visualFeedback(element, 'heavy');
    }

    static success(element = null) {
        this.vibrate([10, 50, 20]);
        this.visualFeedback(element, 'success');
    }

    static error(element = null) {
        this.vibrate([50, 30, 50, 30, 50]);
        this.visualFeedback(element, 'error');
    }

    // Visual feedback fallback for devices without vibration
    static visualFeedback(element, type) {
        if (!element) return;

        element.classList.add('haptic-feedback', `haptic-${type}`);
        setTimeout(() => {
            element.classList.remove('haptic-feedback', `haptic-${type}`);
        }, 150);
    }
}

// ============================================================================
// Swipe Gesture Handler
// ============================================================================

class SwipeGestures {
    static init() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        const minSwipeDistance = 50;
        const maxVerticalDistance = 100;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY, minSwipeDistance, maxVerticalDistance);
        }, { passive: true });
    }

    static handleSwipe(startX, startY, endX, endY, minDistance, maxVertical) {
        const deltaX = endX - startX;
        const deltaY = Math.abs(endY - startY);

        // Only trigger if horizontal swipe is significant and vertical movement is small
        if (Math.abs(deltaX) < minDistance || deltaY > maxVertical) {
            return;
        }

        // Don't trigger swipes inside modals
        if (document.querySelector('.modal.active')) {
            return;
        }

        const currentScreen = document.querySelector('.screen.active');
        if (!currentScreen) return;

        if (deltaX > 0) {
            // Swipe right = go back
            this.triggerBack(currentScreen);
        } else {
            // Swipe left = go forward
            this.triggerForward(currentScreen);
        }
    }

    static triggerBack(currentScreen) {
        const backBtn = currentScreen.querySelector('.btn-secondary[id^="backTo"]');
        if (backBtn) {
            Haptics.light(backBtn);
            backBtn.click();
        }
    }

    static triggerForward(currentScreen) {
        // Try to find continue/send button
        const forwardBtn = currentScreen.querySelector('.btn-primary[id^="continueTo"], .btn-primary[id^="send"]');
        if (forwardBtn && forwardBtn.style.display !== 'none') {
            Haptics.light(forwardBtn);
            forwardBtn.click();
        }
    }
}

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
    static initialAuthResolved = false;

    static async init() {
        return new Promise((resolve) => {
            // Wait for Firebase to be ready
            if (window.firebaseAuth) {
                this.setupAuthListener(resolve);
            } else {
                window.addEventListener('firebaseReady', () => {
                    this.setupAuthListener(resolve);
                });
                // Timeout fallback - if Firebase fails to load, continue as guest
                setTimeout(() => {
                    if (!window.firebaseAuth) {
                        console.warn('Firebase not loaded, continuing in offline mode');
                        this.isGuest = true;
                        this.initialAuthResolved = true;
                        resolve();
                    }
                }, 5000);
            }
        });
    }

    static setupAuthListener(initResolve) {
        if (!window.firebaseAuth || !window.firebaseAuthFunctions) {
            if (initResolve) initResolve();
            return;
        }

        const { onAuthStateChanged } = window.firebaseAuthFunctions;
        onAuthStateChanged(window.firebaseAuth, (user) => {
            this.currentUser = user;
            this.isGuest = !user;
            this.notifyListeners(user);

            // Sync data when user logs in
            if (user) {
                CloudStorageManager.syncFromCloud();
                // Update inbox badge
                InboxManager.updateBadge();
            } else {
                // Hide badge when logged out
                InboxManager.hideBadge();
            }

            // Resolve the init promise on first auth state
            if (!this.initialAuthResolved) {
                this.initialAuthResolved = true;
                if (initResolve) initResolve();
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
// Profile Manager
// ============================================================================

class ProfileManager {
    static STORAGE_KEY = 'flares_profile';

    // Get profile data from localStorage (for avatar that can't be in Firebase Auth)
    static getProfile() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : { avatarUrl: null };
    }

    // Save profile data to localStorage
    static saveProfile(profile) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
    }

    // Update display name in Firebase Auth
    static async updateDisplayName(displayName) {
        if (!AuthManager.currentUser || !window.firebaseAuthFunctions) {
            throw new Error('Not logged in');
        }

        const { updateProfile } = window.firebaseAuthFunctions;
        await updateProfile(AuthManager.currentUser, { displayName });

        // Also save to Firestore for linked contacts to see
        if (window.firebaseDb && window.firebaseDbFunctions) {
            const { doc, setDoc } = window.firebaseDbFunctions;
            await setDoc(doc(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'profile', 'info'), {
                displayName,
                email: AuthManager.currentUser.email,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        }
    }

    // Update avatar (stored as base64 in localStorage and Firestore)
    static async updateAvatar(base64Image) {
        const profile = this.getProfile();
        profile.avatarUrl = base64Image;
        this.saveProfile(profile);

        // Also save to Firestore
        if (AuthManager.currentUser && window.firebaseDb && window.firebaseDbFunctions) {
            const { doc, setDoc } = window.firebaseDbFunctions;
            await setDoc(doc(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'profile', 'info'), {
                avatarUrl: base64Image,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        }
    }

    // Remove avatar
    static async removeAvatar() {
        const profile = this.getProfile();
        profile.avatarUrl = null;
        this.saveProfile(profile);

        // Also remove from Firestore
        if (AuthManager.currentUser && window.firebaseDb && window.firebaseDbFunctions) {
            const { doc, setDoc } = window.firebaseDbFunctions;
            await setDoc(doc(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'profile', 'info'), {
                avatarUrl: null,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        }
    }

    // Load profile from Firestore (on login)
    static async loadFromCloud() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        const { doc, getDoc } = window.firebaseDbFunctions;
        try {
            const profileDoc = await getDoc(doc(window.firebaseDb, 'users', AuthManager.currentUser.uid, 'profile', 'info'));
            if (profileDoc.exists()) {
                const data = profileDoc.data();
                if (data.avatarUrl) {
                    const profile = this.getProfile();
                    profile.avatarUrl = data.avatarUrl;
                    this.saveProfile(profile);
                }
            }
        } catch (error) {
            console.error('Error loading profile from cloud:', error);
        }
    }

    // Convert file to base64
    static fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // Resize image to reasonable size for storage
    static async resizeImage(base64, maxSize = 200) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.src = base64;
        });
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

        const moodLabels = {
            green: 'Stable',
            orange: 'Struggling',
            red: 'Overwhelmed'
        };

        const senderName = AuthManager.currentUser.displayName || 'Someone';

        // Write directly to each recipient's inbox for real-time notifications
        for (const contact of linkedContacts) {
            try {
                // Write to recipient's inbox subcollection
                await addDoc(collection(window.firebaseDb, 'users', contact.userId, 'inbox'), {
                    senderId: AuthManager.currentUser.uid,
                    senderName: senderName,
                    type: 'flare',
                    mood: sessionData.mood,
                    title: `${senderName} sent a ${moodLabels[sessionData.mood]} Flare`,
                    body: sessionData.emojis.map(e => e.emoji).join(' ') || 'Check on them',
                    emojis: sessionData.emojis,
                    triggers: sessionData.triggers,
                    message: sessionData.message || '',
                    timestamp: sessionData.timestamp,
                    createdAt: new Date().toISOString(),
                    read: false
                });
                console.log(`Sent flare to ${contact.displayName || contact.email}'s inbox`);
            } catch (error) {
                console.error(`Error sending flare to ${contact.userId}:`, error);
            }
        }

        console.log(`Sent flares to ${linkedContacts.length} contacts`);
    }
}

// ============================================================================
// Inbox Manager - Real-time notifications via Firestore
// ============================================================================

class InboxManager {
    static unsubscribe = null;
    static isListening = false;

    // Start listening for incoming flares
    static startListening() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        if (this.isListening) {
            console.log('Already listening to inbox');
            return;
        }

        const { collection, query, orderBy, onSnapshot } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;
        const inboxRef = collection(window.firebaseDb, 'users', userId, 'inbox');
        const inboxQuery = query(inboxRef, orderBy('createdAt', 'desc'));

        console.log('Starting inbox listener...');

        this.unsubscribe = onSnapshot(inboxQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const flare = { id: change.doc.id, ...change.doc.data() };

                    // Only show notification for new unread flares
                    // Skip if this is initial load (older than 30 seconds)
                    const createdAt = new Date(flare.createdAt);
                    const now = new Date();
                    const isRecent = (now - createdAt) < 30000; // 30 seconds

                    if (!flare.read && isRecent) {
                        this.showFlareNotification(flare);
                    }
                } else if (change.type === 'modified') {
                    // Item was modified (e.g., marked as read)
                    // Update badge count
                    this.updateBadge();
                }
            });
        }, (error) => {
            console.error('Inbox listener error:', error);
        });

        this.isListening = true;
        console.log('Inbox listener started');
    }

    // Stop listening
    static stopListening() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
            this.isListening = false;
            console.log('Inbox listener stopped');
        }
    }

    // Check for pending (unread) flares on app load
    static async checkPendingFlares() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        const { collection, query, where, getDocs, orderBy } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;
        const inboxRef = collection(window.firebaseDb, 'users', userId, 'inbox');
        const pendingQuery = query(inboxRef, where('read', '==', false), orderBy('createdAt', 'desc'));

        try {
            const snapshot = await getDocs(pendingQuery);
            const pendingFlares = [];

            snapshot.forEach((doc) => {
                pendingFlares.push({ id: doc.id, ...doc.data() });
            });

            if (pendingFlares.length > 0) {
                console.log(`Found ${pendingFlares.length} pending flares`);
                // Show notification for the most recent pending flare
                this.showFlareNotification(pendingFlares[0], pendingFlares.length);
            }
        } catch (error) {
            console.error('Error checking pending flares:', error);
        }
    }

    // Show in-app notification for a flare
    static showFlareNotification(flare, totalPending = 1) {
        const moodColors = {
            green: '#22c55e',
            orange: '#f97316',
            red: '#ef4444'
        };

        const title = totalPending > 1
            ? `${totalPending} new Flares received`
            : flare.title;

        const body = totalPending > 1
            ? `Latest: ${flare.senderName} - ${flare.body}`
            : flare.body;

        // Show toast notification
        this.showToast(title, body, moodColors[flare.mood] || '#6366f1', flare);
    }

    // Show toast notification UI
    static showToast(title, body, color, flare) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.flare-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'flare-toast';
        toast.innerHTML = `
            <div class="flare-toast-content" style="border-left-color: ${color}">
                <div class="flare-toast-header">
                    <span class="flare-toast-title">${title}</span>
                    <button class="flare-toast-close">&times;</button>
                </div>
                <div class="flare-toast-body">${body}</div>
                <div class="flare-toast-actions">
                    <button class="flare-toast-view">View</button>
                    <button class="flare-toast-dismiss">Dismiss</button>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);

        // Event handlers
        toast.querySelector('.flare-toast-close').addEventListener('click', () => {
            this.dismissToast(toast);
        });

        toast.querySelector('.flare-toast-dismiss').addEventListener('click', () => {
            this.markAsRead(flare.id);
            this.dismissToast(toast);
        });

        toast.querySelector('.flare-toast-view').addEventListener('click', () => {
            this.markAsRead(flare.id);
            this.dismissToast(toast);
            this.showFlareDetails(flare);
        });

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                this.dismissToast(toast);
            }
        }, 10000);
    }

    // Dismiss toast with animation
    static dismissToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }

    // Mark a flare as read
    static async markAsRead(flareId) {
        console.log('markAsRead called for:', flareId);

        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            console.error('markAsRead: Missing required auth or firebase objects');
            return;
        }

        const { doc, updateDoc } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;

        console.log('markAsRead: Attempting to update Firestore for user:', userId);

        try {
            await updateDoc(doc(window.firebaseDb, 'users', userId, 'inbox', flareId), {
                read: true
            });
            console.log('markAsRead: Successfully marked flare as read in Firestore:', flareId);
        } catch (error) {
            console.error('markAsRead: Error marking flare as read:', error);
            throw error;
        }
    }

    // Show flare details modal
    static showFlareDetails(flare) {
        const moodLabels = {
            green: 'Stable',
            orange: 'Struggling',
            red: 'Overwhelmed'
        };

        const moodColors = {
            green: '#22c55e',
            orange: '#f97316',
            red: '#ef4444'
        };

        // Remove existing modal if any
        const existingModal = document.querySelector('.flare-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'flare-detail-modal';

        const emojisHtml = flare.emojis && flare.emojis.length > 0
            ? `<div class="flare-detail-emojis">${flare.emojis.map(e => e.emoji).join(' ')}</div>`
            : '';

        const triggersHtml = flare.triggers && flare.triggers.length > 0
            ? `<div class="flare-detail-triggers">
                <span class="triggers-label">Triggers:</span>
                ${flare.triggers.map(t => `<span class="trigger-tag">${t.icon} ${t.label}</span>`).join('')}
               </div>`
            : '';

        const timestamp = new Date(flare.timestamp || flare.createdAt);
        const timeString = timestamp.toLocaleString();

        modal.innerHTML = `
            <div class="flare-detail-overlay"></div>
            <div class="flare-detail-content">
                <div class="flare-detail-header" style="background-color: ${moodColors[flare.mood]}">
                    <h3>${flare.senderName}'s Flare</h3>
                    <span class="flare-mood-badge">${moodLabels[flare.mood]}</span>
                </div>
                <div class="flare-detail-body">
                    ${emojisHtml}
                    ${triggersHtml}
                    <div class="flare-detail-time">${timeString}</div>
                </div>
                <div class="flare-detail-footer">
                    <button class="flare-detail-close">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => modal.classList.add('show'), 10);

        // Close handlers
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.flare-detail-overlay').addEventListener('click', closeModal);
        modal.querySelector('.flare-detail-close').addEventListener('click', closeModal);
    }

    // Fetch all inbox items for display
    static async fetchAllInboxItems() {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return [];
        }

        const { collection, query, orderBy, getDocs } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;
        const inboxRef = collection(window.firebaseDb, 'users', userId, 'inbox');
        const inboxQuery = query(inboxRef, orderBy('createdAt', 'desc'));

        try {
            const snapshot = await getDocs(inboxQuery);
            const items = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            return items;
        } catch (error) {
            console.error('Error fetching inbox items:', error);
            return [];
        }
    }

    // Count unread items and update badge
    static async updateBadge() {
        if (!AuthManager.currentUser) {
            this.hideBadge();
            return;
        }

        const { collection, query, where, getDocs } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;
        const inboxRef = collection(window.firebaseDb, 'users', userId, 'inbox');
        const unreadQuery = query(inboxRef, where('read', '==', false));

        try {
            const snapshot = await getDocs(unreadQuery);
            const count = snapshot.size;

            const badge = document.getElementById('inboxBadge');
            if (badge) {
                if (count > 0) {
                    badge.textContent = count > 99 ? '99+' : count;
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }
            }
        } catch (error) {
            console.error('Error updating badge:', error);
        }
    }

    static hideBadge() {
        const badge = document.getElementById('inboxBadge');
        if (badge) {
            badge.style.display = 'none';
        }
    }

    // Render inbox screen
    static async renderInboxScreen() {
        const inboxList = document.getElementById('inboxList');
        const emptyState = document.getElementById('inboxEmptyState');

        if (!inboxList) return;

        const items = await this.fetchAllInboxItems();

        // Clear existing items (except empty state)
        const existingItems = inboxList.querySelectorAll('.inbox-item');
        existingItems.forEach(item => item.remove());

        if (items.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        const moodLabels = {
            green: "I'm Okay",
            orange: "I'm Struggling",
            red: "I'm Overwhelmed"
        };

        items.forEach(flare => {
            const itemEl = document.createElement('div');
            itemEl.className = `inbox-item ${flare.read ? '' : 'unread'}`;
            itemEl.dataset.id = flare.id;

            const timestamp = new Date(flare.timestamp || flare.createdAt);
            const timeAgo = this.getTimeAgo(timestamp);
            const initial = (flare.senderName || 'U').charAt(0).toUpperCase();

            const emojisHtml = flare.emojis && flare.emojis.length > 0
                ? `<div class="inbox-emojis">${flare.emojis.map(e => e.emoji).join(' ')}</div>`
                : '';

            const triggersHtml = flare.triggers && flare.triggers.length > 0
                ? `<div class="inbox-triggers">
                    ${flare.triggers.map(t => `<span class="inbox-trigger-tag">${t.icon || ''} ${t.label}</span>`).join('')}
                   </div>`
                : '';

            const messageHtml = flare.message
                ? `<div class="inbox-message">"${flare.message}"</div>`
                : '';

            itemEl.innerHTML = `
                <div class="inbox-item-header">
                    <div class="inbox-sender">
                        <div class="inbox-sender-avatar">${initial}</div>
                        <div class="inbox-sender-info">
                            <span class="inbox-sender-name">${flare.senderName || 'Someone'}</span>
                            <span class="inbox-time">${timeAgo}</span>
                        </div>
                    </div>
                    <span class="inbox-mood-badge ${flare.mood}">${moodLabels[flare.mood] || flare.mood}</span>
                </div>
                <div class="inbox-item-body">
                    ${emojisHtml}
                    ${triggersHtml}
                    ${messageHtml}
                </div>
                <div class="inbox-item-actions">
                    ${!flare.read ? '<button class="inbox-action-btn mark-read-btn">Mark Read</button>' : ''}
                    <button class="inbox-action-btn delete-btn">Delete</button>
                </div>
            `;

            // Event listeners
            const markReadBtn = itemEl.querySelector('.mark-read-btn');
            if (markReadBtn) {
                console.log('Found mark read button for flare:', flare.id);
                markReadBtn.addEventListener('click', async (e) => {
                    console.log('Mark read button clicked for flare:', flare.id);
                    e.stopPropagation();
                    try {
                        await this.markAsRead(flare.id);
                        console.log('Successfully marked as read, updating UI');
                        // Update UI optimistically
                        itemEl.classList.remove('unread');
                        markReadBtn.remove();
                        this.updateBadge();
                    } catch (error) {
                        console.error('Error in mark read handler:', error);
                    }
                });
            } else {
                console.log('No mark read button found for flare (already read?):', flare.id);
            }

            const deleteBtn = itemEl.querySelector('.delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', async () => {
                    await this.deleteInboxItem(flare.id);
                    itemEl.remove();
                    this.updateBadge();

                    // Check if list is now empty
                    const remainingItems = inboxList.querySelectorAll('.inbox-item');
                    if (remainingItems.length === 0 && emptyState) {
                        emptyState.style.display = 'block';
                    }
                });
            }

            inboxList.appendChild(itemEl);
        });
    }

    // Delete an inbox item
    static async deleteInboxItem(flareId) {
        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            return;
        }

        const { doc, deleteDoc } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;

        try {
            await deleteDoc(doc(window.firebaseDb, 'users', userId, 'inbox', flareId));
            console.log('Deleted inbox item:', flareId);
        } catch (error) {
            console.error('Error deleting inbox item:', error);
        }
    }

    // Mark all inbox items as read
    static async markAllAsRead() {
        console.log('markAllAsRead called');

        if (!AuthManager.currentUser || !window.firebaseDb || !window.firebaseDbFunctions) {
            console.error('markAllAsRead: Missing required auth or firebase objects');
            return;
        }

        const { collection, query, where, getDocs, doc, updateDoc } = window.firebaseDbFunctions;
        const userId = AuthManager.currentUser.uid;
        const inboxRef = collection(window.firebaseDb, 'users', userId, 'inbox');
        const unreadQuery = query(inboxRef, where('read', '==', false));

        try {
            const snapshot = await getDocs(unreadQuery);
            const updatePromises = [];

            console.log(`markAllAsRead: Found ${snapshot.size} unread items`);

            snapshot.forEach((docSnapshot) => {
                updatePromises.push(
                    updateDoc(doc(window.firebaseDb, 'users', userId, 'inbox', docSnapshot.id), {
                        read: true
                    })
                );
            });

            await Promise.all(updatePromises);
            console.log(`markAllAsRead: Successfully marked ${updatePromises.length} items as read in Firestore`);

            // Update UI optimistically - remove unread class and mark read buttons
            const inboxList = document.getElementById('inboxList');
            if (inboxList) {
                const unreadItems = inboxList.querySelectorAll('.inbox-item.unread');
                console.log(`markAllAsRead: Updating UI for ${unreadItems.length} unread items`);
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                    const markReadBtn = item.querySelector('.mark-read-btn');
                    if (markReadBtn) markReadBtn.remove();
                });
            }

            // Update badge
            this.updateBadge();
        } catch (error) {
            console.error('markAllAsRead: Error marking all as read:', error);
        }
    }

    // Helper: Get time ago string
    static getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

        return date.toLocaleDateString();
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
            message: '',
            timestamp: null
        };
    }

    setMood(mood) {
        this.sessionData.mood = mood;
        this.sessionData.timestamp = new Date().toISOString();
    }

    setMessage(message) {
        this.sessionData.message = message.trim().substring(0, 200);
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
            message: '',
            timestamp: null
        };
        // Clear message input
        const messageInput = document.getElementById('flareMessage');
        if (messageInput) messageInput.value = '';
        const charCount = document.getElementById('messageCharCount');
        if (charCount) charCount.textContent = '0';
    }

    // Save session and sync with Firebase if authenticated
    async save() {
        const history = StorageManager.getHistory();

        // If editing, update the existing entry
        if (this.sessionData.editingIndex !== undefined) {
            const editIndex = this.sessionData.editingIndex;
            const dataToSave = {...this.sessionData};
            delete dataToSave.editingIndex; // Remove the editing flag
            history[editIndex] = dataToSave;
        } else {
            // Otherwise, add new entry
            const dataToSave = {...this.sessionData};
            delete dataToSave.editingIndex; // Ensure no editing flag
            history.push(dataToSave);
        }

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
        // Use encodeURIComponent to handle Unicode characters (emojis) before base64 encoding
        const jsonString = JSON.stringify(sessionData);
        const data = btoa(unescape(encodeURIComponent(jsonString)));
        return `${baseUrl}?share=${data}`;
    }

    static parseSharedLink() {
        const urlParams = new URLSearchParams(window.location.search);
        const shareData = urlParams.get('share');

        if (shareData) {
            try {
                // Decode Unicode-safe base64
                const jsonString = decodeURIComponent(escape(atob(shareData)));
                return JSON.parse(jsonString);
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

        // Set mood class on grid for styling
        grid.className = `emoji-grid mood-${mood}`;

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
                Haptics.light(btn);
                btn.classList.toggle('selected');
                appState.toggleEmoji(emoji, label);
            });
            grid.appendChild(btn);
        });
    }

    static renderTriggers(mood) {
        const container = document.getElementById('triggersGrid');
        container.innerHTML = '';

        // Set mood class on container for styling
        container.className = `triggers-container mood-${mood}`;

        // Get custom triggers
        const customTriggers = CustomTriggerManager.getCustomTriggers();

        // Track selection counts per category
        const selectionCounts = {};

        // Render each category
        Object.keys(TRIGGER_CATEGORIES).forEach(categoryId => {
            const category = TRIGGER_CATEGORIES[categoryId];
            const triggers = TRIGGERS_DATA[categoryId] || [];

            // Create category section
            const section = document.createElement('div');
            section.className = 'trigger-category';
            section.dataset.category = categoryId;

            // Create collapsible header
            const header = document.createElement('button');
            header.className = 'trigger-category-header';
            header.innerHTML = `
                <span class="category-icon">${category.icon}</span>
                <span class="category-label">${category.label}</span>
                <span class="category-count" data-category="${categoryId}">0</span>
                <span class="category-chevron">▼</span>
            `;

            // Create triggers grid
            const grid = document.createElement('div');
            grid.className = 'trigger-category-grid';

            // Add triggers to grid
            triggers.forEach(({ id, label, icon }) => {
                const btn = document.createElement('button');
                btn.className = 'trigger-btn';
                btn.dataset.triggerId = id;
                btn.dataset.category = categoryId;
                btn.innerHTML = `
                    <span class="trigger-icon">${icon}</span>
                    <span class="trigger-label">${label}</span>
                `;
                btn.addEventListener('click', () => {
                    Haptics.light(btn);
                    btn.classList.toggle('selected');
                    appState.toggleTrigger(id, label, icon);
                    this.updateCategoryCount(categoryId);
                });
                grid.appendChild(btn);
            });

            // Toggle collapse on header click
            header.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });

            section.appendChild(header);
            section.appendChild(grid);
            container.appendChild(section);
        });

        // Add custom triggers section if any exist
        if (customTriggers.length > 0) {
            const section = document.createElement('div');
            section.className = 'trigger-category';
            section.dataset.category = 'custom';

            const header = document.createElement('button');
            header.className = 'trigger-category-header';
            header.innerHTML = `
                <span class="category-icon">⭐</span>
                <span class="category-label">Custom</span>
                <span class="category-count" data-category="custom">0</span>
                <span class="category-chevron">▼</span>
            `;

            const grid = document.createElement('div');
            grid.className = 'trigger-category-grid';

            customTriggers.forEach(({ id, label, icon }) => {
                const btn = document.createElement('button');
                btn.className = 'trigger-btn';
                btn.dataset.triggerId = id;
                btn.dataset.category = 'custom';
                btn.innerHTML = `
                    <span class="trigger-icon">${icon}</span>
                    <span class="trigger-label">${label}</span>
                `;
                btn.addEventListener('click', () => {
                    Haptics.light(btn);
                    btn.classList.toggle('selected');
                    appState.toggleTrigger(id, label, icon);
                    this.updateCategoryCount('custom');
                });
                grid.appendChild(btn);
            });

            header.addEventListener('click', () => {
                section.classList.toggle('collapsed');
            });

            section.appendChild(header);
            section.appendChild(grid);
            container.appendChild(section);
        }
    }

    static updateCategoryCount(categoryId) {
        const countEl = document.querySelector(`.category-count[data-category="${categoryId}"]`);
        if (countEl) {
            const selected = document.querySelectorAll(`.trigger-btn[data-category="${categoryId}"].selected`).length;
            countEl.textContent = selected;
            countEl.style.display = selected > 0 ? 'flex' : 'none';
        }
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

    static async renderSupports(supports) {
        const container = document.getElementById('supportsContainer');
        const emailBtn = document.getElementById('sendNotification');
        const smsBtn = document.getElementById('sendViaSMS');
        const linkedBtn = document.getElementById('sendToLinked');

        // Get linked contacts if logged in
        let linkedContacts = [];
        if (AuthManager.currentUser) {
            try {
                linkedContacts = await LinkingManager.getLinkedContacts();
            } catch (e) {
                console.error('Error fetching linked contacts:', e);
            }
        }

        const hasSupports = supports.length > 0;
        const hasLinked = linkedContacts.length > 0;

        if (!hasSupports && !hasLinked) {
            container.innerHTML = '<p class="empty-state">No contacts yet. Add support contacts or link with other Flares users in settings.</p>';
            // Hide all primary buttons, show SMS as fallback
            if (linkedBtn) linkedBtn.style.display = 'none';
            emailBtn.style.display = 'none';
            smsBtn.style.display = 'inline-block';
            return;
        }

        // Show appropriate buttons based on contact types
        if (linkedBtn) linkedBtn.style.display = hasLinked ? 'inline-block' : 'none';
        emailBtn.style.display = hasSupports ? 'inline-block' : 'none';
        // SMS button is always visible (set in HTML)

        let html = '';

        // Show linked contacts first (they get instant notifications)
        if (hasLinked) {
            html += `
                <div class="contacts-section">
                    <h4 class="contacts-section-title">Linked Users (Instant)</h4>
                    ${linkedContacts.map(contact => `
                        <label class="support-item linked-contact">
                            <input type="checkbox" class="linked-checkbox" data-id="${contact.userId}" checked>
                            <span class="support-name">${contact.displayName || contact.email || 'User'}</span>
                            <span class="support-badge">Instant</span>
                        </label>
                    `).join('')}
                </div>
            `;
        }

        // Show email contacts
        if (hasSupports) {
            html += `
                <div class="contacts-section">
                    ${hasLinked ? '<h4 class="contacts-section-title">Email Contacts</h4>' : ''}
                    ${supports.map(support => `
                        <label class="support-item">
                            <input type="checkbox" class="support-checkbox" data-id="${support.id}" checked>
                            <span class="support-name">${support.name}</span>
                            <span class="support-email">${support.email}</span>
                        </label>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = html;
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

    static async renderHistory(type = 'sent') {
        const list = document.getElementById('historyList');

        let items = [];
        const moodLabels = {
            green: '🟢 Stable',
            orange: '🟡 Struggling',
            red: '🔴 Overwhelmed'
        };

        if (type === 'sent') {
            // Show sent flares (from local history)
            items = StorageManager.getHistory().reverse().slice(0, 20);

            if (items.length === 0) {
                list.innerHTML = '<p class="empty-state">No sent flares yet</p>';
                return;
            }

            list.innerHTML = items.map((entry, index) => {
                const date = new Date(entry.timestamp).toLocaleString();
                const historyIndex = StorageManager.getHistory().length - 1 - index;
                return `
                    <div class="history-item" data-index="${historyIndex}">
                        <div class="history-content">
                            <div class="history-mood">${moodLabels[entry.mood]}</div>
                            <div class="history-time">${date}</div>
                            <div class="history-emojis">${entry.emojis.map(e => e.emoji).join(' ')}</div>
                            ${entry.message ? `<div class="history-message">"${entry.message}"</div>` : ''}
                        </div>
                        <div class="history-actions">
                            <button class="history-action-btn resend-btn" data-index="${historyIndex}" title="Resend">📤</button>
                            <button class="history-action-btn edit-btn" data-index="${historyIndex}" title="Edit & Resend">✏️</button>
                            <button class="history-action-btn delete-btn" data-index="${historyIndex}" title="Delete">🗑️</button>
                        </div>
                    </div>
                `;
            }).join('');

            // Add event listeners for sent history actions
            list.querySelectorAll('.resend-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    HistoryActions.resend(index);
                });
            });

            list.querySelectorAll('.edit-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    HistoryActions.edit(index);
                });
            });

            list.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    HistoryActions.delete(index);
                });
            });

        } else if (type === 'received') {
            // Show received flares (from inbox)
            items = await InboxManager.fetchAllInboxItems();

            if (items.length === 0) {
                list.innerHTML = '<p class="empty-state">No received flares yet</p>';
                return;
            }

            list.innerHTML = items.slice(0, 20).map(flare => {
                const date = new Date(flare.createdAt || flare.timestamp).toLocaleString();
                const moodLabel = {
                    green: "I'm Okay",
                    orange: "I'm Struggling",
                    red: "I'm Overwhelmed"
                }[flare.mood] || flare.mood;

                return `
                    <div class="history-item received ${flare.read ? '' : 'unread'}">
                        <div class="history-content">
                            <div class="history-sender">${flare.senderName || 'Someone'}</div>
                            <div class="history-mood">${moodLabels[flare.mood]}</div>
                            <div class="history-time">${date}</div>
                            <div class="history-emojis">${flare.emojis ? flare.emojis.map(e => e.emoji).join(' ') : ''}</div>
                            ${flare.message ? `<div class="history-message">"${flare.message}"</div>` : ''}
                        </div>
                        <div class="history-actions">
                            ${!flare.read ? '<button class="history-action-btn mark-read-btn" data-id="' + flare.id + '" title="Mark Read">✓</button>' : ''}
                            <button class="history-action-btn delete-received-btn" data-id="${flare.id}" title="Delete">🗑️</button>
                        </div>
                    </div>
                `;
            }).join('');

            // Add event listeners for received history actions
            list.querySelectorAll('.mark-read-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const id = btn.dataset.id;
                    await InboxManager.markAsRead(id);
                    btn.remove();
                    InboxManager.updateBadge();
                });
            });

            list.querySelectorAll('.delete-received-btn').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const id = btn.dataset.id;
                    if (confirm('Delete this received flare?')) {
                        await InboxManager.deleteInboxItem(id);
                        await UIRenderer.renderHistory('received');
                        InboxManager.updateBadge();
                    }
                });
            });
        }
    }
}

// History Actions handler
class HistoryActions {
    static resend(index) {
        const history = StorageManager.getHistory();
        const entry = history[index];
        if (!entry) return;

        // Send notifications again
        NotificationManager.sendNotifications(entry);

        // Notify linked contacts if logged in
        if (AuthManager.currentUser) {
            LinkingManager.sendFlareToLinkedContacts(entry);
        }

        alert('Flare resent successfully!');
    }

    static edit(index) {
        const history = StorageManager.getHistory();
        const entry = history[index];
        if (!entry) return;

        // Load the entry into appState and go to emoji screen for editing
        appState.sessionData = {
            mood: entry.mood,
            emojis: [...entry.emojis],
            triggers: [...(entry.triggers || [])],
            message: entry.message || '',
            timestamp: entry.timestamp,
            editingIndex: index // Mark that we're editing
        };

        // Render and show emoji screen
        UIRenderer.renderEmojis(entry.mood);
        ScreenManager.showScreen('emojiScreen');

        // Pre-select the emojis
        setTimeout(() => {
            entry.emojis.forEach(({ emoji }) => {
                const btn = document.querySelector(`.emoji-btn[data-emoji="${emoji}"]`);
                if (btn) btn.classList.add('selected');
            });
        }, 100);

        // Close settings modal
        ScreenManager.hideModal('settingsModal');
    }

    static delete(index) {
        if (!confirm('Are you sure you want to delete this Flare from history?')) {
            return;
        }

        const history = StorageManager.getHistory();
        history.splice(index, 1);
        localStorage.setItem('flares_history', JSON.stringify(history));

        // Re-render history
        UIRenderer.renderHistory();

        // Sync to cloud if logged in
        if (AuthManager.currentUser) {
            CloudStorageManager.syncToCloud();
        }
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

    // Initialize swipe gestures for navigation
    SwipeGestures.init();

    // Mood Selection
    document.querySelectorAll('.flare-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            Haptics.medium(e.currentTarget);
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

        // Pre-select triggers if editing
        if (appState.sessionData.triggers && appState.sessionData.triggers.length > 0) {
            setTimeout(() => {
                appState.sessionData.triggers.forEach(({ id }) => {
                    const btn = document.querySelector(`.trigger-btn[data-trigger-id="${id}"]`);
                    if (btn) btn.classList.add('selected');
                });
            }, 100);
        }
    });

    document.getElementById('backToEmoji').addEventListener('click', () => {
        ScreenManager.showScreen('emojiScreen');
    });

    document.getElementById('continueToPreview').addEventListener('click', () => {
        UIRenderer.renderPreview(appState.sessionData);
        UIRenderer.renderSupports(StorageManager.getSupports());

        // Populate message field if editing
        const messageInput = document.getElementById('flareMessage');
        const charCount = document.getElementById('messageCharCount');
        if (messageInput && appState.sessionData.message) {
            messageInput.value = appState.sessionData.message;
            if (charCount) charCount.textContent = appState.sessionData.message.length;
        }

        ScreenManager.showScreen('previewScreen');
    });

    // Message input handling
    const flareMessageInput = document.getElementById('flareMessage');
    const messageCharCount = document.getElementById('messageCharCount');
    if (flareMessageInput) {
        flareMessageInput.addEventListener('input', () => {
            const length = flareMessageInput.value.length;
            if (messageCharCount) messageCharCount.textContent = length;
            appState.setMessage(flareMessageInput.value);
        });
    }

    document.getElementById('backToTriggers').addEventListener('click', () => {
        ScreenManager.showScreen('triggersScreen');
    });

    // Send Flare to linked contacts (instant push)
    const sendToLinkedBtn = document.getElementById('sendToLinked');
    if (sendToLinkedBtn) {
        sendToLinkedBtn.addEventListener('click', async () => {
            const selectedLinked = Array.from(document.querySelectorAll('.linked-checkbox:checked'))
                .map(cb => cb.dataset.id);

            if (selectedLinked.length === 0) {
                alert('Please select at least one linked contact');
                return;
            }

            await appState.save();

            // Send push notifications to selected linked contacts
            await LinkingManager.sendFlareToLinkedContacts(appState.sessionData);

            Haptics.success();
            ScreenManager.showModal('successModal');
        });
    }

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

        Haptics.success();
        ScreenManager.showModal('successModal');
    });

    // Send notification via SMS
    document.getElementById('sendViaSMS').addEventListener('click', async () => {
        await appState.save();

        // Send push notifications to linked contacts
        await LinkingManager.sendFlareToLinkedContacts(appState.sessionData);

        // Open SMS app
        NotificationManager.sendViaSMS(appState.sessionData);
        Haptics.success();
        ScreenManager.showModal('successModal');
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

    // Inbox
    document.getElementById('inboxBtn').addEventListener('click', async () => {
        if (!AuthManager.currentUser) {
            alert('Please sign in to view received flares');
            return;
        }
        await InboxManager.renderInboxScreen();
        ScreenManager.showScreen('inboxScreen');
    });

    document.getElementById('backFromInbox').addEventListener('click', () => {
        ScreenManager.showScreen('moodScreen');
    });

    document.getElementById('markAllReadBtn').addEventListener('click', async () => {
        await InboxManager.markAllAsRead();
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

    // History tabs
    let currentHistoryTab = 'sent';
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabType = tab.dataset.tab;
            currentHistoryTab = tabType;

            // Update active state
            document.querySelectorAll('.history-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Render appropriate history
            await UIRenderer.renderHistory(tabType);
        });
    });

    // Clear history
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all your history?')) {
            StorageManager.clearHistory();
            UIRenderer.renderHistory(currentHistoryTab);
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

    // Setup profile editing handlers
    setupProfileHandlers();
}

// Profile editing handlers
function setupProfileHandlers() {
    // Open edit profile modal
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            openEditProfileModal();
        });
    }

    // Close edit profile modal
    const closeEditProfile = document.getElementById('closeEditProfile');
    if (closeEditProfile) {
        closeEditProfile.addEventListener('click', () => {
            ScreenManager.hideModal('editProfileModal');
        });
    }

    const cancelEditProfile = document.getElementById('cancelEditProfile');
    if (cancelEditProfile) {
        cancelEditProfile.addEventListener('click', () => {
            ScreenManager.hideModal('editProfileModal');
        });
    }

    // Upload avatar button
    const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
    const avatarFileInput = document.getElementById('avatarFileInput');
    if (uploadAvatarBtn && avatarFileInput) {
        uploadAvatarBtn.addEventListener('click', () => {
            avatarFileInput.click();
        });

        avatarFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image must be less than 5MB');
                return;
            }

            try {
                const base64 = await ProfileManager.fileToBase64(file);
                const resized = await ProfileManager.resizeImage(base64, 200);

                // Update preview in modal
                const avatarDiv = document.getElementById('profileEditAvatar');
                const avatarImg = document.getElementById('profileEditAvatarImg');

                if (avatarImg) {
                    avatarImg.src = resized;
                    avatarImg.style.display = 'block';
                }
                if (avatarDiv) {
                    avatarDiv.style.display = 'none';
                }

                // Show remove button
                const removeBtn = document.getElementById('removeAvatarBtn');
                if (removeBtn) removeBtn.style.display = 'block';

                // Store temporarily until save
                avatarFileInput.dataset.pendingAvatar = resized;
            } catch (error) {
                console.error('Error processing image:', error);
                alert('Error processing image');
            }
        });
    }

    // Remove avatar button
    const removeAvatarBtn = document.getElementById('removeAvatarBtn');
    if (removeAvatarBtn) {
        removeAvatarBtn.addEventListener('click', () => {
            const avatarDiv = document.getElementById('profileEditAvatar');
            const avatarImg = document.getElementById('profileEditAvatarImg');
            const avatarFileInput = document.getElementById('avatarFileInput');

            if (avatarImg) avatarImg.style.display = 'none';
            if (avatarDiv) {
                avatarDiv.style.display = 'flex';
                const initial = (AuthManager.currentUser?.displayName || AuthManager.currentUser?.email || 'U').charAt(0).toUpperCase();
                avatarDiv.textContent = initial;
            }
            removeAvatarBtn.style.display = 'none';

            // Mark for removal
            if (avatarFileInput) {
                avatarFileInput.dataset.pendingAvatar = 'remove';
            }
        });
    }

    // Save profile button
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const displayName = document.getElementById('editDisplayName').value.trim();
            const errorEl = document.getElementById('profileEditError');
            const avatarFileInput = document.getElementById('avatarFileInput');

            if (!displayName) {
                errorEl.textContent = 'Display name is required';
                return;
            }

            saveProfileBtn.classList.add('loading');
            saveProfileBtn.disabled = true;
            errorEl.textContent = '';

            try {
                // Update display name
                await ProfileManager.updateDisplayName(displayName);

                // Handle avatar
                const pendingAvatar = avatarFileInput?.dataset.pendingAvatar;
                if (pendingAvatar === 'remove') {
                    await ProfileManager.removeAvatar();
                } else if (pendingAvatar) {
                    await ProfileManager.updateAvatar(pendingAvatar);
                }

                // Clear pending state
                if (avatarFileInput) {
                    delete avatarFileInput.dataset.pendingAvatar;
                    avatarFileInput.value = '';
                }

                // Update main UI
                updateProfileUI();

                ScreenManager.hideModal('editProfileModal');
            } catch (error) {
                console.error('Error saving profile:', error);
                errorEl.textContent = error.message || 'Error saving profile';
            } finally {
                saveProfileBtn.classList.remove('loading');
                saveProfileBtn.disabled = false;
            }
        });
    }
}

// Open edit profile modal and populate with current data
function openEditProfileModal() {
    if (!AuthManager.currentUser) return;

    const user = AuthManager.currentUser;
    const profile = ProfileManager.getProfile();

    // Set display name
    const displayNameInput = document.getElementById('editDisplayName');
    if (displayNameInput) {
        displayNameInput.value = user.displayName || '';
    }

    // Set email (read-only)
    const emailInput = document.getElementById('editEmail');
    if (emailInput) {
        emailInput.value = user.email || '';
    }

    // Set avatar
    const avatarDiv = document.getElementById('profileEditAvatar');
    const avatarImg = document.getElementById('profileEditAvatarImg');
    const removeBtn = document.getElementById('removeAvatarBtn');

    if (profile.avatarUrl) {
        if (avatarImg) {
            avatarImg.src = profile.avatarUrl;
            avatarImg.style.display = 'block';
        }
        if (avatarDiv) avatarDiv.style.display = 'none';
        if (removeBtn) removeBtn.style.display = 'block';
    } else {
        if (avatarImg) avatarImg.style.display = 'none';
        if (avatarDiv) {
            avatarDiv.style.display = 'flex';
            const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
            avatarDiv.textContent = initial;
        }
        if (removeBtn) removeBtn.style.display = 'none';
    }

    // Clear any pending avatar changes
    const avatarFileInput = document.getElementById('avatarFileInput');
    if (avatarFileInput) {
        delete avatarFileInput.dataset.pendingAvatar;
        avatarFileInput.value = '';
    }

    // Clear error
    const errorEl = document.getElementById('profileEditError');
    if (errorEl) errorEl.textContent = '';

    ScreenManager.showModal('editProfileModal');
}

// Update profile UI elements after save
function updateProfileUI() {
    const user = AuthManager.currentUser;
    const profile = ProfileManager.getProfile();

    // Update main avatar
    const userAvatar = document.getElementById('userAvatar');
    const userAvatarImg = document.getElementById('userAvatarImg');

    if (profile.avatarUrl) {
        if (userAvatarImg) {
            userAvatarImg.src = profile.avatarUrl;
            userAvatarImg.style.display = 'block';
        }
        if (userAvatar) userAvatar.style.display = 'none';
    } else {
        if (userAvatarImg) userAvatarImg.style.display = 'none';
        if (userAvatar) {
            userAvatar.style.display = 'flex';
            const initial = (user?.displayName || user?.email || 'U').charAt(0).toUpperCase();
            userAvatar.textContent = initial;
        }
    }

    // Update name
    const userName = document.getElementById('userName');
    if (userName && user) {
        userName.textContent = user.displayName || 'User';
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
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const inboxBtn = document.getElementById('inboxBtn');

    if (user) {
        // Logged in - show profile, inbox, and linked contacts
        if (userProfileSection) userProfileSection.style.display = 'block';
        if (guestModeNotice) guestModeNotice.style.display = 'none';
        if (linkedContactsSection) linkedContactsSection.style.display = 'block';
        if (inboxBtn) inboxBtn.style.display = 'flex';

        // Load profile from cloud and update UI
        ProfileManager.loadFromCloud().then(() => {
            const profile = ProfileManager.getProfile();

            // Update avatar display
            if (profile.avatarUrl) {
                if (userAvatarImg) {
                    userAvatarImg.src = profile.avatarUrl;
                    userAvatarImg.style.display = 'block';
                }
                if (userAvatar) userAvatar.style.display = 'none';
            } else {
                if (userAvatarImg) userAvatarImg.style.display = 'none';
                if (userAvatar) {
                    userAvatar.style.display = 'flex';
                    const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
                    userAvatar.textContent = initial;
                }
            }
        });

        // Update user info
        if (userName) userName.textContent = user.displayName || 'User';
        if (userEmail) userEmail.textContent = user.email;

        // Initialize push notifications and render linked contacts
        PushNotificationManager.init();
        renderLinkedContactsList();

        // Start listening for incoming flares and check for pending ones
        InboxManager.startListening();
        InboxManager.checkPendingFlares();
    } else if (AuthManager.isGuest) {
        // Guest mode - show notice, hide linked contacts and inbox
        if (userProfileSection) userProfileSection.style.display = 'none';
        if (guestModeNotice) guestModeNotice.style.display = 'block';
        if (linkedContactsSection) linkedContactsSection.style.display = 'none';
        if (inboxBtn) inboxBtn.style.display = 'none';

        // Stop inbox listener for guest mode
        InboxManager.stopListening();
    } else {
        // Not logged in, not guest - hide all
        if (userProfileSection) userProfileSection.style.display = 'none';
        if (linkedContactsSection) linkedContactsSection.style.display = 'none';
        if (guestModeNotice) guestModeNotice.style.display = 'none';
        if (inboxBtn) inboxBtn.style.display = 'none';

        // Stop inbox listener when logged out
        InboxManager.stopListening();
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
