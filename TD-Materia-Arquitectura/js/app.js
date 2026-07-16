/* ======================
   TRANSLATED ACTION LINKS MODULE
====================== */
(function () {
    const WHATSAPP_PHONE = "50683384172";
    const EMAIL_ADDRESS = "cesar.porras@materiarquitectura.com";

    const messages = {
        es: {
            whatsapp: "Saludos César de Materia Arquitectura.\nDeseo saber más.\nMi nombre completo es:\nMi correo es:\nMi celular es:",
            emailSubject: "César, por favor contácteme.",
            emailBody: "Mi nombre es:\nMi teléfono es:\nAsunto:"
        },
        en: {
            whatsapp: "Hello César from Materia Arquitectura.\nI would like to know more.\nMy full name is:\nMy email is:\nMy phone number is:",
            emailSubject: "César, please contact me.",
            emailBody: "My name is:\nMy phone number is:\nSubject:"
        }
    };

    function getCurrentLanguage() {
        return localStorage.getItem("materiaLanguage") === "en" ? "en" : "es";
    }

    function buildWhatsappUrl(phone, message) {
        return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    }

    function buildMailtoUrl(email, subject, body) {
        return "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }

    function updateTranslatedActionLinks() {
        const language = getCurrentLanguage();
        const copy = messages[language];

        const mainWhatsappButton = document.getElementById("mainWhatsappButton");
        const connectWhatsappButton = document.getElementById("connectWhatsappButton");
        const mainEmailButton = document.getElementById("mainEmailButton");

        const whatsappUrl = buildWhatsappUrl(WHATSAPP_PHONE, copy.whatsapp);
        const emailUrl = buildMailtoUrl(EMAIL_ADDRESS, copy.emailSubject, copy.emailBody);

        if (mainWhatsappButton) {
            mainWhatsappButton.href = whatsappUrl;
        }

        if (connectWhatsappButton) {
            connectWhatsappButton.href = whatsappUrl;
        }

        if (mainEmailButton) {
            mainEmailButton.href = emailUrl;
        }
    }

    document.addEventListener("DOMContentLoaded", updateTranslatedActionLinks);
    window.addEventListener("app:language-changed", updateTranslatedActionLinks);
})();

/* ======================
   ADD TO HOME SCREEN MODULE
====================== */
let deferredPrompt = null;

window.goBack = function goBack() {
    window.history.back();
};

function isIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandaloneIOS() {
    return window.navigator.standalone === true;
}

function openIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");
    const modal = document.getElementById("ios-a2hs-modal");

    if (!backdrop || !modal) {
        return;
    }

    backdrop.classList.add("is-visible");
    backdrop.setAttribute("aria-hidden", "false");

    document.addEventListener("keydown", onEscClose);

    const closeButton = modal.querySelector(".ios-a2hs-close");
    if (closeButton) {
        closeButton.focus();
    }
}

function onEscClose(event) {
    if (event.key === "Escape") {
        closeIosA2HS();
    }
}

window.closeIosA2HS = function closeIosA2HS() {
    const backdrop = document.getElementById("ios-a2hs-backdrop");

    if (!backdrop) {
        return;
    }

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

        deferredPrompt.userChoice.finally(function () {
            deferredPrompt = null;
        });

        return;
    }

    if (isIOS()) {
        openIosA2HS();
        return;
    }

    alert(
        document.documentElement.lang === "en"
            ? "If your browser supports installation, use the browser menu and select Add to Home Screen."
            : "Si su navegador permite instalación, use el menú del navegador y seleccione Agregar a pantalla de inicio."
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

/* ======================
   LANGUAGE MODULE
====================== */
(function () {
    function applyLanguage(language) {
        const selectedLanguage = language === "en" ? "en" : "es";
        const htmlLanguage = selectedLanguage === "en" ? "en" : "es-419";

        document.documentElement.lang = htmlLanguage;
        localStorage.setItem("materiaLanguage", selectedLanguage);

        const spanishButton = document.getElementById("btn-es");
        const englishButton = document.getElementById("btn-en");

        if (spanishButton) {
            spanishButton.classList.toggle("selected-lang", selectedLanguage === "es");
        }

        if (englishButton) {
            englishButton.classList.toggle("selected-lang", selectedLanguage === "en");
        }

        window.dispatchEvent(new CustomEvent("app:language-changed", {
            detail: {
                language: selectedLanguage
            }
        }));
    }

    window.setLanguage = applyLanguage;

    document.addEventListener("DOMContentLoaded", function () {
        const savedLanguage = localStorage.getItem("materiaLanguage") === "en" ? "en" : "es";
        applyLanguage(savedLanguage);
    });
})();