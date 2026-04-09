# 📘 Formulario Interactivo de Bodas (turn.js) — Estado Actual COMPLETO

---

## 🎯 OBJETIVO DEL PROYECTO

Desarrollar un formulario interactivo tipo **flipbook premium** para clientes finales (mobile-first), que permita:

- navegación libre entre secciones
- guardado automático del progreso
- validación inteligente al final
- experiencia visual moderna (glass UI)
- escalabilidad a múltiples filminas (20+)

---

# ✅ ESTADO ACTUAL (FUNCIONANDO)

---

## 🧭 NAVEGACIÓN

### Implementado con:
- turn.js (display: single)
- botones laterales (prev/next)
- menú superior (overlay)
- stepper inferior

### Comportamiento:
- navegación completamente libre
- NO hay bloqueo por validación
- fluido tipo app

---

## 🎨 UI / UX

- glassmorphism en inputs, menú y botones
- fondo dinámico por filmina
- scroll interno por página
- radios tipo “card” (Plan A / B)
- inputs optimizados para legibilidad

---

## 📄 FILMINAS ACTUALES

### Filmina 1
- portada

### Filmina 2 (FORMULARIO PRINCIPAL)

Campos implementados:

1. tipo_boda
2. nombre_1
3. telefono_1
4. nombre_2
5. telefono_2
6. estacion
7. plan (radio A/B)
8. vestimenta
9. cantidad_personas
10. fecha
11. hora
12. locacion_texto
13. duracion
14. horas_extra (condicional)
15. notario (checkbox)
16. notas

---

## ⚠️ LÓGICA CONDICIONAL

- estación → muestra plan
- hora extra → muestra input adicional

---

# 🧠 STATE GLOBAL (CRÍTICO)

```js
const FORM_STATE = {};