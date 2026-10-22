export const config = {
    runtime: 'edge', // Usamos Edge para mayor velocidad
};

export default async function handler(req) {
    const baseUrl = 'https://suenotravel.cl';
    
    // Configuración de Firebase (basada en crm-config.js)
    const projectId = "suenotravel";
    const firebaseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

    let urls = [
        { loc: '/', priority: 1.0, changefreq: 'weekly' },
        { loc: '/conocenos.html', priority: 0.8, changefreq: 'monthly' },
        { loc: '/blog.html', priority: 0.8, changefreq: 'weekly' },
        { loc: '/viajes-grupales.html', priority: 0.9, changefreq: 'weekly' },
        { loc: '/viajes-a-medida.html', priority: 0.9, changefreq: 'weekly' },
        { loc: '/grupos-abiertos.html', priority: 0.9, changefreq: 'weekly' },
        { loc: '/itinerarios.html', priority: 0.9, changefreq: 'weekly' }
    ];

    try {
        // --- 1. Obtener Destinos (Locations) ---
        // Fetch collections directly from Firebase REST API
        const locResponse = await fetch(`${firebaseUrl}/location`);
        if (locResponse.ok) {
            const locData = await locResponse.json();
            const documents = locData.documents || [];
            
            documents.forEach(doc => {
                // Parse Firebase document format
                const fields = doc.fields;
                if (!fields) return;
                
                // Extraer el ID del final del "name" del documento
                const idPath = doc.name.split('/');
                const id = idPath[idPath.length - 1];
                
                urls.push({
                    loc: `/destino.html?id=${id}`,
                    priority: 0.8,
                    changefreq: 'weekly'
                });
            });
        }

        // --- 2. Obtener Viajes (Travel / CMS Products) ---
        const fetchTrips = async (collection) => {
            const res = await fetch(`${firebaseUrl}/${collection}`);
            if (res.ok) {
                const data = await res.json();
                const docs = data.documents || [];
                docs.forEach(doc => {
                    const fields = doc.fields;
                    if (!fields) return;
                    
                    // Solo incluir si está publicado (isPublished o is_published = true) o no es borrador
                    const isDraft = fields.isDraft?.booleanValue || false;
                    const status = fields.status?.stringValue;
                    if (isDraft || status === 'hidden') return;
                    
                    const title = fields.title?.stringValue || fields.name?.stringValue || '';
                    if (!title) return;
                    
                    // Función slugify simple
                    const slug = title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
                    
                    urls.push({
                        loc: `/viaje.html?nombre=${slug}`,
                        priority: 0.9,
                        changefreq: 'weekly'
                    });
                });
            }
        };

        await fetchTrips('travel');
        await fetchTrips('cms_products');

        // --- 3. Obtener Artículos de Blog / Bitácora ---
        const seedPosts = ['egipto-magico', 'turquia', 'viajar-en-grupo'];
        const postSlugs = new Set(seedPosts);

        try {
            const postsRes = await fetch(`${firebaseUrl}/cms_posts`);
            if (postsRes.ok) {
                const postsData = await postsRes.json();
                const postDocs = postsData.documents || [];
                postDocs.forEach(doc => {
                    const fields = doc.fields;
                    if (!fields) return;
                    if (fields.isDraft?.booleanValue) return;

                    const idPath = doc.name.split('/');
                    const id = idPath[idPath.length - 1];
                    const slug = fields.slug?.stringValue || id;
                    if (slug) postSlugs.add(slug);
                });
            }
        } catch (e) {
            console.warn("Could not fetch cms_posts for sitemap:", e);
        }

        postSlugs.forEach(slug => {
            urls.push({
                loc: `/articulo.html?id=${slug}`,
                priority: 0.7,
                changefreq: 'monthly'
            });
        });

    } catch (error) {
        console.error("Error al generar sitemap:", error);
        // Si hay error en la BD, igual devuelve las rutas estáticas
    }

    // Construir el XML
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemapXML, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
