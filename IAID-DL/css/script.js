/* ======================
   COMMON UI MODULE
====================== */

(function () {
  "use strict";

  window.goBack = function goBack() {
    window.history.back();
  };
})();


/* ======================
   ADD TO HOME SCREEN MODULE
====================== */

(function () {
  "use strict";

  let deferredPrompt = null;

  function getConfig() {
    return window.CARD_CONFIG || {};
  }

  function getPwaConfig() {
    const config = getConfig();

    if (config.pwa) {
      return config.pwa;
    }

    return {
      enabled: true,
      serviceWorker: "/IAID-DL/service-worker.js"
    };
  }

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

    if (!backdrop || !modal) {
      return;
    }

    backdrop.hidden = false;
    modal.hidden = false;

    requestAnimationFrame(function () {
      backdrop.classList.add("show");
      modal.classList.add("show");
    });

    document.addEventListener("keydown", onEscClose);
  }

  function onEscClose(event) {
    if (event.key === "Escape") {
      closeIosA2HS();
    }
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");

    if (!backdrop || !modal) {
      return;
    }

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
    }
  };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  document.addEventListener("DOMContentLoaded", function () {
    const pwaConfig = getPwaConfig();

    if (!pwaConfig.enabled) {
      return;
    }

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker
          .register(pwaConfig.serviceWorker || "/IAID-DL/service-worker.js")
          .catch(function (error) {
            console.warn("Service Worker registration failed:", error);
          });
      });
    }
  });
})();


/* ======================
   ACCORDION MODULE
====================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".accordion").forEach(function (accordion) {
      const button = accordion.querySelector(".accordion-button");
      const panel = accordion.querySelector(".accordion-panel");

      if (!button || !panel) {
        return;
      }

      button.addEventListener("click", function () {
        const isOpen = accordion.classList.toggle("open");

        button.setAttribute("aria-expanded", String(isOpen));

        if (isOpen) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      });
    });
  });
})();