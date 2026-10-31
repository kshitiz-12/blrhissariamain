import { Link } from 'react-router-dom'

type LogoProps = {
  variant?: 'light' | 'dark'
  className?: string
}

export default function Logo({ variant = 'light', className = '' }: LogoProps) {
  const text = variant === 'dark' ? 'text-cream' : 'text-forest'
  const sub = variant === 'dark' ? 'text-gold' : 'text-gold-dark'

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group shrink-0 ${className}`}>
      <img
        src="/images/logo-mark.png"
        alt=""
        className="h-9 w-auto object-contain md:h-10"
        aria-hidden
      />
      <span className="hidden sm:flex flex-col leading-none">
        <span className={`font-display text-[0.9375rem] font-medium tracking-[0.12em] uppercase ${text}`}>
          B.L. Hissaria
        </span>
        <span className={`mt-1 font-sans text-[0.5625rem] tracking-[0.2em] uppercase ${sub}`}>
          Jewellers Pvt. Ltd.
        </span>
      </span>
    </Link>
  )
}
