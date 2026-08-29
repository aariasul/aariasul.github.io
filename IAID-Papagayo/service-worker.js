self.addEventListener("install", function () {
  console.log("Papagayo Brewing Co service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Papagayo Brewing Co service worker activating.");
  event.waitUntil(self.clients.claim());
});
