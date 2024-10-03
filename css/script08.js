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

// Load language preference on page load
window.onload = function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
};

// Carousel functionality (already provided in your script)
const images = document.querySelectorAll('.carousel img');
let currentIndex = 0;

function showNextImage() {
    const currentImage = images[currentIndex];
    currentImage.classList.remove('active');
    currentImage.classList.add('exit');

    currentIndex = (currentIndex + 1) % images.length;
    const nextImage = images[currentIndex];

    nextImage.classList.add('active');
    nextImage.classList.remove('exit');

    setTimeout(() => {
        currentImage.classList.remove('exit');
    }, 500); // Time for the exit animation to complete
}

setInterval(showNextImage, 3000); // Change image every 3 seconds
