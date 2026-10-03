const CACHE_NAME = "dueno-vende-v1";

self.addEventListener("install", function (event) {
  console.log("Dueño Vende Casa service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Dueño Vende Casa service worker activating.");
  event.waitUntil(self.clients.claim());
});