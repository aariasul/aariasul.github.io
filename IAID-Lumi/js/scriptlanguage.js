(function () {
  "use strict";

  const STORAGE_KEY = "lumiLanguage";

  function applyLanguage(language) {
    const selectedLanguage = language === "en" ? "en" : "es";
    const htmlLang = selectedLanguage === "en" ? "en" : "es-419";

    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    englishTexts.forEach((el) => {
      el.style.display = selectedLanguage === "en" ? "inline" : "none";
    });

    spanishTexts.forEach((el) => {
      el.style.display = selectedLanguage === "es" ? "inline" : "none";
    });

    try {
      localStorage.setItem(STORAGE_KEY, selectedLanguage);
    } catch (e) {}

    const btnEs = document.getElementById("btn-es");
    const btnEn = document.getElementById("btn-en");

    if (btnEs) btnEs.classList.toggle("selected-lang", selectedLanguage === "es");
    if (btnEn) btnEn.classList.toggle("selected-lang", selectedLanguage === "en");

    document.documentElement.lang = htmlLang;

    window.dispatchEvent(
      new CustomEvent("app:language-changed", {
        detail: { language: selectedLanguage }
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