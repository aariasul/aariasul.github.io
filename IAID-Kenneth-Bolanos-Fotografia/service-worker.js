/* ======================
   SERVICE WORKER MODULE
====================== */

const CACHE_NAME = "kenneth-bolanos-card-v1";

self.addEventListener("install", function (event) {
  console.log("Kenneth Bolaños Service Worker installed.");

  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Kenneth Bolaños Service Worker activated.");

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});