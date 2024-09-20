let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-container a');
const totalSlides = slides.length;
let slideInterval;

// Show the slide with the fade-in and fade-out effects
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    currentSlide = index;
}

// Move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Show the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Start the carousel with the new animation timing
function startCarousel() {
    slideInterval = setInterval(nextSlide, 6000); // Total animation time (6s)
}

// Stop the carousel on mouseover
function stopCarousel() {
    clearInterval(slideInterval);
}

document.querySelector('.carousel').addEventListener('mouseover', stopCarousel);
document.querySelector('.carousel').addEventListener('mouseout', startCarousel);

// Show the first slide immediately on page load
window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    showSlide(0); // Show the first slide immediately
    startCarousel();
};

// Language selection persistence
function setLanguage(language) {
    const englishTexts = document.querySelectorAll('.lang-en');
    const spanishTexts = document.querySelectorAll('.lang-es');
    
    if (language === 'en') {
        englishTexts.forEach(text => text.style.display = 'block');
        spanishTexts.forEach(text => text.style.display = 'none');
        localStorage.setItem('language', 'en');
        document.getElementById('btn-en').classList.add('active');
        document.getElementById('btn-es').classList.remove('active');
    } else if (language === 'es') {
        englishTexts.forEach(text => text.style.display = 'none');
        spanishTexts.forEach(text => text.style.display = 'block');
        localStorage.setItem('language', 'es');
        document.getElementById('btn-es').classList.add('active');
        document.getElementById('btn-en').classList.remove('active');
    }
}
