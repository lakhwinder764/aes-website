import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import ProcessFunnel from '../components/ProcessFunnel.jsx'
import { migration } from '../data.js'

export default function Migration() {
  return (
    <>
      <PageHero title="Migration" theme="migration" />
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">AES Migration Desk</p>
            <h2 className="section-title">Registered Migration Support (Sample Page)</h2>
            <p className="lead">{migration.intro}</p>
            <p className="lead" style={{ marginTop: 14 }}>{migration.agent.bio}</p>
            <Link className="btn btn-copper" to="/contact" style={{ marginTop: 22 }}>Book a Dummy Consult</Link>
          </Reveal>
          <Reveal>
            <TiltCard>
            <article className="agent-card">
              <img src={migration.agent.photo} alt={migration.agent.name} />
              <div>
                <p className="eyebrow">Migration Agent</p>
                <h3>{migration.agent.name}</h3>
                <p>{migration.agent.role}</p>
                <p className="agent-marn">{migration.agent.marn}</p>
              </div>
            </article>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">What We Cover</p>
            <h2 className="section-title">Dummy Migration Details</h2>
          </Reveal>
          <div className="highlights" style={{ marginTop: 28 }}>
            {migration.highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="highlight">
                  <img className="highlight-photo" src={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h2 className="section-title">Sample Process</h2>
          </Reveal>
          <Reveal>
            <ProcessFunnel steps={migration.steps} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
