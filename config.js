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
            label: "I'm Okay",
            description: "Feeling calm, regulated, and able to engage",
            color: '#2ECC71',
            colorLight: '#58D68D',
            colorDark: '#27AE60',
            icon: 'assets/icons/mood-green.png'
        },
        orange: {
            label: "I'm Struggling",
            description: "Feeling stressed or finding things difficult",
            color: '#F39C12',
            colorLight: '#F5B041',
            colorDark: '#E67E22',
            icon: 'assets/icons/mood-orange.png'
        },
        red: {
            label: "I'm Overwhelmed",
            description: "Feeling unable to cope or need support",
            color: '#E74C3C',
            colorLight: '#EC7063',
            colorDark: '#C0392B',
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
    // Trigger Categories
    // ========================================================================
    triggerCategories: {
        sensory: { label: 'Sensory', icon: '👂' },
        physical: { label: 'Physical', icon: '🏃' },
        emotional: { label: 'Emotional', icon: '❤️' },
        cognitive: { label: 'Cognitive', icon: '🧠' }
    },

    // ========================================================================
    // Trigger Options (with categories)
    // All triggers available - will be shown based on mood context
    // ========================================================================
    triggers: {
        // Sensory triggers
        sensory: [
            { id: 'loud_noises', label: 'Overwhelming sounds', icon: '🔊' },
            { id: 'bright_lights', label: 'Bright lights', icon: '💡' },
            { id: 'crowds', label: 'Crowded spaces', icon: '👥' },
            { id: 'sensory_overload', label: 'Sensory overload', icon: '🎆' },
            { id: 'textures', label: 'Uncomfortable textures', icon: '🧶' },
            { id: 'smells', label: 'Strong smells', icon: '👃' }
        ],
        // Physical triggers
        physical: [
            { id: 'exercise', label: 'Exercise or movement', icon: '🏃' },
            { id: 'lack_sleep', label: 'Lack of sleep', icon: '😴' },
            { id: 'rest', label: 'Good rest', icon: '🛏️' },
            { id: 'physical_pain', label: 'Physical pain', icon: '🤕' },
            { id: 'hunger', label: 'Hunger', icon: '🍽️' },
            { id: 'health_concern', label: 'Health concerns', icon: '🏥' },
            { id: 'medication', label: 'Medication effects', icon: '💊' }
        ],
        // Emotional triggers
        emotional: [
            { id: 'social_time', label: 'Quality time with others', icon: '👥' },
            { id: 'social_conflict', label: 'Social conflict', icon: '💬' },
            { id: 'isolation', label: 'Feeling isolated', icon: '🚪' },
            { id: 'confrontation', label: 'Confrontation', icon: '⚠️' },
            { id: 'loss', label: 'Loss or grief', icon: '💔' },
            { id: 'rejection', label: 'Rejection', icon: '🚫' },
            { id: 'good_news', label: 'Good news', icon: '📰' },
            { id: 'loved', label: 'Feeling loved', icon: '🥰' }
        ],
        // Cognitive triggers
        cognitive: [
            { id: 'work_stress', label: 'Work pressure', icon: '💼' },
            { id: 'deadlines', label: 'Deadlines', icon: '⏰' },
            { id: 'financial', label: 'Financial concerns', icon: '💰' },
            { id: 'change', label: 'Unexpected changes', icon: '🔄' },
            { id: 'achievement', label: 'Accomplished something', icon: '🎯' },
            { id: 'intrusive_thoughts', label: 'Intrusive thoughts', icon: '🌀' },
            { id: 'panic', label: 'Panic attack', icon: '😱' },
            { id: 'trauma_trigger', label: 'Trauma reminder', icon: '🚨' },
            { id: 'decision_fatigue', label: 'Decision fatigue', icon: '🤯' }
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
