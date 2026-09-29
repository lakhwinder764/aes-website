import {
  blogs,
  faqs,
  migration,
  partners,
  serviceFaqs,
  services,
  site,
  testimonials,
} from '../data.js'

export function absUrl(path = '/') {
  const origin = site.url.replace(/\/$/, '')
  if (!path) return `${origin}/`
  if (path.startsWith('http')) return path
  return origin + (path.startsWith('/') ? path : `/${path}`)
}

function orgId() {
  return absUrl('/#organization')
}

export function organizationGraph() {
  const au = site.australia
  const inn = site.india
  return {
    '@type': ['EducationalOrganization', 'ProfessionalService'],
    '@id': orgId(),
    name: site.name,
    alternateName: [site.short, 'Anand Education Services', 'AES Migration'],
    url: site.url,
    image: [absUrl(site.ogImage), absUrl('/assets/logo.png')],
    logo: {
      '@type': 'ImageObject',
      url: absUrl('/assets/logo.png'),
      caption: site.name,
    },
    email: site.email,
    telephone: [site.phone, site.mobile],
    description: `${site.name} — ${site.tagline}. Student visas, work visas, permanent residency and citizenship applications in Australia. ${site.marn}.`,
    foundingLocation: {
      '@type': 'Place',
      name: 'Blacktown, NSW',
      address: {
        '@type': 'PostalAddress',
        addressLocality: au.locality,
        addressRegion: au.region,
        addressCountry: au.country,
      },
    },
    identifier: {
      '@type': 'PropertyValue',
      name: 'MARN',
      value: site.marn,
    },
    knowsAbout: services.map((s) => s.title),
    sameAs: [site.social.facebook, site.social.instagram],
    areaServed: [
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Australian visa and education services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          url: absUrl(`/services/${s.slug}`),
        },
      })),
    },
    department: [
      localBusinessNode('au', au, [site.phone, site.mobile]),
      localBusinessNode('in', inn, [site.phone, site.mobile]),
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.text,
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    })),
  }
}

function localBusinessNode(id, office, phone) {
  return {
    '@type': 'LocalBusiness',
    '@id': absUrl(`/#office-${id}`),
    name: `${site.name} — ${office.label}`,
    parentOrganization: { '@id': orgId() },
    telephone: phone,
    email: site.email,
    url: absUrl('/contact'),
    image: absUrl(site.ogImage),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '18:00',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.street,
      addressLocality: office.locality,
      addressRegion: office.region,
      postalCode: office.postal,
      addressCountry: office.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.geo.lat,
      longitude: office.geo.lng,
    },
    hasMap: office.map,
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    '@id': absUrl(`${items[items.length - 1].path}#breadcrumb`),
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function faqJsonLd(list, path = '/faq') {
  const unique = []
  const seen = new Set()
  for (const f of list || []) {
    if (seen.has(f.q)) continue
    seen.add(f.q)
    unique.push(f)
  }
  if (!unique.length) return null
  return {
    '@type': 'FAQPage',
    '@id': absUrl(`${path}#faq`),
    mainEntity: unique.map((f, i) => ({
      '@type': 'Question',
      '@id': absUrl(`${path}#q-${i + 1}`),
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceJsonLd(service) {
  return {
    '@type': 'Service',
    '@id': absUrl(`/services/${service.slug}#service`),
    name: service.title,
    description: service.seo?.description || service.intro?.[0] || service.excerpt,
    url: absUrl(`/services/${service.slug}`),
    image: absUrl(service.image || site.ogImage),
    provider: { '@id': orgId() },
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: service.title,
    audience: { '@type': 'Audience', geographicArea: { '@type': 'Country', name: 'Australia' } },
    termsOfService: absUrl('/code-of-conduct'),
  }
}

function howToJsonLd(service) {
  return {
    '@type': 'HowTo',
    name: service.processTitle,
    description: service.processLead || service.seo?.description,
    totalTime: 'P60D',
    step: service.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.text,
      url: absUrl(`/services/${service.slug}#step-${i + 1}`),
    })),
  }
}

function webSiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': absUrl('/#website'),
    url: site.url,
    name: site.name,
    description: site.tagline,
    inLanguage: ['en-AU', 'en-IN'],
    publisher: { '@id': orgId() },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.lead', '.section-title'],
    },
  }
}

function webPageJsonLd({ path, title, description, type = 'WebPage', extras = {} }) {
  return {
    '@type': type,
    '@id': absUrl(`${path}#webpage`),
    url: absUrl(path),
    name: title,
    description,
    inLanguage: 'en-AU',
    isPartOf: { '@id': absUrl('/#website') },
    about: { '@id': orgId() },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absUrl(extras.image || site.ogImage),
    },
    ...extras.page,
  }
}

function uniqueFaqs() {
  return [...faqs.visa, ...faqs.support]
}

