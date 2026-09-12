self.addEventListener("install", function () {
  console.log("Dino Show CR service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Dino Show CR service worker activating.");
  event.waitUntil(self.clients.claim());
});