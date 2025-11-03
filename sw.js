// Service Worker for offline caching and offline audio playback
const CACHE_NAME = 'music-hub-v1';
const AUDIO_CACHE = 'music-hub-audio-v1';

const urlsToCache = [
    '/',
    '/index.html',
    '/music.html',
    '/styles.css',
    '/music.js',
    '/manifest.json'
];

// Install event - cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Handle audio files separately for offline listening
    if (url.pathname.startsWith('/music/') &&
        (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.wav') || url.pathname.endsWith('.ogg'))) {

        event.respondWith(
            caches.open(AUDIO_CACHE).then((cache) => {
                return cache.match(event.request).then((response) => {
                    // Return cached audio if available
                    if (response) {
                        return response;
                    }

                    // Fetch and cache audio file
                    return fetch(event.request).then((response) => {
                        if (response && response.status === 200) {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    });
                });
            })
        );
        return;
    }

    // Handle other resources
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the fetched resource
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            // Only cache same-origin requests (not YouTube API, etc.)
                            if (event.request.url.startsWith(self.location.origin)) {
                                cache.put(event.request, responseToCache);
                            }
                        });

                    return response;
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME, AUDIO_CACHE];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
