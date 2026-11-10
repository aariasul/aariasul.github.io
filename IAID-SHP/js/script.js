(function () {
  "use strict";

  window.goBack = function goBack() {
    window.history.back();
  };

  // Despachador de HUD interactivo con efecto de pulso / cyber-click
  window.handleHudAction = function handleHudAction(event, url, target) {
    event.preventDefault();
    const btn = event.currentTarget;

    btn.classList.add("hud-active-pulse");

    setTimeout(() => {
      btn.classList.remove("hud-active-pulse");
      if (url === "a2hs") {
        window.handleAddToHomeScreen();
      } else if (target === "_blank") {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    }, 450);
  };

  // A2HS & PWA Module
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

    const closeBtn = modal.querySelector(".ios-a2hs-close");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", onEscClose);
    backdrop.addEventListener("click", window.closeIosA2HS, { once: true });
  }

  function onEscClose(e) {
    if (e.key === "Escape") window.closeIosA2HS();
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

    alert(
      document.documentElement.lang === "en"
        ? "To install, tap your browser's menu and choose 'Add to Home Screen'."
        : "Para instalar la tarjeta, use el menú de su navegador y elija 'Agregar a pantalla de inicio'."
    );
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
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
