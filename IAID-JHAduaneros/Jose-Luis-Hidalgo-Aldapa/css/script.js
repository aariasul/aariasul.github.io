function generateLinks() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const userLink = document.getElementById('userWhatsappLink');
    const fixedLink = document.getElementById('fixedWhatsappLink');
    const fixedURLLink = document.getElementById('fixedURLLink');
    const personName = document.getElementById('personName').value;

    if (phoneNumber) {
        const userWhatsappURL = `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-JHAduaneros/Jose-Luis-Hidalgo-Aldapa/index.html`;
        const fixedWhatsappURL = `https://wa.me/${phoneNumber}?text=https://inter-activeid.com/IAID-JHAduaneros/Jose-Luis-Hidalgo-Aldapa/Jose_Luis_Hidalgo_Aldapa.pdf`;
        const fixedURLWhatsappURL = `https://wa.me/50683395991?text=Name: ${encodeURIComponent(personName)}%0APhone: ${encodeURIComponent(phoneNumber)}`;

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
    }
}
