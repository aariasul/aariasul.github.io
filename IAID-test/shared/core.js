/* ==========================================================================
   IAID SHARED CORE JS
   Accordion click wiring, used on every business card that includes
   .accordion elements (module info panels, "Connect with us", etc.).
   Safe to include even if the page has zero accordions.
   ========================================================================== */

(function () {
  "use strict";

  document.querySelectorAll(".accordion").forEach((accordion) => {
    const button = accordion.querySelector(".accordion-button");

    button?.addEventListener("click", () => {
      const isOpen = accordion.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
})();
