// Default playlist configuration
// Supports both YouTube videos and local audio files
// For YouTube: use type 'youtube' and provide youtubeId (or full URL will be parsed)
// For local files: use type 'local' and provide file path
const defaultPlaylist = [
    {
        title: "Example YouTube Track",
        artist: "Artist Name",
        credit: "Original video: youtube.com/watch?v=VIDEO_ID",
        type: "youtube",
        youtubeId: "dQw4w9WgXcQ",
        isDefault: true
    },
    {
        title: "Another YouTube Song",
        artist: "Another Artist",
        credit: "Source: YouTube",
        type: "youtube",
        youtubeId: "9bZkp7q19f0",
        isDefault: true
    },
    {
        title: "Local Audio Track",
        artist: "Local Artist",
        credit: "Licensed under CC BY 4.0",
        type: "local",
        file: "music/track1.mp3",
        isDefault: true
    }
    // Add more default tracks as needed
];

// Active playlist (can be modified by user)
let playlist = [];

// Helper function to check if URL is a playlist
function isPlaylistUrl(url) {
    return /[?&]list=/.test(url);
}

// Helper function to extract playlist ID
function extractPlaylistId(url) {
    const match = url.match(/[?&]list=([^&\n?#]+)/);
    return match ? match[1] : null;
}

// Helper function to extract YouTube video ID from URL
function extractYouTubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|music\.youtube\.com\/watch\?v=)([^&\n?#]+)/,
        /[?&]v=([^&\n?#]+)/,  // Generic ?v= parameter
        /^([a-zA-Z0-9_-]{11})$/  // Direct ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
}

// YouTube API Key Management
function getYouTubeApiKey() {
    return localStorage.getItem('youtubeApiKey') || '';
}

function setYouTubeApiKey(key) {
    localStorage.setItem('youtubeApiKey', key);
}

// LocalStorage functions
function savePlaylist() {
    // Save the entire playlist (including which defaults were deleted)
    localStorage.setItem('userPlaylist', JSON.stringify(playlist));
    localStorage.setItem('hasCustomPlaylist', 'true');
}

function loadPlaylist() {
    try {
        const hasCustom = localStorage.getItem('hasCustomPlaylist');
        if (hasCustom) {
            // User has modified the playlist, load it
            const saved = localStorage.getItem('userPlaylist');
            playlist = saved ? JSON.parse(saved) : [...defaultPlaylist];
        } else {
            // First time or after reset, use defaults
            playlist = [...defaultPlaylist];
        }
    } catch (e) {
        console.error('Error loading playlist:', e);
        playlist = [...defaultPlaylist];
    }
}

function restoreDefaultPlaylist() {
    if (confirm('Restore default tracks and remove all custom additions?\n\nThis will:\n- Bring back default example tracks\n- Remove all tracks you added\n- Cannot be undone')) {
        localStorage.removeItem('userPlaylist');
        localStorage.removeItem('hasCustomPlaylist');
        playlist = [...defaultPlaylist];

        // Reset to first track
        currentTrackIndex = 0;
        if (isPlaying) {
            if (currentPlayerType === 'youtube' && youtubePlayer) {
                youtubePlayer.stopVideo();
            } else if (currentPlayerType === 'local') {
                audio.pause();
            }
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }

        renderPlaylist();
        if (playlist.length > 0) {
            loadTrack(0);
        }

        alert('Default playlist restored!');
    }
}

// Export playlist to JSON file
function exportPlaylist() {
    const exportData = {
        version: 1,
        exportDate: new Date().toISOString(),
        playlist: playlist,
        youtubeApiKey: getYouTubeApiKey() ? '***HIDDEN***' : null // Don't export actual key
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `music-hub-playlist-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert(`Playlist exported! ${playlist.length} tracks saved.\n\nTransfer this file to your other device and import it there.`);
}

// Import playlist from JSON file
function importPlaylist() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importData = JSON.parse(event.target.result);

                if (!importData.version || !importData.playlist) {
                    throw new Error('Invalid playlist file format');
                }

                const trackCount = importData.playlist.length;
                const confirmMsg = `Import ${trackCount} tracks?\n\nThis will:\n- Replace your current playlist\n- Keep your current API key\n- Cannot be undone\n\nCurrent playlist: ${playlist.length} tracks`;

                if (confirm(confirmMsg)) {
                    playlist = importData.playlist;
                    savePlaylist();

                    // Reset playback
                    currentTrackIndex = 0;
                    if (isPlaying) {
                        if (currentPlayerType === 'youtube' && youtubePlayer) {
                            youtubePlayer.stopVideo();
                        } else if (currentPlayerType === 'local') {
                            audio.pause();
                        }
                        isPlaying = false;
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                    }

                    renderPlaylist();
                    if (playlist.length > 0) {
                        loadTrack(0);
                    }

                    alert(`Successfully imported ${trackCount} tracks!`);
                }
            } catch (error) {
                console.error('Import error:', error);
                alert('Failed to import playlist. Please check the file format.');
            }
        };

        reader.readAsText(file);
    };

    input.click();
}

// Generate shareable URL with playlist
function getShareableUrl() {
    try {
        const shareData = {
            v: 1, // version
            p: playlist.map(track => ({
                t: track.title,
                a: track.artist,
                c: track.credit,
                type: track.type,
                ...(track.type === 'youtube' ? { yt: track.youtubeId } : { f: track.file })
            }))
        };

        const encoded = btoa(JSON.stringify(shareData));
        const url = new URL(window.location.href);
        url.searchParams.set('playlist', encoded);

        return url.toString();
    } catch (error) {
        console.error('Error generating shareable URL:', error);
        return null;
    }
}

// Copy shareable URL to clipboard
async function sharePlaylist() {
    const url = getShareableUrl();

    if (!url) {
        alert('Failed to generate shareable link');
        return;
    }

    try {
        await navigator.clipboard.writeText(url);
        alert(`Shareable link copied to clipboard!\n\n${playlist.length} tracks included.\n\nAnyone with this link can load your playlist.`);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert(`Shareable link copied!\n\n${playlist.length} tracks included.`);
        } catch (err) {
            prompt('Copy this link manually:', url);
        }
        document.body.removeChild(textArea);
    }
}

// Load playlist from URL parameter
function loadPlaylistFromUrl() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const playlistParam = urlParams.get('playlist');

        if (playlistParam) {
            const decoded = JSON.parse(atob(playlistParam));

            if (decoded.v === 1 && decoded.p && Array.isArray(decoded.p)) {
                const importedPlaylist = decoded.p.map(track => ({
                    title: track.t,
                    artist: track.a,
                    credit: track.c || '',
                    type: track.type,
                    ...(track.type === 'youtube' ? { youtubeId: track.yt } : { file: track.f }),
                    isDefault: false
                }));

                const trackCount = importedPlaylist.length;
                const confirmMsg = `Load shared playlist with ${trackCount} tracks?\n\nThis will replace your current playlist.`;

                if (confirm(confirmMsg)) {
                    playlist = importedPlaylist;
                    savePlaylist();
                    renderPlaylist();
                    if (playlist.length > 0) {
                        loadTrack(0);
                    }

                    // Clean URL
                    const cleanUrl = window.location.origin + window.location.pathname;
                    window.history.replaceState({}, document.title, cleanUrl);

                    alert(`Loaded ${trackCount} tracks from shared link!`);
                }
            }
        }
    } catch (error) {
        console.error('Error loading playlist from URL:', error);
    }
}

// Fetch playlist videos from YouTube API
async function fetchPlaylistVideos(playlistId) {
    const apiKey = getYouTubeApiKey();

    if (!apiKey) {
        const userWantsKey = confirm(
            'YouTube Playlist Extraction requires a free API key.\n\n' +
            'Would you like to set up your API key now?\n\n' +
            '(It takes 2 minutes and is completely free)'
        );

        if (userWantsKey) {
            const key = prompt(
                'Get your free YouTube API key:\n\n' +
                '1. Go to: console.cloud.google.com\n' +
                '2. Create a project (or select existing)\n' +
                '3. Enable "YouTube Data API v3"\n' +
                '4. Create credentials → API Key\n' +
                '5. Copy and paste your API key below:\n\n' +
                'Paste your API key here:'
            );

            if (key && key.trim()) {
                setYouTubeApiKey(key.trim());
                return fetchPlaylistVideos(playlistId); // Retry with new key
            }
        }
        return null;
    }

    try {
        const videos = [];
        let pageToken = '';
        let attempts = 0;
        const maxResults = 50; // Max per page
        const maxPages = 10; // Limit to 500 videos max

        do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}${pageToken ? '&pageToken=' + pageToken : ''}`;

            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 403 || response.status === 400) {
                    const error = await response.json();
                    console.error('API Error:', error);

                    alert(
                        'API Key Error!\n\n' +
                        error.error?.message || 'Invalid API key or quota exceeded.\n\n' +
                        'Please check your API key or try again later.'
                    );

                    // Offer to re-enter key
                    if (confirm('Would you like to enter a different API key?')) {
                        localStorage.removeItem('youtubeApiKey');
                        return fetchPlaylistVideos(playlistId);
                    }
                    return null;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Extract video IDs and basic info
            for (const item of data.items) {
                if (item.snippet.resourceId.kind === 'youtube#video') {
                    videos.push({
                        videoId: item.snippet.resourceId.videoId,
                        title: item.snippet.title,
                        artist: item.snippet.videoOwnerChannelTitle || item.snippet.channelTitle || 'Unknown'
                    });
                }
            }

            pageToken = data.nextPageToken || '';
            attempts++;

        } while (pageToken && attempts < maxPages);

        return videos;

    } catch (error) {
        console.error('Error fetching playlist:', error);
        alert('Failed to fetch playlist. Please check your internet connection and try again.');
        return null;
    }
}

// Fetch YouTube video metadata
async function fetchYouTubeMetadata(videoId) {
    try {
        // Using noembed.com as it doesn't require API key
        const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
        const data = await response.json();

        if (data.title) {
            return {
                title: data.title,
                artist: data.author_name || 'Unknown Artist',
                credit: `Source: ${data.author_name || 'YouTube'}`
            };
        }
    } catch (e) {
        console.error('Error fetching metadata:', e);
    }

    // Fallback if fetch fails
    return {
        title: `Video ${videoId}`,
        artist: 'YouTube',
        credit: 'Source: YouTube'
    };
}

// Add track to playlist
async function addTrackFromUrl(input) {
    // Split by newlines to support multiple URLs
    const urls = input.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

    if (urls.length === 0) {
        alert('Please paste at least one YouTube URL.');
        return false;
    }

    // Show loading state
    const addBtn = document.getElementById('add-track-btn');
    const originalText = addBtn.textContent;
    addBtn.disabled = true;

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        addBtn.textContent = `Processing ${i + 1}/${urls.length}...`;
        const url = urls[i];

        // Check if it's a playlist URL
        if (isPlaylistUrl(url)) {
            const playlistId = extractPlaylistId(url);

            if (!playlistId) {
                console.warn('Could not extract playlist ID');
                failCount++;
                continue;
            }

            addBtn.textContent = 'Fetching playlist videos...';

            // Fetch all videos from playlist
            const playlistVideos = await fetchPlaylistVideos(playlistId);

            if (!playlistVideos || playlistVideos.length === 0) {
                failCount++;
                continue;
            }

            addBtn.textContent = `Adding ${playlistVideos.length} videos from playlist...`;

            // Add each video from the playlist
            for (let j = 0; j < playlistVideos.length; j++) {
                const video = playlistVideos[j];
                addBtn.textContent = `Adding ${j + 1}/${playlistVideos.length} from playlist...`;

                // Check if already in playlist
                if (playlist.some(track => track.youtubeId === video.videoId)) {
                    skipCount++;
                    continue;
                }

                const newTrack = {
                    title: video.title,
                    artist: video.artist,
                    credit: `Source: ${video.artist}`,
                    type: 'youtube',
                    youtubeId: video.videoId,
                    isDefault: false
                };

                playlist.push(newTrack);
                successCount++;

                // Small delay to avoid overwhelming the UI
                if (j % 10 === 0 && j > 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }

            continue; // Move to next URL
        }

        const videoId = extractYouTubeId(url);

        if (!videoId) {
            console.warn(`Invalid URL skipped: ${url}`);
            failCount++;
            continue;
        }

        // Check if already in playlist
        if (playlist.some(track => track.youtubeId === videoId)) {
            console.log(`Skipped duplicate: ${videoId}`);
            skipCount++;
            continue;
        }

        try {
            const metadata = await fetchYouTubeMetadata(videoId);

            const newTrack = {
                title: metadata.title,
                artist: metadata.artist,
                credit: metadata.credit,
                type: 'youtube',
                youtubeId: videoId,
                isDefault: false
            };

            playlist.push(newTrack);
            successCount++;

            // Small delay to avoid rate limiting
            if (i < urls.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        } catch (e) {
            console.error('Error adding track:', e);
            failCount++;
        }
    }

    // Save and update UI
    if (successCount > 0) {
        savePlaylist();
        renderPlaylist();
    }

    // Clear input
    document.getElementById('youtube-url-input').value = '';

    // Hide form
    document.getElementById('add-track-form').style.display = 'none';

    // Show summary
    let message = `Added ${successCount} track(s)`;
    if (skipCount > 0) message += `, skipped ${skipCount} duplicate(s)`;
    if (failCount > 0) message += `, ${failCount} failed`;
    alert(message);

    addBtn.textContent = originalText;
    addBtn.disabled = false;

    return successCount > 0;
}

// Remove track from playlist
function removeTrack(index) {
    const track = playlist[index];

    // Don't allow removing while playing
    if (index === currentTrackIndex && isPlaying) {
        if (!confirm('This track is currently playing. Stop and remove it?')) {
            return;
        }
        // Stop playback
        if (currentPlayerType === 'youtube' && youtubePlayer) {
            youtubePlayer.stopVideo();
        } else if (currentPlayerType === 'local') {
            audio.pause();
        }
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }

    playlist.splice(index, 1);

    // Adjust current track index if needed
    if (currentTrackIndex >= playlist.length) {
        currentTrackIndex = Math.max(0, playlist.length - 1);
    } else if (index < currentTrackIndex) {
        currentTrackIndex--;
    }

    savePlaylist();
    renderPlaylist();

    // Only auto-load next track if we removed a different track (not the currently playing one)
    // If user deleted the playing track, they probably want to stop, so don't auto-play next
    if (playlist.length > 0 && currentTrackIndex < playlist.length && index !== currentTrackIndex) {
        // Just update the display, don't auto-play
        loadTrack(currentTrackIndex);
    } else if (playlist.length > 0) {
        // Track was playing when deleted - load but don't play the new current track
        const wasPlaying = isPlaying;
        loadTrack(currentTrackIndex);
        if (wasPlaying) {
            // Keep it paused
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
}

// Player state
let currentTrackIndex = 0;
let isPlaying = false;
let currentPlayerType = null; // 'youtube' or 'local'
let youtubePlayer = null;
let youtubeReady = false;
let progressUpdateInterval = null;

// DOM elements
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackCredit = document.getElementById('track-credit');
const playlistEl = document.getElementById('playlist');
const albumArt = document.getElementById('album-art');
const vinylSpin = document.getElementById('vinyl-spin');

// Canvas for waveform
const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');
let audioContext;
let analyser;
let dataArray;
let bufferLength;
let animationId;

// Simulated data for YouTube visualization
let simulatedData = new Uint8Array(128);
let simulatedPhase = 0;

// Initialize canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialize Web Audio API (for local audio only)
function initAudioContext() {
    if (!audioContext && currentPlayerType === 'local') {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
}

// YouTube IFrame API callback
function onYouTubeIframeAPIReady() {
    youtubeReady = true;
    initYouTubePlayer();
}

// Initialize YouTube player
function initYouTubePlayer() {
    if (!youtubePlayer && youtubeReady) {
        youtubePlayer = new YT.Player('youtube-player', {
            height: '150',
            width: '150',
            videoId: '',
            playerVars: {
                'playsinline': 1,
                'controls': 0,
                'modestbranding': 1,
                'rel': 0,
                'iv_load_policy': 3,  // Hide annotations
                'disablekb': 1,       // Disable keyboard controls (we handle them)
                'fs': 0,              // Hide fullscreen button
                'autohide': 1         // Auto-hide controls
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event) {
    console.log('YouTube player ready');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
    } else if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        startProgressUpdate();
        drawSimulatedWaveform();
        vinylSpin.style.animationPlayState = 'running';
        updateMediaSession(); // Update lock screen controls
    } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        stopProgressUpdate();
        cancelAnimationFrame(animationId);
        vinylSpin.style.animationPlayState = 'paused';
        updateMediaSession(); // Update lock screen controls
    }
}

// Progress update for YouTube
function startProgressUpdate() {
    stopProgressUpdate();
    progressUpdateInterval = setInterval(() => {
        if (youtubePlayer && currentPlayerType === 'youtube') {
            const currentTime = youtubePlayer.getCurrentTime();
            const duration = youtubePlayer.getDuration();
            if (duration) {
                const progress = (currentTime / duration) * 100;
                progressBar.value = progress;
                currentTimeEl.textContent = formatTime(currentTime);
                durationEl.textContent = formatTime(duration);
            }
        }
    }, 100);
}

function stopProgressUpdate() {
    if (progressUpdateInterval) {
        clearInterval(progressUpdateInterval);
        progressUpdateInterval = null;
    }
}

// Draw real waveform visualization (for local audio)
function drawWaveform() {
    const WIDTH = canvas.offsetWidth;
    const HEIGHT = canvas.offsetHeight;

    if (currentPlayerType === 'local' && analyser) {
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = 'rgba(10, 10, 25, 0.2)';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * HEIGHT * 0.8;

            const hue = (i / bufferLength) * 60 + 280;
            const lightness = 50 + (dataArray[i] / 255) * 30;

            ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            ctx.shadowBlur = 20;
            ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;

            x += barWidth + 1;
        }

        ctx.shadowBlur = 0;
    }

    animationId = requestAnimationFrame(drawWaveform);
}

// Draw simulated waveform visualization (for YouTube)
function drawSimulatedWaveform() {
    const WIDTH = canvas.offsetWidth;
    const HEIGHT = canvas.offsetHeight;

    // Generate simulated audio data with smooth wave patterns
    simulatedPhase += 0.05;
    for (let i = 0; i < simulatedData.length; i++) {
        const wave1 = Math.sin(simulatedPhase + i * 0.1) * 50;
        const wave2 = Math.sin(simulatedPhase * 1.5 + i * 0.05) * 30;
        const wave3 = Math.sin(simulatedPhase * 0.7 + i * 0.15) * 40;
        const noise = (Math.random() - 0.5) * 20;
        simulatedData[i] = Math.max(0, Math.min(255, 128 + wave1 + wave2 + wave3 + noise));
    }

    ctx.fillStyle = 'rgba(10, 10, 25, 0.2)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / simulatedData.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < simulatedData.length; i++) {
        barHeight = (simulatedData[i] / 255) * HEIGHT * 0.8;

        const hue = (i / simulatedData.length) * 60 + 280;
        const lightness = 50 + (simulatedData[i] / 255) * 30;

        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsl(${hue}, 100%, 70%)`;

        x += barWidth + 1;
    }

    ctx.shadowBlur = 0;
    animationId = requestAnimationFrame(drawSimulatedWaveform);
}

// Load and render playlist
function renderPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (index === currentTrackIndex) {
            item.classList.add('active');
        }
        const typeIcon = track.type === 'youtube' ? '▶' : '♪';

        // Create delete button for all tracks
        const deleteBtn = `
            <button class="delete-track-btn" data-index="${index}" title="Remove track">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
            </button>
        `;

        item.innerHTML = `
            <div class="track-number">${typeIcon} ${index + 1}</div>
            <div class="track-details">
                <div class="track-name">${track.title}</div>
                <div class="track-artist-name">${track.artist}</div>
            </div>
            ${deleteBtn}
        `;

        // Add click handler for track (not on delete button)
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-track-btn')) {
                loadTrack(index);
            }
        });

        // Add delete button handler
        const deleteBtnEl = item.querySelector('.delete-track-btn');
        if (deleteBtnEl) {
            deleteBtnEl.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Remove "${track.title}" from playlist?`)) {
                    removeTrack(index);
                }
            });
        }

        playlistEl.appendChild(item);
    });
}

// Load track
function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];

    // Stop current playback
    if (isPlaying) {
        if (currentPlayerType === 'youtube' && youtubePlayer) {
            youtubePlayer.stopVideo();
        } else if (currentPlayerType === 'local') {
            audio.pause();
        }
        cancelAnimationFrame(animationId);
        stopProgressUpdate();
    }

    // Update track info
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackCredit.textContent = track.credit || '';
    currentPlayerType = track.type;

    // Switch between players
    if (track.type === 'youtube') {
        audio.pause();
        audio.style.display = 'none';

        const videoId = track.youtubeId || extractYouTubeId(track.youtubeId);

        if (youtubePlayer && youtubeReady) {
            document.getElementById('youtube-player').style.display = 'block';
            vinylSpin.style.display = 'none';
            youtubePlayer.loadVideoById(videoId);
            if (isPlaying) {
                youtubePlayer.playVideo();
            }
        } else {
            // Wait for YouTube API to load
            const checkReady = setInterval(() => {
                if (window.YT && window.YT.Player) {
                    clearInterval(checkReady);
                    youtubeReady = true;
                    initYouTubePlayer();
                    setTimeout(() => {
                        if (youtubePlayer) {
                            document.getElementById('youtube-player').style.display = 'block';
                            vinylSpin.style.display = 'none';
                            youtubePlayer.loadVideoById(videoId);
                            if (isPlaying) {
                                youtubePlayer.playVideo();
                            }
                        }
                    }, 500);
                }
            }, 100);
        }
    } else {
        // Local audio file
        document.getElementById('youtube-player').style.display = 'none';
        vinylSpin.style.display = 'block';
        audio.src = track.file;
        audio.style.display = 'block';

        if (isPlaying) {
            audio.play().catch(err => console.log('Playback error:', err));
        }
    }

    renderPlaylist();
    updateMediaSession(); // Update lock screen controls
}

