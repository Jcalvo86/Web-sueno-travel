const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

// 1. Extraer CSS
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>') + 8;
if (styleStart !== -1 && styleEnd !== -1) {
    const styleContent = content.substring(styleStart + 7, styleEnd - 8);
    fs.writeFileSync('styles.css', styleContent.trim());
    content = content.substring(0, styleStart) + '    <link rel="stylesheet" href="styles.css" />\n' + content.substring(styleEnd);
}

// 2. Extraer Legacy Script
const legacyStart = content.indexOf('<script type="text/plain" id="legacy-script-disabled">');
if (legacyStart !== -1) {
    const legacyEnd = content.indexOf('</script>', legacyStart) + 9;
    const legacyContent = content.substring(legacyStart, legacyEnd);
    fs.writeFileSync('legacy-scripts-backup.txt', legacyContent);
    content = content.substring(0, legacyStart) + content.substring(legacyEnd);
}

// 3. Quitar template trip-card-template que no se usa o moverlo
const templateStart = content.indexOf('<template id="trip-card-template">');
if (templateStart !== -1) {
    const templateEnd = content.indexOf('</template>', templateStart) + 11;
    const templateContent = content.substring(templateStart, templateEnd);
    if (!fs.existsSync('components')) { fs.mkdirSync('components'); }
    fs.writeFileSync('components/trip-card-template.html', templateContent);
    // Dejamos un comentario en su lugar
    content = content.substring(0, templateStart) + '    <!-- trip-card-template was moved to components/trip-card-template.html -->\n' + content.substring(templateEnd);
}

// Guardar
content = content.replace(/\n\s*\n\s*\n/g, '\n\n'); // limpiar lineas vacias
fs.writeFileSync('index.html', content);
console.log('Extraction complete');
