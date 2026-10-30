import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

function Navbar({ onGetStarted, onOpenBuilder, dashboard = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href={dashboard ? '#top' : '#home'} onClick={(event) => {
        event.preventDefault()
        if (dashboard) onOpenBuilder?.()
        else window.scrollTo({ top: 0, behavior: 'smooth' })
      }}>
        <span className="brand-mark">r<span>.</span></span>
        <span>resume<span className="brand-ai">ai</span></span>
      </a>
      <button className="mobile-menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {dashboard ? (
          <button type="button" className="nav-link" onClick={() => { onOpenBuilder?.(); closeMenu() }}>Back to home</button>
        ) : (
          <>
            <a className="nav-link" href="#home" onClick={closeMenu}>Home</a>
            <a className="nav-link" href="#features" onClick={closeMenu}>Features</a>
            <a className="nav-link" href="#templates" onClick={closeMenu}>Templates</a>
            <a className="nav-link" href="#about" onClick={closeMenu}>About</a>
          </>
        )}
        {!dashboard && <>
          <button type="button" className="nav-login" onClick={() => { onGetStarted?.(); closeMenu() }}>Log in</button>
          <button type="button" className="button button-primary nav-cta" onClick={() => { onGetStarted?.(); closeMenu() }}>
            Sign up <ArrowRight size={15} />
          </button>
        </>}
      </nav>
    </header>
  )
}

export default Navbar
