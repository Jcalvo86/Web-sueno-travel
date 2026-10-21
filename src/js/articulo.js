import SEOManager from './seo-manager.js';

export const loadArticleData = async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    const showError = (msg) => {
        const loader = document.getElementById('loading-state');
        if (loader) {
            loader.innerHTML = `
                <span class="material-symbols-outlined text-secondary text-5xl">error</span>
                <p class="text-on-surface font-semibold text-lg mt-2">${msg}</p>
                <a href="conocenos.html" class="mt-4 inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors">Volver a Conócenos</a>
            `;
        }
    };

    if (!articleId) {
        showError('No se especificó un identificador de artículo.');
        return;
    }

    try {
        let checks = 0;
        while (!window.DataSource && checks < 15) {
            await new Promise(r => setTimeout(r, 100));
            checks++;
        }

        let articles = [];
        if (window.DataSource) {
            try {
                articles = await window.DataSource.getItems('cms_posts') || [];
            } catch (e) {
                console.warn('No se pudo consultar DataSource cms_posts, evaluando fallback:', e);
            }
        }

        // Si no hay artículos en BD o no se encuentra, usar SEED_ARTICLES
        const seedArticles = window.Glosaurio?.SEED_ARTICLES || [];
        if (!articles.length) {
            articles = seedArticles;
        }

        let article = articles.find(a => a.id === articleId || a.slug === articleId);
        if (!article && seedArticles.length) {
            article = seedArticles.find(a => a.id === articleId || a.slug === articleId);
        }

        if (!article) {
            showError('El artículo solicitado no existe o no se encuentra disponible.');
            return;
        }

        // Render UI
        document.title = `${article.title} | Sueño Travel`;
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-tag').textContent = article.tag || article.category || 'Blog';
        document.getElementById('article-excerpt').textContent = article.excerpt || article.summary || '';
        document.getElementById('article-author').textContent = article.author || 'Equipo Sueño Travel';
        document.getElementById('article-author-role').textContent = article.authorRole || '';
        
        const avatarEl = document.getElementById('article-author-avatar');
        if (article.authorAvatar) {
            avatarEl.src = article.authorAvatar;
            avatarEl.alt = article.author || 'Autor';
        } else {
            avatarEl.style.display = 'none';
        }

        const headerImgEl = document.getElementById('article-header-image');
        const coverImageUrl = article.headerImage || article.coverImage;
        if (coverImageUrl) {
            headerImgEl.src = coverImageUrl;
            headerImgEl.alt = article.title;
        } else {
            headerImgEl.parentElement.style.display = 'none';
        }

        document.getElementById('article-content').innerHTML = article.content || '';

        // Dynamic SEO & AEO (Open Graph, Meta Tags & Schema.org JSON-LD)
        const canonicalUrl = `https://suenotravel.cl/articulo.html?id=${encodeURIComponent(article.id || article.slug)}`;
        const ogImage = coverImageUrl ? (coverImageUrl.startsWith('http') ? coverImageUrl : `https://suenotravel.cl/${coverImageUrl}`) : 'https://suenotravel.cl/Imagenes/Sueno-travel-1.webp';
        
        SEOManager.updateMetaTags({
            title: `${article.title} | Sueño Travel`,
            description: article.excerpt || article.summary || '',
            image: ogImage,
            url: canonicalUrl
        });

        SEOManager.injectJSONLD({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.excerpt || article.summary || '',
            "image": ogImage,
            "author": {
                "@type": "Person",
                "name": article.author || "Jessica Lagos"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Sueño Travel",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://suenotravel.cl/Imagenes/logo_suenoTravel%20Chile.svg"
                }
            },
            "mainEntityOfPage": canonicalUrl,
            "datePublished": article.createdAt || "2025-01-01"
        });

        // Render Related Articles
        const allAvailable = articles.length >= seedArticles.length ? articles : [...articles, ...seedArticles];
        const uniqueArticles = Array.from(new Map(allAvailable.map(item => [item.id || item.slug, item])).values());
        const related = uniqueArticles.filter(a => (a.id !== article.id && a.slug !== article.id)).slice(0, 2);

        const relatedSection = document.getElementById('related-articles-section');
        const relatedGrid = document.getElementById('related-articles-grid');
        if (relatedSection && relatedGrid && related.length > 0) {
            relatedGrid.innerHTML = related.map(rel => `
                <a href="articulo.html?id=${encodeURIComponent(rel.id || rel.slug)}" class="group bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-secondary transition-all flex flex-col">
                    <div class="aspect-[16/10] overflow-hidden">
                        <img src="${rel.headerImage || rel.coverImage || 'Imagenes/Sueno-travel-1.webp'}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <span class="text-xs font-bold uppercase tracking-wider text-secondary mb-2">${rel.tag || 'Bitácora'}</span>
                        <h4 class="text-lg font-bold text-primary group-hover:text-secondary transition-colors line-clamp-2 mb-2 font-display-lg">${rel.title}</h4>
                        <p class="text-on-surface-variant text-sm line-clamp-2 mb-4">${rel.excerpt || ''}</p>
                        <span class="mt-auto inline-flex items-center gap-1 text-sm font-bold text-secondary">
                            Leer historia <span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </span>
                    </div>
                </a>
            `).join('');
            relatedSection.classList.remove('hidden');
        }

        // Transition states
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('content-state').classList.remove('hidden');

    } catch (e) {
        console.error(e);
        showError('Ocurrió un error al cargar el artículo.');
    }
};
