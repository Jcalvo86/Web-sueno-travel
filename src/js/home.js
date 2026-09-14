// home.js - Extracted logic for home page interactions

// ==========================================
// GLOBALS & CONSTANTS
// ==========================================
const FALLBACK_IMAGES = {
    egipto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC21HcAA-eLGjKKNOu3nimssvF1BzqrZtxgkWzFqn2uFvvWu9zubXPFmBkhx5DX9ydjuCDnZKWESOXoJ2MsU9GCt3300gpNHueS3SdnDtNJQIaD6dBxkBsT-QbTYSba0nADYE2ve4nPbO2UIu7VkWIxIsXxZtpvpOuQTxpOQzdYn-ZqtWATFj04Cz-iqQHZoVf_vYqQxBTPRm1Lsw3wtTKfAKPIQtC8Ze3Pa3TqGQoxtL4lCZtVjSYl',
    jordania: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARW6O-iYW0cCE6qywTlen-VnUlwIUb5izt7istCid-AL43a3K2iVhX-1iaWdiN9go_61I1HjP2wmx0ESzzU76cKCqu_NGztzUyHashzvY7yORPqLjSACCgyTe00Bv3SGaolY5usEnDlMA22mrWvyIH3qLiNCAND0fPv7sE7aHpcjejcS39u2EH1RSrxy7cWo384KDgmKOTuV1sFuWOQePMUmXENlA8p4n97TgP78Y_2rDr8TGlO95v',
    grecia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRPNyuNnsvszdmjNwdzlgJZch5nLMNYdygJFrwX6MkTGbQ1--zQZ3gtYkh9xhP3A_uIsRRw_XVrGg9xVelBtyqHkVQ0YlCZ2Icf3Gt8eHOC7xyzjCVimJZDYfl0cLgooVTtoQNP__K-b4Mb1GRvxOieqjqV5NIS1UOAsO1ikMYPYZU6shDczugSPq5VmF8ZyS_hYuICiRFLYam8KZSxLMOTk03DaQPdnen_6_FHl1LL89KVLDtWfSV',
    turquia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmNu2RAGYf0SL7T_DWU_uAWTotvXbpTajg3t78s4jltQX8mADL9QSmH2s_sjjRgc-R5i3Wo1zR63pCXCXIEizJZeHUIRP0ru72_1hH_z0L63_12KXOyI4j9LD2cANz8BlbbD0xI6DjnUdHYBZdAApvMBP_p_tewHDYOR__Sc5NKAkeb4AWpCvkPZOFYwWGgV_hk2MxkyECFSICH7DtTM_R1Lju05gmCG3W156fcH-hB3J5dquiUBB',
    turquía: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmNu2RAGYf0SL7T_DWU_uAWTotvXbpTajg3t78s4jltQX8mADL9QSmH2s_sjjRgc-R5i3Wo1zR63pCXCXIEizJZeHUIRP0ru72_1hH_z0L63_12KXOyI4j9LD2cANz8BlbbD0xI6DjnUdHYBZdAApvMBP_p_tewHDYOR__Sc5NKAkeb4AWpCvkPZOFYwWGgV_hk2MxkyECFSICH7DtTM_R1Lju05gmCG3W156fcH-hB3J5dquiUBB'
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920';

const VISITAR_DATA = {
    egipto: {
        images: [
            'Imagenes/egipto5.webp',
            'Imagenes/egipto6.jpg',
            'Imagenes/egipto7.webp',
            'Imagenes/egipto8.jpg'
        ],
        locations: [
            {
                title: 'Pirámides de Giza',
                title_en: 'Pyramids of Giza',
                desc: 'Contempla la última de las Siete Maravillas del Mundo Antiguo que aún permanece en pie.',
                desc_en: 'Behold the last of the Seven Wonders of the Ancient World still standing.',
                icon: 'history_edu'
            },
            {
                title: 'Templos de Luxor y Karnak',
                title_en: 'Temples of Luxor and Karnak',
                desc: 'Camina por las avenidas de esfinges y contempla las colosales columnas talladas en piedra.',
                desc_en: 'Walk down the avenues of sphinxes and gaze at the colossal stone-carved columns.',
                icon: 'account_balance'
            },
            {
                title: 'El Nilo en Dahabiya',
                title_en: 'The Nile in a Dahabiya',
                desc: 'Navega en una embarcación tradicional de vela para una experiencia íntima e histórica.',
                desc_en: 'Sail on a traditional sailboat for an intimate and historical experience.',
                icon: 'sailing'
            }
        ]
    },
    jordania: {
        images: [
            'Imagenes/jordania-alex-vasey.webp',
            'Imagenes/jordania-emile-guillemot.webp',
            'Imagenes/jordania-hisham-zayadneh.webp',
            'Imagenes/jordania-juli-kosolapova.webp'
        ],
        locations: [
            {
                title: 'Petra: La Ciudad Rosa',
                title_en: 'Petra: The Rose City',
                desc: 'Caminata por el Siq para descubrir una ciudad esculpida directamente en los acantilados.',
                desc_en: 'Hike through the Siq to discover a city carved directly into the cliffs.',
                icon: 'landscape'
            },
            {
                title: 'Desierto de Wadi Rum',
                title_en: 'Wadi Rum Desert',
                desc: 'Explora dunas rojizas en 4x4 y descansa en un campamento de lujo bajo el cielo estrellado.',
                desc_en: 'Explore red dunes in a 4x4 and rest in a luxury camp under the starry sky.',
                icon: 'wb_sunny'
            },
            {
                title: 'El Mar Muerto',
                title_en: 'The Dead Sea',
                desc: 'Flota sin esfuerzo en las aguas más saladas y terapéuticas del planeta.',
                desc_en: 'Float effortlessly in the saltiest and most therapeutic waters on the planet.',
                icon: 'waves'
            }
        ]
    },
    grecia: {
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAwdc1ko-NLsluSmskx1Bmf6ipIa1d--LMQLjDSBMycp5DstQUXDzi0pWZrgxF6O23rUcHKTfnA-pNLDTm4Pb3lFnaATkWfp6rZA1-_yfugX1POWmIXHeOM7GcsFj81cX6wrwO21xsHSSsEc9rHBpnenOTnsHozloXgtyQlOwY8E1FP1wUnei7IwzNvISidqZh1X0w7iRmkjVw1Xvb6RVVsjj7a8DhawgtAtD3UzX33ql-1II4a_vCe',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBRPNyuNnsvszdmjNwdzlgJZch5nLMNYdygJFrwX6MkTGbQ1--zQZ3gtYkh9xhP3A_uIsRRw_XVrGg9xVelBtyqHkVQ0YlCZ2Icf3Gt8eHOC7xyzjCVimJZDYfl0cLgooVTtoQNP__K-b4Mb1GRvxOieqjqV5NIS1UOAsO1ikMYPYZU6shDczugSPq5VmF8ZyS_hYuICiRFLYam8KZSxLMOTk03DaQPdnen_6_FHl1LL89KVLDtWfSV',
            'Imagenes/grecia-constantinos-kollias.webp',
            'Imagenes/grecia-johnny-africa.webp'
        ],
        locations: [
            {
                title: 'Acrópolis de Atenas',
                title_en: 'Acropolis of Athens',
                desc: 'El corazón de la civilización occidental bajo el sol radiante del Mediterráneo.',
                desc_en: 'The heart of Western civilization beneath the radiant Mediterranean sun.',
                icon: 'architecture'
            },
            {
                title: 'Santorini al Atardecer',
                title_en: 'Santorini at Sunset',
                desc: 'Disfruta de las icónicas cúpulas azules y vistas infinitas sobre el mar Egeo.',
                desc_en: 'Enjoy the iconic blue domes and endless views over the Aegean Sea.',
                icon: 'wb_twilight'
            },
            {
                title: 'Delos Sagrado',
                title_en: 'Sacred Delos',
                desc: 'Explora la isla mitológica del nacimiento de Apolo, repleta de ruinas y mosaicos.',
                desc_en: 'Explore the mythological island of Apollo\'s birth, full of ruins and mosaics.',
                icon: 'theater_comedy'
            }
        ]
    },
    turquia: {
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDKpuOU-Z25k5Ovr6w9iB0i3dWZ7FWzzLtr4cyr586msvEPleUvT5MrN29Kb4TbLQ9LeAog6wr-P-NQS2qlEFdJSTBh5xCVNGcujIds27H0Np5ly7uGgHs16VNcgAdMsbCvBfsg-ohwY1Xx2R9TyxELBTgepMmJa8eCph5HrzPtVZ7DqTJY1YQgnoLm2wpL4fgvbdyAW_kZGWVieVr4YNuhGSkoQm2JpK1FTSwljtY_NJ-rbbYIC9g8',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmNu2RAGYf0SL7T_DWU_uAWTotvXbpTajg3t78s4jltQX8mADL9QSmH2s_sjjRgc-R5i3Wo1zR63pCXCXIEizJZeHUIRP0ru72_1hH_z0L63_12KXOyI4j9LD2cANz8BlbbD0xI6DjnUdHYBZdAApvMBP_p_tewHDYOR__Sc5NKAkeb4AWpCvkPZOFYwWGgV_hk2MxkyECFSICH7DtTM_R1Lju05gmCG3W156fcH-hB3J5dquiUBB',
            'Imagenes/turquia-mar-cerdeira.webp',
            'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600'
        ],
        locations: [
            {
                title: 'Magia de Estambul',
                title_en: 'Magic of Istanbul',
                desc: 'Navega entre dos continentes y déjate envolver por los aromas de sus especias.',
                desc_en: 'Sail between two continents and let yourself be enveloped by the aromas of its spices.',
                icon: 'synagogue'
            },
            {
                title: 'Capadocia en Globo',
                title_en: 'Cappadocia by Balloon',
                desc: 'Vuela al amanecer sobre las chimeneas de hadas y valles lunares.',
                desc_en: 'Fly at dawn over the fairy chimneys and lunar valleys.',
                icon: 'flight_takeoff'
            },
            {
                title: 'Éfeso Antiguo',
                title_en: 'Ancient Ephesus',
                desc: 'Camina por la Vía del Puerto y maravíllate ante la magnífica Biblioteca de Celso.',
                desc_en: 'Walk down the Harbour Street and marvel at the magnificent Library of Celsus.',
                icon: 'temple_hindu'
            }
        ]
    }
};

