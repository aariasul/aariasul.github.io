// FILE: ./css/scriptlanguage.js
// Language selection persistence - Lumi RH

(function () {
  "use strict";

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

      localStorage.setItem("lumiLanguage", "en");

      document.getElementById("btn-en")?.classList.add("selected-lang");
      document.getElementById("btn-es")?.classList.remove("selected-lang");
    } else {
      englishTexts.forEach((text) => {
        text.style.display = "none";
      });

      spanishTexts.forEach((text) => {
        text.style.display = "block";
      });

      localStorage.setItem("lumiLanguage", "es");

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
    const savedLanguage = localStorage.getItem("lumiLanguage") || "es";
    applyLanguage(savedLanguage);
  });
})();