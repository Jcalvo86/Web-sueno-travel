// Funciones Globales
window.generateSlug = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remover acentos
        .replace(/[^a-z0-9 -]/g, '') // remover caracteres inválidos
        .replace(/\s+/g, '-') // colapsar espacios a guiones
        .replace(/-+/g, '-') // colapsar guiones múltiples
        .replace(/^-+/, '') // recortar del inicio
        .replace(/-+$/, ''); // recortar del final
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      menuToggle.innerHTML = isExpanded ? '✕' : '☰';
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        const answer = otherItem.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = null;
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // 3. Highlight Active Page Link
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll('.nav-links a');
  
  navAnchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  });

  // 4. Form Submission Interaction (Egipto a Medida)
  const customTripForm = document.getElementById('customTripForm');
  if (customTripForm) {
    customTripForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('nombre')?.value;
      const email = document.getElementById('email')?.value;
      const message = "Me interesa armar un viaje a medida a Egipto.";
      
      if (!name || !email) {
        alert('Por favor, rellena los campos requeridos (Nombre y Correo Electrónico).');
        return;
      }

      const btn = customTripForm.querySelector('button[type="submit"]') || customTripForm.querySelector('button');
      const originalBtnContent = btn ? btn.innerHTML : 'Enviar';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Enviando...';
      }

      try {
        const response = await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message, destinations: ['Egipto'] })
        });

        if (!response.ok) {
          throw new Error('Error al enviar.');
        }

        const container = customTripForm.parentElement;
        if (container) {
          container.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px 20px; animation: fadeInUp 0.6s ease-out;">
              <div style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;">✓</div>
              <h2 style="font-family: var(--font-headings); font-size: 2rem; color: var(--text-dark); margin-bottom: 16px;">¡Solicitud Recibida!</h2>
              <p style="color: var(--text-gray); font-size: 1.1rem; max-width: 500px; margin: 0 auto 30px auto;">
                Gracias, <strong>${name}</strong>. Hemos recibido tu solicitud para armar tu viaje a medida a Egipto. Uno de nuestros expertos en destinos se pondrá en contacto contigo en las próximas 24 horas en <strong>${email}</strong>.
              </p>
              <a href="index.html" class="btn btn-primary">Volver al Inicio</a>
            </div>
          `;
        }
      } catch (err) {
        alert('Ocurrió un error al enviar tu solicitud. Por favor, intenta de nuevo o escríbenos directamente.');
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = originalBtnContent;
        }
      }
    });
  }

  // 5. Scroll Reveal — Intersection Observer
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate only once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately for older browsers
    revealEls.forEach(el => el.classList.add('visible'));
  }
});
