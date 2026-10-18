# Plan de Implementación SEO y AEO - Sueño Travel Chile

## 1. Resumen Ejecutivo
El objetivo de este plan es adaptar el sitio web estático (basado en HTML, Vanilla JavaScript y Tailwind CSS) para que sea indexado de manera óptima por:
1. **Motores de Búsqueda Tradicionales (SEO):** Google, Bing, etc.
2. **Motores de Respuesta / IA (AEO - Answer Engine Optimization):** ChatGPT, Perplexity, Gemini, Claude, etc.
3. **Plataformas Sociales (SMO):** WhatsApp, Instagram, LinkedIn, Facebook (generación correcta de tarjetas enriquecidas).

El reto principal radica en que el contenido se inyecta dinámicamente mediante JavaScript (`loadSection` y el sistema de i18n). Si los rastreadores no ejecutan JavaScript correctamente, verán el sitio vacío.

---

## 2. Fases de Ejecución

### FASE 1: Metadatos Dinámicos y Open Graph (Quick Wins)
El primer paso es asegurar que cada vez que un usuario comparte una URL (ej. `destino.html?id=egipto`), los metadatos se correspondan con el contenido, y que los rastreadores básicos los puedan leer.

*   **Acciones:**
    *   Crear un script independiente `seo-manager.js`.
    *   Implementar una función que, dada la información del destino (título, descripción, imagen principal), actualice el DOM:
        *   `<title>`
        *   `<meta name="description" content="...">`
        *   `<meta property="og:title" content="...">`
        *   `<meta property="og:description" content="...">`
        *   `<meta property="og:image" content="...">`
        *   `<meta property="og:url" content="...">`
    *   Invocar `seo-manager.js` inmediatamente después de que `app.js` o `crm-config.js` recuperen los datos desde la base de datos (Supabase/Firebase).

### FASE 2: Datos Estructurados (JSON-LD) para IAs (AEO Core)
Los motores de respuesta (IA) dependen de los datos estructurados para comprender el contexto y mostrar información detallada (precios, itinerarios, opiniones).

*   **Acciones:**
    *   Ampliar el `seo-manager.js` para generar esquemas `Schema.org` en formato `JSON-LD`.
    *   Inyectar una etiqueta `<script type="application/ld+json">` en el `<head>` con la siguiente información:
        *   **`TravelAgency`**: En `index.html` y `conocenos.html`. Incluir nombre, logo, contacto y URL.
        *   **`TouristTrip` / `Product`**: En `destino.html` y los itinerarios. Incluir el nombre del viaje, destinos visitados, imágenes y proveedor (`Sueño Travel`).
        *   **`FAQPage`**: Identificar preguntas frecuentes sobre viajes (ej. visas, moneda, clima) y mapearlas en este formato.

### FASE 3: Semántica HTML y Estructura de Contenidos
Asegurarnos de que el HTML base y el inyectado tengan un formato lógico para los rastreadores.

*   **Acciones:**
    *   Revisar componentes en `components/` y vistas principales para asegurar la jerarquía de encabezados (un único `<h1>` por página, seguido por `<h2>` de manera secuencial).
    *   Asegurar que todas las etiquetas `<img>` tengan el atributo `alt` basado en el contexto (se puede inyectar vía i18n o base de datos).
    *   Usar etiquetas HTML5 semánticas: `<article>`, `<section>`, `<aside>`, `<nav>`.

### FASE 4: Sitemap XML y Etiquetas hreflang (Internacionalización)
Ayudar a los motores a descubrir todas las rutas y a entender las versiones de idioma.

*   **Acciones:**
    *   Implementar dinámicamente etiquetas `<link rel="alternate" hreflang="es" href="...">` y `<link rel="alternate" hreflang="en" href="...">` dependiendo del idioma activo o del parámetro URL.
    *   Crear un generador de `sitemap.xml`. Dado que hay un archivo `vercel.json`, podemos crear una ruta `api/sitemap.js` (Serverless Function) que:
        1.  Tenga las rutas estáticas hardcodeadas (`/`, `/conocenos.html`, etc.).
        2.  Consulte Supabase/Firebase para obtener los IDs de todos los destinos activos.
        3.  Genere las rutas dinámicas (`/destino.html?id=...`).
        4.  Devuelva todo formateado como XML.
    *   Añadir un archivo `robots.txt` físico que indique la ruta del sitemap.

### FASE 5: Prerenderizado Estático (Solución a Largo Plazo para JS-Heavy)
Si notamos que Google u otras redes no están indexando bien el contenido dinámico, implementaremos una estrategia de prerenderizado.

*   **Acciones (Opcional según analítica):**
    *   Crear un script de "Build" en Node.js (usando JSDOM) que procese el sitio antes de subirlo, inyectando las partes estáticas (header, footer, text en español por defecto) en los HTML para que no dependan del 100% del JS en el cliente para el primer render.

---

## 3. Próximos Pasos para la Discusión

1.  **Priorización:** ¿Estás de acuerdo con el orden propuesto de las fases (empezando por Metadatos y JSON-LD)?
2.  **Infraestructura Vercel:** ¿Te parece bien usar las Serverless Functions de Vercel (`/api/`) para la generación del sitemap?
3.  **Contenido FAQ para AEO:** ¿Disponemos de preguntas y respuestas estandarizadas por destino para implementar el `FAQPage` schema?
