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
              We are proudly partnered with <strong>top Australian universities and institutions</strong>, giving students access to quality education and career-focused programs. These collaborations support <strong>seamless admissions</strong> and trusted academic pathways.
            </p>
          </Reveal>
          <div className="partner-grid">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <TiltCard>
                  <article className="partner-card">
                    <img src={p.image} alt="" />
                    <PartnerMark id={p.id} />
                    <p style={{ marginTop: 12, fontWeight: 700, color: 'var(--navy)', padding: '0 16px', textAlign: 'center' }}>{p.name}</p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lead" style={{ marginTop: 40 }}>
              We collaborate with a wide network of <strong>trusted Australian institutions and companies</strong> for education and visa solutions. We assist students, business professionals, tourists, and people with medical needs, and also support <strong>family immigration</strong>, <strong>permanent residency</strong>, and <strong>citizenship</strong> counselling.
            </p>
            <Link className="btn btn-copper" to="/contact" style={{ marginTop: 18 }}>Contact Us</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
