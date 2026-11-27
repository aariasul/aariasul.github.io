"use strict";

const CACHE_PREFIX = "mobiliario-rivera-";
const CACHE_NAME = "mobiliario-rivera-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./IAID-share.html",
  "./manifest.json",
  "./js/script.js",
  "./js/scriptlanguage.js",
  "./js/share.js",
  "./Mobiliario_Rivera.vcf",
  "./Mobiliario-Rivera-icon-512x512.svg",
  "./Mobiliario-Rivera-icon-50x50.png",
  "./Eddie-Rivera-saco.png",
  "./bgrw.jpg",
  "./QR_code.svg",
  "./images/01.webp",
  "./images/02.webp",
  "./images/03.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
