# Music Hub - GitHub Pages Website

A modern, dark-themed music player website with waveform visualization built for GitHub Pages. **Now supports both YouTube videos and local audio files!**

## Features

### Core Player
- Clean, modern landing page with dark/neon aesthetic
- Interactive music player with playlist support
- Real-time waveform visualization (authentic for local files, simulated for YouTube)
- Seamless switching between YouTube and local tracks
- Track credits and attribution support

### YouTube Integration
- **YouTube video integration** - play music from YouTube without hosting files
- **YouTube Music support** - works with music.youtube.com URLs
- **Dynamic track adding** - add videos directly from the player without editing code
- **Bulk import** - paste multiple YouTube URLs at once
- **Playlist extraction** - paste YouTube playlist URL to import all videos
- **Auto-fetch metadata** - automatically gets video title and channel name

### Playlist Management
- **Full playlist control** - add, remove, or reorder any track
- **Delete any track** - including default examples
- **Restore defaults** - one-click restore to original playlist
- **LocalStorage persistence** - your playlist is saved in the browser
- **YouTube API integration** - extract playlists (requires free API key)

### Mobile & PWA Features
- **Progressive Web App** - installable on phone home screen
- **Mobile background playback** - music continues when screen is locked
- **Lock screen controls** - play/pause/next/prev on lock screen (iOS & Android)
- **Offline support** - works without internet (for cached files)
- **Offline listening** - local audio files cached automatically
- **Service Worker caching** - faster load times and offline app access
- Responsive design for all devices

### Advanced Features
- Media Session API integration for native-like controls
- CarPlay and Android Auto support
- Bluetooth device controls
- Smart watch integration
- Custom API key management for playlist extraction

## Setup Instructions

### Option 1: Using YouTube Videos (Recommended for GitHub Pages)

This is the easiest option as you don't need to store large audio files in your repository!

1. Open `music.js` and add YouTube videos to your playlist:

```javascript
const playlist = [
    {
        title: "Song Title",
        artist: "Artist Name",
        credit: "Original video: youtube.com/watch?v=VIDEO_ID",
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ"  // Just the video ID, or use full URL
    },
    {
        title: "Another Song",
        artist: "Another Artist",
        credit: "Source: YouTube",
        type: "youtube",
        youtubeId: "https://www.youtube.com/watch?v=9bZkp7q19f0"  // Full URL works too
    }
];
```

**How to get YouTube Video ID:**
- From URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
- From short URL `https://youtu.be/dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`
- You can use either just the ID or the full URL in the `youtubeId` field

### Option 2: Using Local Audio Files

1. Place your music files (MP3, WAV, OGG) in the `music/` folder
2. Edit `music.js` and add them to your playlist:

```javascript
const playlist = [
    {
        title: "Your Song Title",
        artist: "Artist Name",
        credit: "Licensed under CC BY 4.0",
        type: "local",
        file: "music/your-song-file.mp3"
    }
];
```

### Option 3: Mix Both! (Best of Both Worlds)

You can combine YouTube videos and local files in the same playlist:

```javascript
const playlist = [
    {
        title: "YouTube Track",
        artist: "YouTube Artist",
        credit: "Source: YouTube",
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ"
    },
    {
        title: "Local Track",
        artist: "Local Artist",
        credit: "Original work",
        type: "local",
        file: "music/my-song.mp3"
    },
    {
        title: "Another YouTube Track",
        artist: "Another Artist",
        credit: "youtube.com/watch?v=9bZkp7q19f0",
        type: "youtube",
        youtubeId: "9bZkp7q19f0"
    }
];
```

## Local Development / Testing

**Important**: The YouTube IFrame API requires your site to be served over HTTP/HTTPS (not from `file://` protocol).

### Run a Local Web Server:

**Option 1: Python (Recommended - Built into Mac/Linux)**
```bash
cd "/path/to/GitHub Site"
python3 -m http.server 8000
```
Then open: `http://localhost:8000`

**Option 2: Node.js (if you have it installed)**
```bash
npx http-server -p 8000
```

**Option 3: VS Code**
- Install the "Live Server" extension
- Right-click on `index.html` → "Open with Live Server"

**Option 4: PHP (if installed)**
```bash
php -S localhost:8000
```

