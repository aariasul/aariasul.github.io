# IAID - Soldadura Rivera / Riverwelds
Proyecto generado siguiendo la Guía Maestra v3.0 de Inter-ActiveID.

## Estructura de Archivos
- `index.html`: Tarjeta interactiva con efecto de chispas en botones y retardo controlado de navegación.
- `IAID-share.html`: Motor autosuficiente con estilos integrados, selector internacional, candados SVG y modal QR.
- `manifest.json`: Configurado en modo standalone apuntando a `../icons/soldadura-rivera-icon-*.png`.
- `service-worker.js`: Service worker transparente non-caching.
- `js/scriptlanguage.js`: Lógica de persistencia de idioma con clave aislada `soldaduraRiveraLanguage`.
- `js/script.js`: Instalación PWA, modal A2HS para Safari iOS y despachador de chispas.
- `js/share.js`: Motor de envío, país y libreta local protegida aislada con `soldaduraRivera*`.

## Recursos Gráficos que debes colocar en la raíz de esta carpeta:
1. `Soldadura-Rivera-icon-512x512.svg` (Logotipo vectorial de cabecera)
2. `Soldadura-Rivera-icon-50x50.png` (Favicon local)
3. `Eddie-Rivera-saco.png` (Fotografía de perfil)
4. `bgrw.jpg` (Imagen de fondo)
5. `QR_code.svg` (Código QR exclusivo apuntando a la URL del cliente)
6. `Soldadura_Rivera.vcf` (Contacto vCard)

## Recursos en la carpeta compartida ../icons/:
- `../icons/soldadura-rivera-icon-192x192.png`
- `../icons/soldadura-rivera-icon-512x512.png`
