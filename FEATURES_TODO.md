# Flares PWA - Missing Features vs iOS App

This document tracks features present in the iOS app that are missing or incomplete in the web PWA version.

---

## High Priority - Core Functionality

| Status | Feature | Description |
|--------|---------|-------------|
| [ ] | **Received Flares/Inbox Screen** | iOS has a dedicated "Received Insights" screen to view flares from linked contacts. Web has no UI to view received flares. |
| [ ] | **Optional Custom Message** | iOS allows adding a personal message (up to 200 chars) when sending a flare. |
| [ ] | **Categorized Triggers** | iOS organizes triggers into collapsible sections (Sensory, Emotional, Cognitive, Physical) with selection count badges. |
| [ ] | **Sent vs Received History Tabs** | iOS has tabs to filter history by sent/received. Web shows a flat list. |
| [ ] | **Edit Flare Feature** | iOS allows editing previously sent flares (change emojis, reasons, messages) and resending. |
| [ ] | **Resend Flare Button** | iOS provides quick "Resend" action on history cards. |

---

## Medium Priority - UX Improvements

| Status | Feature | Description |
|--------|---------|-------------|
| [ ] | **Favorite/Star Emojis** | Star emojis to sort them to the top for quick access. |
| [ ] | **Favorite/Star Triggers** | Star triggers to appear at top of their categories. |
| [ ] | **Draft Persistence** | iOS saves partial flare selections when navigating between screens. |
| [ ] | **Tutorial/Info Overlays** | iOS has contextual help (i) buttons and tutorial overlays on screens. |
| [ ] | **Selection Count Badges** | Shows count of selected items on category headers. |
| [ ] | **Active/Inactive Contact Toggles** | Toggle individual contacts on/off to control who receives flares. |
| [ ] | **Contact Activation Count** | Shows "3 of 5 active" in send preview. |
| [ ] | **Loading/Splash Screen** | iOS has a branded 2-second loading animation on launch. |

---

## Lower Priority - Enhanced Features

| Status | Feature | Description |
|--------|---------|-------------|
| [ ] | **Profile Photo Upload** | iOS has full profile photo management with image picker. Web has basic support. |
| [ ] | **Phone Number Field** | iOS collects optional phone number for SMS fallback. |
| [ ] | **Contact Connection Type Indicators** | iOS shows icons for how contacts were connected (QR, NFC, Code, etc). |
| [ ] | **Deep Linking** | iOS supports `flare://received` URLs to open specific screens from notifications. |
| [ ] | **Clear History by Type** | iOS allows clearing sent or received flares separately. |
| [ ] | **Emoji Selection Labels** | iOS shows emoji feeling labels in a popup when tapping. |
| [ ] | **Quick Profile Setup Flow** | iOS shows optional profile setup on first launch. |

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
