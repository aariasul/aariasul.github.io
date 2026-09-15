const CACHE_NAME = 'infomed-shell-v2';

// Static assets required for the emergency card to display offline
const ASSETS_TO_CACHE = [
  './index-db.html',
  './manifest.json',
  './infomed.svg',
  './bg01.jpg',
  '../icons/infomed-icon-192x192.png',
  '../icons/infomed-icon-512x512.png',
  '../svgicons/emergency-location.svg',
  '../svgicons/whatsapp.svg',
  '../svgicons/telephone.svg',
  '../svgicons/homescreen.svg'
];

// Install: Pre-cache emergency shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Cache-first for local static shell, network-first for Supabase API requests
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Allow Supabase API calls to go directly through to network (handled by localStorage in the page)
  if (requestUrl.hostname.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached shell asset, but fetch update in background
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {/* Offline */});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});