export function buildGraph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationGraph(), webSiteJsonLd(), ...nodes.filter(Boolean)],
  }
}

function page({
  path,
  title,
  description,
  keywords,
  image,
  type = 'website',
  graph = [],
  priority = 0.8,
  changefreq = 'monthly',
}) {
  const fullTitle =
    /anand education/i.test(title) || title.includes(site.short)
      ? title
      : `${title} | ${site.name}`
  return {
    path,
    title: fullTitle,
    description,
    keywords,
    image: image || site.ogImage,
    type,
    graph: buildGraph(graph),
    priority,
    changefreq,
  }
}

export function getPageSeo(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const mapped = clean.replace(/^\/ourservices\//, '/services/')
  return pagesByPath[mapped] || null
}

export function allSeoPages() {
  return Object.values(pagesByPath)
}

const homeTitle = `${site.name} | Visa & Education Consultation`
const homeDesc =
  'Anand Education and Migration Services helps students, workers and families with Australian student visas, work visas, permanent residency and citizenship. Blacktown NSW and Karnal, India. MARN 2619232.'

const pagesByPath = {
  '/': page({
    path: '/',
    title: homeTitle,
    description: homeDesc,
    keywords:
      'Anand Education, AES, visa consultant Blacktown, student visa Australia, work visa, PR, citizenship, MARN 2619232',
    priority: 1,
    changefreq: 'weekly',
    graph: [
      webPageJsonLd({
        path: '/',
        title: homeTitle,
        description: homeDesc,
        type: 'WebPage',
        extras: {
          page: {
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['h1', '.hero-copy p', '.section-title'],
            },
          },
        },
      }),
      breadcrumbJsonLd([{ name: 'Home', path: '/' }]),
      {
        '@type': 'ItemList',
        name: 'Visa services',
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absUrl(`/services/${s.slug}`),
          name: s.title,
        })),
      },
      ...services.map((s) => serviceJsonLd(s)),
      {
        '@type': 'ItemList',
        name: 'Partner institutions',
        itemListElement: partners.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
        })),
      },
      {
        '@type': 'Blog',
        name: 'Visa and immigration updates',
        blogPost: blogs.map((b) => ({
          '@type': 'BlogPosting',
          headline: b.title,
          description: b.seo?.description || b.excerpt,
          datePublished: b.date,
          image: absUrl(b.image),
          author: { '@id': orgId() },
          publisher: { '@id': orgId() },
        })),
      },
      {
        '@type': 'VideoObject',
        name: `${site.name} education and migration`,
        description: site.tagline,
        thumbnailUrl: absUrl(site.ogImage),
        contentUrl: site.videos.hero,
        uploadDate: '2026-01-01',
      },
      faqJsonLd(uniqueFaqs(), '/faq'),
    ],
  }),
  '/about': page({
    path: '/about',
    title: 'About Anand Education and Migration Services',
    description:
      'Learn about Anand Education and Migration Services: years of Australian education and immigration support for students, professionals and families. Blacktown NSW and Karnal, India. MARN 2619232.',
    keywords: 'about Anand Education, AES Blacktown, migration consultants, Australian immigration, education consultancy',
    image: '/assets/images/bg-about.jpg',
    graph: [
      webPageJsonLd({
        path: '/about',
        title: 'About Anand Education and Migration Services',
        description: 'History, mission and client stories from Anand Education and Migration Services.',
        type: 'AboutPage',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  }),
  '/services': page({
    path: '/services',
    title: 'Australian Visa & Immigration Services',
    description:
      'Student visa, work visa, permanent residency and citizenship applications with Anand Education and Migration Services. Process, documents and personalised consultancy in Australia and India.',
    keywords: 'visa services Australia, student visa, work visa, PR, citizenship, immigration consultant Blacktown',
    image: '/assets/images/art-services.jpg',
    priority: 0.9,
    changefreq: 'weekly',
    graph: [
      webPageJsonLd({
        path: '/services',
        title: 'Australian Visa & Immigration Services',
        description: 'Visa and immigration services from Anand Education and Migration Services.',
        type: 'CollectionPage',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
      ...services.map((s) => serviceJsonLd(s)),
    ],
  }),
  '/partners': page({
    path: '/partners',
    title: 'Partner Universities & Institutions in Australia',
    description:
      'Anand Education and Migration Services partners with Trinity Institute, Federation University, Campbell Institute, Chambers School of Business, ANIE and Kings Institute for Australian study pathways.',
    keywords:
      'Australian university partners, Trinity Institute, Federation University, Campbell Institute, ANIE, Kings Institute, AES partners',
    image: '/assets/images/art-partners.jpg',
    graph: [
      webPageJsonLd({
        path: '/partners',
        title: 'Partner Universities & Institutions in Australia',
        description: 'Education partners of Anand Education and Migration Services.',
        type: 'CollectionPage',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Partners', path: '/partners' },
      ]),
      {
        '@type': 'ItemList',
        name: 'Education partners',
        itemListElement: partners.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
        })),
      },
    ],
  }),
  '/faq': page({
    path: '/faq',
    title: 'Visa & Immigration FAQ',
    description:
      'Answers on Australian transit, visitor, student, work and PR visas, interviews, VEVO and processing times from Anand Education and Migration Services.',
    keywords: 'Australia visa FAQ, transit visa 771, visitor visa, VEVO, student visa stay, Anand Education FAQ',
    image: '/assets/images/bg-faq.jpg',
    graph: [
      webPageJsonLd({
        path: '/faq',
        title: 'Visa & Immigration FAQ',
        description: 'Frequently asked visa questions.',
        type: 'WebPage',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
      faqJsonLd(uniqueFaqs(), '/faq'),
    ],
  }),
  '/migration': page({
    path: '/migration',
    title: 'Australia Migration Pathways & Agent Support',
    description: `${migration.intro} ${site.name} covers study, skilled work, partner and PR planning from Blacktown and Karnal.`,
    keywords: 'AES migration, registered migration agent, skilled migration Australia, partner visa, PR pathway, Blacktown',
    image: '/assets/images/art-migration.jpg',
    graph: [
      webPageJsonLd({
        path: '/migration',
        title: 'Australia Migration Pathways & Agent Support',
        description: migration.intro,
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Migration', path: '/migration' },
      ]),
      {
        '@type': 'Service',
        name: 'Australia migration consultation',
        provider: { '@id': orgId() },
        description: migration.intro,
        url: absUrl('/migration'),
      },
      {
        '@type': 'Person',
        name: migration.agent.name,
        jobTitle: migration.agent.role,
        description: migration.agent.bio,
        image: absUrl(migration.agent.photo),
        worksFor: { '@id': orgId() },
      },
    ],
  }),
  '/book-appointment': page({
    path: '/book-appointment',
    title: 'Book an Appointment with a Migration Agent',
    description: `Request a weekday consultation with ${site.name} in Blacktown NSW, Karnal India, or online. Hours 10:00 AM – 6:00 PM. ${site.marn}.`,
    keywords: 'book migration agent appointment, visa consultation Blacktown, AES appointment, registered migration agent consult',
    image: '/assets/images/art-migration.jpg',
    graph: [
      webPageJsonLd({
        path: '/book-appointment',
        title: 'Book an Appointment with a Migration Agent',
        description: 'Request a consultation with a registered migration agent.',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Migration', path: '/migration' },
        { name: 'Book Appointment', path: '/book-appointment' },
      ]),
    ],
  }),
  '/contact': page({
    path: '/contact',
    title: 'Contact Anand Education and Migration Services',
    description: `Book a visa consultation in Blacktown NSW (${site.australia.address}) or Karnal, India. Call ${site.phone}. Email ${site.email}. ${site.marn}.`,
    keywords: 'contact Anand Education, visa consultant Blacktown, Karnal office, book consultation, MARN 2619232',
    image: '/assets/images/bg-contact.jpg',
    graph: [
      webPageJsonLd({
        path: '/contact',
        title: `Contact ${site.name}`,
        description: 'Book a visa consultation.',
        type: 'ContactPage',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  }),
  '/code-of-conduct': page({
    path: '/code-of-conduct',
    title: 'Code of Conduct for Registered Migration Agents',
    description:
      'Anand Education and Migration Services follows the official Code of Conduct for registered migration agents. Read or download the PDF. MARN 2619232.',
    keywords: 'migration agent code of conduct, registered migration agent, MARN, professional standards, Anand Education',
    image: '/assets/images/art-conduct.jpg',
    changefreq: 'yearly',
    priority: 0.5,
    graph: [
      webPageJsonLd({
        path: '/code-of-conduct',
        title: 'Code of Conduct for registered migration agents',
        description: 'Official code of conduct PDF for registered migration agents.',
      }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Code of Conduct', path: '/code-of-conduct' },
      ]),
      {
        '@type': 'DigitalDocument',
        name: 'Code of Conduct for registered migration agents',
        encodingFormat: 'application/pdf',
        url: absUrl('/assets/code-of-conduct.pdf'),
      },
    ],
  }),
}

for (const service of services) {
  const seo = service.seo || {}
  const description = seo.description || service.intro?.[0] || service.excerpt
  const title = seo.title || `${service.title} | ${site.name}`
  const path = `/services/${service.slug}`
  pagesByPath[path] = page({
    path,
    title,
    description,
    keywords: seo.keywords || `${service.title}, Australia visa, Anand Education Migration`,
    image: service.image || service.banner,
    priority: 0.9,
    graph: [
      webPageJsonLd({ path, title, description, extras: { image: service.image } }),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path },
      ]),
      serviceJsonLd(service),
      faqJsonLd(serviceFaqs, path),
      howToJsonLd(service),
    ],
  })
}
