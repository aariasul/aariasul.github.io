self.addEventListener("install", function () {
  console.log("Mi Graduación CR service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Mi Graduación CR service worker activating.");
  event.waitUntil(self.clients.claim());
});
