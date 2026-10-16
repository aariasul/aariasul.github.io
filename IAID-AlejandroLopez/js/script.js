(function () {
  "use strict";

  let deferredPrompt = null;

  function isIOS() {
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua);
  }

  function isStandaloneIOS() {
    return !!window.navigator.standalone;
  }

  function openIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");
    if (!backdrop || !modal) return;
    backdrop.hidden = false;
    modal.hidden = false;
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");
    if (backdrop) backdrop.hidden = true;
    if (modal) modal.hidden = true;
  };

  window.handleAddToHomeScreen = function handleAddToHomeScreen() {
    if (isIOS()) {
      if (isStandaloneIOS()) return;
      openIosA2HS();
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(() => {
        deferredPrompt = null;
      });
      return;
    }
    alert("Para instalar: abra el menú de su navegador y seleccione 'Agregar a pantalla principal'.");
  };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  // Relative PWA Registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch(function (err) {
        console.log("Service Worker registration failed:", err);
      });
  }
})();
