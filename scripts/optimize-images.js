const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT_DIR, 'Imagenes');
const SUENO_DIR = path.join(ROOT_DIR, 'Imagenes_suenotravel');

// Extensiones a convertir a WebP
const CONVERT_EXTENSIONS = ['.jpg', '.jpeg', '.jfif'];
// Archivos a proteger / excluir de conversión o compresión destructiva
const EXCLUDE_FILES = ['favicon.png', 'logo_suenotravel.png', 'palette.png', 'egipto.png', 'grecia.png', 'jordania.png', 'turquia.png'];

async function copyUsefulSvgs() {
    console.log('--- 1. Copiando iconos necesarios de Imagenes_suenotravel a Imagenes ---');
    const svgs = ['destination.svg', 'discover.svg', 'world.svg', 'booking.svg'];
    for (const svg of svgs) {
        const src = path.join(SUENO_DIR, svg);
        const dest = path.join(IMAGES_DIR, svg);
        if (fs.existsSync(src) && !fs.existsSync(dest)) {
            fs.copyFileSync(src, dest);
            console.log(`  -> Copiado icono: ${svg}`);
        }
    }
}

async function optimizeImages() {
    console.log('\n--- 2. Optimizando imágenes en carpeta Imagenes/ ---');
    const files = fs.readdirSync(IMAGES_DIR);
    let convertedCount = 0;
    let resizedCount = 0;
    let savedBytes = 0;

    for (const file of files) {
        const filePath = path.join(IMAGES_DIR, file);
        if (!fs.statSync(filePath).isFile()) continue;

        // Limpieza de archivos temporales previos
        if (file.startsWith('temp_')) {
            try { fs.unlinkSync(filePath); } catch (e) {}
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, ext);

        if (EXCLUDE_FILES.includes(file.toLowerCase())) {
            continue;
        }

        // Caso A: Convertir .jfif, .jpg, .jpeg a .webp
        if (CONVERT_EXTENSIONS.includes(ext)) {
            const destName = `${baseName}.webp`;
            const destPath = path.join(IMAGES_DIR, destName);
            const originalSize = fs.statSync(filePath).size;

            try {
                const inputBuffer = fs.readFileSync(filePath);
                const outputBuffer = await sharp(inputBuffer)
                    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: 80, effort: 4 })
                    .toBuffer();

                fs.writeFileSync(destPath, outputBuffer);
                const saved = originalSize - outputBuffer.length;
                savedBytes += (saved > 0 ? saved : 0);
                convertedCount++;

                console.log(`✓ Convertido: ${file} -> ${destName} (Antes: ${(originalSize / 1024).toFixed(0)} KB -> Ahora: ${(outputBuffer.length / 1024).toFixed(0)} KB)`);

                // Eliminar archivo original
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error(`X Error al convertir ${file}:`, err.message);
            }
        }

        // Caso B: WebP existente pero excesivamente pesado (> 500 KB)
        else if (ext === '.webp') {
            const originalSize = fs.statSync(filePath).size;
            if (originalSize > 500 * 1024) { // Mayor a 500 KB
                try {
                    // Usar Buffers en memoria para evitar bloqueos de archivos en Windows
                    const inputBuffer = fs.readFileSync(filePath);
                    const outputBuffer = await sharp(inputBuffer)
                        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
                        .webp({ quality: 80, effort: 4 })
                        .toBuffer();

                    if (outputBuffer.length < originalSize) {
                        fs.writeFileSync(filePath, outputBuffer);
                        const saved = originalSize - outputBuffer.length;
                        savedBytes += saved;
                        resizedCount++;
                        console.log(`⚡ Comprimido: ${file} (Antes: ${(originalSize / 1024 / 1024).toFixed(2)} MB -> Ahora: ${(outputBuffer.length / 1024).toFixed(0)} KB, Ahorro: ${(saved / 1024 / 1024).toFixed(2)} MB)`);
                    }
                } catch (err) {
                    console.error(`X Error al optimizar WebP ${file}:`, err.message);
                }
            }
        }
    }

    console.log(`\n========================================`);
    console.log(`Archivos convertidos a WebP: ${convertedCount}`);
    console.log(`Imágenes gigantes comprimidas: ${resizedCount}`);
    console.log(`Espacio adicional ahorrado: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`========================================\n`);
}

async function run() {
    await copyUsefulSvgs();
    await optimizeImages();
}

run();
