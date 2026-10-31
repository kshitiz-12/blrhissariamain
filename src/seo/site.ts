export const SITE = {
  name: 'B.L. Hissaria Jewellers Pvt. Ltd.',
  shortName: 'B.L. Hissaria',
  url: 'https://www.blhissariajewellers.com',
  locale: 'en_IN',
  language: 'en-IN',
  phone: '+918041234567',
  phoneDisplay: '+91 80 4123 4567',
  email: 'info@blhissariajewellers.com',
  street: '123, M.G. Road',
  city: 'Bengaluru',
  region: 'Karnataka',
  postal: '560001',
  country: 'IN',
  hours: 'Mo-Sa 10:00-20:00',
  description:
    'B.L. Hissaria Jewellers Pvt. Ltd. — exquisite hallmarked jewellery in Bengaluru. Bridal, diamond, traditional and everyday collections crafted with trust for generations.',
  keywords: [
    'B.L. Hissaria Jewellers',
    'jewellery Bengaluru',
    'gold jewellery Bangalore',
    'bridal jewellery',
    'diamond jewellery',
    'hallmarked gold',
    'traditional jewellery',
    'MG Road jewellers',
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
    title: 'B.L. Hissaria Jewellers | Timeless Jewellery in Bengaluru',
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
      'For generations, B.L. Hissaria has stood for trust, craftsmanship and enduring beauty. Discover our heritage jewellery house in Bengaluru.',
    path: '/about',
    image: '/images/shop-bw-storefront.jpg',
  },
  '/contact': {
    title: 'Contact & Book Appointment | B.L. Hissaria Jewellers Bengaluru',
    description:
      'Visit B.L. Hissaria Jewellers on M.G. Road, Bengaluru or book a private appointment. Call +91 80 4123 4567 · Mon–Sat 10AM–8PM.',
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
      latitude: 12.9716,
      longitude: 77.5946,
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
      name: 'Bengaluru',
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
