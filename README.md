# Flares - Mood Tracking & Support Network App

A simple, accessible mood tracking app that helps you communicate how you're feeling to your support network. Built as a Progressive Web App for iOS, Android, and desktop.

🌐 **Live App**: [p3psie.github.io](https://p3psie.github.io)

## What is Flares?

Flares helps you quickly communicate your emotional state to trusted friends, family, or therapists using a simple traffic light system:

- 🟢 **I'm Okay** - Feeling calm, regulated, and able to engage
- 🟠 **I'm Struggling** - Feeling stressed or finding things difficult
- 🔴 **I'm Overwhelmed** - Feeling unable to cope or need support

## Features

### Core Features
- **Traffic Light Mood System** - Quick, visual way to share how you're feeling
- **Emoji & Trigger Selection** - Add context with emotions and contributing factors
- **Personal Messages** - Include optional notes with your Flares
- **Support Network** - Connect with trusted contacts for instant support
- **Inbox** - Receive and respond to Flares from your network

### Communication Options
- **SMS Sharing** - Send Flares via text message (no account needed)
- **Push Notifications** - Instant notifications when contacts send Flares (requires account)
- **Link Contacts** - Generate codes to connect with others using Flares

### Customization
- **Custom Emojis** - Add your own emotional descriptors
- **Custom Triggers** - Track personal contributing factors
- **Label Customization** - Personalize labels to match your experience
- **Favorites** - Star frequently used emojis and triggers

### Privacy & Data
- **Optional Cloud Sync** - Use locally without an account, or sync across devices
- **Your Data, Your Control** - All data stored in your Firebase project
- **Secure** - Protected with Firebase Security Rules and App Check
- **Local Mode** - Full functionality without creating an account

### Mobile & PWA
- **Installable** - Add to home screen on iOS/Android
- **Offline Support** - Track moods without internet
- **Responsive Design** - Works on all devices
- **Dark Theme** - Easy on the eyes

## Quick Start

### Option 1: Use Without Account (Local Mode)

1. Visit [p3psie.github.io](https://p3psie.github.io)
2. Click "Continue without account"
3. Start tracking your mood!

**Features available:**
- ✅ Mood tracking with emojis and triggers
- ✅ SMS sharing to contacts
- ✅ Local data storage
- ✅ Custom emojis and triggers
- ❌ Cloud sync across devices
- ❌ Push notifications
- ❌ Link with other Flares users

### Option 2: Create Account (Full Features)

1. Visit [p3psie.github.io](https://p3psie.github.io)
2. Click "Sign Up"
3. Create account with email/password
4. Enable notifications when prompted

**Features available:**
- ✅ Everything from local mode
- ✅ Cloud sync across all your devices
- ✅ Link with contacts for instant notifications
- ✅ Push notifications when contacts send Flares
- ✅ Inbox to see received Flares

## How to Use

### Sending a Flare

1. **Select Your Mood** - Tap green, orange, or red
2. **Add Emojis** (optional) - Choose emotions that describe how you feel
3. **Add Triggers** (optional) - Select what might have contributed
4. **Write a Message** (optional) - Add personal context
5. **Send** - Share via SMS or to linked contacts

### Linking with Contacts

1. Go to **Settings** → **Contacts**
2. Click **"Generate My Code"**
3. Share the 6-digit code with your contact
4. They enter it in their Flares app
5. You're now connected for instant notifications!

### Customizing Your Experience

**Add Custom Emojis:**
1. Settings → "Manage Custom Emojis"
2. Select an emoji, add a label, choose mood colors
3. Save to add it to your emoji list

**Add Custom Triggers:**
1. Settings → "Manage Custom Triggers"
2. Add a label, choose category and mood colors
3. Save to add it to your triggers list

**Customize Labels:**
1. Long-press any emoji or trigger
2. Enter your custom label
3. It will appear with your personalized text

## Installation

### iOS (iPhone/iPad)

1. Open in **Safari**
2. Tap the **Share** button (□↑)
3. Scroll and tap **"Add to Home Screen"**
4. Tap **"Add"**

### Android

1. Open in **Chrome**
2. Tap menu **(⋮)**
3. Tap **"Add to Home Screen"** or **"Install app"**
4. Tap **"Install"**

### Desktop (Chrome/Edge)

1. Look for install icon in address bar
2. Click **"Install Flares"**
3. App opens in its own window

## For Developers

### Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Firebase (Auth, Firestore, Cloud Functions, Cloud Messaging)
- **Hosting**: GitHub Pages
- **PWA**: Service Worker for offline support

### Project Structure

```
├── index.html              # Main app UI
├── flares.js              # Core app logic
├── flares.css             # Styling
├── theme.css              # Dark theme variables
├── styles.css             # Additional styles
├── firebase-messaging-sw.js  # Service worker for push notifications
├── manifest.json          # PWA manifest
├── functions/             # Cloud Functions
│   ├── index.js          # Notification functions
│   └── package.json      # Dependencies
├── firestore.rules        # Database security rules
├── .firebaserc            # Firebase project config
└── firebase.json          # Firebase hosting config
```

### Local Development

**Prerequisites:**
- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)

**Setup:**

1. Clone the repository:
   ```bash
   git clone https://github.com/P3PSIE/p3psie.github.io.git
   cd p3psie.github.io
   ```

2. Install dependencies:
   ```bash
   cd functions
   npm install
   cd ..
   ```

3. **Important**: Local development won't work with the production Firebase config due to API restrictions. See `DEV_CONTEXT.md` for development setup instructions.

4. Run locally (production mode):
   ```bash
   python3 -m http.server 8000
   ```
   Visit: http://localhost:8000

**Note**: The production Firebase API key is restricted to `p3psie.github.io` only for security. For local development, you'll need a separate dev Firebase project.

### Deployment

The app automatically deploys to GitHub Pages on push to `main`:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Cloud Functions must be deployed separately:

```bash
firebase deploy --only functions
```

### Firebase Setup

The app uses Firebase for:
- **Authentication** - User accounts
- **Firestore** - Data storage
- **Cloud Messaging** - Push notifications
- **Cloud Functions** - Notification triggers
- **App Check** - Bot protection

Configuration is in `index.html` (lines 26-34). The current setup uses a shared Firebase project.

## Security

- **API Key Restrictions**: Production API key only works on `p3psie.github.io`
- **Firestore Rules**: Database access controlled by authentication rules
- **App Check**: reCAPTCHA v3 verification for production requests
- **HTTPS Only**: Enforced by GitHub Pages

## Privacy

- **Your Data**: When using an account, data is stored in Firebase Firestore
- **Local Mode**: Data stored only in browser localStorage (never leaves your device)
- **No Analytics**: We don't track usage or collect analytics
- **No Ads**: Completely ad-free
- **Open Source**: All code is publicly available

## Browser Support

- **Chrome/Edge** (recommended)
- **Firefox**
- **Safari** (iOS 11.3+)
- **Opera**

## Troubleshooting

**Notifications not working:**
- Ensure you're signed in
- Check browser notification permissions
- Verify FCM token is saved (see console)
- Check that contact has also enabled notifications

**Can't link with contact:**
- Both users must have accounts
- Code expires after 10 minutes
- Make sure to enter all 6 digits

**Data not syncing:**
- Ensure you're signed in with the same account
- Check internet connection
- Try refreshing the page

**App won't install:**
- Make sure you're using a supported browser
- iOS requires Safari, Android works best with Chrome
- Try refreshing the page first

## Contributing

This is a personal project, but suggestions and bug reports are welcome! Please open an issue on GitHub.

## License

MIT License - feel free to fork and customize for your own use.

## Support & Resources

- **Crisis Support**: If you're in crisis, please contact emergency services or a crisis helpline
- **Mental Health Resources**: [findahelpline.com](https://findahelpline.com)
- **988 Suicide & Crisis Lifeline**: Call or text 988 (US)

## Acknowledgments

Built for individuals who experience emotional dysregulation, anxiety, depression, or other mental health challenges. Designed to make asking for help easier and less overwhelming.

---

**Made with ❤️ for mental health awareness**
