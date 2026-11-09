import { useEffect, useRef } from 'react'

export default function HomePage({ navigate }) {
    const mainRef = useRef(null)

    useEffect(() => {
        // --- Smooth Scroll e Indicador Navegación Activa Optimizado (Cero Layout Thrashing) ---
        const navLinks = Array.from(document.querySelectorAll('.nav-link'))
        const sections = Array.from(document.querySelectorAll('section[id]'))

        let cachedOffsets = []
        function computeOffsets() {
            cachedOffsets = sections.map(section => ({
                id: section.getAttribute('id'),
                top: section.offsetTop - 120,
                bottom: section.offsetTop - 120 + section.offsetHeight
            }))
        }
        computeOffsets()

        let isTicking = false
        function highlightActiveNavLink() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop
            let currentId = ''

            for (let i = 0; i < cachedOffsets.length; i++) {
                const { id, top, bottom } = cachedOffsets[i]
                if (scrollY >= top && scrollY < bottom) {
                    currentId = id
                    break
                }
            }

            if (currentId) {
                navLinks.forEach(link => {
                    const match = link.getAttribute('href') === `#${currentId}`
                    link.classList.toggle('active', match)
                })
            }
        }

        function onScroll() {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    highlightActiveNavLink()
                    isTicking = false
                })
                isTicking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', computeOffsets, { passive: true })

        // --- Animación de Entrada Suave (Intersection Observer con aceleración por GPU) ---
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const animateElements = document.querySelectorAll('.glass-card, .section-header')

        let animateObserver = null
        if (prefersReducedMotion) {
            animateElements.forEach(el => {
                el.style.opacity = '1'
                el.style.transform = 'none'
            })
        } else {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }

            animateObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1'
                        entry.target.style.transform = 'translateY(0)'
                        observer.unobserve(entry.target)
                    }
                })
            }, observerOptions)

            animateElements.forEach(el => {
                el.style.opacity = '0'
                el.style.transform = 'translateY(25px)'
                el.style.willChange = 'opacity, transform'
                el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                animateObserver.observe(el)
            })
        }

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', computeOffsets)
            if (animateObserver) animateObserver.disconnect()
        }
    }, [])

    const handleProjectClick = (e, path) => {
        e.preventDefault()
        navigate(path)
    }

    return (
        <main ref={mainRef}>
            {/* Hero Section */}
            <section className="hero-section text-center" id="hero">
                <div className="container hero-container">
                    <div className="hero-avatar-wrapper">
                        <div className="avatar-glow-ring">
                            <img
                                src="/images/imagen_icon.jpeg"
                                alt="Vicente Avatar"
                                width="125"
                                height="125"
                                loading="eager"
                                fetchPriority="high"
                                decoding="sync"
                                style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="hero-content">
                        <div className="status-badge">
                            <span className="pulse-dot"></span> Disponible para proyectos
                        </div>

                        <h1 className="hero-title">
                            ¡Hey! Soy Vicente
                        </h1>
                        <h2 className="gradient-text hero-subtitle">Técnico de Nivel Superior Analista Programador</h2>

                        <p className="hero-description">
                            Especializado en crear aplicaciones web dinámicas, mecánicas de juegos interactivos y
                            soluciones de hardware inteligente integrando microcontroladores y APIs en tiempo real.
                        </p>

                        <div className="hero-cta-group">
                            <a href="#proyectos" className="btn btn-primary btn-lg pulse-btn">
                                <i className="fa-solid fa-rocket"></i> Ver Proyectos
                            </a>
                            <a href="#contacto" className="btn btn-outline btn-lg">
                                <i className="fa-solid fa-envelope"></i> Contactar
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sobre mí Section */}
            <section id="about" className="about-section section text-center">
                <div className="container">
                    <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Sobre mí</h2>

                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            &quot;Soy Desarrollador enfocado en construir desde sistemas web y APIs hasta mecanismos físicos con IoT y videojuegos interactivos. Disfruto transformar ideas abstractas en código funcional, explorando siempre la frontera entre el software y el hardware.&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Proyectos Principales Section */}
            <section className="section" id="proyectos">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">💻 Proyectos Destacados</h2>
                        <p className="section-subtitle">Explora los sistemas, juegos y desarrollos de hardware creados</p>
                    </div>

                    <div className="projects-grid">
                        {/* Proyecto 1: Terapeutas Chile */}
                        <article
                            className="project-card glass-card text-center"
                            id="card-terapeutas-chile"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleProjectClick(e, '/proyecto-terapeutas')}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver detalles del proyecto Terapeutas Chile"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectClick(e, '/proyecto-terapeutas') }}
                        >
                            <div className="project-header">
                                <span className="project-badge badge-purple"><i className="fa-solid fa-user-doctor"></i> Gestión Clínica</span>
                                <div className="project-icon"><i className="fa-solid fa-notes-medical"></i></div>
                            </div>
                            <h3 className="project-title">Terapeutas Chile</h3>
                            <p className="project-desc">
                                Plataforma orientada a la digitalización de procesos y gestión de registros médicos.
                            </p>
                            <div className="project-techs">
                                <span className="tech-tag">Interfaz Funcional</span>
                                <span className="tech-tag">Maquetación Adaptativa</span>
                                <span className="tech-tag">Gestión Clínica</span>
                                <span className="tech-tag">Organización de Datos</span>
                            </div>
                            <div className="project-footer">
                                <a
                                    href="/proyecto-terapeutas"
                                    className="project-link"
                                    onClick={(e) => handleProjectClick(e, '/proyecto-terapeutas')}
                                >
                                    <i className="fa-solid fa-laptop-code"></i> Ver Detalles <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </article>

                        {/* Proyecto 2: Sistemas de Gestión Web */}
                        <article
                            className="project-card glass-card text-center"
                            id="card-dulceria-erp"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleProjectClick(e, '/proyecto-dulceria')}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver detalles del proyecto Sistema de Gestión Web (Dulcería)"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectClick(e, '/proyecto-dulceria') }}
                        >
                            <div className="project-header">
                                <span className="project-badge badge-cyan"><i className="fa-solid fa-store"></i> Web Systems</span>
                                <div className="project-icon"><i className="fa-solid fa-cash-register"></i></div>
                            </div>
                            <h3 className="project-title">Sistema de Gestión Web (Dulcería)</h3>
                            <p className="project-desc">
                                Sistema integral para administración de negocios y punto de venta. Incluye control de
                                inventarios, registro de ventas en tiempo real, interfaz responsiva con Bootstrap y base de
                                datos ligera SQLite.
                            </p>
                            <div className="project-techs">
                                <span className="tech-tag">Bootstrap 5</span>
                                <span className="tech-tag">SQLite</span>
                                <span className="tech-tag">JavaScript</span>
                                <span className="tech-tag">HTML5/CSS3</span>
                            </div>
                            <div className="project-footer">
                                <a href="/proyecto-dulceria" className="project-link" onClick={(e) => handleProjectClick(e, '/proyecto-dulceria')}>
                                    <i className="fa-solid fa-laptop-code"></i> Ver Detalles <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </article>

                        {/* Proyecto 3: Auditoría de Seguridad y Pentesting */}
                        <article
                            className="project-card glass-card text-center"
                            id="card-security-audit"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => handleProjectClick(e, '/proyecto-seguridad')}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver detalles del proyecto Auditoría de Seguridad y Pentesting"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProjectClick(e, '/proyecto-seguridad') }}
                        >
                            <div className="project-header">
                                <span className="project-badge badge-green"><i className="fa-solid fa-shield-halved"></i> Ciberseguridad</span>
                                <div className="project-icon"><i className="fa-solid fa-user-secret"></i></div>
                            </div>
                            <h3 className="project-title">Auditoría de Seguridad y Pentesting</h3>
                            <p className="project-desc">
                                Experiencia práctica en entornos controlados utilizando máquinas virtuales, Kali Linux y
                                diversas herramientas de pentesting. Enfocado en la explotación de vulnerabilidades,
                                aplicación de normativas OWASP e ISO 27000, y generación de informes técnicos basados
                                en los resultados de las pruebas.
                            </p>
                            <div className="project-techs">
                                <span className="tech-tag">Kali Linux</span>
                                <span className="tech-tag">OWASP</span>
                                <span className="tech-tag">ISO 27000</span>
                                <span className="tech-tag">Pentesting</span>
                            </div>
                            <div className="project-footer">
                                <a href="/proyecto-seguridad" className="project-link" onClick={(e) => handleProjectClick(e, '/proyecto-seguridad')}>
                                    <i className="fa-solid fa-shield-halved"></i> Ver Detalles <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* Habilidades Técnicas Section */}
            <section className="section" id="habilidades">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">⚡ Habilidades Técnicas</h2>
                        <p className="section-subtitle">
                            Tecnologías, herramientas y entornos de desarrollo con los que trabajo
                        </p>
                    </div>

                    <div className="skills-categories">
                        {/* Categoría 1: Front end */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-desktop"></i> Front end</h3>
                            <div className="skill-tags">
                                <span className="stack-item" data-tech="html"><i className="fa-brands fa-html5 stack-item-icon"></i> HTML</span>
                                <span className="stack-item" data-tech="css"><i className="fa-brands fa-css3-alt stack-item-icon"></i> CSS</span>
                                <span className="stack-item" data-tech="javascript"><i className="fa-brands fa-js stack-item-icon"></i> JavaScript</span>
                                <span className="stack-item" data-tech="figma"><i className="fa-brands fa-figma stack-item-icon"></i> Figma</span>
                                <span className="stack-item" data-tech="react"><i className="fa-brands fa-react stack-item-icon"></i> React</span>
                            </div>
                        </div>

                        {/* Categoría 2: Backend */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-server"></i> Backend</h3>
                            <div className="skill-tags">
                                <span className="stack-item" data-tech="php"><i className="fa-brands fa-php stack-item-icon"></i> PHP</span>
                                <span className="stack-item" data-tech="node"><i className="fa-brands fa-node-js stack-item-icon"></i> Node.js</span>
                                <span className="stack-item" data-tech="mysql"><i className="devicon-mysql-plain colored stack-item-icon"></i> MySQL</span>
                                <span className="stack-item" data-tech="mariadb"><i className="devicon-mariadb-plain colored stack-item-icon"></i> MariaDB</span>
                                <span className="stack-item" data-tech="mongodb"><i className="devicon-mongodb-plain colored stack-item-icon"></i> MongoDB</span>
                                <span className="stack-item" data-tech="nginx"><i className="devicon-nginx-original colored stack-item-icon"></i> Nginx</span>
                                <span className="stack-item" data-tech="wampp"><i className="fa-solid fa-server stack-item-icon"></i> WAMPP</span>
                            </div>
                        </div>

                        {/* Categoría 3: Herramientas */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-wrench"></i> Herramientas</h3>
                            <div className="skill-tags">
                                <span className="stack-item" data-tech="git"><i className="fa-brands fa-git-alt stack-item-icon"></i> Git</span>
                                <span className="stack-item" data-tech="github"><i className="fa-brands fa-github stack-item-icon"></i> GitHub</span>
                                <span className="stack-item" data-tech="terminal"><i className="fa-solid fa-terminal stack-item-icon"></i> Terminal</span>
                                <span className="stack-item" data-tech="vscode"><i className="devicon-vscode-plain colored stack-item-icon"></i> VSCode</span>
                                <span className="stack-item" data-tech="antigravity"><i className="fa-solid fa-atom stack-item-icon"></i> Antigravity</span>
                                <span className="stack-item" data-tech="aws"><i className="fa-brands fa-aws stack-item-icon"></i> AWS services</span>
                            </div>
                        </div>

                        {/* Categoría 4: Aprendiendo */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-graduation-cap"></i> Aprendiendo</h3>
                            <div className="skill-tags">
                                <span className="stack-item" data-tech="python"><i className="fa-brands fa-python stack-item-icon"></i> Python</span>
                                <span className="stack-item" data-tech="javascript"><i className="fa-brands fa-js stack-item-icon"></i> JavaScript</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contacto Section */}
            <section className="section" id="contacto">
                <div className="container text-center">
                    <div className="contact-box glass-card">
                        <div className="contact-icon-header">
                            <i className="fa-solid fa-paper-plane"></i>
                        </div>
                        <h2 className="section-title">📬 ¿Hablamos de un proyecto?</h2>
                        <p className="contact-text">
                            Estoy disponible para colaborar en proyectos de desarrollo web, software o
                            servicios de Soporte Técnico.
                        </p>
                        <div className="social-links">
                            <a href="https://github.com/visho0" target="_blank" rel="noopener" className="social-btn">
                                <i className="devicon-github-original"></i> GitHub
                            </a>
                            <a href="mailto:vicho.duran.205@gmail.com" className="social-btn btn-highlight">
                                <i className="fa-solid fa-envelope"></i> Enviar Mensaje
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
