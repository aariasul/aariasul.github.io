function setLanguage(language) {
    const englishTexts = document.querySelectorAll('.lang-en');
    const spanishTexts = document.querySelectorAll('.lang-es');
    
    if (language === 'en') {
        englishTexts.forEach(text => text.style.display = 'block');
        spanishTexts.forEach(text => text.style.display = 'none');
    } else if (language === 'es') {
        englishTexts.forEach(text => text.style.display = 'none');
        spanishTexts.forEach(text => text.style.display = 'block');
    }
}

// Set default language to English
setLanguage('en');

