self.addEventListener("install", function () {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function () {
  console.log("Service Worker activating.");
});