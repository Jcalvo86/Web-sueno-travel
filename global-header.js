document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('global-header');
    if (!headerContainer) return;

    // Inject Navigation Header HTML
    headerContainer.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 bg-white/80 backdrop-blur-xl shadow-sm border-b border-outline-variant/10">
        <div class="flex items-center gap-3">
            <a href="inicio.html" class="flex items-center gap-3">
                <img alt="Sueño Travel Logo" class="h-10 w-auto" src="Imagenes/logo_suenoTravel Chile.svg"/>
            </a>
        </div>
        <nav class="hidden md:flex gap-8 items-center">
            <!-- Dropdown Destinos -->
            <div class="relative group">
                <button id="nav-destinos" class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 focus:outline-none">
                    Destinos
                    <span class="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                </button>
                <div class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white shadow-lg border border-outline-variant/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-2">
                    <a id="nav-egipto" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=egipto">Egipto</a>
                    <a id="nav-jordania" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=jordania">Jordania</a>
                    <a id="nav-grecia" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=grecia">Grecia</a>
                    <a id="nav-turquia" class="block px-4 py-2 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-colors" href="destino.html?id=turquia">Turquía</a>
                </div>
            </div>
            <a id="nav-nosotros" class="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors" href="sobre-nosotros.html">Sobre Nosotros</a>
        </nav>
        <div class="flex items-center gap-4">
            <a href="inicio.html#contacto" class="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-md uppercase tracking-wider scale-95 active:scale-90 transition-transform hover:bg-primary/95 text-xs md:text-sm font-bold">
                Contactar
            </a>
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden text-primary p-2 focus:outline-none" aria-label="Abrir Menú">
                <span class="material-symbols-outlined text-3xl">menu</span>
            </button>
        </div>
    </header>

    <!-- Mobile Drawer Navigation -->
    <div id="mobile-drawer" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[999] hidden transition-opacity duration-300">
        <div class="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl p-8 flex flex-col gap-6 transform translate-x-full transition-transform duration-300 ease-in-out" id="mobile-drawer-content">
            <div class="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                <span class="font-display-lg text-lg font-black text-primary">Navegación</span>
                <button id="close-drawer-btn" class="text-primary p-1 focus:outline-none">
                    <span class="material-symbols-outlined text-2xl">close</span>
                </button>
            </div>
            <nav class="flex flex-col gap-4">
                <span class="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant/60 font-semibold">Destinos</span>
                <div class="flex flex-col gap-3 pl-3 border-l-2 border-outline-variant/10">
                    <a id="mobile-nav-egipto" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=egipto">Egipto</a>
                    <a id="mobile-nav-jordania" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=jordania">Jordania</a>
                    <a id="mobile-nav-grecia" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=grecia">Grecia</a>
                    <a id="mobile-nav-turquia" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary pb-1" href="destino.html?id=turquia">Turquía</a>
                </div>
                <a id="mobile-nav-nosotros" class="font-label-md text-base uppercase tracking-wider text-on-surface-variant hover:text-primary border-t border-outline-variant/10 pt-4" href="sobre-nosotros.html">Sobre Nosotros</a>
            </nav>
        </div>
    </div>
    `;

    // Highlight Active Link
    const params = new URLSearchParams(window.location.search);
    const destId = params.get('id');
    if (destId) {
        const idLower = destId.toLowerCase();
        const activeLink = document.getElementById(`nav-${idLower}`);
        const mobileActiveLink = document.getElementById(`mobile-nav-${idLower}`);
        
        if (activeLink) {
            activeLink.classList.remove('text-on-surface-variant');
            activeLink.classList.add('text-primary', 'font-bold');
            
            // Highlight Destinos parent button
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
        if (pathname.includes('sobre-nosotros.html')) {
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

    // Mobile Drawer Interactions
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
});
