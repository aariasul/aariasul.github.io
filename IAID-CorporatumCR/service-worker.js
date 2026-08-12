self.addEventListener("install", function () {
  console.log("Corporatum CR service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Corporatum CR service worker activating.");
  event.waitUntil(self.clients.claim());
});
