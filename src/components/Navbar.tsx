import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
] as const

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Reset menu + scroll flag on every route change (fixes light-page flash / sticky state)
  useEffect(() => {
    setOpen(false)
    setScrolled(window.scrollY > 40)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onDarkHero = isHome && !scrolled

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'nav-link relative whitespace-nowrap font-sans text-[12px] font-light uppercase tracking-[0.16em] transition-colors',
      onDarkHero
        ? isActive
          ? 'active text-gold'
          : 'text-cream/90 hover:text-gold'
        : isActive
          ? 'active text-forest'
          : 'text-forest/70 hover:text-forest',
    ].join(' ')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background,box-shadow] duration-400 ${
        onDarkHero
          ? 'bg-transparent'
          : 'border-b border-forest/8 bg-cream shadow-[0_1px_0_rgba(11,28,20,0.04)]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-10 lg:px-14">
        <Logo variant={onDarkHero ? 'dark' : 'light'} />

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex xl:gap-10"
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            className={`hidden p-2 lg:inline-flex ${
              onDarkHero ? 'text-cream/80 hover:text-gold' : 'text-forest/55 hover:text-forest'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>

          <Link
            to="/contact"
            className={`hidden items-center gap-2 px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.14em] transition-colors lg:inline-flex ${
              onDarkHero
                ? 'bg-gold text-forest hover:bg-gold-light'
                : 'bg-forest text-cream hover:bg-forest-mid'
            }`}
          >
            Book Appointment
            <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            className={`inline-flex p-2 lg:hidden ${onDarkHero ? 'text-cream' : 'text-forest'}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" strokeLinecap="round" />
                  <path d="M4 12h16" strokeLinecap="round" />
                  <path d="M4 17h16" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-forest/10 bg-cream px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-display text-2xl ${isActive ? 'text-gold' : 'text-forest'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex w-fit items-center gap-2 bg-forest px-5 py-3 font-sans text-[12px] uppercase tracking-[0.12em] text-cream"
            >
              Book Appointment →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
