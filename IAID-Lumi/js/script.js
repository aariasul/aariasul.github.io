(function () {
  "use strict";

  const WHATSAPP_PHONE = "50688355608";
  const EMAIL_ADDRESS = "chavessancho.carla@gmail.com";

  const messages = {
    es: {
      whatsapp: "Saludos Carla de Lumi RH.\nDeseo conocer más sobre sus servicios.\nMi nombre es:\nMi correo es:",
      emailSubject: "Carla, por favor contácteme.",
      emailBody: "Mi nombre es:\nMi teléfono es:\nAsunto:"
    },
    en: {
      whatsapp: "Hello Carla from Lumi RH.\nI would like to learn more about your services.\nMy name is:\nMy email is:",
      emailSubject: "Carla, please contact me.",
      emailBody: "My name is:\nMy phone number is:\nSubject:"
    }
  };

  function updateActionLinks(e) {
    const lang = (e && e.detail && e.detail.language) || (localStorage.getItem("lumiLanguage") === "en" ? "en" : "es");
    const copy = messages[lang] || messages.es;

    const connectWhatsappBtn = document.getElementById("connectWhatsappButton");
    const mainEmailBtn = document.getElementById("mainEmailButton");

    if (connectWhatsappBtn) {
      connectWhatsappBtn.href = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(copy.whatsapp);
    }
    if (mainEmailBtn) {
      mainEmailBtn.href = "mailto:" + EMAIL_ADDRESS + "?subject=" + encodeURIComponent(copy.emailSubject) + "&body=" + encodeURIComponent(copy.emailBody);
    }
  }

  window.addEventListener("app:language-changed", updateActionLinks);
  document.addEventListener("DOMContentLoaded", updateActionLinks);

  // A2HS & Service Worker
  let deferredPrompt = null;

  function isIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  function isStandaloneIOS() {
    return window.navigator.standalone === true;
  }

  function openIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    if (!backdrop) return;
    backdrop.classList.add("is-visible");
    backdrop.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", onEscClose);
  }

  function onEscClose(event) {
    if (event.key === "Escape") window.closeIosA2HS();
  }

  window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    if (!backdrop) return;
    backdrop.classList.remove("is-visible");
    backdrop.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onEscClose);
  };

  window.handleAddToHomeScreen = function handleAddToHomeScreen() {
    if (isIOS() && !isStandaloneIOS()) {
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

    if (isIOS()) {
      openIosA2HS();
      return;
    }

    alert(
      document.documentElement.lang.startsWith("en")
        ? "To install, tap your browser's menu and choose 'Add to Home Screen'."
        : "Para instalar la tarjeta, use el menú de su navegador y elija 'Agregar a pantalla de inicio'."
    );
  };

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    deferredPrompt = event;
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./service-worker.js").catch(function (error) {
        console.log("Service Worker registration failed:", error);
      });
    });
  }
})();