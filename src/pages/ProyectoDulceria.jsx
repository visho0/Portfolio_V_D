import { useEffect } from 'react'

export default function ProyectoDulceria({ navigate }) {

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
                    <span className="project-badge badge-cyan"><i className="fa-solid fa-store"></i> Web Systems</span>
                    <span className="modal-pill-tag"><i className="fa-solid fa-cubes"></i> Sistema ERP</span>
                </div>

                <h1 className="modal-project-title" style={{ fontSize: '2.8rem', margin: '0.5rem 0' }}>
                    Sistema ERP - Dulcería Lili&apos;s
                </h1>
                <p className="modal-project-subtitle" style={{ fontSize: '1.3rem' }}>
                    Sistema de Gestión para Negocios / Dulcería
                </p>

                <div className="modal-project-focus" style={{ marginTop: '1.25rem' }}>
                    <i className="fa-solid fa-bullseye"></i> <strong>Enfoque:</strong> Interfaz responsiva moderna diseñada con Bootstrap, lógica web y persistencia de datos local/relacional.
                </div>
            </section>

            <div className="project-detail-body">
                {/* 1. Mi Rol */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number">1</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Mi Rol</h2>
                    </div>

                    <div className="modal-role-card">
                        <div className="role-badge-pill">
                            <i className="fa-solid fa-layer-group"></i> Desarrollador Full-Stack / Arquitecto de Software
                        </div>
                        <p className="role-description" style={{ fontSize: '1.05rem' }}>
                            Encargado del diseño de la arquitectura cliente-servidor, desarrollo del prototipo integral (frontend y backend) e infraestructura en la nube. Responsable de la escalabilidad, seguridad y requerimientos operativos.
                        </p>
                    </div>
                </section>

                {/* 2. Funcionalidades del Proyecto */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number">2</span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Funcionalidades del Proyecto</h2>
                    </div>
                    <p className="modal-lead-text" style={{ fontSize: '1.1rem', marginBottom: '1.75rem' }}>
                        <strong>Gestión Integral:</strong> Módulos de Inventario, Compras, Producción, Ventas y Costos.
                    </p>

                    <div className="modules-grid">
                        <div className="module-card">
                            <div className="module-icon-box"><i className="fa-solid fa-boxes-stacked"></i></div>
                            <div>
                                <h3 className="module-title">Inventario</h3>
                                <p className="module-desc">Control y stock en tiempo real de materias primas, insumos y productos terminados con alertas automáticas de reposición.</p>
                            </div>
                        </div>
                        <div className="module-card">
                            <div className="module-icon-box"><i className="fa-solid fa-cart-shopping"></i></div>
                            <div>
                                <h3 className="module-title">Compras</h3>
                                <p className="module-desc">Gestión y registro de órdenes de abastecimiento con proveedores, control de comprobantes y trazabilidad de insumos.</p>
                            </div>
                        </div>
                        <div className="module-card">
                            <div className="module-icon-box"><i className="fa-solid fa-gears"></i></div>
                            <div>
                                <h3 className="module-title">Producción</h3>
                                <p className="module-desc">Fórmulas de elaboración, cálculo de insumos por lote de dulces y balance de rendimiento en la fabricación.</p>
                            </div>
                        </div>
                        <div className="module-card">
                            <div className="module-icon-box"><i className="fa-solid fa-cash-register"></i></div>
                            <div>
                                <h3 className="module-title">Ventas</h3>
                                <p className="module-desc">Terminal de Punto de Venta (POS) rápido, emisión de tickets, flujo de caja diario y múltiples medios de cobro.</p>
                            </div>
                        </div>
                        <div className="module-card module-card-highlight">
                            <div className="module-icon-box"><i className="fa-solid fa-chart-line"></i></div>
                            <div>
                                <h3 className="module-title">Costos</h3>
                                <p className="module-desc">Análisis exhaustivo de márgenes de utilidad neta, costos operativos directos/indirectos y balance financiero integral.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tecnologías Clave */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number"><i className="fa-solid fa-microchip"></i></span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Tecnologías Clave</h2>
                    </div>
                    <div className="tech-chips-list">
                        <span className="tech-chip"><i className="devicon-html5-plain colored"></i> HTML5</span>
                        <span className="tech-chip"><i className="devicon-css3-plain colored"></i> CSS3</span>
                        <span className="tech-chip"><i className="devicon-javascript-plain colored"></i> JavaScript Vanilla</span>
                        <span className="tech-chip"><i className="devicon-bootstrap-plain colored"></i> Bootstrap 5</span>
                        <span className="tech-chip"><i className="devicon-sqlite-plain colored"></i> SQLite</span>
                    </div>
                </section>

                {/* Capturas / Galería del Sistema */}
                <section className="detail-section-card glass-card">
                    <div className="modal-block-title">
                        <span className="block-number"><i className="fa-solid fa-image"></i></span>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }}>Capturas y Vistas del Sistema</h2>
                    </div>
                    <p className="gallery-helper-text">
                        Espacio preparado para previsualizar capturas de pantalla del panel administrativo y módulos operativos:
                    </p>

                    <div className="captures-grid">
                        {/* Placeholder 1: Dashboard */}
                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-chart-pie placeholder-icon"></i>
                                    <span className="placeholder-tag">Dashboard Principal</span>
                                    <span className="placeholder-caption">Métricas de Ventas, Stock Crítico y Balance</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Dashboard &amp; KPIs Operativos</h5>
                                <p>Visión general del estado del negocio en tiempo real.</p>
                            </div>
                        </div>

                        {/* Placeholder 2: Inventario */}
                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-table-list placeholder-icon"></i>
                                    <span className="placeholder-tag">Módulo de Inventario</span>
                                    <span className="placeholder-caption">Catálogo de Productos, Materias Primas y Kardex</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Control de Inventario &amp; Stock</h5>
                                <p>Administración y trazabilidad de insumos de dulcería.</p>
                            </div>
                        </div>

                        {/* Placeholder 3: POS / Ventas */}
                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-receipt placeholder-icon"></i>
                                    <span className="placeholder-tag">Punto de Venta (POS)</span>
                                    <span className="placeholder-caption">Cobro Rápido, Boletas e Historial de Transacciones</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Ventas &amp; Facturación</h5>
                                <p>Terminal interactivo optimizado para atención al público.</p>
                            </div>
                        </div>

                        {/* Placeholder 4: Producción & Costos */}
                        <div className="capture-card">
                            <div className="capture-preview-box">
                                <div className="capture-placeholder">
                                    <i className="fa-solid fa-calculator placeholder-icon"></i>
                                    <span className="placeholder-tag">Producción &amp; Costos</span>
                                    <span className="placeholder-caption">Fórmulas por Lote y Análisis de Rentabilidad</span>
                                </div>
                            </div>
                            <div className="capture-info">
                                <h5>Módulo de Producción</h5>
                                <p>Recetas industriales y márgenes de ganancia por producto.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Barra de Acciones Final */}
                <section className="detail-actions-bar glass-card">
                    <div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem', color: '#fff' }}>¿Interesado en implementar un sistema similar?</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Contáctame para diseñar una solución a la medida de tu negocio.</p>
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
