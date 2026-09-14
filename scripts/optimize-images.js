const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..');
const TARGET_DIR = path.join(ROOT_DIR, 'Imagenes');
const SOURCE_DIRS = [
    path.join(ROOT_DIR, 'Fotos'),
    path.join(ROOT_DIR, 'Imagenes_suenotravel')
];

const EXTENSIONS_TO_CONVERT = ['.jpg', '.jpeg', '.png', '.jfif'];

function ensureDirSync(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function moveFilesToTarget() {
    console.log('--- 1. Consolidando imágenes ---');
    ensureDirSync(TARGET_DIR);

    SOURCE_DIRS.forEach(sourceDir => {
        if (!fs.existsSync(sourceDir)) return;
        
        console.log(`Revisando carpeta: ${path.basename(sourceDir)}`);
        const files = fs.readdirSync(sourceDir);
        
        files.forEach(file => {
            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(TARGET_DIR, file);
            
            if (fs.statSync(srcPath).isFile()) {
                if (!fs.existsSync(destPath)) {
                    fs.copyFileSync(srcPath, destPath);
                    console.log(`  -> Copiado: ${file}`);
                }
            }
        });
    });
    console.log('Consolidación terminada.\n');
}

async function optimizeToWebp() {
    console.log('--- 2. Optimizando a WebP ---');
    const files = fs.readdirSync(TARGET_DIR);
    let convertedCount = 0;
    let savedBytes = 0;

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        
        if (EXTENSIONS_TO_CONVERT.includes(ext)) {
            const srcPath = path.join(TARGET_DIR, file);
            const destName = path.basename(file, path.extname(file)) + '.webp';
            const destPath = path.join(TARGET_DIR, destName);
            
            if (fs.existsSync(destPath)) {
                // If WebP exists but original still exists, just delete original to clean up
                console.log(`- Saltando ${file}, ya existe ${destName}. Borrando original...`);
                try { fs.unlinkSync(srcPath); } catch(e) {}
                continue;
            }

            try {
                const originalSize = fs.statSync(srcPath).size;
                
                await sharp(srcPath)
                    .webp({ quality: 80, effort: 4 })
                    .toFile(destPath);
                
                const newSize = fs.statSync(destPath).size;
                const saved = originalSize - newSize;
                savedBytes += saved;
                convertedCount++;
                
                console.log(`✓ Convertido: ${file} -> ${destName} (Ahorro: ${(saved / 1024 / 1024).toFixed(2)} MB)`);
                
                fs.unlinkSync(srcPath);
            } catch (err) {
                console.error(`X Error convirtiendo ${file}:`, err.message);
            }
        }
    }

    console.log(`\n--- Resumen ---`);
    console.log(`Archivos convertidos: ${convertedCount}`);
    console.log(`Espacio total ahorrado: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

async function run() {
    moveFilesToTarget();
    await optimizeToWebp();
}

run();
