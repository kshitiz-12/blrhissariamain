import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const pillars = [
  {
    title: 'Heritage',
    copy: 'Rooted in tradition, shaping the future.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M4 20h16M6 20V10l6-5 6 5v10M9 20v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Craftsmanship',
    copy: 'Exquisite designs, crafted with care.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Trust',
    copy: 'A bond that lasts generations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'People',
    copy: 'Our customers are our family.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15">
        <circle cx="9" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M13 19c.5-2 2-3.5 4.5-3.5 2 0 3.5 1 4 2.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <>
      <Seo
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      <div className="bg-cream">
        {/* Top band — matches Figma one-screen composition */}
        <section className="relative overflow-hidden pt-16 md:pt-[72px]" aria-labelledby="about-heading">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-[0.28] lg:block grayscale"
            style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-transparent via-cream/55 to-cream lg:block" />

          <div className="relative mx-auto grid max-w-[1440px] items-start gap-8 px-5 pb-5 pt-2 md:px-10 md:pb-6 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:pb-7 lg:pt-3">
            {/* Left copy */}
            <div className="lg:col-span-4 lg:pt-2">
              <p className="page-eyebrow">About Us</p>
              <h1 id="about-heading" className="page-title mt-2 text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]">
                A Legacy of Trust
              </h1>
              <p className="page-body mt-4 max-w-[22rem]">
                For generations, the name B.L. Hissaria has stood synonymous with trust,
                craftsmanship, and enduring beauty. What began as a family passion for fine
                jewellery has grown into a house of heirlooms — where every piece is designed
                to honour tradition and celebrate the moments that matter most.
              </p>
              <Link to="/#craft" className="btn-gold mt-6">
                Our Heritage →
              </Link>
            </div>

            {/* Center arch — shop image */}
            <div className="relative z-20 flex justify-center lg:col-span-4">
              <figure className="arch-frame relative h-[420px] w-[260px] shadow-[0_28px_60px_rgba(11,28,20,0.2)] sm:h-[460px] sm:w-[300px] md:h-[500px] md:w-[330px] lg:h-[520px] lg:w-[350px]">
                <img
                  src="/images/shop-bw-storefront.jpg"
                  alt="Black and white photograph of the B.L. Hissaria Jewellers storefront"
                  width={700}
                  height={1100}
                  className="h-full w-full object-cover object-[50%_30%] grayscale contrast-[1.08]"
                />
              </figure>
            </div>

            {/* Right pillars */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 pb-2 sm:gap-y-7 lg:col-span-4 lg:grid-cols-1 lg:gap-y-8 lg:pt-2">
              {pillars.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-sans text-[0.6875rem] font-medium tracking-[0.22em] uppercase text-forest">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 max-w-[14rem] font-sans text-[0.8125rem] font-light leading-snug text-muted">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote + craft film */}
        <section className="relative z-10 bg-cream px-5 pb-14 pt-4 md:px-10 md:pt-5 lg:px-14 lg:pt-6">
          <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
            <div className="relative flex min-h-[240px] items-center border border-gold/30 bg-forest px-8 py-12 md:min-h-[280px] md:px-12">
              <span className="absolute right-7 top-7 text-gold/75" aria-hidden>✦</span>
              <blockquote className="max-w-md font-display text-[1.85rem] font-normal italic leading-[1.25] text-cream md:text-[2.15rem]">
                “More than jewellery, we create heirlooms for your tomorrow.”
              </blockquote>
            </div>
            <div className="relative min-h-[240px] overflow-hidden md:min-h-[280px]">
              <img
                src="/images/craftsman-work.jpg"
                alt="Artisan crafting fine gold jewellery by hand"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-forest/20" />
              <button
                type="button"
                aria-label="Play craftsmanship film"
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/45 bg-cream/15 text-cream backdrop-blur-[2px] transition hover:bg-cream/25"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="absolute bottom-5 right-6 font-sans text-[0.625rem] tracking-[0.22em] uppercase text-cream/85">
                The Art Behind Every Piece
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
