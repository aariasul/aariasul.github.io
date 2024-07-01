function generateLinks() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const userLink = document.getElementById('userWhatsappLink');
    const fixedLink = document.getElementById('fixedWhatsappLink');
    const personName = document.getElementById('personName').value;

    if (phoneNumber) {
        const userWhatsappURL = `https://wa.me/${phoneNumber}?text=IAID`;
        const fixedWhatsappURL = `https://wa.me/50660405878?text=IAID`;

        userLink.href = userWhatsappURL;
        fixedLink.href = fixedWhatsappURL;

        userLink.textContent = `Send a WhatsApp message to ${phoneNumber}`;
        userLink.classList.remove('hidden');
        userLink.classList.add('visible');

        fixedLink.classList.remove('hidden');
        fixedLink.classList.add('visible');
    }
}
