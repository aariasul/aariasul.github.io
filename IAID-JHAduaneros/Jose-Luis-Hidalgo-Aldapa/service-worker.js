self.addEventListener("install", function () {
  console.log("JH Aduaneros service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("JH Aduaneros service worker activating.");
  event.waitUntil(self.clients.claim());
});