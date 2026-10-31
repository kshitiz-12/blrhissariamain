import { Helmet } from 'react-helmet-async'
import {
  PAGES,
  SITE,
  absoluteUrl,
  breadcrumbJsonLd,
  organizationJsonLd,
  websiteJsonLd,
  type PageSeo,
} from '../seo/site'

type SeoProps = {
  path: string
  breadcrumbs?: { name: string; path: string }[]
  override?: Partial<PageSeo>
}

export default function Seo({ path, breadcrumbs, override }: SeoProps) {
  const page = { ...(PAGES[path] ?? PAGES['/']), ...override }
  const title = page.title
  const description = page.description
  const canonical = absoluteUrl(page.path)
  const image = absoluteUrl(page.image ?? SITE.ogImage)
  const type = page.type ?? 'website'

  const graphs: Record<string, unknown>[] = [organizationJsonLd(), websiteJsonLd()]
  if (breadcrumbs?.length) graphs.push(breadcrumbJsonLd(breadcrumbs))

  return (
    <Helmet>
      <html lang={SITE.language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={SITE.keywords.join(', ')} />
      <meta name="author" content={SITE.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0B1C14" />
      <meta name="color-scheme" content="light" />
      <meta name="geo.region" content="IN-KA" />
      <meta name="geo.placename" content="Bengaluru" />
      <meta name="geo.position" content="12.9716;77.5946" />
      <meta name="ICBM" content="12.9716, 77.5946" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(graphs)}</script>
    </Helmet>
  )
}
