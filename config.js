// ============================================================================
// Flares Configuration File
// ============================================================================
// Edit this file to customize the app's content, colors, and behavior.
// Replace icons in the assets/icons/ folder to change visual elements.

const FLARES_CONFIG = {

    // ========================================================================
    // App Info
    // ========================================================================
    app: {
        name: 'Flares',
        tagline: 'How are you feeling?',
        version: '1.0.0'
    },

    // ========================================================================
    // Mood Configuration
    // ========================================================================
    moods: {
        green: {
            label: 'Stable',
            description: "I'm doing okay",
            color: '#22c55e',
            colorLight: '#dcfce7',
            colorDark: '#16a34a',
            icon: 'assets/icons/mood-green.png'
        },
        orange: {
            label: 'Struggling',
            description: "I'm having a hard time",
            color: '#f97316',
            colorLight: '#ffedd5',
            colorDark: '#ea580c',
            icon: 'assets/icons/mood-orange.png'
        },
        red: {
            label: 'Overwhelmed',
            description: "I need support",
            color: '#ef4444',
            colorLight: '#fee2e2',
            colorDark: '#dc2626',
            icon: 'assets/icons/mood-red.png'
        }
    },

    // ========================================================================
    // Emoji Options (per mood)
    // ========================================================================
    emojis: {
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
    },

    // ========================================================================
    // Trigger Options (per mood)
    // ========================================================================
    triggers: {
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
    },

    // ========================================================================
    // Common Emojis for Picker
    // ========================================================================
    commonEmojis: [
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
    ],

    // ========================================================================
    // UI Text (for easy translation/customization)
    // ========================================================================
    text: {
        moodScreenTitle: 'How are you feeling?',
        emojiScreenTitle: 'What describes your mood?',
        triggerScreenTitle: 'Any triggers?',
        summaryScreenTitle: 'Your Flare',
        skipButton: 'Skip',
        nextButton: 'Next',
        sendButton: 'Send Flare',
        doneButton: 'Done',
        historyTitle: 'History',
        settingsTitle: 'Settings'
    },

    // ========================================================================
    // Assets Paths
    // ========================================================================
    assets: {
        logo: 'assets/icons/logo.png',
        appIcon: 'assets/icons/app-icon.png',
        // Add more asset paths as needed
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FLARES_CONFIG;
}
