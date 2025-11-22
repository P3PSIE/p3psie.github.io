// Service Worker for Flares - Offline support & Push Notifications
const CACHE_NAME = 'flares-v8';

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/flares.css',
    '/flares.js',
    '/config.js',
    '/theme.css',
    '/manifest.json'
];

// Files that should always try network first (for updates)
const networkFirstFiles = [
    '/index.html',
    '/flares.js',
    '/flares.css',
    '/styles.css',
    '/config.js',
    '/theme.css'
];

// Import Firebase scripts for FCM
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in service worker
firebase.initializeApp({
    apiKey: "AIzaSyBAP0mJC-7jDRZzpv4dWT11A7EhSDFbfSo",
    authDomain: "flare-a0418.firebaseapp.com",
    projectId: "flare-a0418",
    storageBucket: "flare-a0418.firebasestorage.app",
    messagingSenderId: "311211387060",
    appId: "1:311211387060:web:45f0ca4374d5d449054fe1"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);

    const notificationTitle = payload.notification?.title || 'Flares Alert';
    const notificationOptions = {
        body: payload.notification?.body || 'Someone sent you a Flare',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'flare-notification',
        data: payload.data,
        vibrate: [200, 100, 200],
        actions: [
            { action: 'open', title: 'View Flare' },
            { action: 'dismiss', title: 'Dismiss' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();

    if (event.action === 'dismiss') {
        return;
    }

    // Open or focus the app
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // If app is already open, focus it
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Otherwise open a new window
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// Install event - cache files
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Activate immediately
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Check if URL should use network-first strategy
function shouldUseNetworkFirst(url) {
    return networkFirstFiles.some(file => url.endsWith(file) || url.endsWith(file.slice(1)));
}

// Fetch event - network-first for key files, cache-first for others
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Use network-first for HTML, CSS, JS files to get updates
    if (shouldUseNetworkFirst(requestUrl.pathname)) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Clone and cache the fresh response
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
                .catch(() => {
                    // Network failed, try cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // Cache-first for other resources (images, fonts, etc.)
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            if (event.request.url.startsWith(self.location.origin)) {
                                cache.put(event.request, responseToCache);
                            }
                        });

                    return response;
                });
            })
    );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

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
        }).then(() => {
            // Take control of all clients immediately
            return self.clients.claim();
        })
    );
});
