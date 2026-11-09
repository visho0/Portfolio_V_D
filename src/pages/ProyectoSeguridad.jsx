import { useEffect } from 'react'

export default function ProyectoSeguridad({ navigate }) {

    useEffect(() => {
        window.scrollTo(0, 0)

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
            animateObserver.disconnect()
        }
    }, [])

    const handleBack = (e, hash) => {
        e.preventDefault()
        navigate('/', hash)
    }

    return (
        <main className="project-page-container">
            {/* Barra de navegación de retorno */}
            <div className="back-nav-bar">
                <a href="/" className="btn-back" onClick={(e) => handleBack(e, '#proyectos')}>
                    <i className="fa-solid fa-arrow-left"></i> Volver a Proyectos
                </a>
                <span className="status-badge" style={{ margin: 0 }}>
                    <span className="pulse-dot"></span> Proyecto Completado
                </span>
            </div>

            {/* Hero del Proyecto */}
            <section className="project-detail-hero glass-card">
                <div className="modal-badges-row">
                    <span className="project-badge badge-green">
                        <i className="fa-solid fa-shield-halved"></i> Ciberseguridad
                    </span>
                    <span className="modal-pill-tag" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
                        <i className="fa-solid fa-user-secret"></i> Pentesting
                    </span>
                </div>

                <h1 className="modal-project-title" style={{ fontSize: '2.8rem', margin: '0.5rem 0' }}>
                    Auditoría de Seguridad y Pentesting
                </h1>
                <p className="modal-project-subtitle" style={{ fontSize: '1.3rem' }}>
                    Auditoría de Seguridad y Pentesting en entorno controlado
                </p>

                <div className="modal-project-focus" style={{ marginTop: '1.25rem' }}>
                    <i className="fa-solid fa-crosshairs"></i> <strong>Enfoque:</strong> Explotación de vulnerabilidades, aplicación de normativas OWASP e ISO 27000, y generación de informes técnicos basados en resultados.
                </div>
            </section>

            <div className="project-detail-body">
                {/* 1. Descripción del Proyecto */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number">1</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Descripción del Proyecto</h2>
                    </div>

                    <div className="modal-role-card">
                        <div className="role-badge-pill">
                            <i className="fa-solid fa-shield-virus"></i> Entorno de Pruebas Controlado
                        </div>
                        <p className="role-description" style={{ fontSize: '1.05rem' }}>
                            Auditoría de Seguridad y Pentesting en entorno controlado. Desarrollo de ejercicios prácticos
                            de intrusión y pruebas de penetración (pentesting) diseñadas para evaluar la solidez defensiva,
                            detectar vectores de ataque y mitigar riesgos en infraestructuras informáticas.
                        </p>
                    </div>
                </section>

                {/* 2. Enfoque Técnico y Metodología */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number">2</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Enfoque Técnico y Metodología</h2>
                    </div>
                    <p className="modal-lead-text" style={{ fontSize: '1.1rem', marginBottom: '1.75rem' }}>
                        Pilares fundamentales aplicados durante el ciclo de auditoría:
                    </p>

                    <div className="modules-grid">
                        <div className="module-card">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-bug-slash"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Explotación Controlada</h3>
                                <p className="module-desc">Detección y explotación de vulnerabilidades en ambientes seguros y aislados.</p>
                            </div>
                        </div>
                        <div className="module-card">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-shield-virus"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Normativas OWASP</h3>
                                <p className="module-desc">Evaluación sistemática de riesgos siguiendo los estándares OWASP Top 10.</p>
                            </div>
                        </div>
                        <div className="module-card module-card-highlight">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-file-contract"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Estándares ISO 27000</h3>
                                <p className="module-desc">Alineación con directrices de seguridad de la información y buenas prácticas ISO/IEC 27001/2.</p>
                            </div>
                        </div>
                        <div className="module-card module-card-highlight">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-file-invoice"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Informes Técnicos</h3>
                                <p className="module-desc">Generación de documentación técnica exhaustiva basada en resultados reales y recomendaciones de mitigación.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Tecnologías y Herramientas Clave */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number"><i className="fa-solid fa-microchip"></i></span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Tecnologías y Herramientas Clave</h2>
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
                </section>

                {/* Barra de Acciones Final */}
                <section className="detail-actions-bar glass-card">
                    <div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: '#fff' }}>¿Interesado en una auditoría de seguridad?</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Contáctame para evaluar riesgos y fortalecer la postura defensiva de tu infraestructura.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="/" className="btn btn-outline" onClick={(e) => handleBack(e, '#proyectos')}>
                            <i className="fa-solid fa-arrow-left"></i> Otros Proyectos
                        </a>
                        <a href="/" className="btn btn-primary" onClick={(e) => handleBack(e, '#contacto')}>
                            <i className="fa-solid fa-paper-plane"></i> Contactar Ahora
                        </a>
                    </div>
                </section>
            </div>
        </main>
    )
}

