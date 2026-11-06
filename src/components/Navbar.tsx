import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { getLiveGoldRate } from '../lib/goldRate'

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
          <LiveGoldRate onDark={onDarkHero} className="hidden sm:inline-flex" />

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
            <LiveGoldRate onDark={false} className="mt-3 flex sm:hidden" />
          </nav>
        </div>
      )}
    </header>
  )
}

function LiveGoldRate({ onDark, className = '' }: { onDark: boolean; className?: string }) {
  const [display, setDisplay] = useState('Loading…')
  const [title, setTitle] = useState('Fetching live 22kt gold rate…')

  useEffect(() => {
    let cancelled = false
    getLiveGoldRate().then((rate) => {
      if (cancelled) return
      setDisplay(rate.display)
      const sourceLabel =
        rate.source === 'ibja'
          ? 'IBJA India benchmark'
          : rate.source === 'spot'
            ? 'International spot (INR)'
            : 'Cached / fallback'
      setTitle(
        `${sourceLabel} · 22kt per gram · excludes making charges & GST · updated ${new Date(rate.updatedAt).toLocaleString('en-IN')}`,
      )
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div
      className={`inline-flex items-center gap-2 whitespace-nowrap font-sans text-[12px] leading-none md:text-[13px] ${className}`}
      title={title}
    >
      <GoldBarsIcon className={onDark ? 'text-gold' : 'text-[#C5A367]'} />
      <span className={onDark ? 'text-cream/85' : 'text-[#333]'}>Live Gold Rate:</span>
      <span
        className={`border-b pb-px font-medium ${
          onDark
            ? 'border-gold/70 text-gold'
            : 'border-[#6B1F3A] text-[#6B1F3A]'
        }`}
      >
        {display}
      </span>
    </div>
  )
}

function GoldBarsIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="currentColor"
      aria-hidden
      className={`shrink-0 ${className}`}
    >
      <path d="M5.5 9.2h7L11.2 12H6.8L5.5 9.2z" opacity="0.95" />
      <path d="M4.2 5.6h9.6L12.4 8.4H5.6L4.2 5.6z" opacity="0.85" />
      <path d="M3 2h12l-1.4 2.6H4.4L3 2z" />
    </svg>
  )
}
