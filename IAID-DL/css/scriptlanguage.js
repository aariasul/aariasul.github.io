/* ======================
   LANGUAGE MODULE
====================== */

(function () {
  "use strict";

  const DEFAULT_LANGUAGE =
    window.CARD_CONFIG &&
    window.CARD_CONFIG.language &&
    window.CARD_CONFIG.language.defaultLanguage
      ? window.CARD_CONFIG.language.defaultLanguage
      : "es";

  const STORAGE_KEY = "iaidPreferredLanguage";

  function getStoredLanguage() {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === "es" || storedLanguage === "en") {
      return storedLanguage;
    }

    return DEFAULT_LANGUAGE === "en" ? "en" : "es";
  }

  function updateLanguageButtons(language) {
    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs) {
      btnEs.classList.toggle("active", language === "es");
      btnEs.setAttribute("aria-pressed", String(language === "es"));
    }

    if (btnEn) {
      btnEn.classList.toggle("active", language === "en");
      btnEn.setAttribute("aria-pressed", String(language === "en"));
    }
  }

  function applyLanguage(language) {
    const safeLanguage = language === "en" ? "en" : "es";

    document.documentElement.lang = safeLanguage;

    document.querySelectorAll(".lang-es").forEach(function (element) {
      element.hidden = safeLanguage !== "es";
    });

    document.querySelectorAll(".lang-en").forEach(function (element) {
      element.hidden = safeLanguage !== "en";
    });

    updateLanguageButtons(safeLanguage);

    window.dispatchEvent(
      new CustomEvent("app:language-changed", {
        detail: {
          language: safeLanguage
        }
      })
    );
  }

  window.setLanguage = function setLanguage(language) {
    const safeLanguage = language === "en" ? "en" : "es";

    localStorage.setItem(STORAGE_KEY, safeLanguage);
    applyLanguage(safeLanguage);
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getStoredLanguage());
  });
})();