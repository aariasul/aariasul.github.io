# Wedding Invitation Spec (Paola & Giancarlo)
**Versión:** v1.4 — Septiembre 2025

## Descripción
Sistema de invitación digital personalizada con Google Sheets + Apps Script como backend y HTML/CSS/JS como frontend. Permite generar enlaces únicos con token para cada invitado, gestionar confirmaciones (RSVP) y enviar notificaciones vía WhatsApp.

## Componentes
- **Frontend (index.html):** Página responsive con música, hero, countdown, secciones de ceremonia/recepción, vestimenta, y RSVP dinámico.
- **config.json:** Configuración dinámica (nombres, fecha, ubicaciones, deadline, endpoint, teléfono organizador).
- **Backend (Code.gs en Apps Script):**
  - Generación de tokens únicos y enlaces personalizados.
  - Endpoints:
    - `GET ?action=lookup&token=...` → Devuelve info de invitado.
    - `POST action=confirm&token=...&acompanantes=...` → Registra confirmación.
  - Funciones de menú: generar tokens, reset total, reset solo tokens, agregar invitado individual, agregar múltiples invitados.

## Flujo
1. Cliente ingresa invitados en Google Sheet (nombre, teléfono opcional, cupo).
2. Menú **RSVP → Generar tokens y links** asigna tokens únicos y genera URLs.
3. Columna **J** contiene botones de WhatsApp listos con mensaje:
   ```
   Te invitamos a nuestra boda.
   Paola y Giancarlo.
   <enlace personalizado>
   ```
4. Invitado abre enlace → página con token pre-cargado.
5. Invitado confirma número total de asistentes (incluido él mismo).
6. Confirmación se registra en Google Sheet (acompañantes confirmados, total, timestamp).
7. Invitado puede usar botón “Avisar por WhatsApp” que abre conversación al organizador con mensaje de confirmación.

## Textos personalizados (v1.4)
- Mensaje inicial al abrir RSVP:
  ```
  Confirma el número de asistentes incluyéndote: (número total de asistentes incluyendo al invitado)
  ```
- Mensaje al confirmar:
  ```
  Confirmaste tu asistencia y la de X invitado(s).
  ```
- Mensaje de WhatsApp al organizador:
  ```
  Hola, soy [Nombre]. Confirmo mi asistencia y la de [N] invitado(s).
  ```

## Recordatorios de despliegue del Web App
- Cada vez que edites `Code.gs`, recuerda ir a **Deploy → Manage deployments → Update Web App**.
- El Web App debe estar configurado como **“Anyone with the link”**.
- Pega la URL terminada en `/exec` en `config.json` como `rsvp.endpoint`.
- Si el endpoint cambia, los enlaces dejarán de funcionar hasta que actualices `config.json`.