Once the server is running, all features (YouTube playback, metadata fetching, etc.) will work correctly!

### Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
3. Go to your repository Settings → Pages
4. Under "Source", select your main branch
5. Click Save

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## File Structure

```
├── index.html          # Landing page
├── music.html          # Music player page
├── styles.css          # All styling
├── music.js            # Player functionality (edit playlist here!)
├── music/              # Your local music files (optional)
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## Player Controls

- **Play/Pause**: Click the main button to play or pause
- **Previous/Next**: Navigate through your playlist
- **Progress Bar**: Click to seek to any position in the track
- **Volume Control**: Adjust volume with the slider
- **Playlist**: Click any track to play it immediately

## Adding Tracks Dynamically

You can add YouTube videos to your playlist without editing any code!

### How to Add Tracks:

1. Click the **"Add Track"** button in the playlist section
2. Paste one or more YouTube URLs in the text area:
   - **Regular YouTube**: `https://www.youtube.com/watch?v=VIDEO_ID`
   - **YouTube Music**: `https://music.youtube.com/watch?v=VIDEO_ID`
   - **Short URLs**: `https://youtu.be/VIDEO_ID`
   - **Multiple videos**: Paste one URL per line
3. Click **Add** or press **Ctrl+Enter** (Cmd+Enter on Mac)
4. The player will automatically fetch the video title and channel name
5. Your tracks are saved in your browser's localStorage

### Features:

- ✅ **Auto-fetch metadata** - Gets video title and artist/channel automatically
- ✅ **Bulk import** - Add multiple videos at once (one URL per line)
- ✅ **Duplicate detection** - Won't add the same video twice
- ✅ **Persistent storage** - Your additions are saved and reload on next visit
- ✅ **Easy removal** - Click the trash icon on custom tracks to remove them
- ℹ️ **Default tracks** cannot be removed (edit `music.js` to change defaults)

### Tips:

- You can copy and paste an entire list of YouTube URLs at once
- Tracks are saved per browser - clearing browser data will remove them
- Only custom-added tracks can be deleted (default tracks are permanent)
- The video must be available and not region-restricted

### Adding from YouTube Playlists:

**Playlist extraction is built-in!** Just paste a YouTube playlist URL and it will automatically extract all videos.

#### Setup (One-time, 2 minutes):

You need a free YouTube Data API v3 key:

1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create a new project** (or select existing)
   - Click "Select a project" → "New Project"
   - Name it anything (e.g., "Music Player")
   - Click "Create"
3. **Enable YouTube Data API v3**
   - Search for "YouTube Data API v3" in the search bar
   - Click on it → Click "Enable"
4. **Create API Key**
   - Go to "Credentials" (left sidebar)
   - Click "Create Credentials" → "API Key"
   - Copy your API key
5. **In the Music Player**
   - Click the **key icon** (🔑) next to "Playlist"
   - Paste your API key
   - Done!

#### Usage:

Once you have an API key configured:
1. Copy any YouTube or YouTube Music playlist URL
   - Example: `https://music.youtube.com/playlist?list=PLxxxxx`
2. Click "Add Track" in the player
3. Paste the playlist URL
4. All videos will be automatically extracted and added!

#### API Limits:

- YouTube API has a **free daily quota** of 10,000 units
- Each playlist extraction uses ~1-3 units per 50 videos
- You can add **hundreds of playlists per day** for free
- Quota resets daily at midnight Pacific Time

#### Alternative (No API Key Required):

