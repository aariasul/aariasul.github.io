(function () {
  "use strict";

  window.goBack = function goBack() {
    window.history.back();
  };

  // ===== Add to Home Screen (A2HS) - centralized =====
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

    const closeBtn = modal.querySelector(".ios-a2hs-close");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", onEscClose);
    backdrop.addEventListener("click", closeIosA2HS, { once: true });
  }

  function onEscClose(event) {
    if (event.key === "Escape") closeIosA2HS();
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");

    if (backdrop) backdrop.hidden = true;
    if (modal) modal.hidden = true;

    document.removeEventListener("keydown", onEscClose);
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

    console.log("Add to Home Screen prompt not available.");
  };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  // ===== Service Worker registration =====
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/IAID-Inter-ActiveID/service-worker.js")
      .then(function (registration) {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch(function (error) {
        console.log("Service Worker registration failed:", error);
      });
  }
})();