const features = [
  {
    title: 'Transparent Pricing',
    icon: '/images/why-choose/scale.png',
  },
  {
    title: 'Certified Purity Guarantee',
    icon: '/images/why-choose/bis.png',
  },
  {
    title: 'Exquisite Craftsmanship',
    icon: '/images/why-choose/diamond.png',
  },
  {
    title: 'Trusted for Generations',
    icon: '/images/why-choose/handshake.png',
  },
  {
    title: 'Lifetime Care & Maintenance',
    icon: '/images/why-choose/tools.png',
  },
]

function LotusMark() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden className="text-gold/80">
      <path
        d="M11 15c0 0-3.5-2.5-5.5-5.5C3.5 6.5 3 3.5 3 3.5S6 4 8 6c1 1 2 3 3 5 1-2 2-4 3-5 2-2 5-2.5 5-2.5S16.5 6.5 14.5 9.5C12.5 12.5 11 15 11 15z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M11 15V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export default function WhyChoose() {
  return (
    <section
      className="relative overflow-hidden bg-[#f3eee4]"
      aria-labelledby="why-choose-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(197,163,103,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(197,163,103,0.07), transparent 45%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20 lg:px-14">
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <span className="h-px w-10 bg-gold/55 md:w-16" aria-hidden />
            <h2
              id="why-choose-heading"
              className="font-display text-[1.85rem] italic font-normal leading-tight text-[#8a7040] md:text-[2.35rem] lg:text-[2.6rem]"
            >
              Why Choose B.L. Hissaria?
            </h2>
            <span className="h-px w-10 bg-gold/55 md:w-16" aria-hidden />
          </div>

          <div className="mt-5 flex items-start justify-center gap-3 md:mt-6 md:gap-4">
            <span className="mt-1 shrink-0">
              <LotusMark />
            </span>
            <p className="max-w-xl font-display text-[0.95rem] italic leading-relaxed text-[#9a8050] md:text-[1.05rem]">
              Be a part of life’s precious moments with jewellery built on trust, purity and
              timeless value.
            </p>
            <span className="mt-1 shrink-0">
              <LotusMark />
            </span>
          </div>
        </header>

        <ul className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-y-12 md:mt-16 lg:grid-cols-5 lg:gap-0">
          {features.map((item, i) => (
            <li
              key={item.title}
              className={`relative flex flex-col items-center px-4 text-center lg:px-5 ${
                i < features.length - 1
                  ? 'lg:after:absolute lg:after:right-0 lg:after:top-[12%] lg:after:h-[76%] lg:after:w-px lg:after:bg-gold/30'
                  : ''
              }`}
            >
              <img
                src={item.icon}
                alt=""
                width={140}
                height={140}
                className="h-[108px] w-[108px] object-contain md:h-[120px] md:w-[120px]"
                loading="lazy"
              />
              <p className="mt-5 max-w-[11rem] font-display text-[1.05rem] leading-snug text-[#8a7040] md:text-[1.125rem]">
                {item.title}
              </p>
              <span className="mt-4 h-px w-10 bg-gold/45" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