const HERO_SLIDES = [
    { bg: 'Imagenes/ancient-carvings-and-pillars-against-a-blue-sky-2026-03-18-17-45-57-utc.webp' },
    { bg: 'Imagenes/blue-mosque-in-istanbul-2026-03-17-19-36-03-utc.webp' },
    { bg: 'Imagenes/boats-and-buildings-along-a-riverbank-in-egypt-2026-03-20-01-00-43-utc.webp' },
    { bg: 'Imagenes/camels-and-ancient-architecture-in-desert-setting-2026-03-09-09-01-19-utc.webp' }
];

// ==========================================
// NAVBAR LOGIC
// ==========================================
export function initScrollBehavior() {
    // Delegado a global-header.js
}

// ==========================================
// PARALLAX & VISITAR LOGIC
// ==========================================
let activeBgIndex = 1;
let currentCountry = 'egipto';
let currentPhotoIdx = 0;
let bgCycleInterval = null;

function transitionBackground(newImgUrl) {
    const slide1 = document.getElementById('visitar-bg-1');
    const slide2 = document.getElementById('visitar-bg-2');
    if (!slide1 || !slide2) return;

    if (activeBgIndex === 1) {
        const bg2 = slide2.querySelector('.visitar-slide-bg');
        if (bg2) bg2.style.backgroundImage = `url('${newImgUrl}')`;
        slide2.classList.add('slide-active');
        slide1.classList.remove('slide-active');
        activeBgIndex = 2;
    } else {
        const bg1 = slide1.querySelector('.visitar-slide-bg');
        if (bg1) bg1.style.backgroundImage = `url('${newImgUrl}')`;
        slide1.classList.add('slide-active');
        slide2.classList.remove('slide-active');
        activeBgIndex = 1;
    }
}

