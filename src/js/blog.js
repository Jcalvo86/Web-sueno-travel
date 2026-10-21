export const initBlogPage = async () => {
    const loader = document.getElementById('blog-loading');
    const grid = document.getElementById('blog-grid');
    const emptyState = document.getElementById('blog-empty');
    const filterBtns = document.querySelectorAll('.blog-filter-btn');

    let allArticles = [];

    // Esperar a DataSource si está disponible
    let checks = 0;
    while (!window.DataSource && checks < 15) {
        await new Promise(r => setTimeout(r, 100));
        checks++;
    }

    try {
        if (window.DataSource) {
            try {
                const remote = await window.DataSource.getItems('cms_posts');
                if (Array.isArray(remote) && remote.length > 0) {
                    allArticles = remote;
                }
            } catch (e) {
                console.warn('Error fetching cms_posts, checking seed fallback:', e);
            }
        }
    } catch (err) {
        console.error(err);
    }

    // Unificar con SEED_ARTICLES asegurando unicidad
    const seed = window.Glosaurio?.SEED_ARTICLES || [];
    if (!allArticles.length) {
        allArticles = seed;
    } else {
        const map = new Map();
        [...allArticles, ...seed].forEach(a => {
            const key = a.id || a.slug;
            if (!map.has(key)) map.set(key, a);
        });
        allArticles = Array.from(map.values());
    }

    const renderArticles = (articles) => {
        if (!grid) return;
        if (!articles.length) {
            grid.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        grid.innerHTML = articles.map(article => {
            const id = article.id || article.slug;
            const title = article.title || 'Sin título';
            const excerpt = article.excerpt || article.summary || '';
            const tag = article.tag || article.category || 'Bitácora';
            const img = article.headerImage || article.coverImage || 'Imagenes/Sueno-travel-1.webp';
            const author = article.author || 'Jessica Lagos';
            const authorAvatar = article.authorAvatar || 'Imagenes/JessicaLagos.webp';

            return `
            <article class="bg-surface rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
                <a href="articulo.html?id=${encodeURIComponent(id)}" class="relative aspect-[16/10] overflow-hidden block">
                    <img src="${img}" alt="${title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-4 left-4 bg-secondary text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                        ${tag}
                    </span>
                </a>
                <div class="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                    <h3 class="text-xl md:text-2xl font-bold text-primary font-display-lg group-hover:text-secondary transition-colors line-clamp-2">
                        <a href="articulo.html?id=${encodeURIComponent(id)}">${title}</a>
                    </h3>
                    <p class="text-on-surface-variant text-sm md:text-base leading-relaxed line-clamp-3">
                        ${excerpt}
                    </p>
                    <div class="pt-6 mt-auto border-t border-outline-variant/20 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="${authorAvatar}" alt="${author}" class="w-9 h-9 rounded-full object-cover border border-outline-variant/30">
                            <span class="text-xs font-semibold text-primary">${author}</span>
                        </div>
                        <a href="articulo.html?id=${encodeURIComponent(id)}" class="text-secondary font-bold text-sm hover:text-primary transition-colors inline-flex items-center gap-1 group/link">
                            <span>Leer historia</span>
                            <span class="material-symbols-outlined text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </article>`;
        }).join('');
    };

    const filterArticles = (filter) => {
        filterBtns.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            if (btnFilter === filter) {
                btn.classList.add('bg-primary', 'text-white', 'shadow-md');
                btn.classList.remove('bg-surface', 'text-on-surface-variant', 'border', 'border-outline-variant/40');
            } else {
                btn.classList.remove('bg-primary', 'text-white', 'shadow-md');
                btn.classList.add('bg-surface', 'text-on-surface-variant', 'border', 'border-outline-variant/40');
            }
        });

        if (filter === 'all') {
            renderArticles(allArticles);
        } else {
            const filtered = allArticles.filter(a => {
                const target = `${a.tag || ''} ${a.category || ''} ${a.title || ''}`.toLowerCase();
                return target.includes(filter.toLowerCase());
            });
            renderArticles(filtered);
        }
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterArticles(btn.getAttribute('data-filter'));
        });
    });

    if (loader) loader.classList.add('hidden');
    if (grid) grid.classList.remove('hidden');

    filterArticles('all');
};
