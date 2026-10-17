import { useEffect } from 'react'

export default function ProyectoTerapeutas({ navigate }) {

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
                    <span className="project-badge badge-purple">
                        <i className="fa-solid fa-user-doctor"></i> Gestión Clínica
                    </span>
                    <span className="modal-pill-tag" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)' }}>
                        <i className="fa-solid fa-notes-medical"></i> Registros Médicos
                    </span>
                </div>

                <h1 className="modal-project-title" style={{ fontSize: '2.8rem', margin: '0.5rem 0' }}>
                    Terapeutas Chile
                </h1>
                <p className="modal-project-subtitle" style={{ fontSize: '1.3rem' }}>
                    Plataforma de Registros Médicos y Gestión Clínica
                </p>

                <div className="modal-project-focus" style={{ marginTop: '1.25rem' }}>
                    <i className="fa-solid fa-crosshairs"></i> <strong>Enfoque:</strong> Interfaz funcional, maquetación adaptativa y organización de datos para la gestión clínica.
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
                            <i className="fa-solid fa-laptop-medical"></i> Plataforma Clínica Digital
                        </div>
                        <p className="role-description" style={{ fontSize: '1.05rem' }}>
                            Sistema orientado a la digitalización y organización de procesos clínicos en Chile.
                            La plataforma permite el registro, consulta y administración de fichas médicas de pacientes,
                            facilitando el trabajo de terapeutas y profesionales de salud con una interfaz clara,
                            funcional y completamente adaptativa a múltiples dispositivos.
                        </p>
                    </div>
                </section>

                {/* 2. Funcionalidades Principales */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number">2</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Funcionalidades Principales</h2>
                    </div>
                    <p className="modal-lead-text" style={{ fontSize: '1.1rem', marginBottom: '1.75rem' }}>
                        Módulos diseñados para cubrir las necesidades de gestión clínica:
                    </p>

                    <div className="modules-grid">
                        <div className="module-card">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-file-medical"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Fichas de Pacientes</h3>
                                <p className="module-desc">Registro estructurado de datos personales, historial médico y notas de sesión.</p>
                            </div>
                        </div>
                        <div className="module-card">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-calendar-check"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Agenda y Citas</h3>
                                <p className="module-desc">Organización de horarios, control de citas programadas y disponibilidad de profesionales.</p>
                            </div>
                        </div>
                        <div className="module-card module-card-highlight">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-table-columns"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Maquetación Adaptativa</h3>
                                <p className="module-desc">Diseño responsive que se ajusta a escritorio, tablet y móvil para uso en consulta.</p>
                            </div>
                        </div>
                        <div className="module-card module-card-highlight">
                            <div className="module-icon-box">
                                <i className="fa-solid fa-database"></i>
                            </div>
                            <div>
                                <h3 className="module-title">Organización de Datos</h3>
                                <p className="module-desc">Estructura lógica para consultar, filtrar y gestionar registros clínicos de forma eficiente.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Stack Tecnológico */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number"><i className="fa-solid fa-microchip"></i></span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Stack Tecnológico</h2>
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
                </section>

                {/* 4. Capturas y Vistas del Sistema */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number"><i className="fa-solid fa-image"></i></span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Capturas y Vistas del Sistema</h2>
                    </div>
                    <p className="gallery-helper-text">
                        Espacio preparado para previsualizar capturas de pantalla de la interfaz y módulos clínicos:
                    </p>

                    <div className="captures-grid">
                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-id-card-clip placeholder-icon"></i>
                                    <span className="placeholder-tag">Ficha Clínica</span>
                                    <span className="placeholder-caption">Historial de Paciente, Anamnesis y Sesiones</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Fichas Clínicas Digitales</h5>
                                <p>Gestión centralizada de expedientes e historiales de pacientes.</p>
                            </div>
                        </div>

                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-calendar-days placeholder-icon"></i>
                                    <span className="placeholder-tag">Agenda Semanal</span>
                                    <span className="placeholder-caption">Horarios, Sesiones Programadas y Estados</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Control de Citas &amp; Agenda</h5>
                                <p>Planificación y disponibilidad horaria por profesional.</p>
                            </div>
                        </div>

                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-mobile-screen-button placeholder-icon"></i>
                                    <span className="placeholder-tag">Vista Adaptativa</span>
                                    <span className="placeholder-caption">Optimización para Móviles, Tablets y Escritorio</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Diseño Multi-Dispositivo</h5>
                                <p>Uso ágil durante sesiones presenciales o teleconsulta.</p>
                            </div>
                        </div>

                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-magnifying-glass-chart placeholder-icon"></i>
                                    <span className="placeholder-tag">Búsqueda y Filtros</span>
                                    <span className="placeholder-caption">Localización Rápida de Registros y Documentos</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Organización de Datos</h5>
                                <p>Estructuración eficiente para consulta rápida y segura.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Barra de Acciones Final */}
                <section className="detail-actions-bar glass-card">
                    <div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: '#fff' }}>¿Interesado en implementar una plataforma similar?</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Contáctame para diseñar una solución a la medida de tu centro de atención o consulta profesional.</p>
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