function startBgCycle(country) {
    if (bgCycleInterval) clearInterval(bgCycleInterval);
    currentCountry = country;
    currentPhotoIdx = 0;

    const data = VISITAR_DATA[country];
    if (!data || !data.images || data.images.length === 0) return;

    transitionBackground(data.images[0]);

    bgCycleInterval = setInterval(() => {
        currentPhotoIdx = (currentPhotoIdx + 1) % data.images.length;
        transitionBackground(data.images[currentPhotoIdx]);
    }, 6000);
}

export function selectVisitarCountry(country) {
    document.querySelectorAll('.visitar-dest-card').forEach(card => {
        if (card.getAttribute('data-visitar') === country) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    const data = VISITAR_DATA[country];
    if (!data) return;

    startBgCycle(country);

    const listContainer = document.getElementById('visitar-list-container');
    if (listContainer) {
        const lang = window.i18n && window.i18n.getCurrentLang ? window.i18n.getCurrentLang() : 'es';
        
        listContainer.innerHTML = data.locations.map(loc => {
            const displayTitle = lang === 'en' ? (loc.title_en || loc.title) : loc.title;
            const displayDesc = lang === 'en' ? (loc.desc_en || loc.desc) : loc.desc;
            
            return `
        <div class="flex gap-6 items-start transition-all duration-300">
            <div class="bg-secondary text-on-primary w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">${loc.icon}</span>
            </div>
            <div>
                <h4 class="text-xl font-bold text-secondary-fixed">${displayTitle}</h4>
                <p class="text-sm opacity-80 mt-1">${displayDesc}</p>
            </div>
        </div>`;
        }).join('');
    }
}
window.selectVisitarCountry = selectVisitarCountry;

export function initQueVisitarParallax() {
    const section = document.getElementById('que-visitar');
    const bgContainer = document.getElementById('visitar-parallax-bg');
    if (!section || !bgContainer) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight && rect.bottom > 0) {
                    const scrolledDistance = windowHeight - rect.top;
                    const totalDistance = windowHeight + rect.height;
                    const scrollPercent = scrolledDistance / totalDistance;

                    const maxTranslateY = 20; 
                    const translateY = (scrollPercent - 0.5) * maxTranslateY * 2;
                    bgContainer.style.transform = `translate3d(0, ${translateY}%, 0)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// TESTIMONIALS
// ==========================================
let testimonialIndex = 0;
const showTestimonial = (index) => {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!slides.length) return;
    testimonialIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === testimonialIndex);
    });
    document.querySelectorAll('.testimonial-dot-mark').forEach((mark, i) => {
        const active = i === testimonialIndex;
        mark.classList.toggle('bg-[#7F5621]', active);
        mark.classList.toggle('w-8', active);
        mark.classList.toggle('bg-[#CBC2B9]', !active);
        mark.classList.toggle('w-2', !active);
        mark.parentElement.setAttribute('aria-selected', active ? 'true' : 'false');
    });
};

export function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.getElementById('testimonial-dots');
    const prev = document.getElementById('testimonial-prev');
    const next = document.getElementById('testimonial-next');
    if (!dots || !slides.length) return;
    dots.innerHTML = '';
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'min-h-[44px] min-w-[44px] inline-flex items-center justify-center';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
        btn.innerHTML = '<span class="testimonial-dot-mark h-2 w-2 rounded-full bg-[#CBC2B9] transition-all duration-200 block"></span>';
        btn.addEventListener('click', () => showTestimonial(i));
        dots.appendChild(btn);
    });
    if (prev) prev.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
    if (next) next.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
    showTestimonial(0);
}


// ==========================================
// FORM HELPERS
// ==========================================
export function selectFormCountry(countryName) {
    const checkboxes = document.querySelectorAll('#contactFormMain input[name="destino"]');
    checkboxes.forEach(cb => {
        if (cb.value.toLowerCase() === countryName.toLowerCase()) {
            cb.checked = true;
        }
    });

    const heroMessage = document.getElementById('heroMessage');
    if (heroMessage) {
        heroMessage.value = `Me gustaría cotizar un viaje personalizado a ${countryName}. `;
        heroMessage.focus();
    }
}
window.selectFormCountry = selectFormCountry;

export function selectDestinationCheckbox(countryName) {
    const checkboxes = document.querySelectorAll('#contactFormMain input[name="destino"]');
    checkboxes.forEach(cb => {
        if (cb.value.toLowerCase() === countryName.toLowerCase()) {
            cb.checked = true;
        } else {
            cb.checked = false;
        }
    });

    const mainMsg = document.querySelector('#contactFormMain textarea');
    if (mainMsg) {
        mainMsg.value = `Hola, me interesa recibir más información e itinerario detallado sobre el viaje a ${countryName}. `;
        setTimeout(() => mainMsg.focus(), 100);
    }
}
window.selectDestinationCheckbox = selectDestinationCheckbox;

export function setupFormInteractions() {
    const setupFormInteraction = (formId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Extract values
            const nameInput = e.target.querySelector('input[type="text"]');
            const emailInput = e.target.querySelector('input[type="email"]');
            const msgInput = e.target.querySelector('textarea');
            const checkboxes = e.target.querySelectorAll('input[name="destino"]:checked');

            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const message = msgInput ? msgInput.value : '';
            const destinations = Array.from(checkboxes).map(cb => cb.value);

            const btn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('button');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Enviando...';
            btn.classList.add('opacity-70');
            btn.disabled = true;

            try {
                const response = await fetch('/api/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message, destinations })
                });

                if (!response.ok) throw new Error('Error al enviar la solicitud.');

                btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> ¡Recibido!';
                btn.classList.remove('bg-primary');
                btn.classList.add('bg-green-600');

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.classList.add('bg-primary');
                    btn.classList.remove('bg-green-600', 'opacity-70');
                    btn.disabled = false;
                    e.target.reset();
                }, 3000);

            } catch (err) {
                alert('Ocurrió un error al enviar tu consulta. Por favor, intenta de nuevo o escríbenos directamente.');
                btn.innerHTML = originalContent;
                btn.classList.remove('opacity-70');
                btn.disabled = false;
            }
        });
    };

    setupFormInteraction('heroInquiryForm');
    setupFormInteraction('contactFormMain');
}


// ==========================================
// DYNAMIC CMS TRIPS
// ==========================================
export async function fetchActiveTrips() {
    let checks = 0;
    while (!window.DataSource && checks < 20) {
        await new Promise(r => setTimeout(r, 100));
        checks++;
    }
    if (!window.DataSource) return [];

    let trips = [];
    const lang = window.i18n && typeof window.i18n.getCurrentLang === 'function' ? window.i18n.getCurrentLang() : 'es';

    try {
        const travelItems = await window.DataSource.getItems('travel');
        let departures = [];
        try {
            departures = await window.DataSource.getItems('departure') || [];
        } catch (e) {}

        if (travelItems && travelItems.length > 0) {
            console.log("Raw travelItems from DB:", travelItems);
            trips = travelItems.map(item => {
                const destSum = item.destinationsSummary || item.destinations_summary;
                const isDraft = item.is_published !== undefined ? !item.is_published : (item.isPublished !== undefined ? !item.isPublished : (item.isDraft || false));
                
                const tripDepartures = departures.filter(d => (d.travelId === item.id || d.travel_id === item.id) && (d.status !== 'cancelled'));
                tripDepartures.sort((a, b) => new Date(a.departureDate || a.departure_date) - new Date(b.departureDate || b.departure_date));
                const now = new Date();
                const nextDep = tripDepartures.find(d => new Date(d.departureDate || d.departure_date) >= now) || tripDepartures[0];
                const departureDate = nextDep ? (nextDep.departureDate || nextDep.departure_date) : '';

                let dateStr = '';
                if (departureDate) {
                    try {
                        const d = new Date(departureDate + 'T00:00:00');
                        dateStr = d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', { month: 'long', year: 'numeric' });
                        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
                    } catch(e) { dateStr = departureDate; }
                }

                return {
                    id: item.id,
                    title: lang === 'en' ? (item.title_en || item.titleEn || item.name_en || item.nameEn || item.title || item.name) : (item.title || item.name),
                    desc: lang === 'en' ? (item.description_en || item.descriptionEn || item.description || (destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum) : '')) : (item.description || (destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum) : '')),
                    imgUrl: item.headerImageUrl || item.header_image_url || item.imageUrl || item.image_url || (item.itinerary && item.itinerary[0]?.imageUrl) || '',
                    isDraft: isDraft,
                    flavorText: lang === 'en' ? (item.flavorText_en || item.flavorTextEn || item.flavor_text_en || item.flavorText || item.flavor_text || item.agency || '') : (item.flavorText || item.flavor_text || item.agency || ''),
                    days: item.duration_days || item.durationDays || '',
                    nights: item.duration_nights || item.durationNights || '',
                    locations: lang === 'en' && (item.destinationsSummary_en || item.destinationsSummaryEn || item.destinations_summary_en || item.destination_en || item.destinationEn) ? (item.destinationsSummary_en || item.destinationsSummaryEn || item.destinations_summary_en || item.destination_en || item.destinationEn).replace(/\s*\([^)]*\)/g, '') : (destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum).replace(/\s*\([^)]*\)/g, '') : ''),
                    date: dateStr
                };
            });
        }
    } catch (e) {
        console.warn('Error reading from travel collection, trying cms_products:', e);
    }

    if (trips.length === 0) {
        try {
            const products = await window.DataSource.getItems('cms_products');
            trips = products.map(item => ({
                id: item.id,
                title: lang === 'en' ? (item.name_en || item.nameEn || item.title_en || item.titleEn || item.name || item.title) : (item.name || item.title),
                desc: lang === 'en' ? (item.overview_en || item.overviewEn || item.subtitle_en || item.subtitleEn || item.overview || item.subtitle || '') : (item.overview || item.subtitle || ''),
                imgUrl: item.headerImageUrl || item.header_image_url || item.imageUrl || '',
                isDraft: item.isDraft || item.status === 'hidden',
                flavorText: lang === 'en' ? (item.flavorText_en || item.flavorTextEn || item.flavor_text_en || item.flavorText || item.flavor_text || item.agency || '') : (item.flavorText || item.flavor_text || item.agency || ''),
                days: '', nights: '', locations: '', date: ''
            }));
        } catch (e) {}
    }

    return trips.filter(t => !t.isDraft);
}

export function renderTripCards(trips) {
    const grid = document.getElementById('destinations-grid');
    const template = document.getElementById('trip-card-template');
    
    if (!grid || !template) return;

    grid.innerHTML = '';
    const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-4', 'md:col-span-8'];

    trips.forEach((trip, idx) => {
        const spanClass = spans[idx % 4];
        const isWide = (spanClass === 'md:col-span-8');
        const lowerTitle = trip.title.toLowerCase();

        let bgImg = trip.imgUrl;
        if (!bgImg) {
            for (const key in FALLBACK_IMAGES) {
                if (lowerTitle.includes(key)) {
                    bgImg = FALLBACK_IMAGES[key];
                    break;
                }
            }
        }
        if (!bgImg) bgImg = DEFAULT_IMAGE;

        let tag = trip.flavorText;
        if (!tag && trip.desc) tag = 'Experiencia';

        let hoverInfo = [];
        if (trip.date) {
            const nextTripStr = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('nextTrip', 'home') || 'Próximo viaje en grupo:' : 'Próximo viaje en grupo:';
            hoverInfo.push(`<span class="font-semibold block mb-1">📅 ${nextTripStr} ${trip.date}</span>`);
        }
        if (trip.days) {
            const diasStr = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('days', 'home') || 'Días' : 'Días';
            const nochesStr = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('nights', 'home') || 'Noches' : 'Noches';
            let duration = `${trip.days} ${diasStr}`;
            if (trip.nights) duration += ` / ${trip.nights} ${nochesStr}`;
            hoverInfo.push(`⏱️ ${duration}`);
        }
        if (trip.locations) hoverInfo.push(`📍 ${trip.locations}`);
        const hoverHTML = hoverInfo.length > 0 
            ? hoverInfo.join('<br/>') 
            : `<p class="max-w-md opacity-80 text-sm overflow-hidden">${trip.desc}</p>`;

        const node = template.content.cloneNode(true);
        
        const cardDiv = node.querySelector('.trip-card-container');
        if (cardDiv) {
            cardDiv.className = `${spanClass} h-[380px] md:h-full group relative overflow-hidden rounded-3xl ambient-glow trip-card-container`;
        }
        
        const bgDiv = node.querySelector('.trip-card-bg');
        if (bgDiv) bgDiv.style.backgroundImage = `url("${bgImg}")`;

        const titleSpan = node.querySelector('.trip-chip-title');
        if (titleSpan) titleSpan.textContent = trip.title;

        const flavorH3 = node.querySelector('.trip-flavor-title');
        if (flavorH3) {
            flavorH3.className = `${isWide ? 'text-3xl' : 'text-2xl'} font-bold mb-2 trip-flavor-title`;
            flavorH3.textContent = tag || trip.title;
        }

        const hoverContainer = node.querySelector('.trip-hover-info');
        if (hoverContainer) hoverContainer.innerHTML = hoverHTML;

        const linkBtn = node.querySelector('.trip-link-btn');
        if (linkBtn) {
            const verItinStr = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('verItinerario', 'home') || 'Ver Itinerario' : 'Ver Itinerario';
            linkBtn.href = `viaje.html?nombre=${window.generateSlug(trip.title)}`;
            linkBtn.textContent = verItinStr;
            linkBtn.className = `bg-primary text-on-primary ${isWide ? 'px-6' : 'px-4'} py-2.5 rounded-lg hover:bg-primary-fixed-dim transition-all font-label-md trip-link-btn ${isWide ? '' : 'text-sm'}`;
        }
        
        const textContainer = node.querySelector('.trip-text-container');
        if (textContainer) {
            textContainer.className = `trip-text-container text-on-primary ${isWide ? '' : 'mb-4'}`;
        }
        
        const bottomContainer = node.querySelector('.trip-bottom-container');
        if (bottomContainer) {
            bottomContainer.className = `trip-bottom-container absolute bottom-0 left-0 p-8 ${isWide ? 'w-full flex justify-between items-end' : ''}`;
        }

        grid.appendChild(node);
    });
}


// ==========================================
// HERO SLIDER LOGIC
// ==========================================
export function initHeroSlider() {
    const container = document.getElementById('hero-slider-container');
    if (!container) return;

    container.innerHTML = HERO_SLIDES.map((slide, idx) => `
        <div class="hero-slide ${idx === 0 ? 'slide-active' : ''}" data-index="${idx}">
            <div class="hero-slide-bg" style="background-image: url('${slide.bg}')"></div>
            <div class="hero-slide-overlay"></div>
        </div>
    `).join('');

    let currentIdx = 0;
    const slidesElements = container.querySelectorAll('.hero-slide');

    const changeSlide = () => {
        if (slidesElements.length === 0) return;
        const currentSlide = slidesElements[currentIdx];
        const nextIdx = (currentIdx + 1) % slidesElements.length;
        const nextSlide = slidesElements[nextIdx];

        currentSlide.classList.remove('slide-active');
        currentSlide.classList.add('slide-leaving');
        nextSlide.classList.add('slide-active');

        setTimeout(() => {
            currentSlide.classList.remove('slide-leaving');
            currentIdx = nextIdx;
        }, 1200);
    };

    setInterval(changeSlide, 7000);
}

export function initHeroParallax() {
    const container = document.getElementById('hero-slider-container');
    if (!container) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset || document.documentElement.scrollTop;
                if (scrolled < window.innerHeight) {
                    container.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// BOOTSTRAP
// ==========================================
const initHome = async () => {
    initScrollBehavior();
    selectVisitarCountry('egipto');
    initQueVisitarParallax();
    initTestimonials();
    setupFormInteractions();
    initHeroSlider();
    initHeroParallax();

    const trips = await fetchActiveTrips();
    if(trips && trips.length > 0) {
        renderTripCards(trips);
    } else {
        const grid = document.getElementById('destinations-grid');
        if (grid) {
            grid.innerHTML = '<div class="col-span-full text-center py-10 text-on-surface-variant">Pronto publicaremos nuevos viajes. ¡Mantente atento!</div>';
            grid.className = 'grid grid-cols-1 gap-6 h-auto';
        }
    }
};

if (document.getElementById('destinations-grid')) {
    initHome();
} else {
    window.addEventListener('componentsLoaded', initHome);
}

window.addEventListener('languageChanged', async () => {
    // Re-render trip cards
    const trips = await fetchActiveTrips();
    if(trips && trips.length > 0) {
        renderTripCards(trips);
    }
    // Re-render What to visit section in the new language
    selectVisitarCountry(currentCountry);
});
