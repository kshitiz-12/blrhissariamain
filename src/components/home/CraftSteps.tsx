import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../../seo/site'

const MAP_EMBED =
  'https://maps.google.com/maps?q=29.582178,74.3251981&hl=en&z=16&output=embed'

const timeline = [
  {
    year: 'Est. Legacy',
    title: 'Year of Establishment',
    copy: 'B.L. Hissaria Jewellers began as a family passion for fine gold — rooted in Hanumangarh’s Old Market tradition.',
    image: '/images/heritage/establishment.jpg',
  },
  {
    year: 'Founders',
    title: 'Founder’s Story',
    copy: 'Built on craftsmanship and honesty, the house was shaped by a belief that jewellery should honour both beauty and trust.',
    image: '/images/heritage/founder.jpg',
  },
  {
    year: 'Generations',
    title: 'Generations of Trust',
    copy: 'Families return for bridal, diamond and everyday pieces — a bond of purity and care passed from one generation to the next.',
    image: '/images/heritage/generations.jpg',
  },
  {
    year: 'Today',
    title: 'Evolution of the Showroom',
    copy: 'From a local atelier to a refined showroom experience — personal consultations, hallmarked purity and timeless design.',
    image: '/images/heritage/showroom.jpg',
  },
]

const collectionCards = [
  {
    title: 'Gold Jewellery',
    image: '/images/gold-bangles.jpg',
    to: '/collections',
  },
  {
    title: 'Diamond Jewellery',
    image: '/images/diamond-necklace.jpg',
    to: '/collections',
  },
  {
    title: 'Bridal Jewellery',
    image: '/images/bridal-portrait.jpg',
    to: '/collections',
  },
  {
    title: 'Daily Wear',
    image: '/images/hero-woman.jpg',
    to: '/collections',
  },
  {
    title: 'Traditional Jewellery',
    image: '/images/traditional-jhumkas.jpg',
    to: '/collections',
  },
]

const trustPoints = [
  {
    title: 'BIS Hallmarking',
    copy: 'Every gold piece is hallmarked for certified purity you can verify and trust.',
  },
  {
    title: 'Purity Assurance',
    copy: 'Strict quality checks ensure the fineness and finish behind every jewel.',
  },
  {
    title: 'Transparent Billing',
    copy: 'Clear pricing, itemised bills and no hidden charges — ever.',
  },
  {
    title: 'Exchange & After-Sales',
    copy: 'Fair exchange policies and attentive after-sales care, wherever applicable.',
  },
]

