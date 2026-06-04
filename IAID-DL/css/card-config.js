/* ======================
   CARD CONFIG MODULE
====================== */

window.CARD_CONFIG = {
  identity: {
    brandName: {
      enabled: true,
      value: "Obra Maestra"
    },

    personName: {
      enabled: true,
      value: "Daniel López"
    },

    roleEs: {
      enabled: false,
      value: ""
    },

    roleEn: {
      enabled: false,
      value: ""
    },

    logo: {
      enabled: true,
      value: "./Obra-Maestra.svg",
      altEs: "Logo de Obra Maestra",
      altEn: "Obra Maestra logo"
    },

    profileImage: {
      enabled: false,
      value: "",
      altEs: "",
      altEn: ""
    },

    introEs: {
      enabled: false,
      value: ""
    },

    introEn: {
      enabled: false,
      value: ""
    }
  },

  contact: {
    phone: {
      enabled: true,
      value: "50663604774",
      labelEs: "Llamar",
      labelEn: "Call"
    },

    whatsapp: {
      enabled: true,
      value: "50663604774",
      labelEs: "WhatsApp",
      labelEn: "WhatsApp",
      messageEs: "Hola Daniel de Obra Maestra, deseo cotizar lo siguiente:",
      messageEn: "Hello Daniel from Obra Maestra, I would like to quote the following:"
    },

    email: {
      enabled: false,
      value: "",
      labelEs: "Enviar correo",
      labelEn: "Send email"
    },

    website: {
      enabled: false,
      value: "",
      labelEs: "Sitio web",
      labelEn: "Website"
    },

    vcf: {
      enabled: true,
      value: "./Daniel-Lopez.vcf",
      labelEs: "Agregar a contactos",
      labelEn: "Add to contacts"
    },

    location: {
      enabled: false,
      textEs: "",
      textEn: "",
      url: "",
      labelEs: "Ubicación",
      labelEn: "Location"
    }
  },

  social: {
    facebook: {
      enabled: false,
      url: "",
      labelEs: "Facebook",
      labelEn: "Facebook"
    },

    instagram: {
      enabled: false,
      url: "",
      labelEs: "Instagram",
      labelEn: "Instagram"
    },

    tiktok: {
      enabled: false,
      url: "",
      labelEs: "TikTok",
      labelEn: "TikTok"
    },

    linkedin: {
      enabled: false,
      url: "",
      labelEs: "LinkedIn",
      labelEn: "LinkedIn"
    },

    youtube: {
      enabled: false,
      url: "",
      labelEs: "YouTube",
      labelEn: "YouTube"
    },

    googleReview: {
      enabled: false,
      url: "",
      labelEs: "Reseña en Google",
      labelEn: "Google Review"
    }
  },

  share: {
    enabled: true,
    page: "./IAID-share.html",
    notifyPhone: "50663604774",
    storageKey: "dlSavedContactsText",

    cardMessageEs: "Hola. Te comparto la tarjeta interactiva de negocios de Daniel López - Obra Maestra:",
    cardMessageEn: "Hello. I am sharing Daniel López - Obra Maestra's interactive business card:",

    savedListMessageEs: "Lista de contactos guardados desde la tarjeta de Daniel López - Obra Maestra:",
    savedListMessageEn: "Saved contacts list from Daniel López - Obra Maestra's card:"
  },

  language: {
    enabled: true,
    defaultLanguage: "es",
    spanishButton: true,
    englishButton: true
  },

  pwa: {
    enabled: true,
    manifest: "/IAID-DL/manifest.json",
    serviceWorker: "/IAID-DL/service-worker.js",
    icon192: "/icons/DL-icon-192x192.png",
    icon512: "/icons/DL-icon-512x512.png",
    appName: "Daniel López - Obra Maestra",
    shortName: "Obra Maestra",
    themeColor: "#555252",
    backgroundColor: "#000000"
  },

  accordions: {
    section1: {
      enabled: false,
      titleEs: "",
      titleEn: "",
      contentEs: "",
      contentEn: ""
    },

    section2: {
      enabled: false,
      titleEs: "",
      titleEn: "",
      contentEs: "",
      contentEn: ""
    },

    section3: {
      enabled: false,
      titleEs: "",
      titleEn: "",
      contentEs: "",
      contentEn: ""
    },

    section4: {
      enabled: false,
      titleEs: "",
      titleEn: "",
      contentEs: "",
      contentEn: ""
    }
  },

  visual: {
    useAriasValverdeStyle: true,

    primaryColor: {
      enabled: false,
      value: ""
    },

    secondaryColor: {
      enabled: false,
      value: ""
    },

    buttonColor: {
      enabled: false,
      value: ""
    },

    buttonTextColor: {
      enabled: false,
      value: ""
    },

    background: {
      enabled: false,
      value: ""
    },

    svgIconsPath: "../svgicons/"
  }
};