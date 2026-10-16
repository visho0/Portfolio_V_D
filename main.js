/* ==========================================================================
   PORTAFOLIO PROFESIONAL - MAIN.JS
   Lógica de Navegación, Animaciones y Dinámicas Interactivas
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll e Indicador Navegación Activa ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    // --- Animación de Entrada Suave (Intersection Observer) ---
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

    // Aplicar animación a las tarjetas y secciones
    const animateElements = document.querySelectorAll('.glass-card, .section-header');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        animateObserver.observe(el);
    });

    // --- Lógica Modular de Modales Accesibles (Vanilla JS) ---
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

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeModal();
            }
        });
    }

    setupModal('card-terapeutas-chile', 'modal-terapeutas');
    setupModal('card-security-audit', 'modal-security');
});
