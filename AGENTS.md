---
author: Javier Calvo
project: Sueño Travel Chile (Web)
---

# Agent Context & System Rules

## 1. Executive Summary
- **Project:** Sueño Travel Chile (Sitio Web Público)
- **Architecture:** Static HTML, Vanilla JavaScript, Tailwind CSS, y `styles.css` personalizado.
- **Goal:** Mantener y escalar la web pública y el diseño visual de la agencia de viajes.

## 2. Global System Rules (STRICT)

### Core Directives
- **ALWAYS:** Usa HTML5 semántico estándar y clases de Tailwind CSS para todo el maquetado.
- **NEVER:** Evita quemar estilos en línea (inline styles) si existe una utilidad de Tailwind para el mismo propósito.
- **JS Components:** Reutiliza componentes globales inyectados por JS (como `global-header.js`) para mantener la coherencia. No dupliques lógica de navegación o de modales en cada archivo HTML.

### Internationalization (i18n) & Translations
- **NEVER** hardcode Spanish or English text directly into HTML files. 
- **ALWAYS** extract any new text into the corresponding `es.json` file inside the `locales/` directory.
- **ALWAYS** use the `data-i18n` and `data-i18n-ns` attributes in the HTML tags to reference the JSON key.
- **ALWAYS** remind the user to run `node scripts/auto-translate.js` after making changes to `es.json` para generar automáticamente la versión en inglés.
