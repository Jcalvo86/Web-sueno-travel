const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Configuraciones
const ROOT_DIR = path.join(__dirname, '..');
// Carpeta donde pondrás tus imágenes nuevas sin procesar
const RAW_DIR = path.join(ROOT_DIR, 'Imagenes_Nuevas');
// Carpeta final optimizada de la app
const TARGET_DIR = path.join(ROOT_DIR, 'Imagenes');

const EXTENSIONS_TO_CONVERT = ['.jpg', '.jpeg', '.png', '.jfif', '.webp'];

function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

async function ingestImages() {
    console.log(`--- Ingestando nuevas imágenes desde: ${RAW_DIR} ---`);
    ensureDirSync(RAW_DIR);
    ensureDirSync(TARGET_DIR);

    const files = fs.readdirSync(RAW_DIR);
    if (files.length === 0) {
        console.log(`La carpeta "Imagenes_Nuevas" está vacía. No hay imágenes nuevas que procesar.`);
        console.log(`Coloca tus fotos originales ahí y vuelve a correr el script.`);
        return;
    }

    let processedCount = 0;
    let savedBytes = 0;

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const srcPath = path.join(RAW_DIR, file);

        if (fs.statSync(srcPath).isFile() && EXTENSIONS_TO_CONVERT.includes(ext)) {
            // Siempre guardaremos como .webp en el destino final
            const baseName = path.basename(file, path.extname(file));
            // Sanitizamos el nombre: minúsculas y guiones en vez de espacios
            const safeName = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
            const destName = `${safeName}.webp`;
            const destPath = path.join(TARGET_DIR, destName);

            try {
                const originalSize = fs.statSync(srcPath).size;
                
                // Procesar con Sharp
                await sharp(srcPath)
                    .webp({ quality: 80, effort: 4 })
                    .toFile(destPath);
                
                const newSize = fs.statSync(destPath).size;
                const saved = originalSize - newSize;
                savedBytes += saved;
                processedCount++;
                
                console.log(`✓ Ingestado: ${file} -> Imagenes/${destName}`);
                
                // Borrar el archivo crudo original de la carpeta "Imagenes_Nuevas"
                fs.unlinkSync(srcPath);
            } catch (err) {
                console.error(`X Error procesando ${file}:`, err.message);
            }
        } else {
            console.log(`- Ignorando ${file} (no es un formato de imagen soportado)`);
        }
    }

    if (processedCount > 0) {
        console.log(`\n--- Resumen de Ingestión ---`);
        console.log(`Nuevas imágenes añadidas a tu sitio: ${processedCount}`);
        console.log(`Espacio ahorrado vs originales: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
    }
}

ingestImages();
