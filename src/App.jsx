import { useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProyectoDulceria from './pages/ProyectoDulceria'

function App() {
    const [currentPage, setCurrentPage] = useState(() => {
        const path = window.location.pathname
        return path || '/'
    })
    const [pendingHash, setPendingHash] = useState(window.location.hash || null)

    const navigate = useCallback((path, hash) => {
        setCurrentPage(path)
        setPendingHash(hash || null)
        window.history.pushState({}, '', path + (hash || ''))
        if (!hash) {
            window.scrollTo(0, 0)
        }
    }, [])

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            setCurrentPage(window.location.pathname || '/')
            setPendingHash(window.location.hash || null)
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    // Scroll to hash after page render
    useEffect(() => {
        if (pendingHash) {
            // Small delay to ensure DOM is rendered
            const timer = setTimeout(() => {
                const el = document.querySelector(pendingHash)
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                }
                setPendingHash(null)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [pendingHash, currentPage])

    const renderPage = () => {
        switch (currentPage) {
            case '/proyecto-dulceria':
                return <ProyectoDulceria navigate={navigate} />
            case '/':
            default:
                return <HomePage navigate={navigate} />
        }
    }

    return (
        <>
            <Navbar navigate={navigate} currentPage={currentPage} />
            {renderPage()}
            <Footer />
        </>
    )
}

export default App
