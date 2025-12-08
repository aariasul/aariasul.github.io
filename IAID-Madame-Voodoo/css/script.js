function generateLinks() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const userLink = document.getElementById('userWhatsappLink');
    const fixedLink = document.getElementById('fixedWhatsappLink');
    const fixedURLLink = document.getElementById('fixedURLLink');
    const personName = document.getElementById('personName').value;
    const generateButton = document.querySelector('.btn[onclick="generateLinks()"]');

    if (phoneNumber) {
        const userWhatsappURL = `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-Madame-Voodoo/index.html`;
        const fixedWhatsappURL = `https://wa.me/${phoneNumber}?t...//inter-activeid.com/IAID-Madame-Voodoo/IAID-Madame-Voodoo.pdf`;
        const fixedURLWhatsappURL = `https://wa.me/50663570193?t...onent(personName)}%0APhone: ${encodeURIComponent(phoneNumber)}`;

        userLink.href = userWhatsappURL;
        fixedLink.href = fixedWhatsappURL;
        fixedURLLink.href = fixedURLWhatsappURL;

        userLink.textContent = `Enviar enlace IAID`;
        userLink.classList.remove('hidden-btn');
        userLink.classList.add('visible-btn');

        fixedLink.textContent = `Enviar PDF`;
        fixedLink.classList.remove('hidden-btn');
        fixedLink.classList.add('visible-btn');

        fixedURLLink.classList.remove('hidden-btn');
        fixedURLLink.classList.add('visible-btn');

        // Hide the "Generate Links" button
        generateButton.style.display = 'none';
    }
}

// go back button
function goBack() { 
    window.history.back(); 
}

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/IAID-Madame-Voodoo/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}
