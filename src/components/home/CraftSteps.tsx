import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    n: '01',
    title: 'Design',
    copy: 'Every silhouette begins with a sketch — balancing heritage motifs with contemporary wearability.',
    image: '/images/bridal-portrait.jpg',
  },
  {
    n: '02',
    title: 'Craft',
    copy: 'Master artisans hand-finish each piece, refining edges, stones, and settings with quiet patience.',
    image: '/images/craftsman-work.jpg',
  },
  {
    n: '03',
    title: 'Assure',
    copy: 'Hallmarking, quality checks, and personal consultation ensure purity you can trust.',
    image: '/images/shop-bw-storefront.jpg',
  },
]

export default function CraftSteps() {
  const pinRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = pinRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const pin = pinRef.current
    if (!pin) return

    const update = () => {
      const rect = pin.getBoundingClientRect()
      const total = Math.max(1, pin.offsetHeight - window.innerHeight)
      const raw = Math.min(1, Math.max(0, -rect.top / total))
      // Hold each step a beat, then ease into the next
      const stepped = raw * steps.length
      const index = Math.min(steps.length - 1, Math.floor(stepped))
      const local = stepped - index
      const blended = (index + local * local * (3 - 2 * local)) / steps.length

      setProgress(blended)
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

  const current = steps[active]
  const railHeight = `${8 + progress * 92}%`
  const ringOffset = 100.53 * (1 - Math.max(0.08, progress))

  const scrollToStep = (i: number) => {
    const pin = pinRef.current
    if (!pin) return
    const total = pin.offsetHeight - window.innerHeight
    const target =
      window.scrollY + pin.getBoundingClientRect().top + ((i + 0.4) / steps.length) * total
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <section id="craft" className="relative bg-cream scroll-mt-24" aria-labelledby="craft-heading">
      {/* Scroll runway — animation plays while panel is pinned */}
      <div ref={pinRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-dvh flex-col justify-center bg-cream">
          <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full border border-gold/10" aria-hidden />
          <div className="pointer-events-none absolute -right-16 bottom-24 h-72 w-72 rounded-full border border-gold/10" aria-hidden />

          <div className="relative mx-auto w-full max-w-[1440px] px-5 py-20 md:px-10 lg:px-14">
            <div
              className={`max-w-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <p className="page-eyebrow">Our Craft</p>
              <h2
                id="craft-heading"
                className="page-title mt-2 text-[2.15rem] md:text-[2.75rem] lg:text-[3.1rem]"
              >
                Made by hand. Meant to last.
              </h2>
            </div>

            <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
              {/* Image — height capped so it never clips in the sticky viewport */}
              <div
                className={`relative mx-auto w-full max-w-[300px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-[340px] lg:mx-0 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <div className="relative h-[min(380px,48vh)] w-full overflow-hidden bg-cream-dark shadow-[0_18px_40px_-24px_rgba(26,46,36,0.4)]">
                  {steps.map((step, i) => {
                    const isOn = i === active
                    return (
                      <img
                        key={step.n}
                        src={step.image}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOn
                            ? 'translate-y-0 scale-100 opacity-100'
                            : i < active
                              ? '-translate-y-3 scale-[1.02] opacity-0'
                              : 'translate-y-3 scale-[1.02] opacity-0'
                        } ${i === 2 ? 'grayscale' : ''}`}
                      />
                    )
                  })}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="font-sans text-[0.55rem] tracking-[0.28em] uppercase text-gold">
                      Step {current.n}
                    </p>
                    <p
                      key={current.title}
                      className="craft-step-title mt-1 font-display text-xl text-cream md:text-2xl"
                    >
                      {current.title}
                    </p>
                  </div>

                  <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden>
                      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(245,242,235,0.25)" strokeWidth="1.5" />
                      <circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#C5A367"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={100.53}
                        strokeDashoffset={ringOffset}
                        className="transition-[stroke-dashoffset] duration-200 ease-out"
                      />
                    </svg>
                    <span className="font-display text-[0.7rem] text-cream">{current.n}</span>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <ol className="relative">
                <div className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-forest/10" aria-hidden>
                  <div
                    className="w-full origin-top bg-gold transition-[height] duration-200 ease-out"
                    style={{ height: visible ? railHeight : '0%' }}
                  />
                </div>

                {steps.map((step, i) => {
                  const isActive = i === active
                  const isDone = i < active
                  return (
                    <li
                      key={step.n}
                      className={`relative transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                      }`}
                      style={{ transitionDelay: visible ? `${80 + i * 60}ms` : '0ms' }}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToStep(i)}
                        className={`group flex w-full gap-4 rounded-sm px-2 py-3.5 text-left transition-colors duration-300 md:gap-5 md:px-3 md:py-4 ${
                          isActive ? 'bg-cream-dark/55' : 'hover:bg-cream-dark/25'
                        }`}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span
                          className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.6rem] tracking-wider transition-all duration-300 ${
                            isActive || isDone
                              ? 'border-gold bg-gold text-forest shadow-[0_0_0_5px_rgba(197,163,103,0.14)]'
                              : 'border-forest/20 bg-cream text-forest/35'
                          }`}
                        >
                          {isDone && !isActive ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            step.n
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span
                              className={`font-display text-[1.45rem] leading-none transition-all duration-300 md:text-[1.7rem] ${
                                isActive ? 'text-forest' : 'text-forest/40'
                              }`}
                            >
                              {step.title}
                            </span>
                            <span
                              className={`font-display text-xl transition-all duration-300 md:text-2xl ${
                                isActive ? 'text-gold/45' : 'text-gold/12'
                              }`}
                            >
                              {step.n}
                            </span>
                          </span>
                          <span
                            className={`mt-1.5 block max-w-sm overflow-hidden font-sans text-[0.8125rem] font-light leading-relaxed text-muted transition-all duration-300 ${
                              isActive ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {step.copy}
                          </span>
                          <span
                            className={`mt-3 block h-px origin-left bg-gold transition-transform duration-300 ${
                              isActive ? 'scale-x-100' : 'scale-x-0'
                            }`}
                            aria-hidden
                          />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Continues after craft animation */}
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-2 md:px-10 lg:px-14 lg:pb-20">
        <div className="grid lg:grid-cols-2">
          <div className="relative flex min-h-[200px] items-center border border-gold/25 bg-forest px-8 py-10 md:px-12">
            <span className="craft-sparkle absolute right-6 top-6 text-gold/70" aria-hidden>✦</span>
            <blockquote className="font-display text-[1.5rem] italic leading-snug text-cream md:text-[1.85rem]">
              “More than jewellery, we create heirlooms for your tomorrow.”
            </blockquote>
          </div>
          <div className="relative min-h-[200px] overflow-hidden">
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
    </section>
  )
}
