// FILE: ./css/scriptlanguage.js
// Language selection persistence - Inter-ActiveID

(function () {
  "use strict";

  // Clave aislada para la tarjeta de Inter-ActiveID
  const STORAGE_KEY = "iaidLanguage";

  function applyLanguage(language) {
    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    if (language === "en") {
      englishTexts.forEach((text) => {
        text.style.display = "block";
      });

      spanishTexts.forEach((text) => {
        text.style.display = "none";
      });

      try {
        localStorage.setItem(STORAGE_KEY, "en");
      } catch (e) {}

      document.getElementById("btn-en")?.classList.add("selected-lang");
      document.getElementById("btn-es")?.classList.remove("selected-lang");
    } else {
      englishTexts.forEach((text) => {
        text.style.display = "none";
      });

      spanishTexts.forEach((text) => {
        text.style.display = "block";
      });

      try {
        localStorage.setItem(STORAGE_KEY, "es");
      } catch (e) {}

      document.getElementById("btn-es")?.classList.add("selected-lang");
      document.getElementById("btn-en")?.classList.remove("selected-lang");
    }

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