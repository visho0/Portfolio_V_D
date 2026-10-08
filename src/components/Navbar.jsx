import { useCallback } from 'react'

export default function Navbar({ navigate, currentPage }) {
    const handleNavClick = useCallback((e, hash) => {
        e.preventDefault()
        if (currentPage !== '/') {
            navigate('/', hash)
        } else {
            const el = document.querySelector(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
        }
    }, [navigate, currentPage])

    return (
        <header className="navbar">
            <div className="container nav-container">
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); navigate('/') }}>
                    <span className="logo-badge">VD</span>
                    <span className="logo-text">Vicente<span className="dot">.</span>dev</span>
                </a>

                <nav className="nav-menu">
                    <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, '#about')}>
                        <i className="fa-solid fa-user"></i> Sobre mí
                    </a>
                    <a href="#proyectos" className="nav-link" onClick={(e) => handleNavClick(e, '#proyectos')}>
                        <i className="fa-solid fa-diagram-project"></i> Proyectos
                    </a>
                    <a href="#habilidades" className="nav-link" onClick={(e) => handleNavClick(e, '#habilidades')}>
                        <i className="fa-solid fa-code"></i> Habilidades
                    </a>
                </nav>

                <div className="nav-actions">
                    <a href="#contacto" className="btn btn-primary btn-sm" onClick={(e) => handleNavClick(e, '#contacto')}>
                        <i className="fa-solid fa-paper-plane"></i> Contactar
                    </a>
                </div>
            </div>
        </header>
    )
}
