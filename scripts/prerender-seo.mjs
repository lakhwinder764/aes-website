import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { allSeoPages, absUrl } from '../src/seo/catalog.js'
import { services, site } from '../src/data.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const today = new Date().toISOString().slice(0, 10)

const NAV = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ...services.map((s) => [`/services/${s.slug}`, s.title]),
  ['/partners', 'Partners'],
  ['/faq', 'FAQ'],
  ['/migration', 'Migration'],
  ['/book-appointment', 'Book Appointment'],
  ['/contact', 'Contact'],
  ['/code-of-conduct', 'Code of Conduct'],
]

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function setMeta(html, attr, key, content) {
  const safe = escapeHtml(content)
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"[^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${safe}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function setLink(html, rel, href, extra = '') {
  const re = extra
    ? new RegExp(`<link rel="${rel}"[^>]*${extra}[^>]*>`, 'i')
    : new RegExp(`<link rel="${rel}" href="[^"]*"[^>]*>`, 'i')
  const tag = extra
    ? `<link rel="${rel}" ${extra} href="${href}" />`
    : `<link rel="${rel}" href="${href}" />`
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function crawlBody(page) {
  const title = escapeHtml(page.title)
  const desc = escapeHtml(page.description)
  const nav = NAV.map(([href, label]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('\n        ')
  return `<div id="root">
      <header>
        <p>${escapeHtml(site.name)}</p>
        <nav aria-label="Site">
        ${nav}
        </nav>
      </header>
      <main>
        <h1>${title}</h1>
        <p>${desc}</p>
        <p>${escapeHtml(site.tagline)}. ${escapeHtml(site.marn)}.</p>
        <p>Call <a href="${site.phoneHref}">${escapeHtml(site.phone)}</a>. Email <a href="mailto:${site.email}">${escapeHtml(site.email)}</a>.</p>
        <p>${escapeHtml(site.australia.address)}</p>
        <p>${escapeHtml(site.india.address)}</p>
      </main>
    </div>`
}

function applyPage(html, page) {
  const canonical = absUrl(page.path)
  const img = absUrl(page.image)
  const title = escapeHtml(page.title)
  const desc = escapeHtml(page.description)
  const json = JSON.stringify(page.graph)

  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  out = out.replace(/<html lang="en(?:-AU)?">/, '<html lang="en-AU">')
  out = setMeta(out, 'name', 'description', page.description)
  out = setMeta(out, 'name', 'keywords', page.keywords || '')
  out = setMeta(out, 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  out = setMeta(out, 'name', 'googlebot', 'index, follow, max-image-preview:large')
  out = setLink(out, 'canonical', canonical)
  out = setLink(out, 'sitemap', absUrl('/sitemap.xml'), 'type="application/xml"')
  out = setMeta(out, 'property', 'og:title', page.title)
  out = setMeta(out, 'property', 'og:description', page.description)
  out = setMeta(out, 'property', 'og:url', canonical)
  out = setMeta(out, 'property', 'og:image', img)
  out = setMeta(out, 'name', 'twitter:title', page.title)
  out = setMeta(out, 'name', 'twitter:description', page.description)

  const extras = `
    <link rel="alternate" hreflang="en-AU" href="${canonical}" />
    <link rel="alternate" hreflang="en-IN" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${canonical}" />
    <script type="application/ld+json" id="aes-jsonld">${json}</script>`

  if (out.includes('id="aes-jsonld"')) {
    out = out.replace(/<script type="application\/ld\+json" id="aes-jsonld">[\s\S]*?<\/script>/, '')
  }
  out = out.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>/gi, '')
  out = out.replace('</head>', `${extras}\n  </head>`)

  if (/<div id="root"><\/div>/.test(out)) {
    out = out.replace('<div id="root"></div>', crawlBody(page))
  } else {
    out = out.replace(/<div id="root">[\s\S]*?<\/div>/, crawlBody(page))
  }

  return out
}

function urlXml(loc, changefreq, priority, images = []) {
  const imgs = [...new Set(images.filter(Boolean))]
    .map(
      (src) => `    <image:image>
      <image:loc>${absUrl(src)}</image:loc>
    </image:image>`,
    )
    .join('\n')
  return `  <url>
    <loc>${absUrl(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
${imgs}
  </url>`
}

function robotsTxt() {
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: GPTBot
Allow: /

Sitemap: ${absUrl('/sitemap.xml')}
Sitemap: ${absUrl('/sitemap-index.xml')}
`
}

async function writeSitemaps() {
  const pages = allSeoPages()
  const urls = pages.map((p) => {
    const images = [p.image]
    if (p.path.startsWith('/services/')) {
      const slug = p.path.split('/').pop()
      const service = services.find((s) => s.slug === slug)
      if (service?.banner) images.push(service.banner)
    }
    return urlXml(p.path === '/' ? '/' : p.path, p.changefreq, p.priority, images)
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
  await writeFile(join(root, 'public', 'sitemap.xml'), sitemap)

  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${absUrl('/sitemap.xml')}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`
  await writeFile(join(dist, 'sitemap-index.xml'), index)
  await writeFile(join(root, 'public', 'sitemap-index.xml'), index)
  await writeFile(join(dist, 'robots.txt'), robotsTxt())
  await writeFile(join(root, 'public', 'robots.txt'), robotsTxt())
}

async function main() {
  const template = await readFile(join(dist, 'index.html'), 'utf8')
  const pages = allSeoPages()

  for (const page of pages) {
    const html = applyPage(template, page)
    if (page.path === '/') {
      await writeFile(join(dist, 'index.html'), html)
      continue
    }
    const target = join(dist, page.path.replace(/^\//, ''), 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
  }

  await writeSitemaps()
  console.log(`Prerendered ${pages.length} crawlable HTML routes`)
}

main()
