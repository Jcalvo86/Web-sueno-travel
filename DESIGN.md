# Sistema de Diseño - Sueño Travel (DESIGN.md)

Este documento define la identidad visual, la paleta de colores, la tipografía y los principios de movimiento aplicados en el sitio web de **Sueño Travel**. Su objetivo es servir como guía de referencia única para mantener la coherencia y elegancia premium en el desarrollo de la interfaz de usuario.

---

## 1. Identidad de Marca y Concepto Visual
**Sueño Travel** diseña experiencias de viaje personalizadas de gran lujo para exploradores cultos. Su estética visual se basa en:
- **Elegancia Atemporal:** Fondos limpios y amplios márgenes (aire visual).
- **Inspiración en el Destino:** Tonos inspirados en el mar, la arena del desierto, los mármoles clásicos y la piedra histórica.
- **Jerarquía y Contraste:** Secciones oscuras inmersivas frente a zonas de contenido claras y limpias.

---

## 2. Paleta de Colores

### 2.1. Colores Principales (Maquetación Moderna / Tailwind CSS)
Estos colores se definen en el archivo `index.html` e `inicio.html` dentro de la configuración extendida de Tailwind CSS:

| Token Tailwind | Color Hex | Nombre Conceptual | Propósito y Uso |
| :--- | :--- | :--- | :--- |
| `primary` | `#091524` | **Azul Noche Profundo** | Color base para fondos de secciones inmersivas, encabezados principales y textos de alto contraste. |
| `secondary` | `#7F5621` | **Marrón Dorado / Bronce** | Color de acento de marca. Utilizado en botones primarios, enlaces activos y elementos destacados. |
| `secondary-fixed` | `#FFDDB9` | **Crema Arena Clara** | Fondos de badges, textos resaltados en secciones oscuras y contrastes suaves. |
| `secondary-fixed-dim`| `#F3BC7D`| **Dorado Arena Medio** | Estados de interacción (`hover`) para botones y enlaces secundarios. |
| `background` | `#FBF9F8` | **Blanco Hueso / Nácar** | Fondo general claro de la página que genera amplitud y limpieza visual. |
| `surface` | `#FBF9F8` | **Superficie Neutra** | Color de tarjetas y contenedores en secciones claras. |
| `tertiary` | `#17150F` | **Negro Carbón Cálido** | Textos secundarios y sombras atenuadas. |

### 2.2. Paleta de Estilos Generales (`styles.css` / `style.css`)
Utilizados para elementos clásicos, páginas de detalle del CMS y componentes del panel de control:

| Variable CSS | Color Hex | Nombre Conceptual | Propósito y Uso |
| :--- | :--- | :--- | :--- |
| `--primary` | `#477998` | **Azul del Nilo** | Detalles interactivos, botones del CMS e indicadores de navegación. |
| `--accent-orange` | `#BB864E` | **Marrón Dorado / Terracota** | Color de acento para hovers y estados activos de enlaces. |
| `--secondary` | `#EFDFD1` | **Fondo Crema Almendra** | Fondo base cálido para secciones del sitio clásico y del footer. |
| `--footer-bg` | `#CBC2B9` | **Gris Piedra Cálido** | Fondo de pie de página y bordes decorativos. |
| `--text-dark` | `#32291F` | **Marrón Café Oscuro** | Color principal de las tipografías para garantizar una lectura suave sin la dureza del negro puro. |
| `--text-gray` | `#B5886D` | **Terracota Claro / Arena** | Textos secundarios, subtítulos y etiquetas de información atenuada. |

---

## 3. Tipografía

El sitio web utiliza fuentes cargadas desde Google Fonts, optimizadas para legibilidad en pantalla y distinción visual:

### 3.1. Tipografía en Secciones Modernas (Tailwind)
- **Familia Display (Títulos):** `'BJ Cree'`, `'Manrope'`, sans-serif.
  - *Estilo:* Negrita extrema (`font-extrabold` / `font-bold`), espaciado estrecho (`tracking-tight`).
- **Familia Body (Textos):** `'Plus Jakarta Sans'`, sans-serif.
  - *Estilo:* Peso regular (`font-normal`), espaciado amplio y limpio para facilitar la lectura.

### 3.2. Tipografía en Secciones Clásicas (`styles.css`)
- **Títulos (`h1` a `h6`):** `'Poppins'`, sans-serif (Peso 700+).
- **Textos Corporales (`body`):** `'Urbanist'`, sans-serif.

---

## 4. Ritmo y Espaciado

Siguiendo el principio de **baja densidad y alto espacio en blanco** para sitios orientados a conversión y marketing:

- **Ritmo de Espaciado Base-4:** Todos los paddings, margins y gaps deben ser múltiplos de `4px` (ej. 8, 16, 24, 32, 48, 64px).
- **Paddings de Sección (Vertical):** Rango de `64px` a `112px` (equivalente en Tailwind a `py-16` hasta `py-28`).
- **Ancho Contenedor Máximo (Container Max-Width):**
  - Contenido estándar: `1280px` (`max-w-7xl` o `max-w-container-max`).
  - Textos largos / Secciones centradas: `768px` (`max-w-3xl`).
- **Accesibilidad Táctil:** El área interactiva (hitbox) de botones, iconos interactivos y enlaces móviles debe ser de al menos **44×44px** para facilitar la pulsación táctil.

---

## 5. Movimiento y Animaciones

El movimiento en **Sueño Travel** es fluido, orgánico y ayuda a guiar la atención del usuario:

### 5.1. Efecto Parallax en Hero Slider
- El contenedor de fondo `#hero-slider-container` posee un desfase vertical (`top: -15%`, `height: 130%`) y se desplaza a una velocidad reducida al hacer scroll (`scrolled * 0.35`).
- Implementado mediante `translate3d(0, Y, 0)` para habilitar **aceleración por hardware GPU** y suavidad total en dispositivos móviles.

### 5.2. Transiciones e Interacciones
- **Cambio de Diapositiva (Hero Slider):** `1.2s` (`duration-1200`) con curva `ease-in-out` combinando difuminado (`blur`) y escalado suave (`scale(1.02)` a `scale(1.08)`).
- **Botones y Tarjetas (Hovers):** `300ms` (`duration-300`) con traslación vertical de `translate-y-[-4px]` y aumento sutil de contraste o sombra.
- **Acciones y Formularios:** Animaciones de carga de red con micro-rotación (`animate-spin`) en iconos circulares.
