document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('global-header');
    if (!headerContainer) return;

    // Inject Navigation Header HTML
    headerContainer.innerHTML = `
    <header id="main-header-nav" class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 transition-all duration-300 bg-transparent border-transparent">
        <div class="flex items-center gap-3">
            <a href="index.html" class="flex items-center gap-3">
                <img data-i18n-alt="logoAlt" data-i18n-ns="header" alt="Sueño Travel Logo" class="h-10 w-auto" src="Imagenes/logo_suenoTravel%20Chile.svg"/>
            </a>
        </div>
        <nav class="hidden md:flex gap-8 items-center">
            <div class="relative group">
                <button id="nav-viajes-dropdown" class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 focus:outline-none">
                    <span data-i18n="viajes" data-i18n-ns="header">Viajes</span>
                    <span class="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                </button>
                <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white shadow-lg border border-outline-variant/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                    <a id="nav-viajes-grupales" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="viajes-grupales.html" data-i18n="viajesGrupales" data-i18n-ns="header">Viajes Grupales</a>
                    <a id="nav-itinerarios" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="itinerarios.html" data-i18n="itinerarios" data-i18n-ns="header">Itinerarios</a>
                </div>
            </div>
            <!-- Dropdown Destinos -->
            <div class="relative group">
                <button id="nav-destinos" class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 focus:outline-none">
                    <span data-i18n="destinos" data-i18n-ns="header">Destinos</span>
                    <span class="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                </button>
                <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white shadow-lg border border-outline-variant/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                    <a id="nav-egipto" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=egipto" data-i18n="egipto" data-i18n-ns="header">Egipto</a>
                    <a id="nav-jordania" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=jordania" data-i18n="jordania" data-i18n-ns="header">Jordania</a>
                    <a id="nav-grecia" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=grecia" data-i18n="grecia" data-i18n-ns="header">Grecia</a>
                    <a id="nav-turquia" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=turquia" data-i18n="turquia" data-i18n-ns="header">Turquía</a>
                </div>
            </div>
            <a id="nav-nosotros" class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="conocenos.html" data-i18n="conocenos" data-i18n-ns="header">Conócenos</a>
        </nav>
        <div class="flex items-center gap-4">
            <button onclick="if(window.openContactModal) window.openContactModal();" class="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md uppercase tracking-wider scale-95 active:scale-90 transition-transform hover:bg-primary/95 text-xs md:text-sm font-bold" data-i18n="contactar" data-i18n-ns="header">
                Contactar
            </button>
            <!-- Language Toggle -->
            <div class="flex items-center gap-1 border border-outline-variant/30 rounded-lg overflow-hidden text-xs font-bold">
                <button id="lang-es" class="px-2.5 py-1.5 transition-all hover:bg-primary/10" data-i18n-aria="cambiarEs" data-i18n-ns="header" aria-label="Cambiar a Español">ES</button>
                <span class="text-outline-variant/40">|</span>
                <button id="lang-en" class="px-2.5 py-1.5 transition-all hover:bg-primary/10 opacity-50" data-i18n-aria="switchEn" data-i18n-ns="header" aria-label="Switch to English">EN</button>
            </div>
            <button id="mobile-menu-btn" class="md:hidden text-primary p-2 focus:outline-none" data-i18n-aria="abrirMenu" data-i18n-ns="header" aria-label="Abrir Menú">
                <span class="material-symbols-outlined text-3xl">menu</span>
            </button>
        </div>
    </header>

    <!-- Mobile Drawer Navigation -->
    <div id="mobile-drawer" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[999] hidden transition-opacity duration-300">
        <div class="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl p-8 flex flex-col gap-6 transform translate-x-full transition-transform duration-300 ease-in-out" id="mobile-drawer-content">
            <div class="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <span class="font-display-lg text-lg font-black text-primary" data-i18n="navegacion" data-i18n-ns="header">Navegación</span>
                <button id="close-drawer-btn" class="text-primary p-1 focus:outline-none">
                    <span class="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>
            <nav class="flex flex-col gap-4">
                <span class="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant/60 font-semibold" data-i18n="viajes" data-i18n-ns="header">Viajes</span>
                <div class="flex flex-col gap-3 pl-3 border-l-2 border-outline-variant/10 pb-4">
                    <a id="mobile-nav-viajes-grupales" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="viajes-grupales.html" data-i18n="viajesGrupales" data-i18n-ns="header">Viajes Grupales</a>
                    <a id="mobile-nav-itinerarios" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="itinerarios.html" data-i18n="itinerarios" data-i18n-ns="header">Itinerarios</a>
                </div>
                <span class="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant/60 font-semibold" data-i18n="destinos" data-i18n-ns="header">Destinos</span>
                <div class="flex flex-col gap-3 pl-3 border-l-2 border-outline-variant/10">
                    <a id="mobile-nav-egipto" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=egipto" data-i18n="egipto" data-i18n-ns="header">Egipto</a>
                    <a id="mobile-nav-jordania" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=jordania" data-i18n="jordania" data-i18n-ns="header">Jordania</a>
                    <a id="mobile-nav-grecia" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=grecia" data-i18n="grecia" data-i18n-ns="header">Grecia</a>
                    <a id="mobile-nav-turquia" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=turquia" data-i18n="turquia" data-i18n-ns="header">Turquía</a>
                </div>
                <a id="mobile-nav-nosotros" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary border-t border-outline-variant/10 pt-4" href="conocenos.html" data-i18n="conocenos" data-i18n-ns="header">Conócenos</a>
            </nav>
        </div>
    </div>
    `;

    // ── Active link highlight ──────────────────────────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const destId = params.get('id');
    if (destId) {
        const idLower = destId.toLowerCase();
        const activeLink = document.getElementById(`nav-${idLower}`);
        const mobileActiveLink = document.getElementById(`mobile-nav-${idLower}`);
        
        if (activeLink) {
            activeLink.classList.remove('text-on-surface-variant');
            activeLink.classList.add('text-primary', 'font-bold');
            
            const destinosBtn = document.getElementById('nav-destinos');
            if (destinosBtn) {
                destinosBtn.classList.remove('text-on-surface-variant');
                destinosBtn.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-secondary', 'pb-1');
            }
        }
        if (mobileActiveLink) {
            mobileActiveLink.classList.remove('text-on-surface-variant');
            mobileActiveLink.classList.add('text-secondary', 'font-bold');
        }
    } else {
        const pathname = window.location.pathname;
        if (
            pathname.includes('conocenos.html') || 
            pathname.includes('conocenos.html') ||
            pathname.includes('conoceme.html') || 
            pathname.includes('egipto-magico.html') || 
            pathname.includes('turquia.html') || 
            pathname.includes('viajar-en-grupo.html')
        ) {
            const navNosotros = document.getElementById('nav-nav-nosotros') || document.getElementById('nav-nosotros');
            const mobileNavNosotros = document.getElementById('mobile-nav-nosotros');
            if (navNosotros) {
                navNosotros.classList.remove('text-on-surface-variant');
                navNosotros.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-secondary', 'pb-1');
            }
            if (mobileNavNosotros) {
                mobileNavNosotros.classList.remove('text-on-surface-variant');
                mobileNavNosotros.classList.add('text-secondary', 'font-bold');
            }
        }
    }

    // ── Mobile Drawer ────────────────────────────────────────────────────────
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('mobile-drawer');
    const drawerContent = document.getElementById('mobile-drawer-content');

    const openDrawer = () => {
        drawer.classList.remove('hidden');
        setTimeout(() => {
            drawer.classList.add('opacity-100');
            drawerContent.classList.remove('translate-x-full');
        }, 10);
    };

    const closeDrawer = () => {
        drawerContent.classList.add('translate-x-full');
        drawer.classList.remove('opacity-100');
        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 300);
    };

    if (menuBtn && closeBtn && drawer && drawerContent) {
        menuBtn.addEventListener('click', openDrawer);
        closeBtn.addEventListener('click', closeDrawer);
        drawer.addEventListener('click', (e) => {
            if (e.target === drawer) closeDrawer();
        });
    }

    // ── Language toggle buttons ───────────────────────────────────────────────
    // Use a slight delay to allow i18n to initialize first
    function wireLanguageButtons() {
        const btnEs = document.getElementById('lang-es');
        const btnEn = document.getElementById('lang-en');
        if (!btnEs || !btnEn) return;

        // Determine page namespace from body data attribute (set per-page)
        const getPageNs = () => document.body.getAttribute('data-page-ns') || 'home';

        btnEs.addEventListener('click', () => {
            if (window.i18n) window.i18n.setLanguage('es', getPageNs());
        });
        btnEn.addEventListener('click', () => {
            if (window.i18n) window.i18n.setLanguage('en', getPageNs());
        });
    }

    wireLanguageButtons();

    // ── Header Scroll Behavior ───────────────────────────────────────────────
    const mainHeaderNav = document.getElementById('main-header-nav');
    if (mainHeaderNav) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                mainHeaderNav.classList.remove('bg-transparent', 'border-transparent');
                mainHeaderNav.classList.add('bg-white/90', 'backdrop-blur-xl', 'shadow-sm', 'border-b', 'border-outline-variant/10');
            } else {
                mainHeaderNav.classList.add('bg-transparent', 'border-transparent');
                mainHeaderNav.classList.remove('bg-white/90', 'backdrop-blur-xl', 'shadow-sm', 'border-b', 'border-outline-variant/10');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial scroll position
    }
});

