export const SITE = {
  name: 'B.L. Hissaria Jewellers Pvt. Ltd.',
  shortName: 'B.L. Hissaria',
  url: 'https://www.blhissaria.com',
  locale: 'en_IN',
  language: 'en-IN',
  phone: '+918696200007',
  phoneDisplay: '+91 86962 00007',
  email: 'Blhissaria@gmail.com',
  street: 'Old Market Rd',
  city: 'Hanumangarh',
  region: 'Rajasthan',
  postal: '335513',
  country: 'IN',
  latitude: 29.582178,
  longitude: 74.3251981,
  mapsUrl:
    'https://www.google.com/maps/place/B.L.+Hissaria+Jewellers+pvt.+Ltd.+%7C+Best+Gold+Jewellery+Stores+in+Hanumangarh+%7C+Top+Jewellers+in+Hanumangarh/@29.582178,74.3226232,17z/data=!3m1!4b1!4m6!3m5!1s0x39168cb276b0f067:0x7d6a871cb2f0f384!8m2!3d29.582178!4d74.3251981!16s%2Fg%2F11b5phwcpf?entry=ttu',
  hours: 'Mo-Sa 10:00-20:00',
  description:
    'B.L. Hissaria Jewellers Pvt. Ltd. — exquisite hallmarked jewellery in Hanumangarh, Rajasthan. Bridal, diamond, traditional and everyday collections crafted with trust for generations.',
  keywords: [
    'B.L. Hissaria Jewellers',
    'jewellery Hanumangarh',
    'gold jewellery Hanumangarh',
    'best jewellers Hanumangarh',
    'bridal jewellery',
    'diamond jewellery',
    'hallmarked gold',
    'traditional jewellery Rajasthan',
  ],
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    pinterest: 'https://www.pinterest.com/',
  },
  ogImage: '/images/hero-woman.jpg',
} as const

export type PageSeo = {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}

export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'B.L. Hissaria Jewellers | Timeless Jewellery in Hanumangarh',
    description: SITE.description,
    path: '/',
    image: '/images/hero-woman.jpg',
  },
  '/collections': {
    title: 'Jewellery Collections | Bridal, Diamond & Traditional | B.L. Hissaria',
    description:
      'Explore bridal, diamond, traditional and everyday jewellery collections at B.L. Hissaria Jewellers — crafted for every precious moment.',
    path: '/collections',
    image: '/images/bridal-portrait.jpg',
  },
  '/about': {
    title: 'About Us | A Legacy of Trust | B.L. Hissaria Jewellers',
    description:
      'For generations, B.L. Hissaria has stood for trust, craftsmanship and enduring beauty. Discover our heritage jewellery house in Hanumangarh.',
    path: '/about',
    image: '/images/shop-bw-storefront.jpg',
  },
  '/contact': {
    title: 'Contact & Book Appointment | B.L. Hissaria Jewellers Hanumangarh',
    description:
      'Visit B.L. Hissaria Jewellers in Hanumangarh, Rajasthan or book a private appointment. Call +91 86962 00007 · Mon–Sat 10AM–8PM.',
    path: '/contact',
    image: '/images/contact-arch.jpg',
  },
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: absoluteUrl('/images/logo-transparent.png'),
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    hasMap: SITE.mapsUrl,
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postal,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '20:00',
    },
    sameAs: Object.values(SITE.social),
    areaServed: {
      '@type': 'City',
      name: 'Hanumangarh',
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/collections?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
