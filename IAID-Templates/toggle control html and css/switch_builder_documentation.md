# Switch Builder Tool (Font Awesome + SVG)

## 📌 Overview
This tool allows you to visually design a toggle switch with:
- Smooth animations
- Custom icons (Font Awesome or SVG upload)
- Glow & shadow controls
- Live preview (large + real size)
- Exportable production-ready code (HTML, CSS, JS separated)

---

## ⚙️ How It Works

The tool is a **single HTML file** that includes:
- UI builder controls
- Live preview
- Code generator

You DO NOT need React or frameworks.

---

## 🧱 Structure (IMPORTANT)

When exporting, you will get **3 separate blocks**:

### 1. HTML
Paste inside your page:
```html
<!-- SWITCH COMPONENT -->
<label class="switch">
  <input type="checkbox">
  <span class="slider">
    <span class="knob">
      <i class="fa-solid fa-music"></i>
    </span>
  </span>
</label>
```

---

### 2. CSS
Paste inside your CSS file:
```css
.switch {
  position: relative;
  display: inline-block;
}

.slider {
  position: relative;
  transition: all 0.3s ease;
}

.knob {
  border-radius: 50%; /* ALWAYS circle */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
```

---

### 3. JS (Optional)
Only needed if animations or dynamic behavior are used.

```js
// Example toggle listener
const switchInput = document.querySelector('.switch input');

switchInput.addEventListener('change', () => {
  console.log('Switch state:', switchInput.checked);
});
```

---

## 🎨 Customization Guide

### Colors
- OFF color → background when disabled
- ON color → background when active
- Knob color → center circle

### Size
- Width → full switch width
- Height → full switch height

Knob automatically scales to keep a perfect circle.

---

## ✨ Glow & Shadow System

Each element has independent control:

### Elements:
- Pill (background)
- Knob (circle)
- Icon

### Controls:
- Enable / Disable
- Color
- Intensity

### Example:
```css
box-shadow: 0 0 10px rgba(255,255,0,0.8);
```

---

## 🎯 Icons

### Font Awesome
Use class names:
- `fa-music`
- `fa-smile`

Make sure you include:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

---

### Custom SVG

You can:
- Upload file
- Drag & drop

SVG replaces the icon inside the knob.

---

## 🔁 Animations

### Knob Movement
- Speed controlled by slider

### Future extensions supported:
- rotate
- bounce
- flip

---

## 📦 Export System

### "Export Production Code"

Generates:
- HTML block
- CSS block
- JS block

✔ Clean
✔ Ready to paste
✔ No builder dependencies

---

## ⚠️ Common Mistakes

### ❌ Switch looks broken
- Missing CSS
- Forgot Font Awesome link

### ❌ Icon not showing
- Wrong FA class (must include prefix `fa-`)

### ❌ Layout broken
- Did not paste full CSS

---

## 🚀 Best Practice

1. Always paste ALL 3 blocks
2. Keep CSS together (do not split)
3. Test in clean HTML first

---

## 🧠 Future Improvements

- Advanced icon picker UI
- Theme presets
- Animation presets
- Multi-switch export

---

## ✅ Status

✔ Stable
✔ Reusable
✔ No broken dependencies

---

If something breaks → rebuild using export again.

