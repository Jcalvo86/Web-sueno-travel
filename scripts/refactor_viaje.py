import os

filepath = 'viaje.html'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract JS
script_start = content.find('<script>\n    // Smooth reveal on scroll logic')
script_end = content.find('</script>\n\n<!-- Modal Lightbox for Map -->', script_start)

if script_start != -1 and script_end != -1:
    js_content = content[script_start + 9:script_end]
    
    # Write to src/js/viaje.js
    os.makedirs('src/js', exist_ok=True)
    with open('src/js/viaje.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        # Export loadTripData at the end
        f.write('\nexport { loadTripData };\n')

# 2. Refactor viaje.html
# Replace everything from <div id="content-state" class="hidden"> to </footer>
html_replacement = """<!-- Main Content (Hidden initially) -->
<div id="content-state" class="hidden">
    <div id="section-hero"></div>
    <div id="section-overview"></div>
    <div id="section-itinerary"></div>
    <div id="section-services"></div>
    <div id="section-map"></div>
    <div id="section-gallery"></div>
    <div id="section-info"></div>
    <div id="section-departures"></div>
    <div id="section-cta"></div>
</div>

<div id="section-footer"></div>

<!-- Modal Lightbox for Map -->
<div id="map-lightbox" class="fixed inset-0 bg-black/90 z-[9999] hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeMapLightbox()">
    <div class="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black" style="aspect-ratio: 4/3;">
        <div id="lightbox-container" class="w-full h-full relative"></div>
        <button class="absolute top-4 right-4 text-white text-4xl font-bold cursor-pointer select-none bg-black/50 hover:bg-black/80 w-12 h-12 flex items-center justify-center rounded-full z-50 transition-colors" onclick="closeMapLightbox()">&times;</button>
    </div>
</div>

<script type="module">
    import { loadTripData } from './src/js/viaje.js';
    
    // Module Loader: Inyecta los archivos HTML y luego avisa al sistema
    async function loadSection(id, url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(id).innerHTML = html;
                return true;
            }
        } catch (error) {
            console.error('Error loading ' + url, error);
        }
        return false;
    }
    
    document.addEventListener('DOMContentLoaded', async () => {
        // Cargamos todas las secciones en paralelo
        await Promise.all([
            loadSection('section-hero', 'components/viaje/viaje-hero.html'),
            loadSection('section-overview', 'components/viaje/viaje-overview.html'),
            loadSection('section-itinerary', 'components/viaje/viaje-itinerary.html'),
            loadSection('section-services', 'components/viaje/viaje-services.html'),
            loadSection('section-map', 'components/viaje/viaje-map.html'),
            loadSection('section-gallery', 'components/viaje/viaje-gallery.html'),
            loadSection('section-info', 'components/viaje/viaje-info.html'),
            loadSection('section-departures', 'components/viaje/viaje-departures.html'),
            loadSection('section-cta', 'components/viaje/viaje-cta.html'),
            loadSection('section-footer', 'components/footer.html')
        ]);
        
        // Ejecutamos la logica de cargar viaje que antes estaba al final
        window.onload = loadTripData;
        if (document.readyState === 'complete') {
            loadTripData();
        }
    });
</script>
</body>
</html>"""

# Now find where to replace in the original file
start_replace = content.find('<!-- Main Content (Hidden initially) -->\n<div id="content-state" class="hidden">')
if start_replace != -1:
    new_content = content[:start_replace] + html_replacement
    with open('viaje.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully refactored viaje.html")
else:
    print("Could not find replacement start index")