// Play/Pause toggle
function togglePlay() {
    if (currentPlayerType === 'youtube' && youtubePlayer) {
        if (isPlaying) {
            youtubePlayer.pauseVideo();
        } else {
            youtubePlayer.playVideo();
        }
    } else if (currentPlayerType === 'local') {
        if (!audioContext) {
            initAudioContext();
        }

        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            cancelAnimationFrame(animationId);
            vinylSpin.style.animationPlayState = 'paused';
        } else {
            audio.play().catch(err => {
                console.log('Playback error:', err);
                isPlaying = false;
            });
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            drawWaveform();
            vinylSpin.style.animationPlayState = 'running';
        }
        updateMediaSession(); // Update lock screen controls
    }
}

// Previous track
function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying && currentPlayerType === 'local') {
        setTimeout(() => audio.play(), 100);
    }
}

// Next track
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying && currentPlayerType === 'local') {
        setTimeout(() => audio.play(), 100);
    }
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', previousTrack);
nextBtn.addEventListener('click', nextTrack);

// Local audio events
audio.addEventListener('timeupdate', () => {
    if (currentPlayerType === 'local' && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    if (currentPlayerType === 'local') {
        durationEl.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener('ended', nextTrack);

audio.addEventListener('play', () => {
    if (currentPlayerType === 'local') {
        vinylSpin.style.animationPlayState = 'running';
    }
});

audio.addEventListener('pause', () => {
    if (currentPlayerType === 'local') {
        vinylSpin.style.animationPlayState = 'paused';
    }
});

// Progress bar seeking
progressBar.addEventListener('input', (e) => {
    if (currentPlayerType === 'youtube' && youtubePlayer) {
        const duration = youtubePlayer.getDuration();
        const time = (e.target.value / 100) * duration;
        youtubePlayer.seekTo(time, true);
    } else if (currentPlayerType === 'local') {
        const time = (e.target.value / 100) * audio.duration;
        audio.currentTime = time;
    }
});

// Volume control
volumeBar.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    if (currentPlayerType === 'youtube' && youtubePlayer) {
        youtubePlayer.setVolume(volume * 100);
    } else if (currentPlayerType === 'local') {
        audio.volume = volume;
    }
});

// Add track UI event handlers
const toggleAddTrackBtn = document.getElementById('toggle-add-track');
const addTrackForm = document.getElementById('add-track-form');
const youtubeUrlInput = document.getElementById('youtube-url-input');
const addTrackBtn = document.getElementById('add-track-btn');
const cancelAddBtn = document.getElementById('cancel-add-btn');

toggleAddTrackBtn.addEventListener('click', () => {
    if (addTrackForm.style.display === 'none') {
        addTrackForm.style.display = 'block';
        youtubeUrlInput.focus();
    } else {
        addTrackForm.style.display = 'none';
    }
});

cancelAddBtn.addEventListener('click', () => {
    addTrackForm.style.display = 'none';
    youtubeUrlInput.value = '';
});

addTrackBtn.addEventListener('click', () => {
    const url = youtubeUrlInput.value.trim();
    if (url) {
        addTrackFromUrl(url);
    } else {
        alert('Please paste a YouTube URL');
    }
});

// Allow Ctrl+Enter or Cmd+Enter to add track(s)
youtubeUrlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const input = youtubeUrlInput.value.trim();
        if (input) {
            addTrackFromUrl(input);
        }
    }
});

