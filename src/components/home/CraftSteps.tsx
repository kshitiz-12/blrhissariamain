import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    n: '01',
    title: 'Design',
    copy: 'Every silhouette begins with a sketch — balancing heritage motifs with contemporary wearability.',
  },
  {
    n: '02',
    title: 'Craft',
    copy: 'Master artisans hand-finish each piece, refining edges, stones, and settings with quiet patience.',
  },
  {
    n: '03',
    title: 'Assure',
    copy: 'Hallmarking, quality checks, and personal consultation ensure purity you can trust.',
  },
]

export default function CraftSteps() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 3200)
    return () => window.clearInterval(id)
  }, [visible])

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream scroll-mt-24"
      aria-labelledby="craft-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 lg:px-14 lg:py-28">
        <div
          className={`max-w-2xl transition-all duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <p className="page-eyebrow">Our Craft</p>
          <h2 id="craft-heading" className="page-title mt-3 text-[2.75rem] md:text-[3.5rem] lg:text-[3.85rem]">
            Made by hand.
            <br />
            Meant to last.
          </h2>
          <p className="page-body mt-5 max-w-lg">
            At B.L. Hissaria, craftsmanship is the heart of the house — from the first line on paper
            to the final polish.
          </p>
        </div>

        <div className="relative mt-14 md:mt-20">
          {/* Progress line */}
          <div className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-px bg-forest/10 md:block" aria-hidden>
            <div
              className="h-full bg-gold transition-all duration-700 ease-out"
              style={{ width: visible ? `${((active + 1) / steps.length) * 100}%` : '0%' }}
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => {
              const on = visible && i <= active
              const current = visible && i === active
              return (
                <li
                  key={step.n}
                  className={`relative transition-all duration-700 ease-out ${
                    visible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: visible ? `${180 + i * 160}ms` : '0ms' }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group w-full text-left"
                    aria-current={current ? 'step' : undefined}
                  >
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-[0.7rem] font-sans tracking-wider transition-all duration-500 ${
                          on
                            ? 'border-gold bg-gold text-forest scale-110'
                            : 'border-forest/20 bg-cream text-forest/40'
                        }`}
                      >
                        {step.n}
                      </span>
                      <span
                        className={`font-display text-[2.75rem] leading-none transition-colors duration-500 ${
                          current ? 'text-gold' : 'text-gold/25'
                        }`}
                      >
                        {step.n}
                      </span>
                    </div>

                    <h3
                      className={`page-title text-[1.85rem] transition-colors duration-500 md:text-[2.1rem] ${
                        current ? 'text-forest' : 'text-forest/55'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`page-body mt-3 max-w-xs transition-all duration-500 ${
                        current ? 'opacity-100 translate-y-0' : 'opacity-55'
                      }`}
                    >
                      {step.copy}
                    </p>

                    <span
                      className={`mt-5 block h-px origin-left bg-gold transition-transform duration-700 ${
                        current ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div
          className={`mt-16 overflow-hidden transition-all duration-1000 ease-out md:mt-20 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: visible ? '700ms' : '0ms' }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative flex min-h-[260px] items-center border border-gold/25 bg-forest px-8 py-12 md:px-12">
              <span className="absolute right-6 top-6 text-gold/70" aria-hidden>✦</span>
              <blockquote className="font-display text-[1.75rem] italic leading-snug text-cream md:text-[2.1rem]">
                “More than jewellery, we create heirlooms for your tomorrow.”
              </blockquote>
            </div>
            <div className="relative min-h-[260px] overflow-hidden">
              <img
                src="/images/craftsman-work.jpg"
                alt="Artisan crafting jewellery"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-forest/20" />
              <p className="absolute bottom-5 right-6 font-sans text-[0.625rem] tracking-[0.22em] uppercase text-cream/85">
                The Art Behind Every Piece
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
