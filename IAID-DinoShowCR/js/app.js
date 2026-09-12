/* ======================
   TRANSLATED ACTION LINKS MODULE
====================== */
(function () {
    const WHATSAPP_PHONE = "50688719692";
    const EMAIL_ADDRESS = "dinoshowcr@gmail.com";

    const messages = {
        es: {
            whatsapp: "Hola Dino Show CR, deseo información sobre:\nMi nombre completo es:\nMi correo es:\nMi celular es:",
            emailSubject: "Hola Dino Show CR, deseo información",
            emailBody: "Mi nombre es:\nMi teléfono es:\nAsunto:"
        },
        en: {
            whatsapp: "Hello Dino Show CR, I would like information about:\nMy full name is:\nMy email is:\nMy phone number is:",
            emailSubject: "Hello Dino Show CR, I would like information",
            emailBody: "My name is:\nMy phone number is:\nSubject:"
        }
    };

    function getCurrentLanguage() {
        return localStorage.getItem("iaid_dinoshowcr_lang") === "en" ? "en" : "es";
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

        if (mainWhatsappButton) mainWhatsappButton.href = whatsappUrl;
        if (connectWhatsappButton) connectWhatsappButton.href = whatsappUrl;
        if (mainEmailButton) mainEmailButton.href = emailUrl;
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

    if (!backdrop || !modal) return;

    backdrop.classList.add("is-visible");
    backdrop.setAttribute("aria-hidden", "false");

    document.addEventListener("keydown", onEscClose);

    const closeButton = modal.querySelector(".ios-a2hs-close");
    if (closeButton) closeButton.focus();
}

function onEscClose(event) {
    if (event.key === "Escape") closeIosA2HS();
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
        localStorage.setItem("iaid_dinoshowcr_lang", selectedLanguage);

        const spanishButton = document.getElementById("btn-es");
        const englishButton = document.getElementById("btn-en");

        if (spanishButton) spanishButton.classList.toggle("selected-lang", selectedLanguage === "es");
        if (englishButton) englishButton.classList.toggle("selected-lang", selectedLanguage === "en");

        window.dispatchEvent(new CustomEvent("app:language-changed", {
            detail: { language: selectedLanguage }
        }));
    }

    window.setLanguage = applyLanguage;

    document.addEventListener("DOMContentLoaded", function () {
        const savedLanguage = localStorage.getItem("iaid_dinoshowcr_lang") === "en" ? "en" : "es";
        applyLanguage(savedLanguage);
    });
})();

/* ====================================================
   ACCORDION CAROUSEL LOGIC (AUTO-PLAYING ACTIVE VIDEOS)
==================================================== */
function updateCarouselHeight(carousel, activeIndex) {
    const slides = carousel.querySelectorAll(".carousel-slide");
    if (!slides[activeIndex]) return;
    const media = slides[activeIndex].querySelector("img, video");
    if (media && media.clientHeight > 0) {
        carousel.style.height = media.clientHeight + "px";
    }
}

function handleCarouselVideoPlayback(container, activeIndex) {
    const slides = container.querySelectorAll(".carousel-slide");
    slides.forEach((slide, idx) => {
        const video = slide.querySelector("video");
        if (!video) return;

        if (idx === activeIndex) {
            // Autoplay active slide (must remain muted for cross-browser policy)
            video.muted = true;
            video.playsInline = true;
            video.play().catch(function () {});
        } else {
            video.pause();
        }
    });
}

window.moveCarousel = function (carouselId, direction) {
    const container = document.getElementById(carouselId);
    if (!container) return;
    const track = container.querySelector(".carousel-track");
    const slides = container.querySelectorAll(".carousel-slide");
    const slideWidth = track.clientWidth;
    const totalSlides = slides.length;

    let currentIndex = Math.round(track.scrollLeft / slideWidth);
    let nextIndex = currentIndex + direction;

    if (nextIndex >= totalSlides) {
        nextIndex = 0;
    } else if (nextIndex < 0) {
        nextIndex = totalSlides - 1;
    }

    track.scrollTo({ left: slideWidth * nextIndex, behavior: "smooth" });
    updateCarouselHeight(container, nextIndex);
    handleCarouselVideoPlayback(container, nextIndex);
};

window.goToSlide = function (carouselId, index) {
    const container = document.getElementById(carouselId);
    if (!container) return;
    const track = container.querySelector(".carousel-track");
    const slideWidth = track.clientWidth;

    track.scrollTo({ left: slideWidth * index, behavior: "smooth" });
    updateCarouselHeight(container, index);
    handleCarouselVideoPlayback(container, index);
};

document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".iaid-carousel");
    
    carousels.forEach(function (carousel) {
        const track = carousel.querySelector(".carousel-track");
        const indicators = carousel.querySelectorAll(".indicator");
        const mediaElements = carousel.querySelectorAll(".carousel-slide img, .carousel-slide video");
        if (!track) return;

        mediaElements.forEach(function (media) {
            const update = function () {
                const activeIndex = Math.round(track.scrollLeft / track.clientWidth) || 0;
                updateCarouselHeight(carousel, activeIndex);
            };

            if (media.tagName.toLowerCase() === "img") {
                media.addEventListener("load", update);
            } else if (media.tagName.toLowerCase() === "video") {
                media.addEventListener("loadedmetadata", update);
                media.addEventListener("loadeddata", update);
            }
        });

        let scrollTimer = null;
        track.addEventListener("scroll", function () {
            const slideWidth = track.clientWidth;
            if (!slideWidth) return;
            const activeIndex = Math.round(track.scrollLeft / slideWidth);
            
            indicators.forEach(function (dot, idx) {
                dot.classList.toggle("active", idx === activeIndex);
            });

            updateCarouselHeight(carousel, activeIndex);

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                handleCarouselVideoPlayback(carousel, activeIndex);
            }, 100);
        }, { passive: true });
    });

    document.querySelectorAll(".content-accordion").forEach(function (accordion) {
        accordion.addEventListener("toggle", function () {
            if (accordion.open) {
                const carousel = accordion.querySelector(".iaid-carousel");
                if (carousel) {
                    const track = carousel.querySelector(".carousel-track");
                    const activeIndex = Math.round(track.scrollLeft / track.clientWidth) || 0;
                    setTimeout(function () {
                        updateCarouselHeight(carousel, activeIndex);
                        handleCarouselVideoPlayback(carousel, activeIndex);
                    }, 80);
                }
            } else {
                const videos = accordion.querySelectorAll(".carousel-slide video");
                videos.forEach(v => v.pause());
            }
        });
    });
});

/* ======================
   VIDEO MODAL MODULE
====================== */
window.openVideoModal = function () {
    const backdrop = document.getElementById("video-modal-backdrop");
    const video = document.getElementById("modalVideoPlayer");
    if (!backdrop || !video) return;

    backdrop.classList.add("is-visible");
    backdrop.setAttribute("aria-hidden", "false");
    video.currentTime = 0;
    video.play().catch(function () {});

    document.addEventListener("keydown", onVideoEscClose);
};

window.closeVideoModal = function () {
    const backdrop = document.getElementById("video-modal-backdrop");
    const video = document.getElementById("modalVideoPlayer");
    if (!backdrop || !video) return;

    video.pause();
    backdrop.classList.remove("is-visible");
    backdrop.setAttribute("aria-hidden", "true");

    document.removeEventListener("keydown", onVideoEscClose);
};

window.handleBackdropClick = function (event) {
    if (event.target.id === "video-modal-backdrop") {
        closeVideoModal();
    }
};

function onVideoEscClose(event) {
    if (event.key === "Escape") {
        closeVideoModal();
    }
}