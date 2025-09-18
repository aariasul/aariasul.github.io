# Mini Restart Template — Invitaciones
**Versión:** v1.4 — Septiembre 2025

## Pasos rápidos para reinicio del sistema

1. **Abrir Google Sheet “Invitados”.**
   - Columnas A–C: Nombre, Teléfono (opcional), Cupo.
   - Columnas D–I: Generadas automáticamente.

2. **Menú RSVP (personalizado en la hoja):**
   - `Generar tokens y links`: Crea tokens y enlaces personalizados (columna I).
   - `Agregar invitado…`: Añadir uno manual (teléfono opcional).
   - `Agregar múltiples…`: Pegar varios a la vez (nombre, teléfono opcional, cupo).
   - `Reset SOLO tokens/confirmaciones (D–I)`: Limpia confirmaciones y tokens, conserva A–C.
   - `Reset TOTAL`: Limpia todo excepto encabezados.

3. **Enviar invitaciones:**
   - Columna J contiene botones de WhatsApp con el texto preformateado:
     ```
     Te invitamos a nuestra boda.
     Paola y Giancarlo.
     <enlace personalizado>
     ```
   - Cliente solo debe dar clic y enviar.

4. **Confirmaciones:**
   - Invitado abre link personalizado con token (?t=).
   - Selecciona el total de asistentes (incluyéndose).
   - Mensaje visible en la página:
     - Al inicio: *“Confirma el número de asistentes incluyéndote…”*
     - Al confirmar: *“Confirmaste tu asistencia y la de X invitado(s).”*

5. **WhatsApp al organizador:**
   - Invitado puede dar clic en “Avisar por WhatsApp” para enviar mensaje directo al número configurado en `config.json`.

## Recordatorios importantes
- Siempre actualizar el Web App (`Deploy → Manage deployments → Update`) después de cambiar `Code.gs`.
- Verificar que `rsvp.endpoint` en `config.json` tenga la URL terminada en `/exec`.
- No compartir enlaces sin token, no funcionarán para confirmar.
