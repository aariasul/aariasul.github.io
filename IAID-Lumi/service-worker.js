self.addEventListener("install", function () {
  console.log("Lumi RH service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Lumi RH service worker activating.");
  event.waitUntil(self.clients.claim());
});
