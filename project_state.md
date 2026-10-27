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

### [2026-10-18] - Sesión Actual
- **Estado (SEO & Estructura):** Auditoría técnica global completada (estructura, arquitectura, SEO/AEO, diseño y rendimiento).
- **Decisión (Sitemap & Robots):** Corrección de `api/sitemap.js` para reemplazar la ruta obsoleta `/sobre-nosotros.html` por la página oficial `/conocenos.html`, e inclusión de `/itinerarios.html`.
- **Acción (Robots.txt):** Creación del archivo `robots.txt` en la raíz enlazado a `https://suenotravel.cl/sitemap.xml` y protegiendo `/controlpanel/`.
- **Acción (Depuración de Enlaces):** Actualización de enlaces en `itinerario-egipto-el-legado-de-los-faraones.html` y `PLAN_SEO_AEO.md` para apuntar a `conocenos.html`.
- **Limpieza de Archivos Legados:** Archivo/eliminación de `inicio.html` y `sobre-nosotros.html` para evitar colisiones y contenido desactualizado en la raíz.
- **Acción (SEO & Open Graph en HTML Base):** Implementación de etiquetas canónicas (`canonical`), Open Graph (`og:title`, `og:image`, `og:url`, etc.) y Twitter Cards en todas las páginas (`index.html`, `conocenos.html`, `viajes-grupales.html`, `itinerarios.html`, `destino.html`, `viaje.html`, `articulo.html`) para garantizar previsualizaciones sociales inmediatas sin depender de JS.
- **Optimización de Rendimiento en `<head>`:** Adición de `preconnect` a Google Fonts, eliminación de la familia inexistente `BJ Cree` (que causaba error 400) y de llamadas duplicadas, además de retirar `supabase-adapter.js` del frontend público.
- **Transición a Tailwind Compilado:** Creación de `tailwind.config.js` y `src/css/main.css` (unificando directivas de Tailwind con los estilos manuales de `styles.css`), configuración de scripts `build:css` en `package.json` y actualización de `DESIGN.md` con la fuente oficial `Gloock`.
- **Reemplazo Exitoso de Tailwind CDN:** Sustitución de `cdn.tailwindcss.com`, `tailwind-config.js` y estilos incrustados por la hoja estática unificada `dist/styles.css` (48 KB) en todas las páginas públicas (`index.html`, `conocenos.html`, `viajes-grupales.html`, `itinerarios.html`, `destino.html`, `viaje.html`, `articulo.html` e `itinerario-egipto-el-legado-de-los-faraones.html`).
- **Optimización y Organización de Imágenes:** Creación del pipeline en `scripts/optimize-images.js` para reescalar imágenes gigantes a máximo 1920px y comprimir a WebP con calidad 80, migración de `JessicaLagos.jfif` y `Jessica2.jfif` a `.webp` en todo el código y unificación de iconos SVG en `/Imagenes/`.
- **Unificación y Modernización del Blog / Bitácora:**
  - Creación del namespace i18n `locales/blog/es.json` y `locales/blog/en.json` con soporte completo de traducciones para el visor de artículos.
  - Actualización de `articulo.html` vinculando `src/js/i18n.js` y agregando sección dinámica de historias relacionadas ("Otras historias de nuestra bitácora").
  - Actualización de `src/js/articulo.js` con fallback robusto a `window.Glosaurio.SEED_ARTICLES`, inyección dinámica de metaetiquetas Open Graph y esquema estructurado `BlogPosting` JSON-LD vía `SEOManager`, y carga de artículos recomendados.
  - Actualización de las tarjetas de blog en `conocenos.html` para enlazar directamente al visor unificado (`articulo.html?id=egipto-magico`, `articulo.html?id=turquia`, `articulo.html?id=viajar-en-grupo`) con atributos `data-i18n` completos.
  - Actualización de `global-header.js` para mantener activa la pestaña "Conócenos" al navegar dentro de `articulo.html`.
  - Configuración de redirecciones permanentes 301 en `vercel.json` y meta refreshes de fallback en los archivos estáticos legacy (`egipto-magico.html`, `turquia.html`, `viajar-en-grupo.html`) hacia el visor dinámico.
  - Inclusión de las rutas dinámicas del blog (`/articulo.html?id=...`) y colección `cms_posts` en el generador serverless `api/sitemap.js`.
