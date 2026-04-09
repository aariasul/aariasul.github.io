# 🧾 Proyecto: Formulario de Boda con Flipbook (turn.js)

## 📌 Estado Actual del Proyecto

El sistema consiste en un formulario multi-paso implementado como un flipbook usando turn.js, donde cada “filmina” representa una sección del formulario.

Objetivo UX:
- Navegación libre entre páginas
- Evitar interacción accidental
- Guardado automático
- Validación solo al final

---

## 🧠 Arquitectura General

### Estructura

- Flipbook con turn.js
- Cada página:
<div class="page">
  <div class="page-content">...</div>
</div>

---

## 🔁 Navegación

```javascript
function loadApp() {
    $('.flipbook').turn({
        width: 380,
        height: 640,
        elevation: 0,
        gradients: false,
        autoCenter: true,
        display: 'single'
    });

    $('.flipbook').bind('turning', function(e, page){
        // navegación libre
    });

    $('.flipbook').bind('turned', function(e, page){
        updateHighlight(page);
        updateStepper(page);
        updateNavButtons(page);
        applyBackgrounds();
    });
}
```

---

## 🎯 UX esquinas

```css
.page-content {
    height: 100%;
    overflow-y: auto;
    padding: 100px 28px 100px 28px;
    box-sizing: border-box;
}
```

---

## 💾 Estado global

```javascript
const FORM_STATE = {};
```

---

## Guardado automático

```javascript
document.addEventListener("input", function(e){
    if(e.target.dataset.field){
        saveField(e.target);
    }
});

document.addEventListener("change", function(e){
    if(e.target.dataset.field){
        saveField(e.target);
    }
});
```

---

## Guardar campo

```javascript
function saveField(el){
    const key = el.dataset.field;
    if(!key) return;

    if(el.type === "checkbox"){
        FORM_STATE[key] = el.checked;
    } else if(el.type === "radio"){
        if(el.checked){
            FORM_STATE[key] = el.value;
        }
    } else {
        FORM_STATE[key] = el.value;
    }

    localStorage.setItem("wedding_form_state", JSON.stringify(FORM_STATE));
}
```

---

## Cargar estado

```javascript
function loadState(){
    const saved = localStorage.getItem("wedding_form_state");
    if(!saved) return;

    try {
        const parsed = JSON.parse(saved);
        Object.assign(FORM_STATE, parsed);
    } catch(e){
        console.error("Error loading state", e);
    }
}
```

---

## Aplicar estado

```javascript
function applyStateToForm(){

    document.querySelectorAll('[data-field]').forEach(el => {

        const key = el.dataset.field;
        const value = FORM_STATE[key];

        if(value === undefined) return;

        if(el.type === "checkbox"){
            el.checked = value;

        } else if(el.type === "radio"){
            if(el.value === value){
                el.checked = true;
            }

        } else {
            el.value = value;
        }

    });

    const estacion = document.getElementById("estacion");
    if(estacion && estacion.value){
        document.getElementById("planContainer").style.display = "block";
    }

    const toggle = document.getElementById("horaExtraToggle");
    if(toggle && toggle.checked){
        document.getElementById("horaExtraContainer").style.display = "block";
    }
}
```

---

## Validación final

```javascript
function submitForm(){
    const errors = validateAllFields();

    if(errors.length > 0){
        showErrorModal(errors);
        return;
    }

    console.log("FINAL DATA:", FORM_STATE);
}
```

---

## Estado actual

✔ Navegación libre  
✔ Animación fluida  
✔ Auto guardado  
✔ Persistencia  
✔ Validación final  
✔ UX estable  

---

## Próximos pasos

- Progreso del formulario
- Filminas completas/incompletas
- Backend
- Responsive scaling
