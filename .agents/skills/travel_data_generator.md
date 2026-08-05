---
name: travel-data-generator
description: Genera la estructura JSON de destinos turísticos (región y atracciones/locations) siguiendo un esquema estricto.
---

# Skill: Travel Data Generator

## Propósito
Generar objetos JSON estructurados para destinos turísticos divididos en `region` (país/zona) y `location` (atractivos/puntos de interés), manteniendo estricta conformidad con el esquema del proyecto.

## Reglas del Esquema JSON
1. Cada respuesta para un destino debe ser un arreglo JSON con:
   - 1 objeto de tipo `"type": "region"`
   - N objetos de tipo `"type": "location"`
2. Mantener exactamente las mismas llaves y tipos de datos en la estructura.

## Estructura Base de Referencia

```json
[
  {
    "name": "Nombre de la Región o País",
    "type": "region",
    "subtitle": "Eslogan o descripción corta del destino",
    "travelStyles": ["Historia & Cultura", "Gastronomía", "Fotografía"],
    "guideBestSeason": "Rango de meses recomendado",
    "guideHowToGetAround": "Medios de transporte recomendados",
    "guideRecommendedDuration": "Duración sugerida (ej. Ideal para recorrer en 8 a 12 días)",
    "mapUrl": "[https://ejemplo.com/mapa-destino.jpg](https://ejemplo.com/mapa-destino.jpg)",
    "suggestedItineraries": [
      {
        "title": "Nombre del itinerario",
        "duration": "X días",
        "description": "Desglose diario resumido"
      }
    ],
    "isDraft": true
  },
  {
    "name": "Nombre del Atractivo Turístico",
    "type": "location",
    "locationType": "Categoría (ej. Sitio Arqueológico / Museo / Templo)",
    "parentRegionId": "id-de-la-region",
    "address": "Dirección o zona geográfica",
    "city": "Ciudad",
    "country": "País",
    "geolocationUrl": "[https://maps.app.goo.gl/ejemplo](https://maps.app.goo.gl/ejemplo)",
    "openingHours": "Horarios de atención",
    "pricing": "Precios de entrada aproximados",
    "ticketUrl": "[https://sitio-oficial.com](https://sitio-oficial.com)",
    "estimatedVisitTime": "Tiempo sugerido de visita",
    "amenities": {
      "parking": boolean,
      "accessibility": boolean,
      "restrooms": boolean,
      "petFriendly": boolean,
      "kidsFriendly": boolean
    },
    "description": "Descripción histórica o turística del lugar",
    "highlights": [
      "Punto destacado 1",
      "Punto destacado 2"
    ],
    "travelerTips": "Consejos prácticos para el visitante",
    "nearbyLocations": [
      "Lugar cercano 1",
      "Lugar cercano 2"
    ],
    "isDraft": true
  }
]