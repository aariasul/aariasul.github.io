(function () {
  "use strict";

  // ===== Share page helpers (kept, with IAID folder updated) =====
  function getIAIDBaseUrl() {
    // Using the live domain you already used in the old code.
    // If you later host somewhere else, we can make this relative.
    return "https://inter-activeid.com/IAID-Andre-Picado-Gourzong";
  }

  window.generateLinks = function generateLinks() {
    const phoneNumber = document.getElementById("phoneNumber")?.value?.trim();
    const personName = document.getElementById("personName")?.value?.trim() || "";

    const userLink = document.getElementById("userWhatsappLink");
    const fixedLink = document.getElementById("fixedWhatsappLink");
    const fixedURLLink = document.getElementById("fixedURLLink");
    const generateButton = document.querySelector('.btn[onclick="generateLinks()"]');

    if (!phoneNumber || !userLink || !fixedLink || !fixedURLLink) return;

    const base = getIAIDBaseUrl();
    const userWhatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(base + "/index.html")}`;
    const fixedWhatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(base + "/IAID-Andre-Picado-Gourzong.pdf")}`;

    // NOTE: This is still the old “send to my phone” number from your old IAID.
    // You’ll tell me later what to change it to for the lawyer project.
    const fixedURLWhatsappURL =
      `https://wa.me/5068538395?text=` +
      `Name:%20${encodeURIComponent(personName)}%0A` +
      `Phone:%20${encodeURIComponent(phoneNumber)}`;

    userLink.href = userWhatsappURL;
    fixedLink.href = fixedWhatsappURL;
    fixedURLLink.href = fixedURLWhatsappURL;

    userLink.textContent = "Enviar enlace IAID";
    userLink.classList.remove("hidden-btn");
    userLink.classList.add("visible-btn");

    fixedLink.textContent = "Enviar PDF";
    fixedLink.classList.remove("hidden-btn");
    fixedLink.classList.add("visible-btn");

    fixedURLLink.classList.remove("hidden-btn");
    fixedURLLink.classList.add("visible-btn");

    if (generateButton) generateButton.style.display = "none";
  };

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
    // Safari iOS supports navigator.standalone (true when launched from home screen).
    // Keep safe fallback.
    return !!window.navigator.standalone;
  }

  function openIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");
    if (!backdrop || !modal) return;

    backdrop.hidden = false;
    modal.hidden = false;

    // Basic focus management
    const closeBtn = modal.querySelector(".ios-a2hs-close");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", onEscClose);
    backdrop.addEventListener("click", closeIosA2HS, { once: true });
  }

  function onEscClose(e) {
    if (e.key === "Escape") closeIosA2HS();
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");
    if (backdrop) backdrop.hidden = true;
    if (modal) modal.hidden = true;
    document.removeEventListener("keydown", onEscClose);
  };

  window.handleAddToHomeScreen = function handleAddToHomeScreen() {
    // iOS: show instructions (unless already standalone)
    if (isIOS()) {
      if (isStandaloneIOS()) return; // already installed
      openIosA2HS();
      return;
    }

    // Android/Chromium: show install prompt if available
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(() => {
        deferredPrompt = null;
      });
      return;
    }

    // Fallback (nothing to do)
    console.log("Add to Home Screen prompt not available.");
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent mini-infobar and store the event for later.
    e.preventDefault();
    deferredPrompt = e;
  });

  // ===== Service Worker registration (updated folder path) =====
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/IAID-Andre-Picado-Gourzong/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  }
})();