// Modal Global Logic
window.openContactModal = function(tripType = null, tripTitle = null, date = null) {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    // Lógica para predefinir destinos basados en la URL o contexto
    const urlParams = new URLSearchParams(window.location.search);
    const destId = urlParams.get('id');
    const path = window.location.pathname.toLowerCase();
    
    const checkboxes = modal.querySelectorAll('input[name="destino"]');
    if (checkboxes.length > 0) {
        checkboxes.forEach(cb => cb.checked = false); // Reset all first
        
        const titleText = tripTitle || document.title;
        const textToSearch = [
            destId,
            path,
            titleText
        ].filter(Boolean).map(s => s.toLowerCase()).join(' ');

        checkboxes.forEach(cb => {
            const val = cb.value.toLowerCase();
            // Para 'Turquía', ignorar tildes al comparar
            const valNorm = val.replace('í', 'i');
            if (textToSearch.includes(val) || textToSearch.includes(valNorm)) {
                cb.checked = true;
            }
        });
        
        // Llenado inteligente del mensaje según el contexto
        const msgField = modal.querySelector('textarea[name="message"]');
        if (msgField) {
            let msg = '';
            const finalTitle = tripTitle || (document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : null);
            
            if (tripType === 'group' && finalTitle) {
                msg = `Hola, quiero reservar mi cupo para la salida grupal de ${finalTitle} en la fecha: ${date || 'pronto'}.\n\nPor favor contáctenme para continuar con la reserva.`;
            } else if (tripType === 'custom' && finalTitle) {
                msg = `Hola, me interesa armar mi viaje a medida basado en el itinerario: ${finalTitle}.\n\nMis fechas ideales son: \n\nQuedo a la espera de su respuesta.`;
            } else if (path.includes('viaje.html') && finalTitle) {
                msg = `Hola, estoy interesado en el itinerario: ${finalTitle}.\n\nMe gustaría recibir más información.`;
            }
            if (msg) msgField.value = msg;
        }
    }

    modal.classList.remove('hidden');
    // trigger reflow
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    modal.querySelector('div').classList.remove('scale-95');
    modal.querySelector('div').classList.add('scale-100');
};

