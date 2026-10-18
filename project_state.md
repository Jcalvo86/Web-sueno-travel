# Estado del Proyecto - Sueño Travel Chile (Web)

Este archivo (`project_state.md`) sirve como el **contexto temporal y registro de estado** del proyecto. 
**Todo agente que trabaje en este repositorio debe leer este archivo al iniciar una sesión** y actualizarlo al finalizar con las decisiones tomadas y los cambios realizados, para mantener un historial coherente y evitar generar código que no se alinee con las directivas establecidas.

---

## 1. Información General del Proyecto
- **Nombre:** Sueño Travel Chile (Sitio Web Público)
- **Arquitectura y Stack Tecnológico:** 
  - HTML5 estático (Vanilla).
  - JavaScript Vanilla (sin frameworks pesados).
  - Tailwind CSS para maquetado principal.
  - CSS personalizado (`styles.css` / `style.css`) para elementos clásicos/específicos.

## 2. Reglas Estrictas (Extraídas de `AGENTS.md`)
- **Maquetación:** SIEMPRE usar HTML5 semántico y clases de Tailwind CSS. NUNCA usar estilos en línea si existe una clase de Tailwind.
- **Componentes JS:** Reutilizar componentes globales inyectados por JS (ej. `global-header.js`). No duplicar lógica de navegación o modales en cada archivo HTML.
- **Internacionalización (i18n):** NUNCA "hardcodear" textos en español o inglés directamente en los HTML. SIEMPRE extraerlos al archivo `locales/es.json` y usar los atributos `data-i18n` y `data-i18n-ns`. Tras modificar `es.json`, se debe recordar ejecutar `node scripts/auto-translate.js` para generar el inglés.

## 3. Directrices de Diseño (Extraídas de `DESIGN.md`)
- **Estética:** Elegancia atemporal, inspiración en destinos de viaje (tonos de mar, desierto, mármol), baja densidad visual y alto espacio en blanco.
- **Paleta Tailwind Principal:**
  - `primary`: `#091524` (Azul Noche Profundo)
  - `secondary`: `#7F5621` (Marrón Dorado / Bronce)
  - `secondary-fixed`: `#FFDDB9` (Crema Arena Clara)
  - `background` / `surface`: `#FBF9F8` (Blanco Hueso / Nácar)
- **Tipografía (Tailwind):** Títulos en `BJ Cree` o `Manrope` (extrabold/bold). Textos en `Plus Jakarta Sans` (regular).
- **Animaciones:** Efectos parallax suaves, transiciones de `300ms` para interacciones (hovers).

---

## 4. Registro de Decisiones y Cambios Recientes (Actualizar en cada sesión)

### [2026-10-04] - Sesión Actual
- **Estado:** Creación del archivo `project_state.md`.
- **Decisión:** Se establece este documento como punto de referencia obligatorio para las sesiones de los agentes con el objetivo de mantener la coherencia del diseño y las normativas del código (como i18n y el uso de Tailwind).
- **Estado (SEO/AEO):** Se ha diseñado y presentado el plan completo de SEO y AEO (`PLAN_SEO_AEO.md`).
- **Decisión (SEO/AEO):** Iniciamos la Fase 1 y 2 creando el módulo `src/js/seo-manager.js` para la inyección dinámica de metaetiquetas en el cliente y esquemas de datos estructurados (JSON-LD). Implementado en `viaje.js` y `destino.html`.
- **Estado (Sitemap):** Se ha completado la Fase 4, creando una API Serverless en Vercel (`api/sitemap.js`) conectada a Firebase REST API para indexar todas las rutas dinámicas, junto con una regla rewrite en `vercel.json` para servirlo en `/sitemap.xml`.

### [2026-10-16] - Sesión Actual
- **Estado (Component Specs & Design System):** Definición del estándar conceptual para fichas técnicas de interfaz (`Component Specs`).
- **Decisión:** Creación del archivo `.agents/components_library/COMPONENT_SPEC_CHECKLIST.md` como rúbrica de calidad ponderada (100 puntos) para validar si una especificación de componente está lista para producción (abarcando tokens, punchout ring, fallbacks, accesibilidad A11y, API tipada y código de referencia).
- **Actualización:** Vinculación de `AvatarGroup.md` y `COMPONENT_SPEC_CHECKLIST.md` en el catálogo principal `.agents/components_library/SKILL.md`.

*(Agrega nuevas entradas aquí al finalizar tus tareas en futuras sesiones)*
