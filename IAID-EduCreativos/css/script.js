function generateLinks() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const userLink = document.getElementById('userWhatsappLink');
    const fixedLink = document.getElementById('fixedWhatsappLink');
    const fixedURLLink = document.getElementById('fixedURLLink');
    const personName = document.getElementById('personName').value;
    const generateButton = document.querySelector('.btn[onclick="generateLinks()"]');

    if (phoneNumber) {
        const userWhatsappURL = `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-EduCreativos/index.html`;
        const fixedWhatsappURL = `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-EduCreativos/IAID-Servicios-EduCreativos.pdf`;
        const fixedURLWhatsappURL = `https://wa.me/50687140187?text=Name: ${encodeURIComponent(personName)}%0APhone: ${encodeURIComponent(phoneNumber)}`;

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
function goBack() { window.history.back(); }






// Add to Home Screen functionality
let deferredPrompt;

// Listen for the beforeinstallprompt event and save it
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired');  // For debugging
    e.preventDefault();
    deferredPrompt = e; // Store the event so it can be triggered later
});

// Function to trigger the install prompt
function addToHomeScreen() {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt to the user
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null; // Reset the prompt
        });
    }
}

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/IAID-EduCreativos/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

