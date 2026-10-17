import { useEffect, useRef, useState, useCallback } from 'react'

export default function HomePage({ navigate }) {
    const mainRef = useRef(null)
    const [isTerapeutasModalOpen, setIsTerapeutasModalOpen] = useState(false)
    const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false)

    const openTerapeutasModal = useCallback((e) => {
        if (e && e.preventDefault) e.preventDefault()
        setIsTerapeutasModalOpen(true)
    }, [])

    const closeTerapeutasModal = useCallback(() => {
        setIsTerapeutasModalOpen(false)
    }, [])

    const openSecurityModal = useCallback((e) => {
        if (e && e.preventDefault) e.preventDefault()
        setIsSecurityModalOpen(true)
    }, [])

    const closeSecurityModal = useCallback(() => {
        setIsSecurityModalOpen(false)
    }, [])

    // Lock body scroll & handle Escape key when modal is open
    useEffect(() => {
        if (isTerapeutasModalOpen || isSecurityModalOpen) {
            document.body.style.overflow = 'hidden'
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    closeTerapeutasModal()
                    closeSecurityModal()
                }
            }
            window.addEventListener('keydown', handleEsc)
            return () => {
                document.body.style.overflow = ''
                window.removeEventListener('keydown', handleEsc)
            }
        } else {
            document.body.style.overflow = ''
        }
    }, [isTerapeutasModalOpen, isSecurityModalOpen, closeTerapeutasModal, closeSecurityModal])

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
                                src="/images/image.png"
                                alt="Vicente Avatar"
                                width="125"
                                height="125"
                                loading="eager"
                                fetchPriority="high"
                                decoding="sync"
                                className="hero-avatar-img"
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
                        <img
                            src="/images/image.png"
                            alt="Vicente Avatar"
                            width="100"
                            height="100"
                            loading="lazy"
                            decoding="async"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                        />
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

                        {/* Proyecto 3: Auditoría de Seguridad y Pentesting */}
                        <article
                            className="project-card glass-card text-center"
                            id="card-security-audit"
                            style={{ cursor: 'pointer' }}
                            onClick={openSecurityModal}
                            role="button"
                            tabIndex={0}
                            aria-label="Ver detalles del proyecto Auditoría de Seguridad y Pentesting"
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openSecurityModal(e) }}
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
                                <a href="#" className="project-link" onClick={openSecurityModal}>
                                    <i className="fa-solid fa-shield-halved"></i> Ver detalles <i className="fa-solid fa-chevron-right"></i>
                                </a>
                            </div>
                        </article>

                        {/* ===== MODAL: Auditoría de Seguridad y Pentesting ===== */}
                        <div
                            className={`project-modal${isSecurityModalOpen ? ' is-active' : ''}`}
                            id="modal-security"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-security-title"
                            onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('modal-overlay')) closeSecurityModal() }}
                        >
                            <div className="modal-overlay" onClick={closeSecurityModal}></div>
                            <div className="modal-dialog-wrapper">
                                <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
                                    {/* Botón cerrar */}
                                    <button
                                        className="modal-close-button"
                                        onClick={closeSecurityModal}
                                        aria-label="Cerrar modal"
                                        title="Cerrar"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>

                                    {/* Encabezado del modal */}
                                    <div className="modal-header-section">
                                        <div className="modal-badges-row">
                                            <span className="modal-pill-tag" style={{ background: 'rgba(0, 245, 160, 0.15)', color: 'var(--accent-green)', borderColor: 'rgba(0, 245, 160, 0.3)' }}>
                                                <i className="fa-solid fa-shield-halved"></i> Ciberseguridad
                                            </span>
                                            <span className="modal-pill-tag" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
                                                <i className="fa-solid fa-user-secret"></i> Pentesting
                                            </span>
                                        </div>
                                        <h2 className="modal-project-title" id="modal-security-title">Auditoría de Seguridad y Pentesting</h2>
                                        <p className="modal-project-subtitle">Auditoría de Seguridad y Pentesting en entorno controlado</p>
                                        <div className="modal-project-focus">
                                            <i className="fa-solid fa-crosshairs"></i>
                                            <strong>Enfoque:</strong> Explotación de vulnerabilidades, aplicación de normativas OWASP e ISO 27000, y generación de informes técnicos basados en resultados.
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
                                                <i className="fa-solid fa-shield-virus"></i> Entorno de Pruebas Controlado
                                            </div>
                                            <p className="role-description">
                                                Auditoría de Seguridad y Pentesting en entorno controlado. Desarrollo de ejercicios prácticos
                                                de intrusión y pruebas de penetración (pentesting) diseñadas para evaluar la solidez defensiva,
                                                detectar vectores de ataque y mitigar riesgos en infraestructuras informáticas.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Sección 2: Enfoque Técnico y Metodología */}
                                    <div className="modal-section-block">
                                        <div className="modal-block-title">
                                            <span className="block-number">2</span>
                                            <h3>Enfoque Técnico y Metodología</h3>
                                        </div>
                                        <p className="modal-lead-text">
                                            Pilares fundamentales aplicados durante el ciclo de auditoría:
                                        </p>
                                        <div className="modules-grid">
                                            <div className="module-card">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-bug-slash"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Explotación Controlada</p>
                                                    <p className="module-desc">Detección y explotación de vulnerabilidades en ambientes seguros y aislados.</p>
                                                </div>
                                            </div>
                                            <div className="module-card">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-shield-virus"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Normativas OWASP</p>
                                                    <p className="module-desc">Evaluación sistemática de riesgos siguiendo los estándares OWASP Top 10.</p>
                                                </div>
                                            </div>
                                            <div className="module-card module-card-highlight">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-file-contract"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Estándares ISO 27000</p>
                                                    <p className="module-desc">Alineación con directrices de seguridad de la información y buenas prácticas ISO/IEC 27001/2.</p>
                                                </div>
                                            </div>
                                            <div className="module-card module-card-highlight">
                                                <div className="module-icon-box">
                                                    <i className="fa-solid fa-file-invoice"></i>
                                                </div>
                                                <div>
                                                    <p className="module-title">Informes Técnicos</p>
                                                    <p className="module-desc">Generación de documentación técnica exhaustiva basada en resultados reales y recomendaciones de mitigación.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección 3: Tecnologías y Herramientas Clave */}
                                    <div className="modal-section-block">
                                        <div className="modal-block-title">
                                            <span className="block-number">3</span>
                                            <h3>Tecnologías y Herramientas Clave</h3>
                                        </div>
                                        <div className="tech-chips-list">
                                            <span className="tech-chip">
                                                <i className="devicon-linux-plain colored"></i> Kali Linux
                                            </span>
                                            <span className="tech-chip">
                                                <i className="fa-solid fa-server"></i> Máquinas Virtuales
                                            </span>
                                            <span className="tech-chip">
                                                <i className="fa-solid fa-terminal"></i> Herramientas de Pentesting
                                            </span>
                                            <span className="tech-chip">
                                                <i className="fa-solid fa-shield-halved"></i> OWASP Top 10
                                            </span>
                                            <span className="tech-chip">
                                                <i className="fa-solid fa-certificate"></i> ISO 27000
                                            </span>
                                        </div>
                                    </div>

                                    {/* Pie del modal */}
                                    <div className="modal-footer-section">
                                        <button className="btn btn-outline" onClick={closeSecurityModal}>
                                            <i className="fa-solid fa-xmark"></i> Cerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
