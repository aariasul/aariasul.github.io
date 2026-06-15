self.addEventListener('install', function(event) {
  console.log('Infomed Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Infomed Service Worker activating.');

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('infomed-emergency-')) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});