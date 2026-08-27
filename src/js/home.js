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

const FALLBACK_TAGS = {
    egipto: 'Misterio Milenario',
    jordania: 'Maravilla del Desierto',
    grecia: 'Mármoles Eternos',
    turquia: 'Puente entre Mundos',
    turquía: 'Puente entre Mundos'
};

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
                desc: 'Contempla la última de las Siete Maravillas del Mundo Antiguo que aún permanece en pie.',
                icon: 'history_edu'
            },
            {
                title: 'Templos de Luxor y Karnak',
                desc: 'Camina por las avenidas de esfinges y contempla las colosales columnas talladas en piedra.',
                icon: 'account_balance'
            },
            {
                title: 'El Nilo en Dahabiya',
                desc: 'Navega en una embarcación tradicional de vela para una experiencia íntima e histórica.',
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
                desc: 'Caminata por el Siq para descubrir una ciudad esculpida directamente en los acantilados.',
                icon: 'landscape'
            },
            {
                title: 'Desierto de Wadi Rum',
                desc: 'Explora dunas rojizas en 4x4 y descansa en un campamento de lujo bajo el cielo estrellado.',
                icon: 'wb_sunny'
            },
            {
                title: 'El Mar Muerto',
                desc: 'Flota sin esfuerzo en las aguas más saladas y terapéuticas del planeta.',
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
                desc: 'El corazón de la civilización occidental bajo el sol radiante del Mediterráneo.',
                icon: 'architecture'
            },
            {
                title: 'Santorini al Atardecer',
                desc: 'Disfruta de las icónicas cúpulas azules y vistas infinitas sobre el mar Egeo.',
                icon: 'wb_twilight'
            },
            {
                title: 'Delos Sagrado',
                desc: 'Explora la isla mitológica del nacimiento de Apolo, repleta de ruinas y mosaicos.',
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
                desc: 'Navega entre dos continentes y déjate envolver por los aromas de sus especias.',
                icon: 'synagogue'
            },
            {
                title: 'Capadocia en Globo',
                desc: 'Vuela al amanecer sobre las chimeneas de hadas y valles lunares.',
                icon: 'flight_takeoff'
            },
            {
                title: 'Éfeso Antiguo',
                desc: 'Camina por la Vía del Puerto y maravíllate ante la magnífica Biblioteca de Celso.',
                icon: 'temple_hindu'
            }
        ]
    }
};

const HERO_SLIDES = [
    { bg: 'Imagenes/Egipto1.webp' },
    { bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARW6O-iYW0cCE6qywTlen-VnUlwIUb5izt7istCid-AL43a3K2iVhX-1iaWdiN9go_61I1HjP2wmx0ESzzU76cKCqu_NGztzUyHashzvY7yORPqLjSACCgyTe00Bv3SGaolY5usEnDlMA22mrWvyIH3qLiNCAND0fPv7sE7aHpcjejcS39u2EH1RSrxy7cWo384KDgmKOTuV1sFuWOQePMUmXENlA8p4n97TgP78Y_2rDr8TGlO95v' },
    { bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRPNyuNnsvszdmjNwdzlgJZch5nLMNYdygJFrwX6MkTGbQ1--zQZ3gtYkh9xhP3A_uIsRRw_XVrGg9xVelBtyqHkVQ0YlCZ2Icf3Gt8eHOC7xyzjCVimJZDYfl0cLgooVTtoQNP__K-b4Mb1GRvxOieqjqV5NIS1UOAsO1ikMYPYZU6shDczugSPq5VmF8ZyS_hYuICiRFLYam8KZSxLMOTk03DaQPdnen_6_FHl1LL89KVLDtWfSV' },
    { bg: 'Imagenes/Sueno-travel-4.webp' }
];

// ==========================================
// NAVBAR LOGIC
// ==========================================
export function initScrollBehavior() {
    const header = document.querySelector('header');
    if (!header) {
        setTimeout(initScrollBehavior, 50);
        return;
    }

    header.style.transition = 'transform 0.4s ease, opacity 0.4s ease, height 0.3s ease, background-color 0.3s ease';

    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
            header.classList.add('shadow-md', 'h-16');
            header.classList.remove('h-20');
        } else {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
            header.style.pointerEvents = 'none';
            header.classList.remove('shadow-md', 'h-16');
            header.classList.add('h-20');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader(); 
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
        listContainer.innerHTML = data.locations.map(loc => `
        <div class="flex gap-6 items-start transition-all duration-300">
            <div class="bg-secondary text-on-primary w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined">${loc.icon}</span>
            </div>
            <div>
                <h4 class="text-xl font-bold text-secondary-fixed">${loc.title}</h4>
                <p class="text-sm opacity-80 mt-1">${loc.desc}</p>
            </div>
        </div>
    `).join('');
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
                        dateStr = d.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
                        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
                    } catch(e) { dateStr = departureDate; }
                }

                return {
                    id: item.id,
                    title: item.title,
                    desc: item.description || (destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum) : ''),
                    imgUrl: item.headerImageUrl || item.header_image_url || item.imageUrl || item.image_url || (item.itinerary && item.itinerary[0]?.imageUrl) || '',
                    isDraft: isDraft,
                    flavorText: item.flavorText || item.flavor_text || item.agency || '',
                    days: item.durationDays || item.duration_days || '',
                    nights: item.durationNights || item.duration_nights || '',
                    locations: destSum ? (Array.isArray(destSum) ? destSum.join(', ') : destSum) : '',
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
                title: item.name,
                desc: item.subtitle || item.overview || '',
                imgUrl: item.headerImageUrl || item.header_image_url || item.imageUrl || '',
                isDraft: item.isDraft || item.status === 'hidden',
                flavorText: item.flavorText || item.flavor_text || item.agency || '',
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
        if (!tag || tag === 'Sueño Travel Chile' || tag === 'Operador') {
            for (const key in FALLBACK_TAGS) {
                if (lowerTitle.includes(key)) {
                    tag = FALLBACK_TAGS[key];
                    break;
                }
            }
        }
        if (!tag && trip.desc) tag = 'Experiencia';

        let hoverInfo = [];
        if (trip.date) hoverInfo.push(`<span class="font-semibold block mb-1">📅 ${trip.date}</span>`);
        if (trip.days) {
            let duration = `${trip.days} Días`;
            if (trip.nights) duration += ` / ${trip.nights} Noches`;
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
            linkBtn.href = `viaje.html?id=${trip.id}`;
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
document.addEventListener('DOMContentLoaded', async () => {
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
    }
});
