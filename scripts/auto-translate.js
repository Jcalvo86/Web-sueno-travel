const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');

// Función para traducir un texto de Español a Inglés usando API gratuita
async function translateText(text) {
    if (!text || typeof text !== 'string') return text;
    try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=en&dt=t&q=${encodeURIComponent(text)}`);
        const json = await res.json();
        // Google Translate devuelve un array de arrays con las traducciones
        return json[0].map(item => item[0]).join('');
    } catch (error) {
        console.error('Error traduciendo:', text, error.message);
        return text; // Si falla, devuelve el original para no romper el JSON
    }
}

// Función recursiva para buscar llaves faltantes y traducir
async function processTranslation(esObj, enObj) {
    const translatedObj = { ...enObj };
    let hasChanges = false;

    for (const key in esObj) {
        if (typeof esObj[key] === 'object' && esObj[key] !== null) {
            // Si es un objeto, aplicamos recursividad
            if (!translatedObj[key] || typeof translatedObj[key] !== 'object') {
                translatedObj[key] = {};
            }
            const result = await processTranslation(esObj[key], translatedObj[key]);
            translatedObj[key] = result.translatedObj;
            if (result.hasChanges) hasChanges = true;
        } else {
            // Si es un string y no existe en inglés o está vacío
            if (!translatedObj[key] || translatedObj[key].trim() === '') {
                console.log(`Traduciendo: "${esObj[key]}"...`);
                translatedObj[key] = await translateText(esObj[key]);
                hasChanges = true;
            }
        }
    }
    
    return { translatedObj, hasChanges };
}

async function run() {
    console.log('--- Iniciando traducción automática de es.json a en.json ---');
    const namespaces = fs.readdirSync(localesDir);

    for (const ns of namespaces) {
        const nsPath = path.join(localesDir, ns);
        if (!fs.statSync(nsPath).isDirectory()) continue;

        const esPath = path.join(nsPath, 'es.json');
        const enPath = path.join(nsPath, 'en.json');

        if (fs.existsSync(esPath)) {
            const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));
            const enData = fs.existsSync(enPath) ? JSON.parse(fs.readFileSync(enPath, 'utf8')) : {};

            console.log(`Revisando sección: ${ns}`);
            const { translatedObj, hasChanges } = await processTranslation(esData, enData);

            if (hasChanges) {
                fs.writeFileSync(enPath, JSON.stringify(translatedObj, null, 2), 'utf8');
                console.log(`✅ Archivo en.json actualizado en ${ns}/`);
            } else {
                console.log(`✔️  El archivo ${ns}/en.json ya está al día.`);
            }
        }
    }
    console.log('--- Traducción completada ---');
}

run();
