import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/demoData'
import Logo from './Logo'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-line bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70'
          : 'border-transparent bg-canvas'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between" aria-label="Primary">
        <a href="#top" className="shrink-0" aria-label="LeadPilot AI home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14.5px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#demo"
            className="inline-flex items-center rounded-lg bg-ink px-4 py-2.5 text-[14.5px] font-semibold text-white shadow-sm transition-colors hover:bg-accent"
          >
            Book a Demo
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <ul className="container-px mx-auto flex max-w-7xl flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line-soft last:border-none">
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-3.5 text-[15px] font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a
                href="#demo"
                onClick={handleNavClick}
                className="flex w-full items-center justify-center rounded-lg bg-ink px-4 py-3 text-[15px] font-semibold text-white"
              >
                Book a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
