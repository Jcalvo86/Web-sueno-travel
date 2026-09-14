export const loadArticleData = async () => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    const showError = (msg) => {
        const loader = document.getElementById('loading-state');
        if (loader) {
            loader.innerHTML = `
                <span class="material-symbols-outlined text-red-500 text-5xl">error</span>
                <p class="text-on-surface font-semibold text-lg mt-2">${msg}</p>
                <a href="conocenos.html" class="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-lg">Volver a Conócenos</a>
            `;
        }
    };

    if (!articleId) {
        showError('No se especificó un identificador de artículo.');
        return;
    }

    try {
        let checks = 0;
        while (!window.DataSource && checks < 20) {
            await new Promise(r => setTimeout(r, 100));
            checks++;
        }

        if (!window.DataSource) {
            showError('Error al conectar con la base de datos.');
            return;
        }

        const articles = await window.DataSource.getItems('cms_posts');
        const article = articles.find(a => a.id === articleId || a.slug === articleId);

        if (!article) {
            showError('El artículo solicitado no existe o no se encuentra disponible.');
            return;
        }

        // Render UI
        document.title = `${article.title} | Sueño Travel`;
        const metaDesc = document.getElementById('meta-description');
        if (metaDesc && (article.excerpt || article.summary)) metaDesc.setAttribute('content', article.excerpt || article.summary);

        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-tag').textContent = article.tag || article.category || 'Blog';
        document.getElementById('article-excerpt').textContent = article.excerpt || article.summary || '';
        document.getElementById('article-author').textContent = article.author || 'Equipo Sueño Travel';
        document.getElementById('article-author-role').textContent = article.authorRole || '';
        
        const avatarEl = document.getElementById('article-author-avatar');
        if (article.authorAvatar) {
            avatarEl.src = article.authorAvatar;
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

        // Transition states
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('content-state').classList.remove('hidden');

    } catch (e) {
        console.error(e);
        showError('Ocurrió un error al cargar el artículo.');
    }
};
