(function () {
  "use strict";

  let deferredPrompt = null;

  function isIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  function isStandaloneIOS() {
    return (
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches
    );
  }

  function openIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");

    if (!backdrop || !modal) return;

    backdrop.hidden = false;
    modal.hidden = false;

    requestAnimationFrame(function () {
      backdrop.classList.add("show");
      modal.classList.add("show");
    });

    document.addEventListener("keydown", onEscClose);
  }

  function onEscClose(event) {
    if (event.key === "Escape") closeIosA2HS();
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");

    if (!backdrop || !modal) return;

    backdrop.classList.remove("show");
    modal.classList.remove("show");

    window.setTimeout(function () {
      backdrop.hidden = true;
      modal.hidden = true;
    }, 180);

    document.removeEventListener("keydown", onEscClose);
  };

  window.handleAddToHomeScreen = function handleAddToHomeScreen() {
    if (isIOS() && !isStandaloneIOS()) {
      openIosA2HS();
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
      });
      return;
    }

    if (isIOS()) {
      openIosA2HS();
      return;
    }

    alert(
      document.documentElement.lang === "en"
        ? "To install, tap your browser menu and choose 'Add to Home Screen'."
        : "Para instalar la tarjeta, use el menú de su navegador y elija 'Agregar a pantalla de inicio'."
    );
  };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("./service-worker.js")
        .catch(function (error) {
          console.warn("Service Worker registration failed:", error);
        });
    });
  }
})();