- **Página Dedicada de Bitácora y Acceso desde Menú Superior:**
  - Creación de la página dedicada `blog.html` y su controlador `src/js/blog.js` con filtros por categoría (Todos, Egipto, Turquía, Viajes Grupales), estado de carga y renderizado dinámico de tarjetas conectadas al CMS y seed fallback.
  - Integración de enlace directo **"Bitácora"** en el menú superior (`global-header.js`), tanto en la barra de escritorio como en el drawer móvil, con detección de ruta activa diferenciada.
  - Actualización de `conocenos.html`: asignación de `id="bitacora"` a la sección para acceso por ancla `#bitacora` (mostrando las últimas publicaciones) y adición del botón *"Ver toda la bitácora"* hacia `blog.html`.
  - Inclusión de la URL canónica `/blog.html` en el generador serverless `api/sitemap.js`.
  - **Internacionalización completa:** Actualización en `locales/header/` y `locales/blog/` para español e inglés.

### [2026-10-19] - Sesión Actual
- **Diagnóstico (Menú Superior no responde / no navega):**
  - Al migrar a Tailwind compilado estático (`dist/styles.css`), `tailwind.config.js` no incluía los archivos JavaScript raíz (`./*.js`), omitiendo clases esenciales de interacción de `global-header.js` como `group-hover:opacity-100`, `group-hover:visible`, `group-hover:rotate-180`, `translate-x-full` y `z-[999]`.
  - Como consecuencia, los desplegables de "Viajes" y "Destinos" permanecían con `opacity: 0` y no se abrían al pasar el ratón (hover). Además, los botones de "Viajes" y "Destinos" carecían de interacción al hacer clic (carecían de `href` y de manejador de clic), lo que impedía acceder a sus enlaces tanto en escritorio como en dispositivos móviles/táctiles.
- **Acción (Configuración Tailwind & CSS Robusto):**
  - Actualización de `tailwind.config.js` agregando `"./*.js"` en la propiedad `content`.
  - Implementación de estilos CSS dedicados y puente invisible anti-cierre (`nav-dropdown-menu::before`, `nav-dropdown-group.is-open`, etc.) en `src/css/main.css` y `dist/styles.css` para garantizar funcionamiento independiente sin depender exclusivamente de utilidades purgadas.
- **Acción (Interactividad Accesible en Header Global):**
  - Actualización de `global-header.js`: soporte de apertura tanto por hover como por clic (toggle) y navegación por teclado (Escape y foco), cierre automático al hacer clic fuera del menú y atributos de accesibilidad `aria-expanded`.
  - Inclusión de resaltado activo para rutas de Viajes (`viajes-grupales.html` e `itinerarios.html`).
  - Unificación de `itinerario-egipto-el-legado-de-los-faraones.html` para utilizar el componente global inyectado `<div id="global-header"></div>`.

### [2026-10-21] - Sesión Actual
- **Acción (Entorno de Desarrollo Unificado):** Se agregó el script `"dev": "npm run build:css && npm run dev --prefix controlpanel"` en el `package.json` raíz para compilar el CSS de Tailwind y levantar con un solo comando (`npm run dev`) tanto la web pública (`http://localhost:5173/index.html`) como el Control Panel (`http://localhost:5173/controlpanel/index.html`) a través del servidor Vite.
- **Corrección (Hero Responsive & Logo oculto tras el Header):**
  - Al reducir el ancho de pantalla o en resoluciones medianas/móviles, el texto del Hero ("Tu Próximo Destino Comienza Aquí") se distribuía en varias líneas incrementando la altura total del bloque centrado (`flex items-center`), lo que empujaba el logo hacia arriba y lo ocultaba detrás del header fijo (`h-20` / 80px).
  - Se implementó la clase `.hero-home-section` en `src/css/main.css` y `dist/styles.css` con padding superior calculado (`calc(5rem + 1.5rem)` a `calc(5rem + 2.5rem)`) y altura mínima flexible (`min-h-[85vh]` / `min-h-[80vh]`).
  - Se ajustó la tipografía del H1 en `index.html` para ser responsive (`text-3xl sm:text-4xl md:text-5xl lg:text-[56px]`), junto con el tamaño y márgenes del badge del logo, asegurando un espaciado limpio en cualquier resolución.

