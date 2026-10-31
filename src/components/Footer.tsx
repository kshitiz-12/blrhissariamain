import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-3 md:px-10 lg:px-14">
        <div>
          <div className="inline-flex items-center gap-3">
            <img
              src="/images/logo-mark.png"
              alt=""
              className="h-11 w-auto brightness-110"
              aria-hidden
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] tracking-[0.14em] uppercase text-cream">
                B.L. Hissaria
              </span>
              <span className="mt-1 text-[9px] tracking-[0.22em] uppercase text-gold">
                Jewellers Pvt. Ltd.
              </span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/65 font-light">
            Exquisite designs. Unwavering quality. A legacy of trust for generations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Explore</p>
            <ul className="space-y-2 text-sm text-cream/75">
              <li><Link to="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/#craft" className="hover:text-gold transition-colors">Our Craft</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Visit</p>
            <p className="text-sm text-cream/75 leading-relaxed font-light">
              123, M.G. Road<br />
              Bengaluru - 560001<br />
              Karnataka, India
            </p>
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Appointments</p>
          <p className="text-sm text-cream/75 font-light">Mon–Sat, 10:00 AM – 8:00 PM</p>
          <p className="mt-2 text-sm text-cream/75">+91 80 4123 4567</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 border border-gold/50 px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase text-gold hover:bg-gold hover:text-forest transition-colors"
          >
            Book Appointment →
          </Link>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-5 text-center text-[11px] tracking-wider text-cream/45 md:px-10">
        © {new Date().getFullYear()} B.L. Hissaria Jewellers Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  )
}
