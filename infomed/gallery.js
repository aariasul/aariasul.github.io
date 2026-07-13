/* ==========================================================================
   IAID SHARED GALLERY MODULE - JS
   Drives one or more .gallery carousels: prev/next navigation, autoplay
   with play/pause toggle, and pausing any playing <video> slide when the
   carousel moves away from it. Safe to include even if the page has no
   .gallery elements (each instance just isn't found and is skipped).
   ========================================================================== */

(function () {
  "use strict";

  const AUTOPLAY_INTERVAL_MS = 4500;

  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const track = gallery.querySelector(".gallery-track");
    const slides = Array.from(gallery.querySelectorAll(".gallery-slide"));
    const prevButton = gallery.querySelector(".gallery-prev");
    const nextButton = gallery.querySelector(".gallery-next");
    const toggleButton = gallery.querySelector(".gallery-toggle");

    if (!track || slides.length === 0) return;

    let currentIndex = Math.max(
      slides.findIndex((slide) => slide.classList.contains("is-active")),
      0
    );
    let autoplayTimer = null;
    let isPlaying = true;

    function goTo(index) {
      const total = slides.length;
      currentIndex = ((index % total) + total) % total;

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, i) => {
        const isActive = i === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));

        // Pause any video slide that's no longer active so it doesn't keep
        // playing audio/decoding frames off-screen.
        const video = slide.querySelector("video");
        if (video && !isActive && !video.paused) {
          video.pause();
        }
      });
    }

    function next() {
      goTo(currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex - 1);
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = window.setInterval(next, AUTOPLAY_INTERVAL_MS);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function setPlaying(playing) {
      isPlaying = playing;

      if (toggleButton) {
        toggleButton.setAttribute("aria-label", playing ? "Pause" : "Play");
        toggleButton.textContent = playing ? "\u275A\u275A" : "\u25B6";
      }

      if (playing) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    }

    prevButton?.addEventListener("click", () => {
      prev();
      if (isPlaying) startAutoplay(); // restart the autoplay countdown
    });

    nextButton?.addEventListener("click", () => {
      next();
      if (isPlaying) startAutoplay(); // restart the autoplay countdown
    });

    toggleButton?.addEventListener("click", () => {
      setPlaying(!isPlaying);
    });

    // Pause autoplay while a video slide is actually playing, so it isn't
    // interrupted mid-playback; resume once that video ends or is paused.
    slides.forEach((slide) => {
      const video = slide.querySelector("video");
      if (!video) return;

      video.addEventListener("play", stopAutoplay);
      video.addEventListener("pause", () => {
        if (isPlaying) startAutoplay();
      });
      video.addEventListener("ended", () => {
        if (isPlaying) next();
      });
    });

    goTo(currentIndex);
    setPlaying(true);
  });
})();