// API Key management UI
const apiKeyBtn = document.getElementById('api-key-btn');

function updateApiKeyButtonState() {
    const hasKey = !!getYouTubeApiKey();
    if (hasKey) {
        apiKeyBtn.classList.add('has-key');
        apiKeyBtn.title = 'YouTube API Key configured (click to manage)';
    } else {
        apiKeyBtn.classList.remove('has-key');
        apiKeyBtn.title = 'Setup YouTube API Key for playlist extraction';
    }
}

apiKeyBtn.addEventListener('click', () => {
    const currentKey = getYouTubeApiKey();

    if (currentKey) {
        const masked = currentKey.substring(0, 8) + '...' + currentKey.substring(currentKey.length - 4);
        const action = confirm(
            `YouTube API Key is configured:\n${masked}\n\n` +
            'Click OK to update/remove the key\n' +
            'Click Cancel to keep current key'
        );

        if (action) {
            const newKey = prompt(
                'Enter new YouTube API Key (leave empty to remove):\n\n' +
                'Get a free API key at: console.cloud.google.com\n' +
                '1. Create/select a project\n' +
                '2. Enable "YouTube Data API v3"\n' +
                '3. Create credentials → API Key',
                currentKey
            );

            if (newKey === null) {
                // User cancelled
                return;
            } else if (newKey.trim() === '') {
                // Remove key
                localStorage.removeItem('youtubeApiKey');
                alert('API key removed. Playlist extraction will not work until you add a new key.');
            } else {
                // Update key
                setYouTubeApiKey(newKey.trim());
                alert('API key updated successfully!');
            }
            updateApiKeyButtonState();
        }
    } else {
        const key = prompt(
            'Get your free YouTube API key:\n\n' +
            '1. Go to: console.cloud.google.com\n' +
            '2. Create a project (or select existing)\n' +
            '3. Enable "YouTube Data API v3"\n' +
            '4. Create credentials → API Key\n' +
            '5. Copy and paste your API key below:\n\n' +
            'Paste your API key here:'
        );

        if (key && key.trim()) {
            setYouTubeApiKey(key.trim());
            alert('API key saved! You can now extract playlists.');
            updateApiKeyButtonState();
        }
    }
});