export default function CraftSteps() {
  return (
    <section id="craft" className="relative bg-cream scroll-mt-24" aria-labelledby="craft-heading">
      {/* Intro */}
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-20 lg:px-14">
        <p className="page-eyebrow">Our Craft</p>
        <h2 id="craft-heading" className="page-title mt-3 max-w-2xl text-[2.5rem] md:text-[3.25rem]">
          Heritage, purity &amp; the art of jewellery.
        </h2>
        <p className="page-body mt-4 max-w-xl">
          From our Hanumangarh roots to every hallmarked piece — explore the story, collections and
          showroom experience behind B.L. Hissaria.
        </p>
      </div>

      <HeritageTimeline />

      {/* B. Explore Our Collections */}
      <div className="mt-16 bg-cream-dark/40 py-14 md:mt-20 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="page-eyebrow">B · Collections</p>
              <h3 className="page-title mt-2 text-[2rem] md:text-[2.5rem]">
                Explore Our Collections
              </h3>
              <p className="page-body mt-3 max-w-lg">
                Jewellery for every moment — each category opens our full collection gallery.
              </p>
            </div>
            <Link to="/collections" className="btn-gold">
              View All →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {collectionCards.map((card) => (
              <Link
                key={card.title}
                to={card.to}
                className="group relative block overflow-hidden bg-forest"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/15 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-display text-lg text-cream md:text-xl">
                  {card.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* C. The Showroom Experience */}
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="page-eyebrow">C · Showroom</p>
          <h3 className="page-title mt-2 text-[2rem] md:text-[2.5rem]">
            The Showroom Experience
          </h3>
          <p className="page-body mt-3">
            Step inside — jewellery displays, quiet consultations and the warmth of a house built on
            trust. Imagine your visit.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-5">
          <figure className="relative overflow-hidden md:col-span-7 md:row-span-2">
            <img
              src="/images/storefront-arch.jpg"
              alt="B.L. Hissaria showroom interior arch"
              className="h-full min-h-[280px] w-full object-cover md:min-h-[420px]"
              loading="lazy"
            />
            <figcaption className="absolute bottom-5 left-5 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream/90">
              Showroom Interiors
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden md:col-span-5">
            <img
              src="/images/craftsman-work.jpg"
              alt="Jewellery display and craftsmanship"
              className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:min-h-[200px]"
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream/90">
              Jewellery Displays
            </figcaption>
          </figure>
          <figure className="relative overflow-hidden md:col-span-5">
            <img
              src="/images/contact-arch.jpg"
              alt="Personal consultation atmosphere"
              className="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full md:min-h-[200px]"
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream/90">
              Personal Consultations
            </figcaption>
          </figure>
        </div>
      </div>

      {/* D. Trust & Transparency */}
      <div className="bg-forest">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px]">
            <img
              src="/images/gold-bangles.jpg"
              alt="Hallmarked gold jewellery"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-forest/45" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-gold">
                D · Trust
              </p>
              <p className="mt-2 font-display text-3xl text-cream md:text-4xl">
                Trust &amp; Transparency
              </p>
            </div>
          </div>

          <div className="px-5 py-12 md:px-10 md:py-14 lg:px-12">
            <p className="mt-0 max-w-md font-sans text-[0.9375rem] font-light leading-relaxed text-cream/70">
              BIS hallmarking, purity, clear billing, exchange policies and after-sales care —
              wherever applicable.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {trustPoints.map((item) => (
                <li key={item.title} className="border-t border-cream/15 pt-4">
                  <p className="font-display text-xl text-gold">{item.title}</p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-cream/65">{item.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* E. Visit Our Showroom */}
      <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div>
            <p className="page-eyebrow">E · Visit</p>
            <h3 className="page-title mt-2 text-[2rem] md:text-[2.5rem]">
              Visit Our Showroom
            </h3>
            <p className="page-body mt-3 max-w-md">
              Come see the craft in person — or reach us for an appointment and WhatsApp enquiry.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold">
                  Address
                </dt>
                <dd className="mt-1 font-display text-xl text-forest">
                  {SITE.street}
                  <br />
                  {SITE.city}, {SITE.region} {SITE.postal}
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold">
                  Opening Hours
                </dt>
                <dd className="mt-1 text-sm font-light text-muted">Mon – Sat · 10:00 AM – 8:00 PM</dd>
              </div>
              <div>
                <dt className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold">
                  Contact
                </dt>
                <dd className="mt-1 space-y-1">
                  <a
                    href={`tel:${SITE.phone}`}
                    className="block text-sm text-forest transition-colors hover:text-gold"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="block text-sm text-forest transition-colors hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-forest">
                Book Appointment →
              </Link>
              <a
                href={`https://wa.me/${SITE.phone.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp Enquiry →
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-forest/20 px-5 py-3 font-sans text-[0.65rem] tracking-[0.16em] uppercase text-forest transition-colors hover:border-gold hover:text-gold"
              >
                Open in Maps →
              </a>
            </div>
          </div>

          <div className="overflow-hidden border border-forest/10">
            <iframe
              title="B.L. Hissaria Jewellers on Google Maps"
              src={MAP_EMBED}
              className="block h-[300px] w-full border-0 md:h-[380px] grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeritageTimeline() {
  const pinRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const rafRef = useRef(0)
  const current = timeline[active]

  useEffect(() => {
    const pin = pinRef.current
    if (!pin) return

    const update = () => {
      const rect = pin.getBoundingClientRect()
      const total = Math.max(1, pin.offsetHeight - window.innerHeight)
      const raw = Math.min(1, Math.max(0, -rect.top / total))
      // Hold first step briefly, then advance evenly
      const stepped = raw * timeline.length
      const index = Math.min(timeline.length - 1, Math.floor(stepped))
      setProgress(raw)
      setActive((prev) => (prev === index ? prev : index))
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const fill = `${Math.max(8, progress * 100)}%`

  return (
    <div ref={pinRef} className="relative mt-10 h-[280vh] md:mt-12 md:h-[300vh]">
      <div className="sticky top-0 flex h-dvh items-center bg-cream">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-14">
          {/* Image — sized to fit the sticky viewport with the timeline */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:mx-0 lg:max-w-[360px]">
            <div className="relative h-[min(400px,52vh)] w-full overflow-hidden bg-cream-dark shadow-[0_16px_36px_-20px_rgba(26,46,36,0.35)]">
              {timeline.map((item, i) => (
                <img
                  key={item.title}
                  src={item.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === active
                      ? 'scale-100 opacity-100'
                      : i < active
                        ? '-translate-y-3 scale-[1.04] opacity-0'
                        : 'translate-y-3 scale-[1.04] opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="font-sans text-[0.58rem] tracking-[0.24em] uppercase text-gold">
                  {current.year}
                </p>
                <p
                  key={current.title}
                  className="craft-step-title mt-1 font-display text-lg text-cream md:text-xl"
                >
                  {current.title}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="page-eyebrow">A · Heritage</p>
            <h3 className="page-title mt-2 text-[1.85rem] md:text-[2.35rem]">
              A legacy written in gold.
            </h3>
            <p className="page-body mt-3 max-w-md text-[0.9rem]">
              Scroll to move through our story — the gold line fills as each chapter unfolds.
            </p>

            <ol className="relative mt-7 pl-8">
              <div
                className="absolute bottom-2 left-[0.7rem] top-2 w-[2px] overflow-hidden bg-forest/10"
                aria-hidden
              >
                <div
                  className="heritage-gold-flow w-full origin-top transition-[height] duration-150 ease-out"
                  style={{ height: fill }}
                />
              </div>

              {timeline.map((item, i) => {
                const isActive = i === active
                const isDone = i < active
                return (
                  <li key={item.title} className="relative pb-5 last:pb-0 md:pb-6">
                    <div
                      className={`transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-45'
                      }`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span
                        className={`absolute -left-8 top-1.5 z-10 ml-[0.45rem] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isActive || isDone
                            ? 'border-gold bg-gold shadow-[0_0_0_4px_rgba(197,163,103,0.22)]'
                            : 'border-gold/35 bg-cream'
                        }`}
                      >
                        {isActive && (
                          <span className="heritage-node-pulse absolute inset-0 rounded-full bg-gold/40" />
                        )}
                      </span>

                      <p className="font-sans text-[0.6rem] tracking-[0.22em] uppercase text-gold">
                        {item.year}
                      </p>
                      <p
                        className={`mt-1 font-display text-[1.2rem] transition-colors duration-300 md:text-[1.35rem] ${
                          isActive ? 'text-forest' : 'text-forest/50'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`mt-1.5 max-w-sm overflow-hidden text-[0.8125rem] font-light leading-relaxed text-muted transition-all duration-500 ${
                          isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {item.copy}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