- **Ajuste de Escala Visual (Logo Sutil en Hero y Header):**
  - Se sustituyó el contenedor rectangular pesado del logo en el Hero de `index.html` (`h-20`, `p-4`, `shadow-lg`) por una píldora minimalista y sutil (`h-7 sm:h-8` con `px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/40 shadow-sm`), devolviendo el protagonismo al titular de lujo.
  - Se calibró también el logo de la barra de navegación superior en `global-header.js` a `h-8 md:h-9` para mantener una estética ligera y proporcionada en todo el sitio.

- **Ajuste de Escala Visual (Reducción del Logo a 1/3 con Regla CSS Dedicada):**
  - En la imagen anterior, al no estar purgada la clase utilitaria `h-7`, el SVG se expandía a su ancho por defecto. Se implementó la clase blindada `.hero-logo-badge` en `src/css/main.css` y `dist/styles.css` con `height: 26px !important` y `max-width: 80px !important`, reduciendo el tamaño a exactamente un tercio de los 80px originales.
  - Se añadieron además atributos explícitos `width="75"` y `height="26"` en `index.html` para evitar saltos de layout (CLS).

- **Corrección de Carga en Blanco y Placeholders i18n (`viajes-grupales.html` e `itinerarios.html`):**
  - **Causa Raíz de Placeholders:** El atributo `data-page-ns="itineraries"` requería el namespace `itineraries`, pero la carpeta `locales/itineraries/` no existía (`404`). Además, la función `applyTranslations()` sobrescribía los textos del DOM con la clave raw en lugar de preservar el texto en español si faltaba la traducción. En el footer, al tener `data-i18n-ns="home"`, el namespace `home` no se precargaba fuera de la página de inicio.
  - **Causa Raíz del Salto de Carga:** El contenedor `#itineraries-grid` comenzaba vacío y sin altura (provocando que el footer se subiera debajo del título), y el `<script>` de carga estaba erróneamente ubicado dentro de la cuadrícula sin cerrar las etiquetas `</div>` ni `<main>`.
  - **Acciones:**
    1. Creación de los archivos oficiales de traducción [locales/itineraries/es.json](file:///c:/andreia/Web-sueno-travel/locales/itineraries/es.json) y [locales/itineraries/en.json](file:///c:/andreia/Web-sueno-travel/locales/itineraries/en.json).
    2. Actualización de [src/js/i18n.js](file:///c:/andreia/Web-sueno-travel/src/js/i18n.js) para precargar permanentemente `['header', 'home']`, proteger el DOM de sobrescrituras con claves raw y exportar `applyTranslations()`.
    3. Integración de 3 tarjetas skeleton (`animate-pulse`) en [viajes-grupales.html](file:///c:/andreia/Web-sueno-travel/viajes-grupales.html) y cierre semántico de etiquetas para garantizar una transición visual fluida y sin CLS.

- **Estandarización Global del Footer (`components/footer.html`):**
  - Se auditó la presencia y estructura del pie de página en todo el sitio web.
  - Se constató que `index.html`, `viaje.html`, `blog.html`, `articulo.html`, `viajes-grupales.html` e `itinerarios.html` cargaban dinámicamente `components/footer.html` (estilo cálido Crema Almendra `#efdfd1` con WhatsApp, correo y redes).
  - En contraste, `conocenos.html` contenía una copia estática manual desincronizada, y `destino.html` tenía un footer antiguo oscuro (`bg-primary text-white`) con columnas diferentes.
  - Se unificaron `conocenos.html` y `destino.html` para inyectar dinámicamente el componente estándar `components/footer.html` con traducción automática `applyTranslations()`, logrando coherencia al 100% en todo el sitio web.

- **Resolución de Placeholders Residuales en `itinerarios.html`:**
  - En las tarjetas de itinerarios figuraba `card.viewProgram` como texto sin traducir. Se agregaron las definiciones `"pageTitle"`, `"card.viewProgram": "Ver Programa"`, `"empty"` y `"error"` en [locales/itineraries/es.json](file:///c:/andreia/Web-sueno-travel/locales/itineraries/es.json) y su contraparte en inglés en [locales/itineraries/en.json](file:///c:/andreia/Web-sueno-travel/locales/itineraries/en.json).
  - Se blindó la función `t()` en [src/js/i18n.js](file:///c:/andreia/Web-sueno-travel/src/js/i18n.js) para que devuelva `null` cuando una clave no exista, permitiendo que las expresiones JavaScript con fallback (`t(...) || 'Texto Default'`) se ejecuten siempre sin mostrar la clave cruda.
  - Se añadieron 3 tarjetas esqueleto (`animate-pulse`) en [itinerarios.html](file:///c:/andreia/Web-sueno-travel/itinerarios.html) para mantener la misma suavidad de carga que en viajes grupales.

- **Depuración de Datos en Firebase Firestore:**
  - Se eliminó el documento de prueba obsoleto `MiXJp1KHyQLEQPGl5NpN` ("Egipto 1") de la colección `cms_products`, evitando que aparezca erróneamente en las guías de destino e itinerarios de Egipto.
  - Se confirmó que el proyecto está conectado y configurado con Firebase en [crm-config.js](file:///c:/andreia/Web-sueno-travel/crm-config.js) (`projectId: "suenotravel"`).
  - Se autenticó exitosamente la sesión de Firebase CLI con la cuenta del usuario (`jcalvo86@gmail.com`).
  - Se creó el archivo [.firebaserc](file:///c:/andreia/Web-sueno-travel/.firebaserc) vinculando automáticamente el proyecto a `suenotravel`.
  - Se inspeccionó y confirmó la base de datos Firestore activa: `projects/suenotravel/databases/(default)` (Modo: `FIRESTORE_NATIVE`, Edición: `STANDARD`, Región: `nam5`).
  - Se comprobó la accesibilidad total a las colecciones de datos: `location` (34 docs), `travel` (4 viajes), `cms_products` (2 productos) y `cms_posts` (2 artículos).

- **Corrección de Carga Infinita en `destino.html`:**
  - **Causa Raíz Principal (Error Fatal de Sintaxis):** En [destino.html](file:///c:/andreia/Web-sueno-travel/destino.html), la constante `const heroBg` estaba redeclarada dos veces dentro de la misma función `renderDestination` (línea 368 y 428). Esto disparaba un `Uncaught SyntaxError: Identifier 'heroBg' has already been declared` al momento de compilar el módulo `<script type="module">`, bloqueando por completo la ejecución de todo el script y dejando el spinner girando indefinidamente.
  - **Causa Secundaria (Timing de Ejecución):** Se utilizaba `window.onload = loadDestinationData;` dentro de un script de tipo módulo. En navegadores modernos o bajo Vite dev server, el evento `load` ya se había disparado antes de resolver las importaciones del módulo, por lo que la función nunca se invocaba.
  - **Dependencia y Seguridad de Slugs:** Se vinculó el script global `app.js` en el `<head>` y se añadió fallback `window.generateSlug ? window.generateSlug(...) : encodeURIComponent(...)` para evitar excepciones al renderizar tarjetas de itinerarios sugeridos.
  - **Internacionalización (i18n):** Se crearon los diccionarios oficiales [locales/destination/es.json](file:///c:/andreia/Web-sueno-travel/locales/destination/es.json) y [locales/destination/en.json](file:///c:/andreia/Web-sueno-travel/locales/destination/en.json) y se validaron con `node scripts/auto-translate.js`.
  - **Control de Ciclo de Vida:** Se reemplazó la asignación a `window.onload` por una comprobación resiliente de `document.readyState` y suscripción al evento `languageChanged`.

- **Reestructuración de "Viajes" en 3 Modalidades Bien Diferenciadas:**
  - **Diagnóstico:** Anteriormente el menú "Viajes" dividía entre "Viajes Grupales" e "Itinerarios", lo cual no reflejaba con claridad las 3 modalidades reales de viaje que ofrece la agencia (Viajes en Grupo acompañados desde Chile, Viajes a Medida privados, y Grupos Abiertos internacionales en destino), dejando "Itinerarios" como un concepto confuso al lado de los viajes grupales.
  - **Decisión de Arquitectura y Nomenclatura:** Se consolidaron las 3 modalidades oficiales:
    1. **Viajes en Grupo** (`viajes-grupales.html`): Grupos exclusivos con fechas fijas, cupos limitados y un Tour Leader de Sueño Travel que viaja desde Chile y acompaña al grupo durante todo el recorrido.
    2. **Viajes a Medida** (`viajes-a-medida.html`): Itinerarios privados diseñados paso a paso con el operador según gustos, días e intereses del viajero.
    3. **Grupos Abiertos** (`grupos-abiertos.html`): Salidas en fechas fijas donde el viajero llega por su cuenta (con asistencia en pasajes aéreos de Sueño Travel) y se integra en destino a un grupo internacional con guía en español.
    4. **Itinerarios Sugeridos** (`itinerarios.html`): Biblioteca y catálogo de programas prediseñados de inspiración, accesible dentro del menú "Viajes" mediante un separador visual y desde las páginas de A Medida y Grupos Abiertos.
  - **Actualización de Navegación Global (`global-header.js`):**
    - Desplegable de escritorio y drawer móvil actualizados con las 3 modalidades + enlace a todos los itinerarios.
    - Detección activa de ruta y apertura por hover y clic para `viajes-grupales.html`, `viajes-a-medida.html`, `grupos-abiertos.html` e `itinerarios.html`.
    - Expansión de `openContactModal` para soportar el contexto `open-group` con mensajes predefinidos en el formulario.
  - **Páginas Creadas y Actualizadas:**
    - `viajes-grupales.html`: Hero reforzado, sección explicativa de 3 pilares del grupo acompañado (Tour leader desde Chile, itinerario riguroso, cupos limitados) y badge en tarjetas de salida.
    - `viajes-a-medida.html`: Nueva página con proceso de co-diseño en 4 pasos, tarjetas de programas de inspiración y formulario/CTA de cotización personalizada.
    - `grupos-abiertos.html`: Nueva página con infografía paso a paso (Vuelo a destino + Asistencia en pasajes + Integración al grupo), ventajas comparativas y listado dinámico de circuitos regulares.
    - `itinerarios.html`: Banner superior interactivo aclarando cómo vivir cada itinerario en cualquiera de las 3 modalidades.
    - `index.html` + `components/modalidades-viaje.html`: Nueva sección de alto impacto en el Home ("3 Formas de Viajar con Nosotros") con 3 tarjetas interactivas enlazando a cada sección.
  - **Internacionalización y SEO:**
    - Nuevos diccionarios y claves en `locales/header/`, `locales/home/` y `locales/itineraries/` para español e inglés.
    - Sincronización automática validada con `node scripts/auto-translate.js`.
    - Indexación de las nuevas rutas en `api/sitemap.js` y redirección permanente 301 de `/egipto-a-medida.html` a `/viajes-a-medida.html` en `vercel.json`.
    - Compilación minificada de CSS ejecutada con `npm run build:css`.

  - **Ajuste de Escala Visual en Menú Desplegable "Viajes":**
    - Se amplió el ancho del menú flotante de `w-56` (224px) a `w-64` (256px), se agregó `whitespace-nowrap` a cada enlace y se ajustó el espaciado a `px-5 py-2.5 rounded-2xl shadow-xl`.
    - Esto evita que los textos largos ("Viajes en Grupo", "Viajes a Medida", "Grupos Abiertos", "Todos los Itinerarios") se quiebren en dos renglones apretados, permitiendo una lectura limpia en una sola línea con márgenes holgados y estética de lujo.

  - **Mejora de Legibilidad y Contraste en Cabeceras Hero:**
    - Se calibró el contraste visual en las cabeceras de `grupos-abiertos.html`, `viajes-a-medida.html`, `viajes-grupales.html` e `itinerarios.html`.
    - Se incrementó la profundidad del degradado oscuro (`from-primary/80 via-primary/60 to-primary/95` más un velo base `bg-primary/20`), eliminando el lavado que generaban las fotografías con textura clara (ruinas, casitas y columnas).
    - Se añadieron sombras cinematográficas suaves (`drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]` en H1 y `drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]` en subtítulos) para garantizar que las letras blancas resalten con máxima nitidez.
    - Se transformaron los badges superiores a contenedores de alto contraste (`bg-primary/90 text-white border border-white/25 shadow-lg`).

  - **Resolución de Duplicación y Visualización de las 3 Modalidades en cada Itinerario (`viaje.html`):**
    - **Causa Raíz de Duplicación:** Al iniciar la vista, `loadTripData()` se ejecutaba en `DOMContentLoaded` y simultáneamente `i18n.js` disparaba el evento `languageChanged`, ejecutando una segunda llamada concurrente a `renderDepartures()`. Ambas llamadas esperaban de forma asíncrona a `DataSource.getItems('departure')` y luego ambas insertaban sus tarjetas en el DOM, duplicando las fechas y tarjetas privadas.
    - **Solución Técnica:** Se implementó un semáforo de concurrencia (`isTripLoading` / `pendingTripReload`) en `src/js/viaje.js` y se pasó la limpieza `grid.innerHTML = ''` inmediatamente antes de la inserción síncrona en el DOM con deduplicación por ID.
    - **Estructuración de las 3 Modalidades por Itinerario:**
      1. *Viaje en Grupo Acompañado (Cerrado):* Muestra la fecha exacta de salida, cupos disponibles, badge *"Acompañado desde Chile"* y botón *"Reservar Cupo"*. Si no hay salida activa, muestra estado en preparación con botón *"Consultar Próxima Salida"*.
      2. *Viaje Privado a Medida (Propio):* Muestra badge *"100% Personalizado"*, explicación de chofer y guías privados con fechas a elección y botón *"Cotizar a Medida"*.
      3. *Grupo Abierto Internacional:* Muestra badge *"Súmate en Destino"*, explicación de fechas regulares con asistencia en pasajes aéreos y botón *"Consultar Fechas de Grupo Abierto"*.
    - Sincronización automática de i18n (`locales/trip/es.json` y `en.json`) y compilación en `dist/styles.css`.
    - Servidor Vite levantado y validado en `http://localhost:5175/`.

  - **Ajuste de Redacción en 'Viajes a Medida' (Eliminación de chofer y guías privados):**
    - Se eliminó la mención explícita a *"chofer y guías privados"* en todas las descripciones de Viajes a Medida / Viaje Privado en `src/js/viaje.js`, `viajes-a-medida.html`, `itinerarios.html`, `components/modalidades-viaje.html` y en los diccionarios de i18n (`locales/trip/`, `locales/itineraries/`, `locales/home/` tanto en español como en inglés).
    - La redacción ahora se enfoca en la flexibilidad, personalización de ritmo, hoteles y experiencias a gusto del viajero.

  - **Optimización y Reemplazo de Imágenes en Alta Definición para Grecia y Turquía (`#que-visitar` en `index.html`):**
    - **Diagnóstico:** Las imágenes de fondo del carrusel interactivo en la sección "¿Qué Visitar?" de la home cargaban enlaces externos de vista previa de Google AIDA y una URL de Unsplash limitada a `w=600`, provocando pixelación y pérdida de calidad en pantallas de escritorio grandes.
    - **Solución y Reemplazo de Recursos:** Se sustituyeron por archivos WebP locales de resolución completa (1920x1280 / Full HD y calidad 82-85):
      - **Grecia:**
        1. Acrópolis de Atenas: `Imagenes/athens-the-parthenon-on-the-acropolis-2026-03-25-22-47-31-utc.webp` (1920x1280)
        2. Santorini al Atardecer: `Imagenes/santorini-greece-2026-03-24-14-11-27-utc.webp` (1920x1441)
        3. Delos Sagrado: `Imagenes/grecia-constantinos-kollias.webp` (1920x1280)
        4. Islas Griegas: `Imagenes/grecia-johnny-africa.webp` (1920x1440)
      - **Turquía:**
        1. Magia de Estambul: `Imagenes/blue-mosque-in-istanbul-2026-03-17-19-36-03-utc.webp` (1920x1280)
        2. Capadocia en Globo: `Imagenes/balloons-in-love-valley-cappadocia-flights-in-go-2026-03-18-04-25-34-utc.webp` (1920x1280)
        3. Éfeso Antiguo: `Imagenes/efeso-biblioteca-celso.webp` (1920x1336, fachada de la Biblioteca de Celso optimizada en WebP)
        4. Hagia Sophia al Atardecer: `Imagenes/evening-view-of-hagia-sophia-in-istanbul-2026-03-23-22-59-29-utc.webp` (1920x1231)
    - **Mejora Adicional:** Se actualizaron también las imágenes de respaldo `FALLBACK_IMAGES` en `src/js/home.js` con estos mismos recursos WebP de alta definición y se blindó el formateo de destinos en `fetchActiveTrips()`.

  - **Corrección de Duración Errónea (1 Día) en "Egipto y Turquía":**
    - **Causa Raíz:** En la colección Firestore `travel`, el documento de *Egipto y Turquía* (`UM92J1UeKg6kMZAvUq5C`) tenía el campo legado `durationDays` configurado erróneamente en `1` (y `durationNights: 0`), a pesar de tener `duration_days: 16` y 16 días completos detallados en su itinerario. En el código del frontend, las tarjetas leían prioritariamente `trip.durationDays || trip.duration_days`, evaluando `1` como valor verdadero y mostrando "1 Día" en todas las vistas.
    - **Corrección en Base de Datos:** Se actualizó el documento en Firestore vía REST API estableciendo `durationDays: 16` y `durationNights: 15`.
    - **Blindaje Resiliente en Frontend:** Se implementó una lógica de cálculo unificada y resiliente `Math.max(Number(duration_days) || 0, Number(durationDays) || 0, trip.itinerary?.length || 0)` en [itinerarios.html](file:///c:/andreia/Web-sueno-travel/itinerarios.html), [viajes-grupales.html](file:///c:/andreia/Web-sueno-travel/viajes-grupales.html), [viajes-a-medida.html](file:///c:/andreia/Web-sueno-travel/viajes-a-medida.html), [grupos-abiertos.html](file:///c:/andreia/Web-sueno-travel/grupos-abiertos.html), [destino.html](file:///c:/andreia/Web-sueno-travel/destino.html), [src/js/home.js](file:///c:/andreia/Web-sueno-travel/src/js/home.js) y [src/js/viaje.js](file:///c:/andreia/Web-sueno-travel/src/js/viaje.js). De esta manera, el sistema siempre toma la duración real más precisa aun si un campo numérico secundario estuviera desfasado.

  - **Eliminación de Números de Teléfono y Presentación de Dirección:**
    - **Diagnóstico:** En el pie de página global (`components/footer.html`) y archivos estáticos asociados se mostraba un número de teléfono (`+20 111 057 2308` / `+56 9 9999 8888`), en lugar de la dirección oficial de la agencia.
    - **Solución:** Se retiraron todos los números telefónicos impresos y se reemplazaron por la dirección corporativa: `"Santiago, Chile / El Cairo, Egipto"`, acompañada del icono de ubicación (`fa-location-dot`) y de la cuenta de correo oficial `contacto@suenotravel.cl`.
    - **Internacionalización:** Se añadió la clave `"footer.direccion"` en [locales/home/es.json](file:///c:/andreia/Web-sueno-travel/locales/home/es.json) y [locales/home/en.json](file:///c:/andreia/Web-sueno-travel/locales/home/en.json), validado con `node scripts/auto-translate.js`.

*(Agrega nuevas entradas aquí al finalizar tus tareas en futuras sesiones)*

