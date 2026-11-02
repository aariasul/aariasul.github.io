(function () {
  "use strict";

  const STORAGE_KEY = "dlLanguage";

  function applyLanguage(language) {
    const isEn = language === "en";
    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    englishTexts.forEach(function (el) {
      el.hidden = !isEn;
    });
    spanishTexts.forEach(function (el) {
      el.hidden = isEn;
    });

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {}

    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs) {
      btnEs.classList.toggle("active", !isEn);
      btnEs.setAttribute("aria-pressed", String(!isEn));
    }
    if (btnEn) {
      btnEn.classList.toggle("active", isEn);
      btnEn.setAttribute("aria-pressed", String(isEn));
    }

    document.documentElement.lang = language;

    window.dispatchEvent(
      new CustomEvent("app:language-changed", {
        detail: { language: language }
      })
    );
  }

  window.setLanguage = function setLanguage(language) {
    if (language !== "en" && language !== "es") {
      language = "es";
    }
    applyLanguage(language);
  };

  document.addEventListener("DOMContentLoaded", function () {
    let savedLanguage = "es";
    try {
      savedLanguage = localStorage.getItem(STORAGE_KEY) || "es";
    } catch (e) {}
    applyLanguage(savedLanguage);
  });
})();