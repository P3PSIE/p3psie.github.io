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
    amber: [
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
    amber: [
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

    // Future: This method can be extended to sync with Firebase
    async save() {
        const history = StorageManager.getHistory();
        history.push({...this.sessionData});
        StorageManager.saveHistory(history);
        // TODO: Add Firebase real-time database sync here
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
        return supports;
    }

    static removeSupport(id) {
        const supports = this.getSupports().filter(s => s.id !== id);
        this.saveSupports(supports);
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
            amber: 'Struggling 🟡',
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
        const subject = `Flares Check-in: ${sessionData.mood === 'red' ? 'Need Support 🔴' : sessionData.mood === 'amber' ? 'Struggling 🟡' : 'Update 🟢'}`;

        const mailtoLink = `mailto:${emails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
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

        EMOJI_DATA[mood].forEach(({ emoji, label }) => {
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

        TRIGGERS_DATA[mood].forEach(({ id, label, icon }) => {
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
            amber: { label: 'Struggling', color: '#f59e0b', emoji: '🟡' },
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

        if (supports.length === 0) {
            container.innerHTML = '<p class="empty-state">No support contacts yet. Add some in settings.</p>';
            return;
        }

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
            amber: '🟡 Struggling',
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

function initApp() {
    // Check for shared link
    const sharedData = NotificationManager.parseSharedLink();
    if (sharedData) {
        showSharedDataView(sharedData);
        return;
    }

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

    // Send notification
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
        NotificationManager.sendViaEmail(appState.sessionData, selectedSupports);

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

    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
