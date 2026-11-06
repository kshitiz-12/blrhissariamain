import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import CraftSteps from '../components/home/CraftSteps'
import WhyChoose from '../components/home/WhyChoose'

const stats = [
  { value: '50+', label: 'Years of Trust' },
  { value: '1L+', label: 'Happy Customers' },
  { value: '100%', label: 'Hallmarked Jewellery' },
]

export default function Home() {
  return (
    <>
      <Seo path="/" breadcrumbs={[{ name: 'Home', path: '/' }]} />

      <section
        className="relative min-h-screen overflow-hidden bg-forest"
        aria-label="Hero — Jewellery that tells your story"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero-woman.jpg"
            alt="Woman in emerald attire wearing ornate gold and emerald jewellery by B.L. Hissaria"
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="hero-photo h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 hero-shade" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 pt-28 md:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-1 flex-col justify-center pb-6 pt-4">
            <div className="max-w-[22rem] sm:max-w-[28rem] md:max-w-[34rem] lg:max-w-[38rem]">
              <p className="hero-eyebrow animate-fade-up text-cream/90 md:text-[0.75rem]">
                Timeless by Generations
              </p>
              <h1 className="hero-title animate-fade-up delay-1 mt-5 text-[3.4rem] text-cream sm:text-[4.1rem] md:text-[4.85rem] lg:text-[5.5rem]">
                Jewellery that
                <br />
                tells your story.
              </h1>
              <p className="hero-sub animate-fade-up delay-2 mt-6 max-w-[27rem] text-[0.95rem] text-cream/68 md:mt-7 md:text-[1.0625rem]">
                Exquisite designs. Unwavering quality. A legacy of trust for generations.
              </p>
              <Link
                to="/collections"
                className="animate-fade-up delay-3 mt-9 inline-flex items-center gap-2.5 bg-gold px-8 py-3.5 font-sans text-[0.7rem] font-medium tracking-[0.18em] uppercase text-forest transition-colors hover:bg-gold-light"
              >
                Explore Our Collections
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-4 flex flex-wrap items-stretch pb-10 md:pb-14">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pr-8 md:pr-14 ${i > 0 ? 'border-l border-gold/40 pl-8 md:pl-14' : ''}`}
              >
                <p className="hero-stat-value text-[2.25rem] leading-none text-gold md:text-[2.85rem]">
                  {stat.value}
                </p>
                <p className="hero-stat-label mt-2.5 text-[0.625rem] text-cream/55 md:text-[0.6875rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <WhyChoose />
      <CraftSteps />
    </>
  )
}