If you don't want to set up an API key:
- Use [playlist.tools](https://playlist.tools/) to extract URLs
- Paste all extracted URLs into the "Add Track" box

## Cross-Device Playlist Sync

Your custom playlists are saved in your browser's localStorage, which means they persist on the same device. To sync playlists across devices or share them with others, use one of these three methods:

### Method 1: Export/Import Files

**Export your playlist:**
1. Click the **download icon** in the playlist section
2. A JSON file will be downloaded (e.g., `music-hub-playlist-2025-01-15.json`)
3. This file contains:
   - Your entire playlist with all tracks and metadata
   - Your YouTube API key (so you don't need to re-enter it)
   - Volume preference and other settings

**Import a playlist:**
1. Click the **upload icon** in the playlist section
2. Select your previously exported JSON file
3. Confirm the import - your playlist and settings will be restored

**What gets imported:**
- ✅ All playlist tracks (replaces current playlist)
- ✅ YouTube API key (if included in export)
- ✅ Volume preference
- ✅ Other user settings

**Use cases:**
- Transfer everything from phone to desktop (or vice versa)
- Backup your playlist and settings before making changes
- Share your entire setup with friends via file sharing
- Move to a new device without losing your configuration

### Method 2: Shareable URL

**Generate a shareable link:**
1. Click the **share icon** in the playlist section
2. A special URL will be copied to your clipboard
3. Share this URL with anyone or save it for yourself

**How it works:**
- The URL contains your entire playlist encoded in base64
- Anyone with the URL can instantly load your playlist
- No file downloads required - just paste and go!
- The URL can be quite long if your playlist is large

**Example shareable URL:**
```
https://yoursite.com/music.html?playlist=eyJ2IjoxLCJwIjpbeyJ0IjoiU29uZy4uLg==
```

**Use cases:**
- Quick sharing on social media or messaging apps
- Bookmark your playlist for easy access
- No need to download/upload files

### Method 3: Manual Playlist Editing

For advanced users, you can manually edit `music.js` to set default tracks that load for all users.

### Important Notes:

- **LocalStorage is per-browser**: Playlists saved in Chrome won't appear in Firefox on the same device
- **Private browsing**: Playlists may not persist in incognito/private mode
- **Browser data**: Clearing browser data will delete your saved playlist (use export to backup!)
- **Import replaces**: Importing a playlist replaces your current one (export first to backup)
- **URL length**: Shareable URLs can be very long with large playlists (500+ tracks may exceed URL limits)
- **API keys ARE exported**: YouTube API keys are included in JSON exports for convenience when moving between your devices. Keep exported files secure and don't share them publicly if you want to keep your API key private.
- **Shareable URLs**: Don't include settings or API keys - only the playlist tracks

## Visualization

- **Local Files**: Real-time audio frequency analysis using Web Audio API
- **YouTube Videos**: Smooth simulated waveform that responds to playback

## Mobile Support & Background Playback

The player is fully optimized for mobile devices with advanced features:

### Background Playback 📱

Music **continues playing even when:**
- You lock your phone screen
- You switch to another app
- Your browser goes to the background
- You're driving and using navigation apps

This works on both iOS (Safari) and Android (Chrome/Firefox)!

### Lock Screen Controls 🎵

When music is playing, you get beautiful lock screen controls:

**iOS (iPhone/iPad):**
- Shows track title and artist on lock screen
- Play/Pause button
- Previous/Next track buttons
- Seek forward/backward (10 seconds)
- Works with AirPlay and CarPlay

**Android:**
- Notification with track info
- Media controls in notification shade
- Lock screen player controls
- Works with Android Auto
- Bluetooth device controls

### How It Works:

The player uses the **Media Session API** which enables:
- ✅ Background audio playback
- ✅ Lock screen media controls
- ✅ Notification area controls
- ✅ Integration with car systems (CarPlay/Android Auto)
- ✅ Bluetooth headphone/speaker controls
- ✅ Smart watch controls

### Tips for Mobile:

1. **Add to Home Screen** (iOS/Android):
   - Tap Share → "Add to Home Screen"
   - Launch like a native app
   - Gets its own icon and full-screen experience

2. **Battery Optimization**:
   - YouTube videos use less battery than local files
   - Lock your screen to save even more battery
   - The audio continues playing while the screen is off

3. **Notifications**:
   - Enable notifications for the browser to see track info
   - Control playback from your notification shade

## Offline Support & PWA

The Music Hub is a **Progressive Web App (PWA)** with full offline capabilities!

### What Gets Cached:

✅ **App Files** (always cached):
- HTML, CSS, JavaScript files
- Loads instantly, even offline
- No internet needed to open the app

✅ **Local Audio Files** (cached on first play):
- MP3, WAV, OGG files in the `music/` folder
- Automatically cached when you first play them
- Available for offline listening forever
- Survives browser restarts

❌ **YouTube Videos** (require internet):
- YouTube videos must be streamed online
- YouTube's Terms of Service prevent offline caching
- Use local files for true offline listening

### How Offline Mode Works:

1. **First Visit** (requires internet):
   - Service Worker installs
   - App files are cached
   - Ready for offline use

2. **Playing Local Tracks**:
   - First play downloads and caches the file
   - Future plays work offline
   - No internet required after first play

3. **Offline Access**:
   - Open the app offline - works perfectly!
   - Play any previously-cached local tracks
   - YouTube tracks show but won't play without internet

### Install as App:

**iOS (iPhone/iPad):**
1. Open in Safari
2. Tap Share button
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. App icon appears on home screen!

**Android:**
1. Open in Chrome
2. Tap menu (⋮)
3. Tap "Add to Home Screen" or "Install app"
4. Tap "Install"
5. App appears in app drawer!

**Desktop (Chrome/Edge):**
1. Look for install icon in address bar
2. Click "Install Music Hub"
3. App opens in its own window

### Benefits of Installing:

- 🚀 Launches faster
- 📱 Feels like a native app
- 🔒 Works offline
- 🎵 Continues playing in background
- 💾 Saves all your playlists
- 🎨 Custom icon on home screen

### Managing Cache:

The app automatically manages its cache, but you can manually clear it:

**Browser DevTools Method:**
1. Open Developer Tools (F12)
2. Go to Application tab
3. Find "Storage" → "Clear Site Data"
4. Or just "Cache Storage" → Delete specific caches

**Note:** Clearing cache removes offline audio files. They'll re-cache when you play them again.

## Customization

### Change Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --neon-pink: #ff006e;
    --neon-cyan: #00f5ff;
    --neon-purple: #8b5cf6;
    /* Add more color customizations */
}
```

### Update Site Title and Branding

Change the title and logo in both HTML files:
- `index.html` (line 6 for title, search for "Music Hub" to update branding)
- `music.html` (line 6 for title, search for "Music Hub" to update branding)

### Modify Landing Page

Edit `index.html` to change:
- Hero heading and subtitle
- Call-to-action button text
- Navigation items

## Tips & Best Practices

### For YouTube Videos:
- ✅ Use official music videos or authorized uploads
- ✅ Always credit the original source in the `credit` field
- ✅ Respect copyright - only use content you have permission to use
- ⚠️ Videos may not be available in all regions
- ⚠️ If a video is deleted from YouTube, it won't play

**About YouTube Ads:**
- ⚠️ **Ads cannot be completely blocked** - YouTube's API doesn't allow ad removal
- ℹ️ We use privacy-enhanced mode (`youtube-nocookie.com`) which may reduce ads
- ℹ️ Ads are controlled by video uploaders and YouTube's policies
- 💡 **To avoid ads entirely**: Use local audio files instead of YouTube videos
- 💡 **Alternative**: YouTube Premium users won't see ads

### For Local Files:
- ✅ Keep file sizes reasonable (GitHub has repository size limits)
- ✅ Use MP3 format for best compatibility and compression
- ✅ Only upload content you own or have permission to distribute
- ✅ Consider using a CDN for large music libraries

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari (may have autoplay restrictions)
- Opera

**Note**:
- Web Audio API features work best in modern browsers
- YouTube playback requires an internet connection
- Some browsers may block autoplay - users need to interact with the page first

## Troubleshooting

**YouTube videos won't play:**
- Check that the video ID is correct
- Ensure the video is not region-restricted
- Verify the video hasn't been removed from YouTube
- Check browser console for errors

**Local audio won't play:**
- Verify the file path is correct
- Ensure the audio file exists in the `music/` folder
- Check that the file format is supported (MP3, WAV, OGG)

**Waveform not showing:**
- For YouTube: This is expected if playback hasn't started
- For local files: Make sure Web Audio API is supported in your browser

**YouTube ads playing:**
- This is expected behavior - YouTube ads cannot be blocked via the API
- We use privacy-enhanced mode which may reduce (but not eliminate) ads
- Ads are shown based on the video uploader's monetization settings
- Solutions: Use local audio files (no ads) or YouTube Premium subscription

## Credits

Built with:
- HTML5 Audio API
- YouTube IFrame Player API
- Canvas API for visualizations
- Pure JavaScript (no frameworks!)

## License

Feel free to customize and use this template for your own projects!

---

**Enjoy your music! 🎵**
