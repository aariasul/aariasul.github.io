# Reanudar invitación de boda — Paola & Giancarlo

> Usa este texto como **prompt** al abrir un chat nuevo.  
> **Paso 1:** Adjunta `wedding-invitation-spec.md` (la última versión).  
> **Paso 2:** Pega este bloque, **rellena los blancos** y envíalo.

---

## Contexto
Adjunto `wedding-invitation-spec.md` actualizado.  
Base: **HTML/CSS/JS**, fuentes **Quicksand** (base) y **Pinyon Script** (títulos).  
Configuración dinámica: `config.json` + `config-loader.js`.

## Estado local
- Servidor local (sí/no): ____  Puerto: ____  Navegador: ____
- Carpeta del proyecto (opcional): ____
- Cambios desde la última vez (resumen):
  - [ ] ____
  - [ ] ____

## Archivos adjuntos hoy
- [ ] `index.html`
- [ ] `config.json` (si cambió la fecha/lugares/teléfono)
- [ ] Capturas de error (opcional)

## Lo que quiero ahora
1) ____
2) ____
3) ____

## Reglas / Preferencias (mantener)
- Control de audio **dual** (desktop/móvil).
- Animación de nombres: **fadeIn 2s** + **rise 3s** con **delay 4s** tras cargar el hero.
- **Countdown**: en **una fila** en móvil (4 columnas).
- Imágenes **JPG/PNG/SVG** (sin AVIF/WebP).
- Bordes redondeados **18px** en fotos grandes (hero, left, right, hero2).
- Botones **Waze/Maps** con deep links + fallback, leyendo de `config.json`.
- A11Y formulario: `aria-*`, mensajes con `aria-live`; RSVP **sin tope** y pluralización en WhatsApp.
- `overflow-x: hidden` (evitar scroll horizontal).

## Datos clave (si cambiaron, completa)
- `date.iso`: ____   (ej: `2025-10-25T10:00:00-06:00`)
- `date.readable`: ____   (ej: `25 de octubre de 2025 • 10:00 a. m.`)
- `rsvp.phone`: ____
- `church.label`: ____  | `church.query`: ____
- `reception.label`: ____  | `reception.query`: ____

## Checklist de verificación rápida
- [ ] `config.json` está junto a `index.html`
- [ ] `<script src="config-loader.js" defer>` está en `<head>`
- [ ] Recarga fuerte hecha (**Ctrl/Cmd + Shift + R**)
- [ ] Deep links funcionan (Waze/Maps) con los valores actuales
- [ ] Audio reproduce tras interacción

---

*(Plantilla generada: 2025-08-30 05:12:35)*
