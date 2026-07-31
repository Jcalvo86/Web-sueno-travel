const fs = require('fs');
const path = require('path');
const https = require('https');
const url = require('url');

// Configuración
const START_URL = 'https://suenotravel.es/';
const OUTPUT_DIR = path.join(__dirname, 'Imagenes_suenotravel');
const MAX_PAGES_TO_CRAWL = 20; // Limitar el número de páginas internas a rastrear

// Estados para evitar bucles o descargas duplicadas
const visitedUrls = new Set();
const downloadedImages = new Set();
let pagesCrawled = 0;

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Función auxiliar para descargar una página (HTML)
function fetchHtml(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Manejar redirecciones básicas
        const redirectUrl = url.resolve(targetUrl, res.headers.location);
        return fetchHtml(redirectUrl).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        return reject(new Error(`Error al obtener ${targetUrl}: Código ${res.statusCode}`));
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Función auxiliar para descargar y guardar una imagen en disco
function downloadImage(imageUrl) {
  const parsedUrl = url.parse(imageUrl);
  // Obtener la extensión y nombre del archivo original
  let filename = path.basename(parsedUrl.pathname) || 'imagen';
  // Sanitizar el nombre del archivo
  filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  
  // Si no tiene extensión de imagen común, forzar una
  if (!/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(filename)) {
    filename += '.jpg';
  }

  const destPath = path.join(OUTPUT_DIR, filename);

  // Evitar sobreescribir o duplicar
  if (fs.existsSync(destPath)) {
    console.log(`[Saltado] Ya existe: ${filename}`);
    return;
  }

  https.get(imageUrl, (res) => {
    if (res.statusCode !== 200) {
      console.error(`[Error] Fallo al descargar imagen: ${imageUrl} (Código ${res.statusCode})`);
      return;
    }

    const fileStream = fs.createWriteStream(destPath);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`[Descargado] ${filename}`);
    });
  }).on('error', (err) => {
    console.error(`[Error] Error de red en imagen ${imageUrl}:`, err.message);
  });
}

// Función principal de rastreo
async function crawl(targetUrl) {
  // Normalizar URL eliminando hashes y barras finales
  const parsed = url.parse(targetUrl);
  const normalizedUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(/\/$/, '');

  if (visitedUrls.has(normalizedUrl)) return;
  visitedUrls.add(normalizedUrl);
  pagesCrawled++;

  console.log(`\n=== Rastreando página (${pagesCrawled}/${MAX_PAGES_TO_CRAWL}): ${normalizedUrl} ===`);

  try {
    const html = await fetchHtml(targetUrl);

    // 1. Extraer y descargar imágenes de la página actual
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    const foundImages = [];

    while ((match = imgRegex.exec(html)) !== null) {
      let imgSrc = match[1];
      // Resolver URLs relativas a absolutas
      const absoluteImgUrl = url.resolve(targetUrl, imgSrc);
      foundImages.push(absoluteImgUrl);
    }

    // Descargar las imágenes encontradas
    for (const imgUrl of foundImages) {
      if (!downloadedImages.has(imgUrl)) {
        downloadedImages.add(imgUrl);
        downloadImage(imgUrl);
      }
    }

    // 2. Extraer enlaces internos para seguir rastreando
    if (pagesCrawled < MAX_PAGES_TO_CRAWL) {
      const linkRegex = /<a[^>]+href=["']([^"']+)["']/gi;
      const foundLinks = [];

      while ((match = linkRegex.exec(html)) !== null) {
        const linkHref = match[1];
        const absoluteLink = url.resolve(targetUrl, linkHref);
        const parsedLink = url.parse(absoluteLink);

        // Asegurar que el enlace pertenece al mismo dominio y no es un ancla o archivo estático
        if (
          parsedLink.host === parsed.host && 
          !linkHref.startsWith('#') &&
          !/\.(pdf|zip|docx|xlsx|png|jpg|jpeg|webp)$/i.test(parsedLink.pathname)
        ) {
          foundLinks.push(absoluteLink);
        }
      }

      // Rastrear recursivamente los enlaces encontrados
      for (const link of foundLinks) {
        if (pagesCrawled >= MAX_PAGES_TO_CRAWL) break;
        await crawl(link);
      }
    }

  } catch (err) {
    console.error(`[Error] Error al rastrear ${targetUrl}:`, err.message);
  }
}

// Iniciar proceso
console.log('Iniciando descarga de imágenes de suenotravel.es...');
console.log(`Las imágenes se guardarán en: ${OUTPUT_DIR}`);
crawl(START_URL).then(() => {
  // Esperar un momento a que terminen las descargas pendientes de streams
  setTimeout(() => {
    console.log('\n=== Proceso de rastreo completado ===');
    console.log(`Total de páginas rastreadas: ${pagesCrawled}`);
    console.log(`Total de imágenes únicas procesadas: ${downloadedImages.size}`);
  }, 5000);
});
