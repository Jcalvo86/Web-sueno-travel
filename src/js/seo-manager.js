/**
 * SEO & AEO Manager
 * Maneja la actualización dinámica de Metaetiquetas, Open Graph y Datos Estructurados (JSON-LD)
 */

class SEOManager {
    /**
     * Actualiza las metaetiquetas básicas y de Open Graph (Fase 1)
     * @param {Object} metadata 
     * @param {string} metadata.title - El título de la página
     * @param {string} metadata.description - Descripción SEO
     * @param {string} metadata.image - URL absoluta de la imagen para Open Graph
     * @param {string} metadata.url - URL canónica actual
     */
    static updateMetaTags(metadata) {
        if (!metadata) return;

        // Título de la página
        if (metadata.title) {
            document.title = metadata.title;
            this._setMetaTag('property', 'og:title', metadata.title);
            this._setMetaTag('name', 'twitter:title', metadata.title);
        }

        // Descripción
        if (metadata.description) {
            this._setMetaTag('name', 'description', metadata.description);
            this._setMetaTag('property', 'og:description', metadata.description);
            this._setMetaTag('name', 'twitter:description', metadata.description);
        }

        // Imagen Open Graph
        if (metadata.image) {
            this._setMetaTag('property', 'og:image', metadata.image);
            this._setMetaTag('name', 'twitter:image', metadata.image);
        }

        // URL
        if (metadata.url) {
            this._setMetaTag('property', 'og:url', metadata.url);
        }
    }

    /**
     * Inyecta esquema JSON-LD para AEO (Fase 2)
     * @param {Object} schemaData - El objeto JavaScript que representa el esquema Schema.org
     */
    static injectJSONLD(schemaData) {
        if (!schemaData) return;

        // Buscar si ya existe un script de json-ld y removerlo (para páginas dinámicas)
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaData);
        document.head.appendChild(script);
    }

    /**
     * Generador Helper para esquema TouristTrip (Viajes/Destinos)
     */
    static generateTouristTripSchema(tripData) {
        return {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": tripData.name,
            "description": tripData.description,
            "image": tripData.image,
            "provider": {
                "@type": "TravelAgency",
                "name": "Sueño Travel",
                "url": "https://suenotravel.cl"
            }
            // Aquí se pueden agregar más campos como 'itinerary' si están disponibles
        };
    }

    /**
     * Función utilitaria para establecer o actualizar una meta etiqueta
     */
    static _setMetaTag(attributeName, attributeValue, content) {
        let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
        
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attributeName, attributeValue);
            document.head.appendChild(element);
        }
        
        element.setAttribute('content', content);
    }
}

export default SEOManager;
