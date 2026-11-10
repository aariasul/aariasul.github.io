# IAID - Silvia Herrera Porras (Bartender & Salonera)
Tarjeta Interactiva de Negocios de Alto Rendimiento - Edición Futurista Neon HUD Interface.

## Estructura del Proyecto:
IAID-SHP/
├── index.html                   (Terminal interactiva estilo Neon HUD con radar dinámico)
├── IAID-share.html              (Módulo de compartir autosuficiente con selector internacional)
├── manifest.json                (Configuración PWA standalone)
├── service-worker.js            (Service Worker transparente non-caching)
├── README.txt                   (Instrucciones de verificación)
└── js/
    ├── scriptlanguage.js        (Aislamiento shpLanguage bilingüe ES / EN)
    ├── script.js                (PWA, A2HS para Safari iOS y eventos de pulso HUD)
    └── share.js                 (Aislamiento shp* con autodetección de país por IP y libreta)

## Recursos que debes colocar en la raíz de esta carpeta:
1. `SHP-icon-50x50.png`          (Favicon local)
2. `Siliva_Herrera_Porras.vcf`   (Archivo de contacto vCard)
3. `QR_code.svg`                 (Código QR apuntando a https://inter-activeid.com/IAID-SHP)

## Recursos en la carpeta compartida ../icons/:
- `../icons/SHP-icon-192x192.png`
- `../icons/SHP-icon-512x512.png`
