import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import PartnerMark from '../components/PartnerLogos.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { partners } from '../data.js'

export default function Partners() {
  return (
    <>
      <PageHero title="Partners" theme="partners" />
      <section className="section">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Honorable Partners</p>
            <h2 className="section-title">We've Some Honorable Partners Globally</h2>
            <p className="lead">
              We are proudly partnered with top Australian universities and institutions, giving our students access to quality education and career-focused programs. These collaborations ensure seamless admissions and trusted academic pathways.
            </p>
          </Reveal>
          <div className="partner-grid">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <TiltCard>
                  <article className="partner-card">
                    <PartnerMark id={p.id} />
                    <p style={{ marginTop: 12, fontWeight: 700, color: 'var(--navy)' }}>{p.name}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lead" style={{ marginTop: 40 }}>
              Partner Companies & Institutions in Australia We proudly collaborate with a wide network of trusted Australian institutions and companies to deliver quality education and visa solutions. Over the years, we have assisted students, business professionals, tourists, and individuals with medical needs in obtaining Australian visas. We also support family-based immigration and offer expert counseling for permanent residency and citizenship pathways in Australia.
            </p>
            <Link className="btn btn-copper" to="/contact" style={{ marginTop: 18 }}>Contact Us</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
