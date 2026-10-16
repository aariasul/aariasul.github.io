(function () {
  "use strict";

  const STORAGE_KEY = "artaviaCoLanguage";

  function applyLanguage(language) {
    const isEn = language === "en";
    const englishTexts = document.querySelectorAll(".lang-en");
    const spanishTexts = document.querySelectorAll(".lang-es");

    englishTexts.forEach((el) => { el.style.display = isEn ? "block" : "none"; });
    spanishTexts.forEach((el) => { el.style.display = isEn ? "none" : "block"; });

    try { localStorage.setItem(STORAGE_KEY, language); } catch (e) {}

    const langCheckbox = document.getElementById("langCheckbox");
    const langSwitch = document.getElementById("langSwitch");
    const tagEs = document.getElementById("tag-es");
    const tagEn = document.getElementById("tag-en");

    if (langCheckbox && langSwitch) {
      langCheckbox.checked = isEn;
      langSwitch.classList.toggle("is-on", isEn);
    }
    if (tagEs && tagEn) {
      tagEs.classList.toggle("active", !isEn);
      tagEn.classList.toggle("active", isEn);
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

    const langCheckbox = document.getElementById("langCheckbox");
    if (langCheckbox) {
      langCheckbox.addEventListener("change", function () {
        const nextLang = this.checked ? "en" : "es";
        applyLanguage(nextLang);
      });
    }
  });
})();
