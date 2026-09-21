self.addEventListener("install", function () {
  console.log("Llanos del Sol Reciclaje service worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  console.log("Llanos del Sol Reciclaje service worker activating.");
  event.waitUntil(self.clients.claim());
});