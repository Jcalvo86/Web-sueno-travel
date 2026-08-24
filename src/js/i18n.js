/**
 * i18n.js — Sueño Travel
 * Internacionalización basada en i18next + i18next-browser-languagedetector
 * Idiomas: es (default) | en
 * Persistencia: localStorage + parámetro URL (?lang=en)
 */

// ─── Loader interno de recursos JSON (sin bundler) ───────────────────────────
async function loadModule(ns, lang) {
    try {
        const res = await fetch(`/locales/${ns}/${lang}.json`);
        if (!res.ok) throw new Error(`${res.status}`);
        return await res.json();
    } catch {
        return {};
    }
}

// ─── Estado interno ──────────────────────────────────────────────────────────
let _resources = {};   // { es: { header: {…}, home: {…} }, en: {…} }
let _currentLang = 'es';
let _loadedNamespaces = [];

// ─── Carga de recursos ───────────────────────────────────────────────────────
async function loadResources(namespaces, languages = ['es', 'en']) {
    for (const lang of languages) {
        _resources[lang] = _resources[lang] || {};
        for (const ns of namespaces) {
            if (!_resources[lang][ns]) {
                _resources[lang][ns] = await loadModule(ns, lang);
            }
        }
    }
    _loadedNamespaces = namespaces;
}

// ─── Función de traducción ───────────────────────────────────────────────────
function t(key, ns = 'common') {
    const langData = _resources[_currentLang]?.[ns] || {};
    const fallbackData = _resources['es']?.[ns] || {};

    // Soporte a dot-notation: "hero.title"
    const resolve = (obj, dotKey) => dotKey.split('.').reduce((o, k) => o?.[k], obj);
    return resolve(langData, key) ?? resolve(fallbackData, key) ?? key;
}

// ─── Detección de idioma ─────────────────────────────────────────────────────
function detectLanguage() {
    // 1. URL param: ?lang=en
    const urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam && ['es', 'en'].includes(urlParam)) return urlParam;

    // 2. localStorage
    const stored = localStorage.getItem('sueno-lang');
    if (stored && ['es', 'en'].includes(stored)) return stored;

    // 3. Browser language
    const browserLang = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return ['es', 'en'].includes(browserLang) ? browserLang : 'es';
}

// ─── Persistencia + URL ──────────────────────────────────────────────────────
function persistLanguage(lang) {
    localStorage.setItem('sueno-lang', lang);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
}

// ─── Aplicar traducciones al DOM ─────────────────────────────────────────────
function applyTranslations(ns) {
    // Textos: data-i18n="key" (dentro del namespace ns)
    document.querySelectorAll(`[data-i18n]`).forEach(el => {
        const key = el.getAttribute('data-i18n');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        const translated = t(key, elNs);
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // nada — estos usan placeholder
        } else {
            el.textContent = translated;
        }
    });

    // innerHTML (para claves con etiquetas <strong>): data-i18n-html="key"
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        el.innerHTML = t(key, elNs);
    });

    // Placeholders: data-i18n-placeholder="key"
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        el.setAttribute('placeholder', t(key, elNs));
    });

    // Alt: data-i18n-alt="key"
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        el.setAttribute('alt', t(key, elNs));
    });

    // Aria-label: data-i18n-aria="key"
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        el.setAttribute('aria-label', t(key, elNs));
    });

    // Title: data-i18n-title="key"
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const elNs = el.getAttribute('data-i18n-ns') || ns;
        el.setAttribute('title', t(key, elNs));
    });

    // Page <title> tag: data-i18n-title-tag="namespace:key"
    const titleEl = document.querySelector('[data-i18n-title-tag]');
    if (titleEl) {
        const [tNs, tKey] = titleEl.getAttribute('data-i18n-title-tag').split(':');
        const translated = t(tKey || tNs, tKey ? tNs : ns);
        if (translated && translated !== tKey) document.title = translated;
    }

    // Meta description: update by id
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) {
        const metaKey = `metaDescription`;
        const translated = t(metaKey, ns);
        if (translated && translated !== metaKey) metaDesc.setAttribute('content', translated);
    }
}

// ─── Cambio de idioma público ─────────────────────────────────────────────────
async function setLanguage(lang, pageNs) {
    if (!['es', 'en'].includes(lang)) return;
    _currentLang = lang;
    persistLanguage(lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(pageNs || _loadedNamespaces[0] || 'common');
    updateLangButtons(lang);
}

// ─── Actualizar estado visual de botones EN/ES ────────────────────────────────
function updateLangButtons(lang) {
    const btnEs = document.getElementById('lang-es');
    const btnEn = document.getElementById('lang-en');
    if (!btnEs || !btnEn) return;

    if (lang === 'es') {
        btnEs.classList.add('opacity-100', 'font-bold', 'underline');
        btnEn.classList.remove('opacity-100', 'font-bold', 'underline');
        btnEs.classList.remove('opacity-50');
        btnEn.classList.add('opacity-50');
    } else {
        btnEn.classList.add('opacity-100', 'font-bold', 'underline');
        btnEs.classList.remove('opacity-100', 'font-bold', 'underline');
        btnEn.classList.remove('opacity-50');
        btnEs.classList.add('opacity-50');
    }
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────
async function initI18n({ namespaces = ['header'], pageNs = 'home' } = {}) {
    await loadResources([...new Set(['header', ...namespaces])]);
    _currentLang = detectLanguage();
    persistLanguage(_currentLang);
    document.documentElement.setAttribute('lang', _currentLang);
    applyTranslations(pageNs);
    updateLangButtons(_currentLang);
}

// ─── API pública global ───────────────────────────────────────────────────────
window.i18n = {
    t,
    setLanguage,
    detectLanguage,
    initI18n,
    getCurrentLang: () => _currentLang,
};

// ─── Auto-init on DOMContentLoaded ───────────────────────────────────────────
// Each page sets data-page-ns on <body> (e.g. data-page-ns="home").
// The i18n module reads it and bootstraps automatically.
document.addEventListener('DOMContentLoaded', () => {
    const pageNs = document.body?.getAttribute('data-page-ns') || 'home';
    initI18n({ namespaces: [pageNs], pageNs });
});
