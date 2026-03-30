# 📘 Formulario interactivo de bodas (turn.js) — Estado actual

## 🎯 Objetivo del proyecto

Crear un formulario interactivo tipo **flipbook premium** para clientes finales, con:

- navegación por filminas
- validación por pasos
- experiencia visual elegante
- estructura preparada para integración futura (Sheets, PDF, email)

---

## ✅ Estado actual (CONFIRMADO FUNCIONANDO)

### 🧭 Navegación
- turn.js configurado en `display: single`
- navegación por:
  - botones laterales
  - menú superior
  - interacción nativa del flipbook

---

### 🧊 UI / UX
- menú superior glassmorphism
- stepper funcional sincronizado
- backgrounds dinámicos por filmina
- scroll interno por filmina
- inputs con estilo legible sobre fondo

---

### 📄 Filmina 1
- portada funcional
- texto aprobado

---

### 📄 Filmina 2 (FORMULARIO)

#### Bloques implementados:

1. Tipo de boda (dropdown)
2. Datos de pareja (nombre + teléfono x2)
3. Estación del año
   - muestra Plan A / B condicionalmente
4. Código de vestimenta
5. Cantidad de personas + fecha + hora
6. Locación (preparada para Google Maps)
7. Duración del evento
8. Hora extra (toggle + input condicional)
9. Notario (toggle)
10. Notas adicionales

---

## ✅ VALIDACIÓN

### Funciona correctamente:
- bloquea avance en Filmina 2
- pinta bordes rojos
- muestra mensaje de error
- scroll automático al primer error

### Campos obligatorios actuales:
- tipo_boda
- nombre_1
- telefono_1
- nombre_2
- telefono_2
- estacion
- vestimenta
- cantidad_personas
- fecha
- hora
- locacion_texto
- duracion

### Condicionales:
- Plan A/B obligatorio si hay estación
- horas_extra obligatorio si toggle activo

---

## 🧠 STATE GLOBAL (IMPLEMENTADO)

### Variable:
```js
const FORM_STATE = {};