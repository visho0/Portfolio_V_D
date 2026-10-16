import { useEffect, useRef, useState, useCallback } from 'react'

export default function HomePage({ navigate }) {
    const mainRef = useRef(null)
    const [isTerapeutasModalOpen, setIsTerapeutasModalOpen] = useState(false)

    const openTerapeutasModal = useCallback((e) => {
        e.preventDefault()
        setIsTerapeutasModalOpen(true)
    }, [])

    const closeTerapeutasModal = useCallback(() => {
        setIsTerapeutasModalOpen(false)
    }, [])

    // Lock body scroll & handle Escape key when modal is open
    useEffect(() => {
        if (isTerapeutasModalOpen) {
            document.body.style.overflow = 'hidden'
            const handleEsc = (e) => {
                if (e.key === 'Escape') closeTerapeutasModal()
            }
            window.addEventListener('keydown', handleEsc)
            return () => {
                document.body.style.overflow = ''
                window.removeEventListener('keydown', handleEsc)
            }
        } else {
            document.body.style.overflow = ''
        }
    }, [isTerapeutasModalOpen, closeTerapeutasModal])

    useEffect(() => {
        // --- Smooth Scroll e Indicador Navegación Activa ---
        const navLinks = document.querySelectorAll('.nav-link')
        const sections = document.querySelectorAll('section[id]')

        function highlightActiveNavLink() {
            const scrollY = window.pageYOffset

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight
                const sectionTop = section.offsetTop - 120
                const sectionId = section.getAttribute('id')

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active')
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active')
                        }
                    })
                }
            })
        }

        window.addEventListener('scroll', highlightActiveNavLink)

        // --- Animación de Entrada Suave (Intersection Observer) ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }

        const animateObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0)'
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)

        const animateElements = document.querySelectorAll('.glass-card, .section-header')
        animateElements.forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(25px)'
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            animateObserver.observe(el)
        })

        return () => {
            window.removeEventListener('scroll', highlightActiveNavLink)
            animateObserver.disconnect()
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
                            <img src="/images/image.png" alt="Vicente Avatar" style={{ width: '125px', height: '125px', borderRadius: '50%', objectFit: 'cover' }} />
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
                        <img src="/images/image.png" alt="Vicente Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            &quot;Desarrollador enfocado en construir desde sistemas web y APIs hasta mecanismos físicos con IoT y videojuegos interactivos. Disfruto transformar ideas abstractas en código funcional, explorando siempre la frontera entre el software y el hardware.&quot;
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
                            onClick={openTerapeutasModal}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver detalles del proyecto Terapeutas Chile"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openTerapeutasModal(e) }}
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
                                <a href="#" className="project-link" onClick={openTerapeutasModal}>
                                    <i className="fa-solid fa-laptop-code"></i> Ver Detalles <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </article>

                        {/* ===== MODAL: Terapeutas Chile ===== */}
                        <div
                            className={`project-modal${isTerapeutasModalOpen ? ' is-active' : ''}`}
                            id="modal-terapeutas"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-terapeutas-title"
                            onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('modal-overlay')) closeTerapeutasModal() }}
                        >
                            <div className="modal-overlay" onClick={closeTerapeutasModal}></div>
                            <div className="modal-dialog-wrapper">
                                <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
                                    {/* Botón cerrar */}
                                    <button
                                        className="modal-close-button"
                                        onClick={closeTerapeutasModal}
                                        aria-label="Cerrar modal"
                                        title="Cerrar"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    {/* Encabezado del modal */}
                                    <div className="modal-header-section">
                                        <div className="modal-badges-row">
                                            <span className="modal-pill-tag">
                                                <i className="fa-solid fa-user-doctor"></i> Gestión Clínica
                                            </span>
                                            <span className="modal-pill-tag" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
                                                <i className="fa-solid fa-notes-medical"></i> Registros Médicos
                                            </span>
                                        </div>
                                        <h2 className="modal-project-title" id="modal-terapeutas-title">Terapeutas Chile</h2>
                                        <p className="modal-project-subtitle">Plataforma de Registros Médicos y Gestión Clínica</p>
                                        <div className="modal-project-focus">
                                            <i className="fa-solid fa-crosshairs"></i>
                                            <strong>Enfoque:</strong> Interfaz funcional, maquetación adaptativa y organización de datos para la gestión clínica.
                                        </div>
                                    </div>

                                    {/* Sección 1: Rol y Descripción */}
                                    <div className="modal-section-block">
                                        <div className="modal-block-title">
                                            <span className="block-number">1</span>
                                            <h3>Descripción del Proyecto</h3>
                                        </div>
                                        <div className="modal-role-card">
                                            <div className="role-badge-pill">
                                                <i className="fa-solid fa-laptop-medical"></i> Plataforma Clínica Digital
                                            </div>
                                            <p className="role-description">
                                                Sistema orientado a la digitalización y organización de procesos clínicos en Chile.
                                                La plataforma permite el registro, consulta y administración de fichas médicas de pacientes,
                                                facilitando el trabajo de terapeutas y profesionales de salud con una interfaz clara,
                                                funcional y completamente adaptativa a múltiples dispositivos.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sección 2: Funcionalidades Principales */}
                                    <div className="modal-section-block">
                                        <div className="modal-block-title">
                                            <span className="block-number">2</span>
                                            <h3>Funcionalidades Principales</h3>
                                        </div>
                                        <p className="modal-lead-text">
                                            Módulos diseñados para cubrir las necesidades de gestión clínica:
                                        </p>
                                        <div className="modules-grid">
                                            <div className="module-card">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-file-medical"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Fichas de Pacientes</p>
                                                    <p className="module-desc">Registro estructurado de datos personales, historial médico y notas de sesión.</p>
                                                </div>
                                            </div>
                                            <div className="module-card">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-calendar-check"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Agenda y Citas</p>
                                                    <p className="module-desc">Organización de horarios, control de citas programadas y disponibilidad de profesionales.</p>
                                                </div>
                                            </div>
                                            <div className="module-card module-card-highlight">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-table-columns"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Maquetación Adaptativa</p>
                                                    <p className="module-desc">Diseño responsive que se ajusta a escritorio, tablet y móvil para uso en consulta.</p>
                                                </div>
                                            </div>
                                            <div className="module-card module-card-highlight">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-database"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Organización de Datos</p>
                                                    <p className="module-desc">Estructura lógica para consultar, filtrar y gestionar registros clínicos de forma eficiente.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección 3: Tecnologías */}
                                    <div className="modal-section-block">
                                        <div className="modal-block-title">
                                            <span className="block-number">3</span>
                                            <h3>Stack Tecnológico</h3>
                                        </div>
                                        <div className="tech-chips-list">
                                            <span className="tech-chip">
                                                <i className="devicon-html5-plain colored"></i> HTML5
                                            </span>
                                            <span className="tech-chip">
                                                <i className="devicon-css3-plain colored"></i> CSS3
                                            </span>
                                            <span className="tech-chip">
                                                <i className="devicon-javascript-plain colored"></i> JavaScript Vanilla
                                            </span>
                                        </div>
                                    </div>

                                    {/* Pie del modal */}
                                    <div className="modal-footer-section">
                                        <button className="btn btn-outline" onClick={closeTerapeutasModal}>
                                            <i className="fa-solid fa-xmark"></i> Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proyecto 2: Sistemas de Gestión Web */}
                        <article className="project-card glass-card text-center" id="card-dulceria-erp">
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

                        {/* Proyecto 3: Control de Acceso IoT */}
                        <article className="project-card glass-card text-center">
                            <div className="project-header">
                                <span className="project-badge badge-green"><i className="fa-solid fa-microchip"></i> IoT &amp; Hardware</span>
                                <div className="project-icon"><i className="fa-solid fa-lock"></i></div>
                            </div>
                            <h3 className="project-title">Control de Acceso RFID IoT</h3>
                            <p className="project-desc">
                                Sistema embebido de seguridad y validación de usuarios mediante tarjetas RFID. Desarrollado
                                en C++ sobre ESP8266, comunicándose con servicios web y accionando servomotores mecánicos
                                para apertura de barreras.
                            </p>
                            <div className="project-techs">
                                <span className="tech-tag">C++</span>
                                <span className="tech-tag">ESP8266</span>
                                <span className="tech-tag">RFID RC522</span>
                                <span className="tech-tag">Servomotores</span>
                            </div>
                            <div className="project-footer">
                                <a href="#" className="project-link">
                                    <i className="fa-solid fa-microchip"></i> Diagrama &amp; Código <i className="fa-solid fa-chevron-right"></i>
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
                                <span className="skill-chip"><i className="devicon-html5-plain colored"></i> HTML</span>
                                <span className="skill-chip"><i className="devicon-css3-plain colored"></i> CSS</span>
                                <span className="skill-chip"><i className="devicon-javascript-plain colored"></i> JavaScript</span>
                                <span className="skill-chip"><i className="devicon-figma-plain colored"></i> Figma</span>
                                <span className="skill-chip chip-cyan"><i className="devicon-react-original colored"></i> ReactJS</span>
                            </div>
                        </div>

                        {/* Categoría 2: Backend */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-server"></i> Backend</h3>
                            <div className="skill-tags">
                                <span className="skill-chip chip-purple"><i className="devicon-php-plain colored"></i> PHP</span>
                                <span className="skill-chip chip-purple"><i className="devicon-nodejs-plain colored"></i> Node.js</span>
                                <span className="skill-chip chip-purple"><i className="devicon-mysql-plain colored"></i> MySQL</span>
                                <span className="skill-chip chip-purple"><i className="devicon-mariadb-plain colored"></i> MariaDB</span>
                                <span className="skill-chip chip-purple"><i className="devicon-mongodb-plain colored"></i> MongoDB</span>
                                <span className="skill-chip chip-purple"><i className="devicon-nginx-original colored"></i> Nginx</span>
                                <span className="skill-chip chip-purple"><i className="fa-solid fa-server"></i> WAMPP</span>
                            </div>
                        </div>

                        {/* Categoría 3: Herramientas */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-wrench"></i> Herramientas</h3>
                            <div className="skill-tags">
                                <span className="skill-chip chip-green"><i className="devicon-git-plain colored"></i> Git</span>
                                <span className="skill-chip chip-green"><i className="devicon-github-original"></i> GitHub</span>
                                <span className="skill-chip chip-green"><i className="fa-solid fa-terminal"></i> Terminal</span>
                                <span className="skill-chip chip-green"><i className="devicon-vscode-plain colored"></i> VSCode</span>
                                <span className="skill-chip chip-green"><i className="devicon-npm-original-wordmark colored"></i> Antigravity</span>
                                <span className="skill-chip chip-green"><i className="devicon-amazonwebservices-plain-wordmark colored"></i> AWS services</span>
                            </div>
                        </div>

                        {/* Categoría 4: Aprendiendo */}
                        <div className="skill-category-box glass-card text-center">
                            <h3 className="category-title"><i className="fa-solid fa-graduation-cap"></i> Aprendiendo</h3>
                            <div className="skill-tags">
                                <span className="skill-chip chip-gold"><i className="devicon-python-plain colored"></i> Python</span>
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
