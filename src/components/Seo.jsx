import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data.js'
import { absUrl, getPageSeo } from '../seo/catalog.js'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${CSS.escape(key)}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', String(content))
}

function upsertLink(rel, href, extra = {}) {
  const extraSel = Object.entries(extra)
    .map(([k, v]) => `[${k}="${CSS.escape(String(v))}"]`)
    .join('')
  const base = extraSel
    ? `link[rel="${rel}"]${extraSel}`
    : `link[rel="${rel}"]:not([hreflang]):not([data-id])`
  let el = document.head.querySelector(base)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(data) {
  let el = document.getElementById('aes-jsonld')
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'aes-jsonld'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  path,
  type = 'website',
  jsonLd,
}) {
  const { pathname } = useLocation()
  const canonical = absUrl(path ?? pathname)
  const fullTitle = /anand education/i.test(title) || title.includes(site.short) ? title : `${title} | ${site.name}`
  const img = absUrl(image || site.ogImage)
  const ldKey = JSON.stringify(jsonLd ?? null)

  useEffect(() => {
    document.documentElement.lang = 'en-AU'
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertMeta('name', 'keywords', keywords)
    upsertMeta('name', 'author', site.name)
    upsertMeta('name', 'publisher', site.name)
    upsertMeta('name', 'copyright', site.name)
    upsertMeta('name', 'application-name', site.short)
    upsertMeta('name', 'apple-mobile-web-app-title', site.name)
    upsertMeta('name', 'apple-mobile-web-app-capable', 'yes')
    upsertMeta('name', 'mobile-web-app-capable', 'yes')
    upsertMeta('name', 'format-detection', 'telephone=yes')
    upsertMeta('name', 'referrer', 'strict-origin-when-cross-origin')
    upsertMeta('name', 'color-scheme', 'light')
    upsertMeta('name', 'theme-color', '#0b1f3a')
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    upsertMeta('name', 'googlebot', 'index, follow, max-image-preview:large')
    upsertMeta('name', 'bingbot', 'index, follow')
    upsertMeta('name', 'language', 'English')
    upsertMeta('http-equiv', 'content-language', 'en-AU')
    upsertMeta('name', 'geo.region', 'AU-NSW')
    upsertMeta('name', 'geo.placename', 'Blacktown')
    upsertMeta('name', 'geo.position', `${site.australia.geo.lat};${site.australia.geo.lng}`)
    upsertMeta('name', 'ICBM', `${site.australia.geo.lat}, ${site.australia.geo.lng}`)
    upsertMeta('name', 'rating', 'general')
    upsertMeta('name', 'revisit-after', '7 days')

    upsertLink('canonical', canonical)
    upsertLink('alternate', canonical, { hreflang: 'en-AU' })
    upsertLink('alternate', canonical, { hreflang: 'en-IN' })
    upsertLink('alternate', canonical, { hreflang: 'x-default' })
    upsertLink('manifest', '/site.webmanifest')
    upsertLink('dns-prefetch', 'https://maps.google.com')
    upsertLink('me', site.social.facebook, { 'data-id': 'facebook' })
    upsertLink('me', site.social.instagram, { 'data-id': 'instagram' })

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:locale', 'en_AU')
    upsertMeta('property', 'og:locale:alternate', 'en_IN')
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', img)
    upsertMeta('property', 'og:image:secure_url', img)
    upsertMeta('property', 'og:image:type', 'image/jpeg')
    upsertMeta('property', 'og:image:width', '1920')
    upsertMeta('property', 'og:image:height', '1080')
    upsertMeta('property', 'og:image:alt', fullTitle)
    upsertMeta('property', 'og:see_also', site.social.facebook)
    upsertMeta('property', 'business:contact_data:street_address', site.australia.street)
    upsertMeta('property', 'business:contact_data:locality', site.australia.locality)
    upsertMeta('property', 'business:contact_data:region', site.australia.region)
    upsertMeta('property', 'business:contact_data:postal_code', site.australia.postal)
    upsertMeta('property', 'business:contact_data:country_name', 'Australia')
    upsertMeta('property', 'place:location:latitude', String(site.australia.geo.lat))
    upsertMeta('property', 'place:location:longitude', String(site.australia.geo.lng))

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', img)
    upsertMeta('name', 'twitter:image:alt', fullTitle)

    if (ldKey && ldKey !== 'null') {
      setJsonLd(JSON.parse(ldKey))
    }
  }, [fullTitle, description, keywords, canonical, img, type, ldKey])

  return null
}

export function PageSeo({ path }) {
  const { pathname } = useLocation()
  const page = getPageSeo(path || pathname)
  if (!page) return null
  return (
    <Seo
      title={page.title}
      description={page.description}
      keywords={page.keywords}
      image={page.image}
      path={page.path}
      type={page.type}
      jsonLd={page.graph}
    />
  )
}

export { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '../seo/catalog.js'