window.closeContactModal = function() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        const form = document.getElementById('modalContactForm');
        if (form) form.reset();
    }, 300);
};

// Event delegation for the dynamically loaded form
document.addEventListener('submit', async (e) => {
    if (e.target && e.target.id === 'modalContactForm') {
        e.preventDefault();
        
        const form = e.target;
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = btn.innerHTML;
        
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
        
        const checkedDestinations = Array.from(form.querySelectorAll('input[name="destino"]:checked')).map(cb => cb.value);
        const destinationsStr = checkedDestinations.length > 0 ? checkedDestinations.join(', ') : 'No especificado';
        
        const finalMessage = `Mensaje del cliente:\n${message}\n\nDestinos de interés: ${destinationsStr}`;
        
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Enviando...';
        btn.disabled = true;
        btn.classList.add('opacity-70');
        
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message: finalMessage, destinations: checkedDestinations })
            });
            
            if (!response.ok) throw new Error('Error en el servidor');
            
            btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Solicitud Enviada';
            btn.classList.remove('bg-primary');
            btn.classList.add('bg-green-600');
            
            setTimeout(() => {
                closeContactModal();
                setTimeout(() => {
                    btn.innerHTML = originalBtnHtml;
                    btn.classList.remove('bg-green-600', 'opacity-70');
                    btn.classList.add('bg-primary');
                    btn.disabled = false;
                }, 300);
            }, 2500);
            
        } catch (err) {
            console.error('Error enviando contacto:', err);
            alert('Ocurrió un error al enviar tu solicitud. Por favor intenta de nuevo.');
            btn.innerHTML = originalBtnHtml;
            btn.classList.remove('opacity-70');
            btn.disabled = false;
        }
    }
});
