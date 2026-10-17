/* ==========================================================================
   PORTAFOLIO PROFESIONAL - MAIN.JS (OPTIMIZADO)
   Lógica de Navegación, Animaciones y Modales Accesibles
   Optimizaciones: Cero Layout Thrashing (RAF + Caching), Listeners Pasivos,
   IntersectionObserver Acelerado por GPU y Compatibilidad Total con Matter.js.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 1. Smooth Scroll e Indicador de Navegación Activa (Zero Layout Thrashing) ---
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = Array.from(document.querySelectorAll('section[id]'));

    // Cachear las posiciones verticales de las secciones para no forzar reflows en scroll
    let cachedSections = [];

    function updateSectionOffsets() {
        cachedSections = sections.map(section => {
            const top = section.offsetTop - 120;
            return {
                id: section.getAttribute('id'),
                top: top,
                bottom: top + section.offsetHeight
            };
        });
    }

    // Calcular al inicio y refrescar únicamente cuando la ventana cambie de tamaño
    updateSectionOffsets();
    window.addEventListener('resize', updateSectionOffsets, { passive: true });

    let isScrollTicking = false;

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        let currentSectionId = '';

        for (let i = 0; i < cachedSections.length; i++) {
            const { id, top, bottom } = cachedSections[i];
            if (scrollY >= top && scrollY < bottom) {
                currentSectionId = id;
                break;
            }
        }

        if (currentSectionId) {
            navLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${currentSectionId}`;
                link.classList.toggle('active', isActive);
            });
        }
    }

    // Scroll listener no bloqueante sincronizado a 60/120 FPS con requestAnimationFrame
    function onScrollThrottled() {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                highlightActiveNavLink();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }

    window.addEventListener('scroll', onScrollThrottled, { passive: true });


    // --- 2. Animación de Entrada Suave (Intersection Observer con aceleración por GPU) ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animateElements = document.querySelectorAll('.glass-card, .section-header');

    if (prefersReducedMotion) {
        // En dispositivos con reducción de movimiento activada, mostramos el contenido de inmediato
        animateElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    } else if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.willChange = 'opacity, transform';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            animateObserver.observe(el);
        });
    }


    // --- 3. Lógica Modular y Eficiente de Modales Accesibles ---
    function setupModal(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        if (!trigger || !modal) return;

        const openBtn = trigger.querySelector('.project-link') || trigger;
        const closeButtons = modal.querySelectorAll('.modal-close-button, .modal-footer-section .btn');

        function openModal(e) {
            if (e) e.preventDefault();
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        trigger.addEventListener('click', openModal);
        if (openBtn !== trigger) {
            openBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(e);
            });
        }

        closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeModal();
            }
        });
    }

    setupModal('card-terapeutas-chile', 'modal-terapeutas');
    setupModal('card-security-audit', 'modal-security');

    // Listener único y centralizado para la tecla Escape (evita listeners redundantes)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.project-modal.is-active');
            if (activeModal) {
                activeModal.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        }
    });
});
