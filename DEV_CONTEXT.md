# Flares - Development Context

This document contains everything you need to know to continue development on the Flares app.

**Last Updated**: 2025-11-30
**Current Version**: v1.0
**Status**: Production (Live at p3psie.github.io)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Firebase Setup](#firebase-setup)
4. [Key Components](#key-components)
5. [Development Setup](#development-setup)
6. [Known Issues & TODOs](#known-issues--todos)
7. [Recent Changes](#recent-changes)
8. [Testing Checklist](#testing-checklist)

---

## Project Overview

**Flares** is a mood tracking and support network app designed for individuals with mental health challenges. It uses a simple traffic light system (green/orange/red) to communicate emotional states.

### Core Concept

- **Quick Communication**: 3-tap process to send a "Flare" to support network
- **Customizable**: Users can add their own emojis, triggers, and labels
- **Flexible Sharing**: Works via SMS (no account) or push notifications (with account)
- **Privacy First**: Can be used entirely locally without creating an account

### Target Users

- Individuals with anxiety, depression, PTSD, autism, ADHD
- People who struggle to verbalize their emotional state
- Anyone wanting a quick way to check in with their support network

---

## Architecture

### Tech Stack

```
Frontend:
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (with CSS variables for theming)
- No frameworks/libraries

Backend:
- Firebase Authentication
- Firebase Firestore (NoSQL database)
- Firebase Cloud Messaging (push notifications)
- Firebase Cloud Functions (notification triggers)
- Firebase App Check (bot protection)

Hosting:
- GitHub Pages (static site)
- Cloudflare CDN (via GitHub)
```

### Data Flow

```
User Action → flares.js → Firebase SDK → Firestore/Auth/FCM
                                    ↓
                              Cloud Function (sendFlareNotification)
                                    ↓
                              Push Notification → Recipient
```

### File Structure

```
Root (/)
├── index.html              # Main app (single-page application)
├── flares.js              # Core application logic (~4000 lines)
├── flares.css             # App-specific styles (~1800 lines)
├── theme.css              # Dark theme variables
├── styles.css             # Additional global styles
├── firebase-messaging-sw.js  # Service worker for FCM
├── manifest.json          # PWA manifest
├── config.js              # App configuration (empty, legacy)
│
├── assets/
│   └── icons/             # App icons and mood images
│       ├── logo.png
│       ├── mood-green.png
│       ├── mood-orange.png
│       └── mood-red.png
│
├── functions/             # Firebase Cloud Functions
│   ├── index.js          # Notification functions
│   ├── package.json      # Node dependencies
│   └── .gitignore
│
├── firestore.rules        # Database security rules
├── firebase.json          # Firebase config
├── .firebaserc           # Firebase project settings
├── .gitignore
├── README.md
└── DEV_CONTEXT.md        # This file
```

---

## Firebase Setup

### Project Details

```
Project ID: flare-a0418
Project Name: Flare
Region: us-central1
Billing Plan: Blaze (Pay-as-you-go)
```

### Firebase Services Used

**1. Authentication**
- Email/password authentication
- Anonymous auth (for guest mode)
- User profile storage in Firestore

**2. Firestore Database**

Collections:
```
users/
  {userId}/
    - displayName
    - email
    - photoURL
    - fcmToken
    - tokenUpdatedAt
    - createdAt

    inbox/
      {flareId}/
        - senderId
        - senderName
        - mood
        - title
        - body
        - emojis[]
        - triggers[]
        - message
        - timestamp
        - createdAt
        - read

linkCodes/
  {code}/
    - userId
    - userName
    - createdAt
    - expiresAt

linkedContacts/
  {linkId}/
    - user1Id
    - user1Name
    - user2Id
    - user2Name
    - createdAt
```

**3. Cloud Messaging (FCM)**
- Web push notifications
- VAPID key configured in flares.js:1002
- Service worker handles background messages

**4. Cloud Functions**

Functions deployed:
```javascript
// Triggers when Flare is added to user's inbox
sendFlareNotification(users/{userId}/inbox/{flareId})

// Runs daily to clean up old read Flares (30+ days)
cleanupOldFlares() - Scheduled for "every 24 hours"
```

**5. App Check**
- reCAPTCHA v3 integration
- Site key: `6Ld0PRssAAAAAF7Uet2erNpY3VsQnQLlsGx1uBcx`
- Enabled only on production (not localhost)

### API Key Security

**Production API Key** (in index.html):
```
AIzaSyBAP0mJC-7jDRZzpv4dWT11A7EhSDFbfSo
```

**Restrictions Applied:**
- HTTP referrer: `p3psie.github.io/*`
- Blocks all localhost and cloned repo usage
- Prevents abuse and cost overruns

**Note**: Firebase API keys are meant to be public. Security comes from:
1. Firestore Security Rules
2. API restrictions (domain whitelist)
3. App Check (reCAPTCHA verification)

---

## Key Components

### flares.js - Main Application Logic

**Major Classes/Managers:**

```javascript
// Authentication and user management
AuthManager
  - currentUser
  - signUp()
  - signIn()
  - signOut()
  - onAuthStateChanged()

// Main app controller
FlaresApp
  - init()
  - showScreen()
  - selectMood()
  - sendFlare()
  - loadInbox()

// Push notifications
PushNotificationManager
  - init()
  - requestPermission()
  - getAndSaveToken()
  - setupForegroundHandler()

// Contact linking
ContactManager
  - generateLinkCode()
  - linkWithContact()
  - loadLinkedContacts()

// Custom content
CustomContentManager
  - addCustomEmoji()
  - addCustomTrigger()
  - getCustomEmojis()
  - getCustomTriggers()

// Data persistence
DataManager
  - saveToFirestore()
  - saveToLocalStorage()
  - loadHistory()
  - clearHistory()
```

**Data Structures:**

```javascript
// Flare object
{
  mood: 'green' | 'orange' | 'red',
  emojis: [{ emoji: '😊', label: 'Happy' }],
  triggers: [{ id: 'work_stress', label: 'Work stress', icon: '💼' }],
  message: 'Optional user message',
  timestamp: ISO8601 string,
  senderId: Firebase user ID,
  senderName: Display name
}

// Custom emoji
{
  emoji: '🎉',
  label: 'Excited',
  colors: ['green', 'orange'],
  favorite: false
}

// Custom trigger
{
  id: 'unique_id',
  label: 'Bright lights',
  icon: '💡',
  category: 'sensory',
  colors: ['orange', 'red'],
  favorite: false
}
```

### Firebase Security Rules

Located in `firestore.rules`:

```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;

  // Inbox: user can write, sender must be authenticated
  match /inbox/{flareId} {
    allow read: if request.auth.uid == userId;
    allow write: if request.auth != null;
  }
}

// Link codes: anyone authenticated can read/write (short-lived)
match /linkCodes/{code} {
  allow read, create: if request.auth != null;
}

// Linked contacts: participants can read
match /linkedContacts/{linkId} {
  allow read: if request.auth != null &&
    (resource.data.user1Id == request.auth.uid ||
     resource.data.user2Id == request.auth.uid);
  allow create: if request.auth != null;
}
```

---

## Development Setup

### Prerequisites

```bash
# Required
- Node.js 20+
- Firebase CLI

# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login
```

### Production vs Development

**Current Setup**: Production API key is restricted to `p3psie.github.io/*`

**For Local Development**, you have 3 options:

#### Option A: Separate Dev Project (Recommended)

1. Create a new Firebase project (e.g., `flare-dev`)
2. Enable the same services (Auth, Firestore, FCM)
3. Get the config from Project Settings
4. Create `.env.local` (gitignored):
   ```javascript
   // Use in index.html for dev
   const firebaseConfig = {
     apiKey: "YOUR_DEV_KEY",
     authDomain: "flare-dev.firebaseapp.com",
     // ... rest of config
   };
   ```

#### Option B: Temporarily Remove Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=flare-a0418)
2. Edit API key restrictions
3. Remove or add `localhost:*`
4. Develop locally
5. **Remember to re-restrict before pushing!**

#### Option C: Firebase Emulators (Best for Heavy Dev)

```bash
# Initialize emulators
firebase init emulators

# Start emulators
firebase emulators:start

# Update flares.js to connect to emulators
// Add after Firebase init:
if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

### Running Locally

```bash
# Simple HTTP server
python3 -m http.server 8000

# Or Node.js
npx http-server -p 8000

# Visit
open http://localhost:8000
```

### Deploying Functions

```bash
# Deploy all functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:sendFlareNotification

# View logs
firebase functions:log -n 50
```

### Deploying to GitHub Pages

```bash
# Automatic on push to main
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions handles deployment
# Live in ~1 minute at p3psie.github.io
```

---

## Known Issues & TODOs

### Active TODOs

#### High Priority
- [ ] **Add data export feature** - Allow users to download all their Flares data as JSON
- [ ] **Improve offline mode** - Better handling when network is unavailable
- [ ] **Add "check on contact" feature** - Proactively ask how a contact is doing
- [ ] **Email notifications fallback** - For users who can't/won't enable push

#### Medium Priority
- [ ] **Statistics/insights** - Track mood trends over time
- [ ] **Recurring Flares** - Send automatic check-ins (e.g., daily reminder)
- [ ] **Custom mood colors** - Let users define their own traffic light meanings
- [ ] **Multi-language support** - i18n for non-English speakers
- [ ] **Dark/light theme toggle** - Currently dark-only

#### Low Priority
- [ ] **Group Flares** - Send to multiple people at once
- [ ] **Voice input** - Record audio message instead of typing
- [ ] **Photo attachments** - Attach images to Flares
- [ ] **Integration with calendar** - Log Flares to Google Calendar
- [ ] **Wearable support** - Quick Flare from Apple Watch/Android Watch

### Known Bugs

#### Minor
- ⚠️ **Long emoji lists** - Scrolling can be janky on older devices
- ⚠️ **Service worker cache** - Sometimes needs manual refresh after updates
  - Fix: Add version to service worker and force reload on mismatch
- ⚠️ **Link code generation** - Very rarely generates duplicate codes
  - Impact: Low (expires in 10 min, just regenerate)

#### Visual
- ⚠️ **iOS notch** - Some UI elements clip on iPhone X+ notches
  - Fix: Add `safe-area-inset` padding
- ⚠️ **Small screens** - Modal content can overflow on very small screens (<350px)

### Performance Notes

- **Initial load**: ~150KB (gzipped), loads in <2s on 3G
- **Firestore reads**: Avg 5-10 per session
- **Firestore writes**: Avg 2-3 per Flare sent
- **FCM cost**: Free tier covers ~1M messages/month
- **Function invocations**: ~2-5 per Flare (inbox writes trigger function)

---

## Recent Changes

### 2025-11-30 - Push Notifications Fixed

**Changes:**
- Fixed Cloud Function notification payload format
- Removed `icon` and `badge` from base notification object (not supported)
- Icons now only in `webpush.notification` section
- Added API key restrictions to prevent abuse
- Verified notifications working on all devices

**Commits:**
- `495ac31` - Fix push notification payload format
- `2a60db4` - Replace Share Link with SMS, add visual haptic feedback

### 2025-11-28 - SMS Sharing Added

**Changes:**
- Replaced "Share Link" with "Send via SMS"
- Generates pre-filled SMS with Flare details
- Works without account
- Added visual haptic feedback on button press

**Commits:**
- `450a839` - Replace Share Link with SMS, add visual haptic feedback

### Previous Major Features

- ✅ Custom emojis and triggers
- ✅ Label customization (long-press to edit)
- ✅ Contact linking system
- ✅ Push notifications with Cloud Functions
- ✅ Inbox with read/unread tracking
- ✅ Guest mode (no account required)
- ✅ PWA with offline support
- ✅ Firebase App Check integration

---

## Testing Checklist

### Before Pushing to Production

**Authentication:**
- [ ] Sign up with new email works
- [ ] Sign in with existing account works
- [ ] Sign out works
- [ ] Guest mode (skip auth) works
- [ ] Data persists after sign out/in

**Core Flare Flow:**
- [ ] Select mood (all 3 colors)
- [ ] Add emojis (select multiple)
- [ ] Add triggers (select multiple)
- [ ] Add message
- [ ] Send via SMS works
- [ ] Send to linked contacts works
- [ ] Flare appears in history

**Notifications:**
- [ ] Enable notifications button appears
- [ ] Permission request works
- [ ] FCM token saved to Firestore
- [ ] Receiving Flare triggers notification
- [ ] Notification click opens inbox
- [ ] Notification shows correct content

**Contacts:**
- [ ] Generate link code works
- [ ] Code displays with QR code
- [ ] Enter link code works
- [ ] Contact appears in list
- [ ] Can send Flare to linked contact
- [ ] Contact receives push notification

**Customization:**
- [ ] Add custom emoji works
- [ ] Custom emoji appears in list
- [ ] Delete custom emoji works
- [ ] Add custom trigger works
- [ ] Star/favorite items works
- [ ] Long-press to customize labels works

**Inbox:**
- [ ] Received Flares show in inbox
- [ ] Unread count updates
- [ ] Mark as read works
- [ ] Mark all read works
- [ ] Delete Flare works

**Settings:**
- [ ] Profile photo upload works
- [ ] Edit display name works
- [ ] Logout works
- [ ] Clear history works (with confirmation)
- [ ] Notification status displays correctly

**PWA:**
- [ ] App installs on iOS (Safari)
- [ ] App installs on Android (Chrome)
- [ ] Offline mode works (mood tracking)
- [ ] Service worker caches assets
- [ ] Updates install correctly

**Cross-Browser:**
- [ ] Works in Chrome (desktop)
- [ ] Works in Safari (desktop)
- [ ] Works in Firefox (desktop)
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

---

## Firebase Configuration Reference

### Current Production Config

```javascript
// In index.html lines 27-34
const firebaseConfig = {
  apiKey: "AIzaSyBAP0mJC-7jDRZzpv4dWT11A7EhSDFbfSo",
  authDomain: "flare-a0418.firebaseapp.com",
  projectId: "flare-a0418",
  storageBucket: "flare-a0418.firebasestorage.app",
  messagingSenderId: "311211387060",
  appId: "1:311211387060:web:45f0ca4374d5d449054fe1"
};

// reCAPTCHA site key (line 44)
const recaptchaSiteKey = '6Ld0PRssAAAAAF7Uet2erNpY3VusQnQLlsGx1uBcx';

// VAPID key in flares.js:1002
const vapidKey = 'BOU8F9JyPuKPWQCTbKdmK4tGUria3sceL8YyIdaKP28c53gyQ12g_ODlf7diqfBMxwhpcH6o_zDyoEeAUkqkwrY';
```

### Firestore Indexes Required

```
Collection: users/{userId}/inbox
Fields: read (Ascending), createdAt (Descending)
Purpose: Query unread Flares sorted by date

Collection: linkCodes
Fields: expiresAt (Ascending)
Purpose: Clean up expired codes
```

Create indexes at: https://console.firebase.google.com/project/flare-a0418/firestore/indexes

---

## Useful Commands

```bash
# Firebase
firebase login
firebase projects:list
firebase deploy --only functions
firebase deploy --only firestore:rules
firebase functions:log -n 50
firebase functions:delete functionName

# Git
git status
git add .
git commit -m "message"
git push origin main
git log --oneline -10

# Local server
python3 -m http.server 8000
npx http-server -p 8000

# Node/npm
cd functions
npm install
npm update
```

---

## Support & Resources

**Firebase Console**: https://console.firebase.google.com/project/flare-a0418
**Google Cloud Console**: https://console.cloud.google.com/?project=flare-a0418
**GitHub Repo**: https://github.com/P3PSIE/p3psie.github.io
**Live App**: https://p3psie.github.io

**Documentation:**
- Firebase Docs: https://firebase.google.com/docs
- PWA Guide: https://web.dev/progressive-web-apps/
- MDN Web Docs: https://developer.mozilla.org

---

## Notes for Future Development

### Code Style
- Use ES6+ features (const/let, arrow functions, async/await)
- No semicolons (existing codebase uses ASI)
- 4-space indentation
- Descriptive variable names
- Comments for complex logic only

### Firebase Best Practices
- Always check `request.auth` in security rules
- Use `merge: true` for partial updates
- Batch writes when possible
- Add indexes for complex queries
- Monitor quota usage in console

### Git Workflow
- Commit messages: descriptive, present tense
- Always add Claude attribution footer
- Test locally before pushing
- Functions must be deployed separately from static files

### User Experience
- Keep it simple (3-tap flow to send Flare)
- Accessibility matters (good contrast, touch targets)
- Mobile-first design
- Fast load times (<2s)
- Works offline where possible

---

**End of DEV_CONTEXT.md**

For questions or issues, check GitHub issues or Firebase logs.
