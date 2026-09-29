import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ServiceMedia from '../components/ServiceMedia.jsx'
import { PageSeo } from '../components/Seo.jsx'
import { serviceHighlights, services } from '../data.js'

export default function Services() {
  return (
    <>
      <PageSeo path="/services" />
      <PageHero title="Services" theme="services" />
      <section className="section">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Featured Services</p>
            <h2 className="section-title">We Take the Challenge to Make Life Easier</h2>
            <p className="lead">
              For over many years, <strong>Anand Education and Migration Services</strong> has supported students, business professionals, tourists, and people with medical needs with Australian visas and education. We simplify the journey — whether it is <strong>studying in Australia</strong>, reuniting with family, or building a new life through <strong>skilled migration</strong>.
            </p>
          </Reveal>
          <div className="highlights cols-3" style={{ marginTop: 36 }}>
            {serviceHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <article className="highlight">
                  <img className="highlight-photo" src={h.image} alt={h.title} />
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="service-grid">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <TiltCard>
                  <article className="service-card">
                    <div className="thumb"><ServiceMedia service={s} /></div>
                    <div className="body">
                      <h3>{s.title}</h3>
                      <p>{s.excerpt}</p>
                      <Link className="link" to={`/services/${s.slug}`}>Read More <ArrowUpRight size={16} /></Link>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 40 }}><Counters /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Working Process</p>
            <h2 className="section-title">We Take 1–2 Working Months for Complete Processing</h2>
            <p className="lead">
              Our streamlined process covers thorough guidance, timely documentation, and consistent follow-ups. Depending on the visa type and case, the full process typically takes <strong>1 to 2 working months</strong> — handled with care and accuracy by our experienced team.
            </p>
          </Reveal>
          <Reveal>
            <img className="look-3d-media" src="/assets/images/bg-page-office.jpg" alt="Working process" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