// Restore defaults button
const restoreDefaultsBtn = document.getElementById('restore-defaults-btn');
restoreDefaultsBtn.addEventListener('click', restoreDefaultPlaylist);

// Export/Import/Share buttons
const exportPlaylistBtn = document.getElementById('export-playlist-btn');
const importPlaylistBtn = document.getElementById('import-playlist-btn');
const sharePlaylistBtn = document.getElementById('share-playlist-btn');

exportPlaylistBtn.addEventListener('click', exportPlaylist);
importPlaylistBtn.addEventListener('click', importPlaylist);
sharePlaylistBtn.addEventListener('click', sharePlaylist);

// Initialize
loadPlaylistFromUrl(); // Check for shared playlist in URL
audio.volume = 0.7;
loadPlaylist(); // Load playlist from localStorage
renderPlaylist();
if (playlist.length > 0) {
    loadTrack(0);
}
updateApiKeyButtonState(); // Update API key button visual state

// Draw initial static waveform
ctx.fillStyle = 'rgba(10, 10, 25, 1)';
ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

// Make onYouTubeIframeAPIReady globally accessible
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// Register Service Worker for offline caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Media Session API for mobile background playback and lock screen controls
function updateMediaSession() {
    if ('mediaSession' in navigator && playlist.length > 0) {
        const currentTrack = playlist[currentTrackIndex];

        if (!currentTrack) return;

        // Set metadata for lock screen / notification
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack.title,
            artist: currentTrack.artist,
            album: 'Music Hub',
            artwork: [
                {
                    src: 'https://via.placeholder.com/96x96.png?text=🎵',
                    sizes: '96x96',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/128x128.png?text=🎵',
                    sizes: '128x128',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/256x256.png?text=🎵',
                    sizes: '256x256',
                    type: 'image/png'
                },
                {
                    src: 'https://via.placeholder.com/512x512.png?text=🎵',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        });

        // Set action handlers for lock screen controls
        navigator.mediaSession.setActionHandler('play', () => {
            togglePlay();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            togglePlay();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            previousTrack();
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            nextTrack();
        });

        // Seek handlers (optional, for advanced controls)
        navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            if (currentPlayerType === 'youtube' && youtubePlayer) {
                const current = youtubePlayer.getCurrentTime();
                youtubePlayer.seekTo(Math.max(0, current - (details.seekOffset || 10)), true);
            } else if (currentPlayerType === 'local') {
                audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset || 10));
            }
        });

        navigator.mediaSession.setActionHandler('seekforward', (details) => {
            if (currentPlayerType === 'youtube' && youtubePlayer) {
                const current = youtubePlayer.getCurrentTime();
                const duration = youtubePlayer.getDuration();
                youtubePlayer.seekTo(Math.min(duration, current + (details.seekOffset || 10)), true);
            } else if (currentPlayerType === 'local') {
                audio.currentTime = Math.min(audio.duration, audio.currentTime + (details.seekOffset || 10));
            }
        });

        // Update playback state
        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
}

// Call updateMediaSession whenever track or playback state changes
// We'll need to add calls to this function at appropriate places
