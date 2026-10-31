import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

const filters = [
  'All',
  'Bridal',
  'Diamond',
  'Traditional',
  'Everyday',
  'Bangles',
  'Rings',
  'Earrings',
] as const

type Filter = (typeof filters)[number]

const collections = [
  {
    id: 'bridal',
    title: 'Bridal Collection',
    copy: 'For your most precious moments.',
    image: '/images/bridal-portrait.jpg',
    tags: ['Bridal', 'Traditional'] as Filter[],
  },
  {
    id: 'diamond',
    title: 'Diamond Collection',
    copy: 'Brilliance for every occasion.',
    image: '/images/diamond-necklace.jpg',
    tags: ['Diamond', 'Everyday'] as Filter[],
  },
  {
    id: 'traditional',
    title: 'Traditional Collection',
    copy: 'Rooted in heritage.',
    image: '/images/traditional-jhumkas.jpg',
    tags: ['Traditional', 'Earrings'] as Filter[],
  },
  {
    id: 'everyday',
    title: 'Everyday Elegance',
    copy: 'Subtle. Stylish. Timeless.',
    image: '/images/gold-bangles.jpg',
    tags: ['Everyday', 'Bangles'] as Filter[],
  },
]

export default function Collections() {
  const [active, setActive] = useState<Filter>('All')

  const visible = useMemo(() => {
    if (active === 'All') return collections
    return collections.filter((c) => c.tags.includes(active))
  }, [active])

  return (
    <>
      <Seo
        path="/collections"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Collections', path: '/collections' },
        ]}
      />

      <div className="relative overflow-hidden bg-cream pt-16 md:pt-[72px]">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-cover bg-center opacity-30 lg:block"
          style={{ backgroundImage: "url('/images/contact-arch.jpg')" }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-transparent to-cream lg:block" />

        <div className="relative mx-auto max-w-[1440px] px-5 pb-20 pt-10 md:px-10 lg:px-14 lg:pt-12">
          <div className="max-w-2xl">
            <p className="page-eyebrow">Our Collections</p>
            <h1 className="page-title mt-3 text-[2.75rem] md:text-[3.5rem] lg:text-[3.85rem]">
              A Collection for Every Moment
            </h1>
            <p className="page-body mt-4 max-w-xl">
              From traditional heritage pieces to modern designs, explore our collections
              crafted to celebrate your most precious moments.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-forest/10 pb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`relative pb-1 font-sans text-[0.75rem] tracking-[0.14em] uppercase transition-colors ${
                  active === filter ? 'text-forest' : 'text-muted hover:text-forest'
                }`}
              >
                {filter}
                {active === filter && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gold" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {visible.map((item) => (
              <article key={item.id} className="collection-card group overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/88 via-forest/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h2 className="font-display text-[1.45rem] font-medium leading-tight text-cream md:text-[1.6rem]">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 font-sans text-[0.8125rem] font-light text-cream/70">
                      {item.copy}
                    </p>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex items-center gap-1.5 font-sans text-[0.6875rem] tracking-[0.16em] uppercase text-gold transition-colors group-hover:text-gold-light"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-16 text-center font-sans text-sm text-muted">
              More pieces from this category are arriving soon.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
