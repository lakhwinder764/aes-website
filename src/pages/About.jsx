import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WorldMap from '../components/WorldMap.jsx'
import { PageSeo } from '../components/Seo.jsx'
import { history } from '../data.js'

export default function About() {
  const [tab, setTab] = useState(0)
  const item = history[tab]

  return (
    <>
      <PageSeo path="/about" />
      <PageHero title="About" theme="about" />
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">About AES</p>
            <h2 className="section-title">Many Years of Your Trust and Recommendation</h2>
            <p className="lead">
              For over many years, our consultants have been a trusted name in <strong>Australian education and immigration</strong> support. We have assisted thousands of students, professionals, tourists, and people with medical needs — from studying at top Australian universities to securing the right <strong>visa pathway</strong>. We are known for <strong>transparency, reliability, and client satisfaction</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="photo-stack">
              <img className="photo-main" src="/assets/images/about-consult-3d.jpg" alt="AES consultation" />
              <img className="photo-mid" src="/assets/images/about-students-3d.jpg" alt="Students we support" />
              <img className="photo-small" src="/assets/images/about-city-3d.jpg" alt="Life in Australia" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h2 className="section-title">Anand Education & Migration Carries Awesome History</h2>
            <div className="tabs">
              {history.map((h, i) => (
                <button key={h.tab} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{h.tab}</button>
              ))}
            </div>
          </Reveal>
          <Reveal key={item.title} className="history-card">
            <img src={item.image} alt={item.title} />
            <div className="history-copy">
              <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--navy)' }}>{item.title}</h3>
              <p className="lead" style={{ marginTop: 12 }}>{item.text}</p>
            </div>
          </Reveal>
          <div style={{ marginTop: 36 }}><Counters /></div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Our Missions</p>
            <h2 className="section-title">We Journey The Global Business to Ensuring The Guarantee</h2>
            <p className="lead">
              For over many years, Anand Education & Migration has helped students, professionals, tourists, and people with medical needs navigate the Australian education and immigration system. Our mission is <strong>reliable, transparent, and personalised support</strong>, so every client can move forward with confidence.
            </p>
          </Reveal>
          <Reveal>
            <WorldMap alt="Global business" />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-title">What Clients Say About Us and Our Services</h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>
    </>
  )
}
