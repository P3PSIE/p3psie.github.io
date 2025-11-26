# Flares PWA - Missing Features vs iOS App

This document tracks features present in the iOS app that are missing or incomplete in the web PWA version.

---

## High Priority - Core Functionality

| Status | Feature | Description |
|--------|---------|-------------|
| [x] | **Received Flares/Inbox Screen** | ✅ Complete! Inbox with navigation, badge, sender info, mark read/delete actions. |
| [x] | **Optional Custom Message** | ✅ Complete! Textarea on preview screen with 200 char limit and counter. |
| [x] | **Categorized Triggers** | ✅ Complete! Organized into Sensory, Physical, Emotional, Cognitive with collapsible sections and count badges. |
| [x] | **Sent vs Received History Tabs** | ✅ Complete! Tabs filter between sent flares and received inbox items. |
| [x] | **Edit Flare Feature** | ✅ Complete! Edit loads entry with pre-selected emojis, triggers, and message. Updates existing entry. |
| [x] | **Resend Flare Button** | ✅ Complete! Resend button sends flare again to all contacts. |

---

## Medium Priority - UX Improvements

| Status | Feature | Description |
|--------|---------|-------------|
| [x] | **Favorite/Star Emojis** | ✅ Complete! Star emojis to sort them to the top for quick access. |
| [x] | **Favorite/Star Triggers** | ✅ Complete! Star triggers to appear at top of their categories. |
| [x] | **Draft Persistence** | ✅ Complete! Auto-saves partial flare selections when navigating between screens. |
| [~] | **Tutorial/Info Overlays** | ⚠️ Partial! Info button added with about modal, but no full tutorial overlays. |
| [x] | **Selection Count Badges** | ✅ Complete! Shows "X selected" on emoji screen. |
| [x] | **Active/Inactive Contact Toggles** | ✅ Complete! Toggle switches for individual contacts. |
| [x] | **Contact Activation Count** | ✅ Complete! Shows "X of Y active" in send preview. |
| [x] | **Loading/Splash Screen** | ✅ Complete! Branded 2.5s loading animation with sequential flare appearance. |

---

## Lower Priority - Enhanced Features

| Status | Feature | Description |
|--------|---------|-------------|
| [x] | **Profile Photo Upload** | ✅ Complete! Full profile photo management with upload, resize, and Firestore sync. |
| [x] | **Phone Number Field** | ✅ Complete! Optional phone number field in profile for SMS fallback. |
| [x] | **Clear History by Type** | ✅ Complete! Separate buttons to clear sent, received, or all flares. |
| [x] | **Quick Profile Setup Flow** | ✅ Complete! Welcome modal for new users with onboarding steps and profile setup. |
| [ ] | **Contact Connection Type Indicators** | iOS shows icons for how contacts were connected (QR, NFC, Code, etc). |
| [ ] | **Deep Linking** | iOS supports `flare://received` URLs to open specific screens from notifications. |
| [ ] | **Emoji Selection Labels** | iOS shows emoji feeling labels in a popup when tapping. |

---

## iOS-Only Features (May Not Apply to Web)

These features rely on iOS-specific capabilities that may not have web equivalents:

| Feature | Description | Web Alternative |
|---------|-------------|-----------------|
| **QR Code Linking** | Generate/scan QR codes to link devices | Could use web QR libraries |
| **NFC Linking** | Tap-to-link with NFC | Web NFC API (limited browser support) |
| **Nearby Discovery** | Find users on local network via Multipeer | Not feasible on web |
| **iMessage/SMS Fallback** | Send via SMS when no app connection | Web Share API / SMS links |
| **Haptic Feedback Patterns** | iOS haptic engine with light/medium/heavy patterns | Basic vibration API exists |
| **Background Reconnection** | Maintains connections in background | Service workers (limited) |

---

## Already Implemented in Web

These features from iOS are already working in the web version:

| Feature | Status |
|---------|--------|
| Push Notifications (FCM) | Working |
| Link Code System | Working |
| Firebase Auth | Working |
| Firestore Data Sync | Working |
| Custom Emojis | Working |
| Custom Triggers | Working |
| Dark Theme | Working |
| Mood Selection Flow | Working |
| Support Contacts (Email) | Working |

---

## Implementation Notes

### Received Flares Inbox
- Need new screen in HTML
- Listen to Firestore `users/{uid}/inbox` collection
- Show sender name, mood, emojis, triggers, timestamp
- Mark as read functionality

### Categorized Triggers
- Group triggers by category in config.js
- Render collapsible sections with headers
- Add selection count badges
- Filter by current mood color

### Custom Message Field
- Add textarea to preview screen
- Include message in flare data
- Display in received flares

---

*Last updated: November 2024*
