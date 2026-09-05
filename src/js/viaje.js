    // Smooth reveal on scroll logic
    const setupRevealObserver = () => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.itinerary-line > div').forEach(el => {
            el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
            observer.observe(el);
        });
    };


    // Load Data
    const loadTripData = async () => {
        const params = new URLSearchParams(window.location.search);
        const tripId = params.get('nombre') || params.get('id');

        if (!tripId) {
            showError('No se especificó un identificador de viaje en la URL.');
            return;
        }

        try {
            // Esperar a que window.DataSource esté listo
            let checks = 0;
            while (!window.DataSource && checks < 20) {
                await new Promise(r => setTimeout(r, 100));
                checks++;
            }

            if (!window.DataSource) {
                showError('Error al conectar con la base de datos de contenidos.');
                return;
            }

            // Obtener el viaje (producto)
            let trip = null;
            let locations = [];
            try {
                locations = await window.DataSource.getItems('location');
            } catch (el) {
                console.warn("Could not load locations", el);
            }
            
            // Try fetching from travel collection first
            try {
                const travels = await window.DataSource.getItems('travel');
                if (travels && travels.length > 0) {
                    const slugify = (text) => text ? text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '') : '';
                    const found = travels.find(t => t.id === tripId || t.sku === tripId || t.slug === tripId || slugify(t.title) === tripId || slugify(t.name) === tripId);
                    if (found) {
                        // Normalize 'travel' module format to the format expected by renderTrip
                        const destSum = found.destinationsSummary || found.destinations_summary;
                        
                        // Gather dynamic region maps
                        const visitedLocationIds = new Set();
                        console.log('DEBUG MAP: 0. Raw itinerary data:', found.itinerary);
                        if (found.itinerary) {
                            found.itinerary.forEach(day => {
                                // Soporte para camelCase y snake_case (legacy)
                                const locId = day.locationId || day.location_id;
                                if (locId && locId !== 'custom') {
                                    visitedLocationIds.add(locId);
                                }
                                
                                // Soporte para nueva estructura de múltiples ubicaciones por día
                                if (day.locations && Array.isArray(day.locations)) {
                                    day.locations.forEach(loc => {
                                        if (loc.id && loc.id !== 'custom') {
                                            visitedLocationIds.add(loc.id);
                                        }
                                    });
                                }
                            });
                        }
                        if (found.servicesIncludedList) {
                            found.servicesIncludedList.forEach(group => {
                                const locId = group.locationId || group.location_id;
                                if (locId && locId !== 'custom') {
                                    visitedLocationIds.add(locId);
                                }
                            });
                        }
                        
                        // Agregar ciudades padre de las atracciones visitadas para que aparezcan en el mapa
                        const explicitLocIds = Array.from(visitedLocationIds);
                        explicitLocIds.forEach(locId => {
                            const locObj = (locations || []).find(l => l.id === locId);
                            if (locObj) {
                                const pCityId = locObj.parentCityId || locObj.parent_city_id;
                                if (pCityId) {
                                    visitedLocationIds.add(pCityId);
                                }
                            }
                        });

                        console.log('DEBUG MAP: 1. visitedLocationIds from itinerary', Array.from(visitedLocationIds));
                        
                        const visitedLocations = (locations || []).filter(l => visitedLocationIds.has(l.id));
                        console.log('DEBUG MAP: 2. visitedLocations found in DB', visitedLocations);

                        const parentRegionIds = new Set();
                        visitedLocations.forEach(loc => {
                            let parentRegId = loc.parentRegionId || loc.parent_region_id;
                            if (!parentRegId && (loc.parentCityId || loc.parent_city_id)) {
                                const pCityId = loc.parentCityId || loc.parent_city_id;
                                const pCity = (locations || []).find(c => c.id === pCityId);
                                if (pCity) {
                                    parentRegId = pCity.parentRegionId || pCity.parent_region_id || pCity.regionId || pCity.region_id;
                                }
                            }
                            
                            if (parentRegId) {
                                parentRegionIds.add(parentRegId);
                            }
                        });
                        console.log('DEBUG MAP: 3. parentRegionIds extracted', Array.from(parentRegionIds));
                        
                        const visitedRegions = (locations || []).filter(l => parentRegionIds.has(l.id) && (l.type === 'region' || l.type === undefined));
                        console.log('DEBUG MAP: 4. visitedRegions matched in DB', visitedRegions);

                        const regionsWithMaps = visitedRegions.filter(reg => reg.mapUrl || reg.map_url);
                        console.log('DEBUG MAP: 5. regionsWithMaps (has mapUrl)', regionsWithMaps);
                        
                        const regionMaps = regionsWithMaps.map(reg => {
                            const pins = visitedLocations.filter(loc => {
                                let locRegionId = loc.regionId || loc.region_id || loc.parentRegionId || loc.parent_region_id;
                                
                                // Si no tiene región directa, intentar sacarla de su ciudad padre
                                if (!locRegionId && (loc.parentCityId || loc.parent_city_id)) {
                                    const pCityId = loc.parentCityId || loc.parent_city_id;
                                    const pCity = (locations || []).find(c => c.id === pCityId);
                                    if (pCity) {
                                        locRegionId = pCity.regionId || pCity.region_id || pCity.parentRegionId || pCity.parent_region_id;
                                    }
                                }
                                
                                if (locRegionId !== reg.id) return false;
                                const posX = loc.mapPosX !== undefined ? loc.mapPosX : loc.map_pos_x;
                                const posY = loc.mapPosY !== undefined ? loc.mapPosY : loc.map_pos_y;
                                return posX !== undefined && posX !== null && posX !== '' &&
                                       posY !== undefined && posY !== null && posY !== '';
                            }).map(loc => {
                                    let posX = loc.mapPosX !== undefined ? loc.mapPosX : loc.map_pos_x;
                                    let posY = loc.mapPosY !== undefined ? loc.mapPosY : loc.map_pos_y;
                                    
                                    // Sanitize commas to dots for valid CSS
                                    if (typeof posX === 'string') posX = parseFloat(posX.replace(',', '.'));
                                    if (typeof posY === 'string') posY = parseFloat(posY.replace(',', '.'));
                                    
                                    return {
                                        id: loc.id,
                                        name: loc.name,
                                        description: loc.description || '',
                                        posX,
                                        posY
                                    };
                                });
                            return {
                                id: reg.id,
                                name: reg.name,
                                mapUrl: reg.mapUrl || reg.map_url,
                                pins
                            };
                        });
                        
                        console.log('DEBUG MAP: 6. Final regionMaps array mapped', regionMaps);

                        trip = {
                            id: found.id,
                            name: found.title,
                            subtitle: destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum).replace(/\s*\([^)]*\)/g, '') : found.title,
                            overview: found.description || '',
                            imageUrl: found.imageUrl || found.image_url || (found.itinerary && found.itinerary[0]?.imageUrl) || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920',
                            headerImageUrl: found.headerImageUrl || found.header_image_url || found.imageUrl || found.image_url || (found.itinerary && found.itinerary[0]?.imageUrl) || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920',
                            bestSeason: found.guideBestSeason || found.guide_best_season || '',
                            currency: found.currency || '',
                            visa: found.visa || '',
                            mapUrl: found.mapUrl || found.map_url || '',
                            galleryUrls: (() => {
                                let urls = [];
                                if (found.galleryUrls) {
                                    const arr = Array.isArray(found.galleryUrls) ? found.galleryUrls : found.galleryUrls.split('\n');
                                    urls.push(...arr.map(s => typeof s === 'string' ? s.trim() : s).filter(Boolean));
                                }
                                if (found.itinerary) {
                                    found.itinerary.forEach(day => {
                                        if (day.imageUrl) urls.push(day.imageUrl);
                                    });
                                }
                                visitedLocations.forEach(loc => {
                                    if (loc.imageUrl || loc.image_url) urls.push(loc.imageUrl || loc.image_url);
                                    if (loc.imageUrls || loc.image_urls) {
                                        const arr = loc.imageUrls || loc.image_urls;
                                        if (Array.isArray(arr)) urls.push(...arr);
                                    }
                                    if (loc.galleryUrls || loc.gallery_urls) {
                                        const arr = loc.galleryUrls || loc.gallery_urls;
                                        if (Array.isArray(arr)) urls.push(...arr.map(u => u.url || u));
                                        else if (typeof arr === 'string') urls.push(...arr.split('\n').map(s => s.trim()).filter(Boolean));
                                    }
                                });
                                return Array.from(new Set(urls.filter(Boolean)));
                            })(),
                            regionMaps: regionMaps,
                            // Additional attributes
                            durationDays: found.durationDays || found.duration_days || found.duration || 10,
                            durationNights: found.durationNights || found.duration_nights || 9,
                            hotelTaxUSD: found.hotelTaxUSD !== undefined ? found.hotelTaxUSD : (found.pricing_and_notes?.hotelTaxUSD || 0),
                            visaCostUSD: found.visaCostUSD !== undefined ? found.visaCostUSD : (found.pricing_and_notes?.visaCostUSD || 0),
                            disclaimer: found.disclaimer || found.pricing_and_notes?.disclaimer || '',
                            servicesIncludedList: found.servicesIncludedList || found.services_included_list || (found.services_included ? [
                                ...(found.services_included.egypt || []),
                                ...(found.services_included.turkey || [])
                            ] : []),
                            servicesExcludedList: found.servicesExcludedList || found.services_excluded_list || found.services_excluded || [],
                            hotelsPlanned: found.hotelsPlanned || found.hotels_planned || [],
                            // Convert itinerary array to JSON string format expected by renderTrip
                            itineraryJson: found.itinerary ? JSON.stringify(found.itinerary.map(day => {
                                const dayImages = [];
                                if (day.imageUrl) dayImages.push({url: day.imageUrl, name: day.customLocationName || day.dayTitle || 'Visita'});
                                
                                const dayLocs = day.locations || [];
                                const fallbackLocId = day.locationId || day.location_id;
                                if (dayLocs.length === 0) {
                                    if (fallbackLocId && fallbackLocId !== 'custom') {
                                        dayLocs.push({id: fallbackLocId});
                                    } else if (day.customLocationName) {
                                        const n = day.customLocationName.trim().toLowerCase();
                                        const match = (locations || []).find(l => {
                                            const ln = (l.name || l.title || '').trim().toLowerCase();
                                            return ln && (ln === n || ln.includes(n) || n.includes(ln));
                                        });
                                        if (match && match.id) {
                                            dayLocs.push({id: match.id});
                                        }
                                    }
                                }
                                
                                dayLocs.forEach(dl => {
                                    if (dl.id && dl.id !== 'custom') {
                                        const locMatch = (locations || []).find(l => l.id === dl.id);
                                        if (locMatch) {
                                            const locName = locMatch.name || locMatch.title || day.customLocationName || 'Visita';
                                            const singleImg = locMatch.imageUrl || locMatch.image_url;
                                            if (singleImg) dayImages.push({url: singleImg, name: locName});
                                            
                                            const multiImgs = locMatch.imageUrls || locMatch.image_urls;
                                            if (multiImgs && Array.isArray(multiImgs)) {
                                                dayImages.push(...multiImgs.map(u => ({url: u, name: locName})));
                                            }
                                            
                                            const galleryImgs = locMatch.gallery || locMatch.galleryUrls || locMatch.gallery_urls;
                                            if (galleryImgs && Array.isArray(galleryImgs)) {
                                                dayImages.push(...galleryImgs.map(g => {
                                                    const url = typeof g === 'object' ? (g.url || g) : g;
                                                    return {url, name: locName};
                                                }));
                                            } else if (typeof galleryImgs === 'string') {
                                                // If gallery is a string (e.g. newline separated URLs)
                                                dayImages.push(...galleryImgs.split('\\n').map(s => s.trim()).filter(Boolean).map(u => ({url: u, name: locName})));
                                            }
                                        }
                                    }
                                });

                                // Deduplicate images by URL
                                const uniqueMap = new Map();
                                dayImages.forEach(img => {
                                    if (img.url && !uniqueMap.has(img.url)) {
                                        uniqueMap.set(img.url, img);
                                    }
                                });
                                const uniqueImages = Array.from(uniqueMap.values());

                                // Build fallback title from locations if dayTitle is missing
                                let displayTitle = day.dayTitle;
                                if (!displayTitle) {
                                    if (dayLocs && dayLocs.length > 0) {
                                        displayTitle = dayLocs.map(l => l.name || (locations.find(loc => loc.id === l.id)?.name) || '').filter(Boolean).join(', ');
                                    }
                                    if (!displayTitle) {
                                        displayTitle = day.customLocationName || 'Visita';
                                    }
                                }

                                return {
                                    day: `Día ${String(day.dayNumber).padStart(2, '0')}`,
                                    title: displayTitle,
                                    desc: (day.activities || []).map(act => act.description).join('\n') || '',
                                    meals: day.accommodationType || '',
                                    info: '',
                                    imageUrl: uniqueImages.length > 0 ? uniqueImages[0] : '',
                                    imageUrls: uniqueImages,
                                    activities: day.activities || []
                                };
                            })) : '[]'
                        };
                    }
                }
            } catch (e) {
                console.warn("Could not load from 'travel' collection, trying 'cms_products'...", e);
            }

            // Fallback to cms_products if not found in travel
            if (!trip) {
                const products = await window.DataSource.getItems('cms_products');
                const slugify = (text) => text ? text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '') : '';
                const found = products.find(p => p.id === tripId || p.sku === tripId || p.slug === tripId || slugify(p.name) === tripId || slugify(p.title) === tripId);
                if (found) {
                    trip = {
                        id: found.id,
                        name: found.name,
                        subtitle: found.subtitle || '',
                        overview: found.overview || '',
                        imageUrl: found.imageUrl || '',
                        headerImageUrl: found.headerImageUrl || found.header_image_url || found.imageUrl || '',
                        bestSeason: found.bestSeason || '',
                        currency: found.currency || '',
                        visa: found.visa || '',
                        mapUrl: found.mapUrl || '',
                        galleryUrls: found.galleryUrls || '',
                        durationDays: found.duration || 10,
                        durationNights: (found.duration ? found.duration - 1 : 9),
                        hotelTaxUSD: found.pricing_and_notes?.hotelTaxUSD || 0,
                        visaCostUSD: found.pricing_and_notes?.visaCostUSD || 0,
                        disclaimer: found.pricing_and_notes?.disclaimer || '',
                        servicesIncludedList: found.servicesIncludedList || (found.services_included ? [
                            ...(found.services_included.egypt || []),
                            ...(found.services_included.turkey || [])
                        ] : []),
                        servicesExcludedList: found.servicesExcludedList || found.services_excluded || [],
                        itineraryJson: found.itineraryJson || '[]'
                    };
                }
            }

            if (!trip) {
                showError('El viaje solicitado no existe o no se encuentra disponible.');
                return;
            }



            renderTrip(trip);
        } catch (error) {
            console.error(error);
            showError('Ocurrió un error al cargar los datos del viaje.');
        }
    };

    const showError = (message) => {
        const loader = document.getElementById('loading-state');
        if (loader) {
            loader.innerHTML = `
                <span class="material-symbols-outlined text-red-500 text-5xl">error</span>
                <p class="text-on-surface font-semibold text-lg mt-2">${message}</p>
                <a href="index.html" class="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-lg">Volver al inicio</a>
            `;
        }
    };

    const renderTrip = (trip) => {
        // --- Dynamic SEO ---
        document.title = `${trip.name} | Sueño Travel`;
        const metaDesc = document.getElementById('meta-description');
        if (metaDesc && trip.subtitle) {
            metaDesc.setAttribute('content', trip.subtitle);
        }

        // --- Render UI Fields ---
        document.getElementById('hero-duration').textContent = `${trip.durationDays || '10'} Días | ${trip.durationNights || '9'} Noches`;
        document.getElementById('hero-title').textContent = trip.name;
        document.getElementById('hero-subtitle').textContent = trip.subtitle || '';
        document.getElementById('hero-bg').style.backgroundImage = `url('${trip.headerImageUrl || trip.imageUrl || 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920'}')`;
        
        document.getElementById('overview-title').textContent = `La Magia de tu Destino`;
        
        const overviewTextEl = document.getElementById('overview-text');
        if (trip.overview && trip.overview.trim().length > 0) {
            overviewTextEl.innerHTML = trip.overview.split('\n\n')
                .map(p => `<p class="leading-relaxed text-on-surface-variant mb-4">${p.trim()}</p>`)
                .join('');
        } else {
            overviewTextEl.innerHTML = '<p class="leading-relaxed text-on-surface-variant/70 italic">Descripción general no provista en la base de datos.</p>';
        }

        // Map is handled below in the overview map container

        // Render Itinerary Day-by-Day
        const itineraryList = document.getElementById('itinerary-list');
        itineraryList.innerHTML = '';
        if (trip.itineraryJson) {
            try {
                const days = JSON.parse(trip.itineraryJson);
                if (Array.isArray(days)) {
                    days.forEach((dayInfo, index) => {
                        const dayDiv = document.createElement('div');
                        dayDiv.className = 'relative group border-b border-outline-variant/10 pb-3 last:border-b-0';
                        
                        // Helper to get matching icon based on text keywords
                        const getIcon = (text, type = '') => {
                            const txt = (text || '').toLowerCase();
                            const t = (type || '').toLowerCase();
                            
                            if (t === 'flight' || txt.includes('vuelo') || txt.includes('llegada') || txt.includes('avión') || txt.includes('partida')) return 'flight';
                            if (t === 'hotel' || t === 'accommodation' || txt.includes('hotel') || txt.includes('alojamiento') || txt.includes('dormir') || txt.includes('regreso al hotel')) return 'bed';
                            if (t === 'food' || t === 'restaurant' || t === 'meal' || t === 'meals' || txt.includes('almuerzo') || txt.includes('cena') || txt.includes('desayuno') || txt.includes('restaurante') || txt.includes('comida') || txt.includes('régimen') || txt.includes('típico en')) return 'restaurant';
                            if (txt.includes('tren') || txt.includes('bus') || txt.includes('autobús') || txt.includes('traslado') || txt.includes('vehículo') || txt.includes('carretera')) return 'directions_bus';
                            if (t === 'navigation' || t === 'boat' || txt.includes('barco') || txt.includes('crucero') || txt.includes('navegación') || txt.includes('dahabiya') || txt.includes('nilo') || txt.includes('bósforo')) return 'sailing';
                            if (t === 'cultural' || t === 'sightseeing' || t === 'visit' || t === 'activity' || txt.includes('visita') || txt.includes('recorrer') || txt.includes('excursión') || txt.includes('bazar') || txt.includes('palacio') || txt.includes('mezquita') || txt.includes('basílica') || txt.includes('museo') || txt.includes('pirámide') || txt.includes('esfinge') || txt.includes('valle') || txt.includes('templo') || txt.includes('hipódromo') || txt.includes('teatro')) return 'explore';
                            
                            return 'explore';
                        };

                        // Extract activities
                        let activitiesHtml = '';
                        if (dayInfo.activities && dayInfo.activities.length > 0) {
                            activitiesHtml = dayInfo.activities.map(act => {
                                const icon = getIcon(act.description, act.type);
                                return `
                                    <li class="flex items-start gap-4 text-on-surface-variant">
                                        <span class="material-symbols-outlined text-secondary mt-0.5" style="font-size: 20px;">${icon}</span>
                                        <span class="text-[0.95rem] leading-relaxed font-medium">${act.description}</span>
                                    </li>
                                `;
                            }).join('');
                        } else {
                            // Split description by lines for clean points
                            const points = (dayInfo.desc || '').split('\n').map(p => p.trim()).filter(Boolean);
                            activitiesHtml = points.map(p => {
                                const icon = getIcon(p);
                                return `
                                    <li class="flex items-start gap-4 text-on-surface-variant">
                                        <span class="material-symbols-outlined text-secondary mt-0.5" style="font-size: 20px;">${icon}</span>
                                        <span class="text-[0.95rem] leading-relaxed font-medium">${p}</span>
                                    </li>
                                `;
                            }).join('');
                        }

                        // Images
                        let imagesHtml = '';
                        const imageUrls = [];
                        if (dayInfo.imageUrls && Array.isArray(dayInfo.imageUrls)) {
                            imageUrls.push(...dayInfo.imageUrls);
                        } else if (dayInfo.imageUrl) {
                            imageUrls.push({url: dayInfo.imageUrl, name: dayInfo.title});
                        }
                        
                        const uniqueRenderImages = [];
                        const urlSet = new Set();
                        imageUrls.forEach(imgObj => {
                            let u = typeof imgObj === 'string' ? imgObj : imgObj.url;
                            let n = typeof imgObj === 'string' ? dayInfo.title : imgObj.name;
                            if (u && !urlSet.has(u)) {
                                urlSet.add(u);
                                uniqueRenderImages.push({url: u, name: n});
                            }
                        });

                        if (uniqueRenderImages.length > 0) {
                            const gridClass = uniqueRenderImages.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
                            imagesHtml = `
                                <div class="grid ${gridClass} gap-4 mt-6">
                                    ${uniqueRenderImages.slice(0, 4).map(img => `
                                        <div class="rounded-2xl overflow-hidden h-48 md:h-60 shadow-sm cursor-pointer" onclick="openImageLightbox('${img.url}', '${(img.name || dayInfo.title).replace(/'/g, "\\'")}')">
                                            <img src="${img.url}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Detalle del itinerario" />
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }

                        dayDiv.innerHTML = `
                            <!-- Dot indicator on timeline -->
                            <div class="absolute -left-[49px] md:-left-[77px] top-[6px] w-8 h-8 rounded-full bg-secondary border-4 border-background z-10 transition-transform group-hover:scale-115 cursor-pointer flex items-center justify-center text-white" onclick="toggleDayCollapse(${index})">
                            </div>
                            
                            <!-- Day Header (clickable to collapse/expand) -->
                            <div class="cursor-pointer select-none" onclick="toggleDayCollapse(${index})">
                                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <span class="font-label-md text-secondary/70 font-bold uppercase tracking-tighter text-sm whitespace-nowrap">${dayInfo.day}</span>
                                    <h3 class="font-display-lg text-xl md:text-2xl text-primary font-bold tracking-tight">${dayInfo.title}</h3>
                                    <span id="chevron-${index}" class="material-symbols-outlined transition-transform duration-300 text-secondary chevron-icon ml-1 align-middle">expand_more</span>
                                </div>
                            </div>
                            
                            <!-- Collapsible Content -->
                            <div id="content-${index}" class="collapsible-content max-h-0 overflow-hidden transition-all duration-500 ease-in-out" style="max-height: 0px;">
                                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-3 items-start">
                                    <!-- Empty left column to align content under title on desktop -->
                                    <div class="hidden lg:block lg:col-span-1"></div>
                                    
                                    <div class="lg:col-span-2 space-y-6">
                                        <!-- Activities Card -->
                                        <div class="bg-[#FBF9F6] border border-[#EAE6E1] p-6 md:p-8 rounded-2xl">
                                            <ul class="space-y-4">
                                                ${activitiesHtml}
                                            </ul>
                                        </div>
                                        
                                        <!-- Images -->
                                        ${imagesHtml}
                                    </div>
                                </div>
                            </div>
                        `;
                        itineraryList.appendChild(dayDiv);
                    });
                }
            } catch (e) {
                console.error("Error parsing itinerary JSON:", e);
                itineraryList.innerHTML = `<p class="text-red-500 italic">Error al estructurar el itinerario día a día.</p>`;
            }
        }

        // Render Map in Overview
        const overviewMapContainer = document.getElementById('overview-map-container');
        if (overviewMapContainer) {
            if (trip.regionMaps && trip.regionMaps.length > 0) {
                const hasMultipleMaps = trip.regionMaps.length > 1;
                overviewMapContainer.innerHTML = `
                        ${trip.regionMaps.map((reg, idx) => {
                            console.log('DEBUG MAP PINS for region', reg.name, ':', reg.pins);
                            return `
                            <div class="map-carousel-slide absolute inset-0 w-full h-full transition-opacity duration-500 ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}" data-map-index="${idx}">
                                <!-- Background Image (clickable for modal) -->
                                <div class="absolute inset-0 cursor-pointer" onclick="openMapLightbox(document.getElementById('overview-map-container').innerHTML)">
                                    <img class="w-full h-full object-cover select-none" alt="Mapa de ${reg.name}" src="${reg.mapUrl}"/>
                                </div>
                                <!-- Interactive Pins -->
                                <div class="absolute inset-0 pointer-events-none">
                                    ${reg.pins.map(pin => `
                                        <div class="absolute group/pin -translate-x-1/2 -translate-y-1/2 cursor-pointer pin-marker pointer-events-auto"
                                             style="left: ${pin.posX}%; top: ${pin.posY}%;"
                                             onmouseenter="adjustTooltipPosition(this, ${pin.posX}, ${pin.posY})"
                                             onclick="event.stopPropagation()">
                                            <!-- Pin Drop Icon -->
                                            <span class="material-symbols-outlined text-red-600 text-3xl hover:scale-125 transition-transform" style="filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); font-variation-settings: 'FILL' 1;">
                                                pin_drop
                                            </span>
                                            <!-- Tooltip Popup -->
                                            <div class="pin-tooltip absolute bg-primary text-white text-xs px-3 py-2 rounded-lg opacity-0 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:pointer-events-auto transition-opacity duration-200 shadow-lg z-50 min-w-[150px] max-w-[200px] text-center">
                                                ${pin.imageUrl ? `<img src="${pin.imageUrl}" class="w-full h-24 object-cover rounded mb-2 border border-white/20" alt="${pin.name}" />` : ''}
                                                <strong class="block border-b border-white/20 pb-1 mb-1">${pin.name}</strong>
                                                ${pin.description ? `<span class="block text-[10px] text-white/80 whitespace-normal line-clamp-3">${pin.description}</span>` : ''}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            `;
                        }).join('')}

                        <!-- Navigation Arrows -->
                        ${hasMultipleMaps ? `
                            <button onclick="changeMapSlide(-1)" class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-opacity opacity-0 group-hover/mapcarousel:opacity-100" aria-label="Mapa anterior">
                                <span class="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button onclick="changeMapSlide(1)" class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-opacity opacity-0 group-hover/mapcarousel:opacity-100" aria-label="Siguiente mapa">
                                <span class="material-symbols-outlined">chevron_right</span>
                            </button>
                            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 px-3 py-1.5 rounded-full">
                                ${trip.regionMaps.map((_, idx) => `
                                    <div class="w-2 h-2 rounded-full transition-colors map-indicator ${idx === 0 ? 'bg-white' : 'bg-white/50'}"></div>
                                `).join('')}
                            </div>
                        ` : ''}
                `;
            } else if (trip.mapUrl) {
                overviewMapContainer.innerHTML = `
                    <div class="absolute inset-0 cursor-pointer" onclick="openMapLightbox(document.getElementById('overview-map-container').innerHTML)">
                        <img class="w-full h-full object-cover select-none" alt="Mapa de Ruta" src="${trip.mapUrl}"/>
                    </div>
                `;
            } else {
                overviewMapContainer.style.display = 'none';
            }
        }
        
        const mapSection = document.getElementById('map');
        if (mapSection) {
            mapSection.style.display = 'none'; // Hide the old map section completely
        }

        // Render Gallery
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';
        if (trip.galleryUrls) {
            const urls = Array.isArray(trip.galleryUrls) ? trip.galleryUrls : trip.galleryUrls.split('\n').map(u => u.trim()).filter(Boolean);
            if (urls.length > 0) {
                urls.forEach((url, index) => {
                    const div = document.createElement('div');
                    div.className = `flex-shrink-0 snap-center w-[85vw] md:w-[600px] h-full rounded-2xl overflow-hidden group relative`;
                    div.innerHTML = `
                        <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('${url}')"></div>
                    `;
                    galleryGrid.appendChild(div);
                });

                // Add carousel controls
                const btnPrev = document.getElementById('gallery-prev');
                const btnNext = document.getElementById('gallery-next');
                if (btnPrev && btnNext) {
                    btnPrev.addEventListener('click', () => {
                        // Scroll exactly one card width plus gap (approx 616px)
                        galleryGrid.scrollBy({ left: -616, behavior: 'smooth' });
                    });
                    btnNext.addEventListener('click', () => {
                        galleryGrid.scrollBy({ left: 616, behavior: 'smooth' });
                    });
                }
            } else {
                document.getElementById('gallery-section').style.display = 'none';
            }
        } else {
            document.getElementById('gallery-section').style.display = 'none';
        }

        // Render Practical Info & Costs
        document.getElementById('info-duration').textContent = `${trip.durationDays || '10'} Días / ${trip.durationNights || '9'} Noches`;
        document.getElementById('info-destinations').textContent = trip.subtitle || '';
        document.getElementById('info-best-season').textContent = trip.bestSeason || 'Octubre a Abril';
        document.getElementById('info-currency').textContent = trip.currency || 'Moneda internacional y local';
        document.getElementById('info-visa').textContent = `Visado: ${trip.visa || 'Consultar'}`;
        
        // Cost details
        document.getElementById('info-hotel-tax').innerHTML = `Impuesto Hotelero: <strong>USD ${trip.hotelTaxUSD || 0}</strong>`;
        document.getElementById('info-visa-cost').innerHTML = `Costo Visa aprox: <strong>USD ${trip.visaCostUSD || 0}</strong>`;
        document.getElementById('info-disclaimer').textContent = trip.disclaimer || '* Precios referenciales sujetos a cambios.';

        // Render Services Included / Excluded
        const includedUl = document.getElementById('services-included-list');
        const excludedUl = document.getElementById('services-excluded-list');
        if (includedUl && excludedUl) {
            includedUl.innerHTML = '';
            excludedUl.innerHTML = '';

            if (trip.servicesIncludedList && trip.servicesIncludedList.length > 0) {
                trip.servicesIncludedList.forEach(group => {
                    const items = group.items || [];
                    const locationLabel = group.customLocationName || '';
                    
                    if (items.length > 0 && locationLabel) {
                        const headerLi = document.createElement('li');
                        headerLi.className = 'font-bold text-primary text-lg mt-6 first:mt-0 mb-3 list-none border-b border-outline-variant/30 pb-1';
                        headerLi.innerHTML = `<span>${locationLabel}</span>`;
                        includedUl.appendChild(headerLi);
                    }

                    items.forEach(bullet => {
                        if (!bullet) return;
                        const li = document.createElement('li');
                        li.className = 'flex items-start gap-3';
                        li.innerHTML = `
                            <span class="material-symbols-outlined text-green-600 mt-0.5" style="font-size: 20px;">check</span>
                            <span>${bullet}</span>
                        `;
                        includedUl.appendChild(li);
                    });
                });
            } else {
                includedUl.innerHTML = '<li class="text-on-surface-variant/70 italic">Consultar servicios incluidos con su asesor.</li>';
            }

            if (trip.servicesExcludedList && trip.servicesExcludedList.length > 0) {
                trip.servicesExcludedList.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'flex items-start gap-3';
                    li.innerHTML = `
                        <span class="material-symbols-outlined text-red-500 mt-0.5" style="font-size: 20px;">close</span>
                        <span>${item}</span>
                    `;
                    excludedUl.appendChild(li);
                });
            } else {
                excludedUl.innerHTML = '<li class="text-on-surface-variant/70 italic">Consultar exclusiones con su asesor.</li>';
            }
        }

        // CTA settings
        const ctaBtn = document.getElementById('cta-reserve');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if(window.openContactModal) window.openContactModal('custom', document.title.replace(/'/g, "\\'"));
            });
        }

        // Render Departures
        const renderDepartures = async (tripId) => {
            const grid = document.getElementById('departures-grid');
            const section = document.getElementById('departures-section');
            if (!grid || !section) return;

            grid.innerHTML = '';
            section.style.display = 'block';

            let departures = [];
            try {
                departures = await window.DataSource.getItems('departure');
            } catch (err) {
                console.error("Error loading departures:", err);
            }

            const tripDeps = departures.filter(dep => 
                (dep.travelId === tripId || dep.travel_id === tripId) && 
                !dep.isDraft && 
                !dep.is_draft &&
                dep.status !== 'closed'
            );

            const formatDate = (dateStr) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
            };

            tripDeps.forEach(dep => {
                const card = document.createElement('div');
                card.className = 'bg-white border border-outline-variant/30 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden';
                
                const spotsLeft = Math.max(0, (dep.capacity || 10) - (dep.passengersCount || 0));
                let statusLabel = 'Cupos disponibles';
                let statusColor = 'text-green-700 bg-green-50 border-green-200';
                if (spotsLeft === 0) {
                    statusLabel = 'Agotado';
                    statusColor = 'text-red-700 bg-red-50 border-red-200';
                } else if (spotsLeft <= 3) {
                    statusLabel = `¡Últimos ${spotsLeft} cupos!`;
                    statusColor = 'text-orange-700 bg-orange-50 border-orange-200';
                }

                card.innerHTML = `
                    <div class="h-48 w-full bg-cover bg-center" style="background-image: url('Imagenes/group_departure_default.jpg');"></div>
                    <div class="p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-6">
                                <span class="material-symbols-outlined text-secondary text-3xl">calendar_today</span>
                                <span class="text-xs font-bold px-3 py-1 rounded-full border ${statusColor}">
                                    ${statusLabel}
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-primary mb-1">Salida Grupal</h3>
                            <h4 class="text-lg font-bold text-secondary mb-2">
                                ${formatDate(dep.departureDate || dep.departure_date)}
                                ${(dep.endDate || dep.end_date) ? ` al <span class="text-sm font-medium text-on-surface-variant">${formatDate(dep.endDate || dep.end_date)}</span>` : ''}
                            </h4>
                            <p class="text-sm text-on-surface-variant mb-6">
                                Capacidad total: ${dep.capacity || 10} viajeros.
                            </p>
                            ${dep.priceOverride ? `
                                <div class="mb-6">
                                    <span class="text-xs text-on-surface-variant block">Precio Especial Salida:</span>
                                    <span class="text-2xl font-extrabold text-primary">USD $${dep.priceOverride}</span>
                                </div>
                            ` : ''}
                        </div>
                        <button onclick="if(window.openContactModal) window.openContactModal('group', document.title.replace(/'/g, '\\''), '${formatDate(dep.departureDate || dep.departure_date)}')" class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-secondary transition-all mt-4 text-center">
                            Reservar esta Salida
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });

            // Card custom trip
            const customTripCard = document.createElement('div');
            customTripCard.className = 'bg-gradient-to-br from-tertiary-fixed/40 to-secondary-fixed/20 border border-secondary/20 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden';
            customTripCard.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-6">
                        <span class="material-symbols-outlined text-secondary text-3xl">explore_nearby</span>
                        <span class="text-xs font-bold px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 text-secondary">
                            100% Personalizado
                        </span>
                    </div>
                    <h3 class="text-xl font-bold text-primary mb-2">Gestiona tu propio viaje</h3>
                    <p class="text-sm text-on-surface-variant mb-6">
                        ¿Ninguna de estas fechas se adapta a tus planes? Diseñamos este itinerario a tu medida en la fecha que prefieras.
                    </p>
                </div>
                <button onclick="if(window.openContactModal) window.openContactModal('custom', document.title.replace(/'/g, '\\''))" class="w-full bg-secondary text-on-secondary py-3 rounded-xl font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all mt-4 text-center block">
                    Crear viaje a medida
                </button>
            `;
            grid.appendChild(customTripCard);
        };
        renderDepartures(trip.id);

        // Setup ScrollSpy for Left Index
        const setupScrollSpy = () => {
            const links = document.querySelectorAll('#viaje-index-nav a');
            const sections = [
                document.getElementById('section-overview'),
                document.getElementById('section-departures'),
                document.getElementById('section-itinerary'),
                document.getElementById('section-gallery'),
                document.getElementById('section-services'),
                document.getElementById('section-info')
            ];

            window.addEventListener('scroll', () => {
                let current = '';
                const scrollPos = window.scrollY + 200;

                sections.forEach(sec => {
                    if (sec) {
                        const top = sec.getBoundingClientRect().top + window.scrollY;
                        if (top <= scrollPos) {
                            current = sec.id;
                        }
                    }
                });

                links.forEach(link => {
                    link.classList.remove('border-secondary', 'text-secondary', 'bg-tertiary-fixed/30');
                    link.classList.add('border-transparent', 'text-primary');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.remove('border-transparent', 'text-primary');
                        link.classList.add('border-secondary', 'text-secondary', 'bg-tertiary-fixed/30');
                    }
                });
            });
        };
        setupScrollSpy();

        // Switch layouts
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('content-state').classList.remove('hidden');

        // Setup triggers for scroll reveal
        setTimeout(setupRevealObserver, 150);
    };

    window.toggleDayCollapse = (index) => {
        const targetContent = document.getElementById(`content-${index}`);
        const targetChevron = document.getElementById(`chevron-${index}`);
        if (!targetContent || !targetChevron) return;

        const isCurrentlyOpen = targetContent.style.maxHeight && targetContent.style.maxHeight !== '0px';

        // Close all other days in the itinerary
        const allContents = document.querySelectorAll('#section-itinerary [id^="content-"]');
        const allChevrons = document.querySelectorAll('#section-itinerary [id^="chevron-"]');
        
        allContents.forEach(c => c.style.maxHeight = '0px');
        allChevrons.forEach(ch => ch.style.transform = 'rotate(0deg)');

        // Toggle the clicked one
        if (!isCurrentlyOpen) {
            targetContent.style.maxHeight = targetContent.scrollHeight + 'px';
            targetChevron.style.transform = 'rotate(180deg)';
        }
    };

    window.changeMapSlide = (dir) => {
        const isLightboxOpen = !document.getElementById('map-lightbox').classList.contains('hidden');
        const scope = isLightboxOpen ? document.getElementById('lightbox-container') : document.getElementById('overview-map-container');
        
        const slides = scope.querySelectorAll('.map-carousel-slide');
        const indicators = scope.querySelectorAll('.map-indicator');
        if (!slides.length) return;
        let activeIdx = 0;
        slides.forEach((s, i) => {
            if (s.classList.contains('opacity-100')) activeIdx = i;
        });
        slides[activeIdx].classList.remove('opacity-100', 'z-10');
        slides[activeIdx].classList.add('opacity-0', 'z-0', 'pointer-events-none');
        if (indicators[activeIdx]) indicators[activeIdx].classList.replace('bg-white', 'bg-white/50');
        
        activeIdx = (activeIdx + dir + slides.length) % slides.length;
        
        slides[activeIdx].classList.add('opacity-100', 'z-10');
        slides[activeIdx].classList.remove('opacity-0', 'z-0', 'pointer-events-none');
        if (indicators[activeIdx]) indicators[activeIdx].classList.replace('bg-white/50', 'bg-white');
    };

    window.adjustTooltipPosition = (el, posX, posY) => {
        const tooltip = el.querySelector('.pin-tooltip');
        if (!tooltip) return;
        
        // Reset positioning
        tooltip.className = tooltip.className.replace(/bottom-full|top-full|left-full|right-full|left-1\/2|top-1\/2|-translate-x-1\/2|-translate-y-1\/2|mt-2|mb-2|ml-2|mr-2|left-0|right-0/g, '').trim();
        
        let positionClasses = [];
        // Vertical positioning
        if (posY < 20) { // Too close to top -> show below
            positionClasses.push('top-full', 'mt-2');
        } else { // Default above
            positionClasses.push('bottom-full', 'mb-2');
        }
        
        // Horizontal positioning
        if (posX < 20) { // Too close to left -> align left
            positionClasses.push('left-0');
        } else if (posX > 80) { // Too close to right -> align right
            positionClasses.push('right-0');
        } else { // Default center
            positionClasses.push('left-1/2', '-translate-x-1/2');
        }
        
        positionClasses.forEach(cls => tooltip.classList.add(...cls.split(' ')));
    };

    window.openMapLightbox = (htmlContent) => {
        const lightbox = document.getElementById('map-lightbox');
        const container = document.getElementById('lightbox-container');
        if (lightbox && container) {
            container.innerHTML = htmlContent;
            
            // Remove the background clicking logic from the cloned html so it doesn't try to open lightbox again
            const bgImgs = container.querySelectorAll('[onclick*="openMapLightbox"]');
            bgImgs.forEach(el => {
                el.removeAttribute('onclick');
                el.classList.remove('cursor-pointer');
            });
            
            lightbox.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    };

    window.closeMapLightbox = () => {
        const lightbox = document.getElementById('map-lightbox');
        const container = document.getElementById('lightbox-container');
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            if (container) container.innerHTML = '';
        }
    };

    window.openImageLightbox = (url, title) => {
        const lightbox = document.getElementById('map-lightbox');
        const container = document.getElementById('lightbox-container');
        if (lightbox && container) {
            container.innerHTML = `
                <div class="w-full h-full flex flex-col items-center justify-center bg-black/90 p-4">
                    <img src="${url}" class="w-full h-[85%] object-contain rounded-lg" alt="${title}" />
                    <p class="text-white text-xl font-medium mt-4 font-display-sm text-center">${title}</p>
                </div>
            `;
            lightbox.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    };

export { loadTripData };
