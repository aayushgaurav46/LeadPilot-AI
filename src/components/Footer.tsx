import { navLinks } from '../data/demoData'
import Logo from './Logo'

function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
          <div className="max-w-xs">
            <Logo variant="light" />
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">
              AI-powered lead conversion for modern real-estate teams.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks
              .filter((link) => link.href !== '#roi')
              .map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[13.5px] font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12.5px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 LeadPilot AI</p>
          <p>Portfolio demo — all product data shown is simulated.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
