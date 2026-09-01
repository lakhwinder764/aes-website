import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ServiceMedia from '../components/ServiceMedia.jsx'
import { serviceHighlights, services } from '../data.js'

export default function Services() {
  return (
    <>
      <PageHero title="services" theme="services" />
      <section className="section">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Featured Services</p>
            <h2 className="section-title">We Take the Challenge to Make Life Easier</h2>
            <p className="lead">
              For over many years, Anand Education Services has supported students, business professionals, tourists, and individuals with medical needs in navigating the complexities of Australian visas and education. We believe in simplifying the journey — whether it's studying in Australia, reuniting with family, or building a new life through skilled migration. Our expert guidance and personalized support have made it easier for thousands to achieve their goals.
            </p>
          </Reveal>
          <div className="highlights" style={{ marginTop: 36 }}>
            {serviceHighlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <article className="highlight">
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
              With over many years of experience, Anand Education Services has successfully assisted students, business professionals, tourists, and individuals with medical needs in achieving their Australian visa and education goals. Our streamlined process ensures thorough guidance, timely documentation, and consistent follow-ups. Depending on the visa type and case complexity, the full process typically takes 1 to 2 working months — handled with care, accuracy, and efficiency by our experienced team.
            </p>
          </Reveal>
          <Reveal>
            <img className="look-3d-media" src="/assets/images/about-consult-3d.jpg" alt="Working process" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
