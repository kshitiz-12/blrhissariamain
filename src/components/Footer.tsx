import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../seo/site'

const usefulLinks = [
  { label: 'Delivery Information', to: '#' },
  { label: 'International Shipping', to: '#' },
  { label: 'Payment Options', to: '#' },
  { label: 'Track your Order', to: '#' },
  { label: 'Returns', to: '#' },
  { label: 'Find a Store', to: '/contact' },
  { label: 'Exercise Your Rights', to: '#' },
]

const infoLinks = [
  { label: 'Blog', to: '#' },
  { label: 'Offers & Contest Details', to: '#' },
  { label: 'Help & FAQs', to: '#' },
  { label: 'About B.L. Hissaria', to: '/about' },
  { label: 'Cookie Policy', to: '#' },
  { label: 'Cookie Settings', to: '#' },
]

const legalLinks = [
  { label: 'Cyber Security Policy', to: '#' },
  { label: 'Terms & Conditions', to: '#' },
  { label: 'Privacy Notice', to: '#' },
  { label: 'Disclaimer', to: '#' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: SITE.social.instagram,
    path: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.2-.9a1 1 0 11-2 0 1 1 0 012 0z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M4 4l6.5 7.5L4.3 20H7l4.7-5.8L16.8 20H20l-6.8-7.9L19.7 4H17l-4.4 5.4L7.2 4H4z',
  },
  {
    label: 'Facebook',
    href: SITE.social.facebook,
    path: 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z',
  },
  {
    label: 'YouTube',
    href: SITE.social.youtube,
    path: 'M22 8.2a3 3 0 00-2.1-2.1C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.9.6A3 3 0 002 8.2 31 31 0 001.5 12a31 31 0 00.5 3.8 3 3 0 002.1 2.1c1.7.6 7.9.6 7.9.6s6.2 0 7.9-.6a3 3 0 002.1-2.1 31 31 0 00.5-3.8 31 31 0 00-.5-3.8zM10 15.2V8.8l5.2 3.2L10 15.2z',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-8 md:px-10 lg:px-14 lg:pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Useful Links */}
          <div>
            <h3 className="font-display text-lg text-cream">Useful Links</h3>
            <ul className="mt-5 space-y-2.5">
              {usefulLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-display text-lg text-cream">Information</h3>
            <ul className="mt-5 space-y-2.5">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-display text-lg text-cream">Contact Us</h3>
            <a
              href={`tel:${SITE.phone}`}
              className="mt-5 block text-sm text-cream/85 transition-colors hover:text-gold"
            >
              {SITE.phoneDisplay}
            </a>

            <p className="mt-5 font-display text-base text-cream">Chat With Us</p>
            <a
              href={`https://wa.me/${SITE.phone.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm text-cream/85 transition-colors hover:text-gold"
            >
              {SITE.phoneDisplay}
            </a>

            <div className="mt-5 border-t border-cream/20 pt-5">
              <div className="flex gap-3">
                <CircleIcon href={`https://wa.me/${SITE.phone.replace('+', '')}`} label="WhatsApp">
                  <path
                    d="M12 3.5a8.5 8.5 0 00-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1012 3.5zm4.7 11.9c-.2.6-1.1 1-1.5 1.1-.4.1-.9.2-1.5.1-.3-.1-.8-.2-1.3-.4-2.3-1-3.8-3.3-3.9-3.5-.1-.2-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .4.3.2.5.5 1.3.6 1.4.1.1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.5.1.2.5.8 1.1 1.3.7.7 1.3 1 1.5 1.1.2.1.4.1.5 0l.7-.8c.1-.2.3-.1.5-.1l1.1.5c.2.1.3.2.4.3.1.2.1.8-.1 1.4z"
                    fill="currentColor"
                  />
                </CircleIcon>
                <CircleIcon href={`mailto:${SITE.email}`} label="Email">
                  <path
                    d="M5 8h14v9H5V8zm0 0l7 5 7-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </CircleIcon>
                <CircleIcon href="/contact" label="Chat" internal>
                  <path
                    d="M6 8h12v8H9l-3 2.5V8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </CircleIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Social — placeholders */}
        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-cream/15 pt-7">
          <p className="font-display text-lg text-cream">Social</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (placeholder)`}
                title={`${s.label} — link placeholder`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream/80 transition-colors hover:border-gold hover:text-gold"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Legal bar — no payment icons */}
        <div className="mt-7 flex flex-col gap-4 border-t border-cream/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-cream/55">
            © {year} {SITE.name}. All Rights Reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.to}
                  className="text-[12px] text-cream/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  const className =
    'text-sm font-light text-cream/75 transition-colors hover:text-gold'

  if (to.startsWith('/')) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={to} className={className}>
      {children}
    </a>
  )
}

function CircleIcon({
  href,
  label,
  children,
  internal,
}: {
  href: string
  label: string
  children: ReactNode
  internal?: boolean
}) {
  const className =
    'flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream/85 transition-colors hover:border-gold hover:text-gold'

  if (internal) {
    return (
      <Link to={href} aria-label={label} className={className}>
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
          {children}
        </svg>
      </Link>
    )
  }

  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={className}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
        {children}
      </svg>
    </a>
  )
}

