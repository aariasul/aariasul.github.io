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


