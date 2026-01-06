## Table of Contents

1. [Installation](#installation)
2. [Background Colors](#background-colors)
3. [Borders](#borders)
4. [Container and Grids](#container-and-grids)
5. [Flexbox Utilities](#flexbox-utilities)
6. [Spacing Utilities](#spacing-utilities)
7. [Typography](#typography)
8. [Display & Position](#display--position)
9. [Shadows](#shadows)

---

## Installation

### Via CDN
Include the stylesheet in the `<head>` of your HTML document:

```html
<link rel="stylesheet" href="[https://cdn.jsdelivr.net/npm/fluvia@latest/dist/fluvia.min.css](https://cdn.jsdelivr.net/npm/fluvia@latest/dist/fluvia.min.css)">

<script src="https://cdn.jsdelivr.net/npm/fluvia@1.0.0/dist/fluvia.min.js"></script>
```

### Via NPM
Install the package into your project using the following command:

-> npm install fluvia

---

### Background Colors

Use the `.bg-*` classes to apply background colors to any element.

| Color Category | Available Classes |
| :--- | :--- |
| **Red** | `.bg-red`, `.bg-dark-red` |
| **Blue** | `.bg-blue`, `.bg-dark-blue`, `.bg-light-blue` |
| **Green** | `.bg-lime-green`, `.bg-green`, `.bg-dark-green` |
| **Yellow** | `.bg-yellow` |
| **Orange** | `.bg-orange`, `.bg-dark-orange` |
| **Purple** | `.bg-light-purple`, `.bg-purple`, `.bg-dark-purple` |
| **Pink** | `.bg-light-pink`, `.bg-pink`, `.bg-dark-pink` |
| **Grey** | `.bg-light-grey`, `.bg-grey`, `.bg-dark-grey` |
| **Monochrome** | `.bg-black`, `.bg-white` |

---

### Borders

#### Border Styles & Widths

| Property | Available Classes |
| :--- | :--- |
| **Styles** | `.b-solid`, `.b-dashed`, `.b-dotted` |
| **Widths** | `.b-1` (1px), `.b-2` (2px), `.b-3` (3px) |

---

### Container and Grids

#### Grid Utilities

| Layout Type | Available Classes |
| :--- | :--- |
| **Grid Base** | `.grid` (display: grid with 1rem gap) |
| **2 Columns** | `.grid-2` |
| **3 Columns** | `.grid-3` |
| **4 Columns** | `.grid-4` |

---

### Flexbox Utilities

| Property | Available Classes |
| :--- | :--- |
| **Display** | `.fx` (flex) |
| **Direction** | `.fx-c` (column) |
| **Justify** | `.fx-jc-c` (center), `.fx-jc-sb` (space-between) |
| **Align** | `.fx-ai-c` (center) |

---

### Spacing Utilities

#### Margin & Padding Scale

| Scale | Value |
| :--- | :--- |
| **0** | 0px |
| **1** | 4px |
| **2** | 8px |
| **3** | 16px |
| **4** | 32px |

---

### Typography

#### Font Sizes & Weights

| Property | Available Classes |
| :--- | :--- |
| **Sizes** | `.txt-xs`, `.txt-sm`, `.txt-md`, `.txt-lg`, `.txt-xl`, `.txt-xxl` |
| **Weights** | `.txt-light` (300), `.txt-normal` (400), `.txt-bold` (700) |

#### Alignment & Transform

| Property | Available Classes |
| :--- | :--- |
| **Alignment** | `.txt-left`, `.txt-center`, `.txt-right` |
| **Transform** | `.txt-uppercase`, `.txt-lowercase`, `.txt-capitalize` |

---

### Display & Position

| Property | Available Classes |
| :--- | :--- |
| **Display** | `.d-block`, `.d-inline`, `.d-inline-block`, `.d-none` |
| **Position** | `.pos-rel`, `.pos-abs`, `.pos-fixed` |
| **Overflow** | `.overflow-hidden`, `.overflow-scroll` |
| **Z-Index** | `.z-0`, `.z-10`, `.z-20` |

---

### Shadows

| Shadow Size | Available Classes |
| :--- | :--- |
| **Small** | `.shadow-sm` |
| **Medium** | `.shadow-md` |
| **Large** | `.shadow-lg` |

---

## JavaScript Utilities

Fluvia also provides **JavaScript modules** to handle advanced interactions and features, such as Discord forms, notifications, animations, and more.

### Discord Module

Easily send form data to a Discord webhook. The module provides callbacks to handle success, errors, and display styled notifications.

#### HTML

```html
<form id="form-discord" class="card">
  <input name="name" placeholder="Name" required>
  <input name="email" type="email" placeholder="Email" required>
  <textarea name="message" placeholder="Message" required></textarea>
  <button>Send</button>
</form>
```

### Example JS

```js
// Initialize the Discord module
const discord = ui.modules.discord({
  webhook: "https://discord.com/api/webhooks/XXXX/XXXX",
  title: "📩 New Message",
  fields: {
    name: "Name",
    email: "Email",
    message: "Message"
  },
  log: true,          // Logs the payload in the console
  showPopup: true,    // Displays a styled popup on submission
  onSuccess: () => console.log("Message sent successfully!"),
  onError: (err) => console.error("Error sending message:", err)
});

// Bind the form
const form = document.querySelector("#form-discord");
form.addEventListener("submit", e => {
  e.preventDefault();
  discord.send(form);
});
```

### Available Options

| Option       | Type     | Default       | Description |
|-------------|---------|---------------|-------------|
| `webhook`   | string  | —             | Discord webhook URL (required) |
| `title`     | string  | `"Formulaire"` | Title of the Discord embed |
| `fields`    | object  | `{}`          | Object mapping form fields `{ fieldName: label }` |
| `log`       | boolean | `false`       | Logs the payload in the console (true/false) |
| `showPopup` | boolean | `false`       | Enables a styled popup on submission (true/false) |
| `onSuccess` | function| —             | Callback triggered after successful submission |
| `onError`   | function| —             | Callback triggered in case of submission error |

### Visual Example

The popup will display by default:

- ✅ Message sent! (success)
- ❌ Error sending message! (error)

> You can customize the popup style via CSS by targeting `#ui-discord-popup`.







