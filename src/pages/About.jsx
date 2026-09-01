import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/Testimonials.jsx'
import WorldMap from '../components/WorldMap.jsx'
import { history } from '../data.js'

export default function About() {
  const [tab, setTab] = useState(0)
  const item = history[tab]

  return (
    <>
      <PageHero title="About" theme="about" />
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">About AES</p>
            <h2 className="section-title">Many Years of Your Trust and Recommendation</h2>
            <p className="lead">
              For over many years, Our experienced consultants are a trusted name in Australian education and immigration support. We’ve assisted thousands of students, professionals, tourists, and individuals with medical needs in successfully achieving their goals—from studying in top Australian universities to securing the right visa pathway. Our commitment to transparency, reliability, and client satisfaction has made us one of the most recommended agencies in the field.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="highlights" style={{ gridTemplateColumns: '1fr' }}>
              <div className="highlight">
                <h3>Trusted by Thousands</h3>
                <p>AES is proudly recommended by students and professionals across Australia and India for our consistent and dependable support.</p>
              </div>
              <div className="highlight">
                <h3>Awards Winner</h3>
                <p>Recognized for our high standards of service, expert consultation, and client-first approach.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h2 className="section-title">Anand Education Services Carries Awesome History</h2>
            <div className="tabs">
              {history.map((h, i) => (
                <button key={h.tab} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{h.tab}</button>
              ))}
            </div>
          </Reveal>
          <Reveal key={item.title} className="history-card">
            <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--navy)' }}>{item.title}</h3>
            <p className="lead" style={{ marginTop: 12 }}>{item.text}</p>
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
              For over many years, Anand Education Services has been committed to helping students, professionals, tourists, and individuals with medical needs successfully navigate the Australian education and immigration system. Our mission is to deliver reliable, transparent, and personalized support, ensuring every client achieves their goals with confidence and peace of mind.
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
