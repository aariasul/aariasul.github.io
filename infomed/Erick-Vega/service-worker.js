self.addEventListener('install', function(event) {
  console.log('Infomed Service Worker installing.');
});

self.addEventListener('activate', function(event) {
  console.log('Infomed Service Worker activating.');
});