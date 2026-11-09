(function () {
  "use strict";

  const STORAGE_KEY = "soldaduraRiveraLanguage";

  function applyLanguage(language) {
    const isEn = language === "en";
    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    englishTexts.forEach((el) => {
      el.style.display = isEn ? "block" : "none";
    });
    spanishTexts.forEach((el) => {
      el.style.display = isEn ? "none" : "block";
    });

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {}

    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs) {
      btnEs.classList.toggle("selected-lang", !isEn);
    }
    if (btnEn) {
      btnEn.classList.toggle("selected-lang", isEn);
    }

    document.documentElement.lang = language;

    window.dispatchEvent(
      new CustomEvent("app:language-changed", {
        detail: { language }
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
