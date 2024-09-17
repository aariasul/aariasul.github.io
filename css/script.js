// Translations for English and Spanish
const translations = {
    en: {
        welcomeMessage: "Welcome to Inter-ActiveID, keeping contact thru technology",
        heroTitle: "Welcome to Our Product Page",
        heroDescription: "Explore our latest offerings below!",
        product01: {
            description1: "Inter-ActiveID is the logical replacement for old paper business cards.",
            description2: "It is a tool to promote and highlight your business in the globalized world.",
            description3: "Share it through virtual media platforms, website, social networks or any other digital way.",
            qrCode: "Scan this QR code (or click on it) for more information:"
        },

        product02: {
            description1: "Infomed is a system that allows the caregiver or rescuer to contact individuals designated as the clients' emergency contacts by various means such as:",
            description2: "Whatsapp, phone call or email",
            description3: "What suits you best, a T-shirt, a chain with a medal or a bracelet?",
            qrCode: "Scan this QR code (or click on it) for more information:"
        },

        product03: {
            description1: "The 🐈🐈Happy Pet Found🐕🐕 plate is a device that allows anyone who finds your pet to contact you immediately by reading the unique QR code to identify your lost friend.",
            description2: "",
            description3: "",
            qrCode: "Scan this QR code (or click on it) for more information:"
        },
        
        product04: {
            description1: "Invite-U-2 my special event!",
            description2: "Add your favorite music, a countdown timer, and more.",
            description3: "",
            qrCode: "Scan this QR code (or click on it) for more information:"
        },
		
        contactUs: "Contact Us",
        email: "Email: info@company.com",
        phone: "Phone: +1 123 456 7890"
    },
    es: {
        welcomeMessage: "Bienvenido a Inter-ActiveID, manteniendo el contacto a través de la tecnología",
        heroTitle: "Bienvenido a Nuestra Página de Productos",
        heroDescription: "¡Explore nuestras últimas ofertas a continuación!",
        product01: {
            description1: "Inter-ActiveID es el reemplazo lógico de las viejas tarjetas de visita en papel.",
            description2: "Es una herramienta para promocionar y destacar su negocio en el mundo globalizado.",
            description3: "Comparta su información a través de plataformas virtuales, redes sociales o cualquier otro medio digital.",
            qrCode: "Escanea este código QR (o haz clic en él) para obtener más información:"
        },

        product02: {
            description1: "Infomed es un sistema que permite al cuidador o rescatista contactar a las personas designadas como contactos de emergencia de los clientes por diversos medios como:",
            description2: "Whatsapp, llamada o correo electrónico",
            description3: "",
            qrCode: "Escanea este código QR (o haz clic en él) para obtener más información:"
        },

        product03: {
            description1: "La placa 🐈🐈Happy Pet Found🐕🐕 permite a cualquiera que encuentre tu mascota contactar contigo leyendo su código QR único.",
            description2: "",
            description3: "",
            qrCode: "Escanea este código QR para más información:"
        },
		
        product04: {
            description1: "¡Invita a tu evento especial con Invite-U-2!",
            description2: "Añade música, un temporizador de cuenta regresiva y más.",
            description3: "",
            qrCode: "Escanea este código QR para más información:"
        },
		
        contactUs: "Contáctenos",
        email: "Correo electrónico: info@company.com",
        phone: "Teléfono: +1 123 456 7890"
    }
};

// Function to switch the language and update text content
function setLanguage(language) {
    // Save selected language in localStorage
    localStorage.setItem('selectedLanguage', language);

    // Update text content dynamically
    document.getElementById('welcome-message').textContent = translations[language].welcomeMessage;
    document.querySelector('.hero-content h2').textContent = translations[language].heroTitle;
    document.querySelector('.hero-content p').textContent = translations[language].heroDescription;

    // Update Product 01 texts
    const product01 = translations[language].product01;
    const product01Elem = document.querySelector('.product01');
    product01Elem.children[1].textContent = product01.description1;
    product01Elem.children[2].textContent = product01.description2;
    product01Elem.children[3].textContent = product01.description3;
    product01Elem.children[4].textContent = product01.qrCode;

    // Update Product 02 texts
    const product02 = translations[language].product02;
    const product02Elem = document.querySelector('.product02');
    product02Elem.children[1].textContent = product02.description1;
    product02Elem.children[4].textContent = product02.qrCode;

    // Update Product 03 texts
    const product03 = translations[language].product03;
    const product03Elem = document.querySelector('.product03');
    product03Elem.children[1].textContent = product03.description1;
    product03Elem.children[3].textContent = product03.qrCode;

    // Update Product 04 texts
    const product04 = translations[language].product04;
    const product04Elem = document.querySelector('.product04');
    product04Elem.children[1].textContent = product04.description1;
    product04Elem.children[2].textContent = product04.description2;
    product04Elem.children[4].textContent = product04.qrCode;

    // Update Contact Us section
    document.querySelector('.contact-section h3').textContent = translations[language].contactUs;
    document.querySelector('.contact-section p').textContent = translations[language].email;
    document.querySelector('.contact-section p:nth-child(3)').textContent = translations[language].phone;
}

// Load saved language from localStorage (if available) or set default to English
window.onload = function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setLanguage(savedLanguage);
};
