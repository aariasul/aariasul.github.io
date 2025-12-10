// script.js
// Funciones para IAID-share (generar links de WhatsApp) + registro de Service Worker
// SIN lógica de Add to Home Screen (eso vive en index.html)

function generateLinks() {
    const phoneNumber    = document.getElementById('phoneNumber').value;
    const userLink       = document.getElementById('userWhatsappLink');
    const fixedLink      = document.getElementById('fixedWhatsappLink');
    const fixedURLLink   = document.getElementById('fixedURLLink');
    const personName     = document.getElementById('personName').value;
    const generateButton = document.querySelector('.btn[onclick="generateLinks()"]');

    if (phoneNumber) {
        // Enlace para enviar la IAID (tarjeta interactiva)
        const userWhatsappURL =
            `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-Madame-Voodoo/index.html`;

        // Enlace para enviar el PDF
        const fixedWhatsappURL =
            `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-Madame-Voodoo/IAID-Madame-Voodoo.pdf`;

        // Enlace para enviarte nombre + teléfono a tu propio WhatsApp
        const fixedURLWhatsappURL =
            `https://wa.me/50663570193?text=Name: ${encodeURIComponent(personName)}%0APhone: ${encodeURIComponent(phoneNumber)}`;

        userLink.href = userWhatsappURL;
        fixedLink.href = fixedWhatsappURL;
        fixedURLLink.href = fixedURLWhatsappURL;

        userLink.textContent = 'Enviar enlace IAID';
        userLink.classList.remove('hidden-btn');
        userLink.classList.add('visible-btn');

        fixedLink.textContent = 'Enviar PDF';
        fixedLink.classList.remove('hidden-btn');
        fixedLink.classList.add('visible-btn');

        fixedURLLink.classList.remove('hidden-btn');
        fixedURLLink.classList.add('visible-btn');

        // Ocultar el botón "Generate Links"
        if (generateButton) {
            generateButton.style.display = 'none';
        }
    }
}

// Botón "volver" en IAID-share
function goBack() {
    window.history.back();
}

// Registrar el Service Worker (para que la tarjeta sea instalable)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/IAID-Madame-Voodoo/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service Worker registration failed:', error);
        });
}
