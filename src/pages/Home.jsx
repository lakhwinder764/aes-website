import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, FileCheck, GraduationCap, Landmark } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/Testimonials.jsx'
import TiltCard from '../components/TiltCard.jsx'
import PartnerMark from '../components/PartnerLogos.jsx'
import WorldMap from '../components/WorldMap.jsx'
import ServiceMedia from '../components/ServiceMedia.jsx'
import SceneChips from '../components/SceneChips.jsx'
import { PageSeo } from '../components/Seo.jsx'
import { blogs, partners, services, migration } from '../data.js'

const slides = [
  { type: 'image', src: '/assets/images/carousel-student.jpg' },
  { type: 'image', src: '/assets/images/carousel-work.jpg' },
  { type: 'image', src: '/assets/images/carousel-pr.jpg' },
  { type: 'image', src: '/assets/images/carousel-citizenship.jpg' },
  { type: 'image', src: '/assets/images/bg-home-sydney.jpg' },
]

const visaIcons = [GraduationCap, Briefcase, Landmark, FileCheck]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const total = slides.length

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % total), 6500)
    return () => clearInterval(id)
  }, [slide, total])

  const prev = () => setSlide((s) => (s - 1 + total) % total)
  const next = () => setSlide((s) => (s + 1) % total)

  return (
    <>
      <PageSeo path="/" />
      <section className="hero">
        <img className="hero-bg-img" src={slides[slide].src} alt="Anand Education & Migration visa and education consultation" />
        <div className="overlay" />
        <SceneChips theme="home" />
        <div className="container hero-copy">
          <p className="hero-chip">Effective Visa Solution</p>
          <h1>
            Visa <span className="amp">&</span>
            <span>Education</span>
            <span>Consultation</span>
          </h1>
          <p>
            Our <strong>professionalism, honesty, sincerity</strong> and dedication to client service has helped our clients to fulfill their wishes
          </p>
          <div className="hero-actions">
            <Link className="btn btn-copper" to="/contact">Book Now</Link>
            <Link className="btn btn-ghost" to="/services">Explore Services</Link>
          </div>
        </div>
        <div className="hero-nav">
          <button type="button" onClick={prev} aria-label="Previous"><ArrowLeft size={18} /></button>
          <button type="button" onClick={next} aria-label="Next"><ArrowRight size={18} /></button>
        </div>
      </section>

      <div className="container-wide quick-visas">
        {services.map((s, i) => {
          const Icon = visaIcons[i]
          return (
            <Link className="quick-visa" key={s.slug} to={`/services/${s.slug}`}>
              <span className="quick-icon"><Icon size={20} /></span>
              <span>{s.title}</span>
            </Link>
          )
        })}
      </div>

      <section className="section">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Featured Services</p>
            <h2 className="section-title">We Provide Visa & Immigration Service<br />From Experienced Lawyers</h2>
          </Reveal>
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
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }} id="migration">
        <div className="container split">
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
          <Reveal delay={0.1}>
            <p className="eyebrow">AES Migration</p>
            <h2 className="section-title">Migration Details</h2>
            <p className="lead">{migration.intro}</p>
            <div className="highlights two-col" style={{ marginTop: 22 }}>
              {migration.highlights.slice(0, 4).map((item) => (
                <article className="highlight" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22 }}>
              <Link className="btn btn-navy" to="/migration">View Migration Page</Link>
              <Link className="btn btn-copper" to="/book-appointment">Book an Appointment</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="scholarship">
            <img src="/assets/images/hero-3d-campus.jpg" alt="Australian university campus scholarships" />
            <div className="shade" />
            <Reveal className="copy">
              <h2 className="section-title" style={{ color: '#fff' }}>20+ Best Universities Scholarship Programs</h2>
              <Link className="btn btn-copper" to="/contact">Contact Us</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container split">
          <Reveal>
            <p className="eyebrow">About AES</p>
            <h2 className="section-title">Many Years of Your Trust and Recommendation</h2>
            <p className="lead">
              For over many years, our experienced consultants help people <strong>study, work, visit, or settle in Australia</strong>. We specialise in <strong>student visas</strong>, <strong>skilled migration</strong>, visitor visas, family reunification, and business or investment-based immigration.
            </p>
            <p className="lead" style={{ marginTop: 14 }}>
              With deep knowledge of <strong>Australian immigration policies</strong> and strong ties with reputed Australian institutions, we offer personalised guidance every step of the way. Whether you want to study at a top university, reunite with family, or build a future in Australia, <strong>AES</strong> is here to make the journey smooth and successful.
            </p>
            <Link className="btn btn-navy" to="/about" style={{ marginTop: 22 }}>Read More</Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="photo-stack">
              <img className="photo-main" src="/assets/images/about-consult-3d.jpg" alt="AES consultation" />
              <img className="photo-mid" src="/assets/images/about-students-3d.jpg" alt="Students" />
              <img className="photo-small" src="/assets/images/about-city-3d.jpg" alt="Australia" />
              <img className="stamp" src="/assets/images/float-stamp-3d.png" alt="" />
            </div>
          </Reveal>
        </div>
        <div className="container" style={{ marginTop: 28 }}>
          <Counters />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container split">
          <Reveal>
            <h2 className="section-title">Study. Migrate. Succeed.</h2>
            <p className="lead">
              At <strong>Anand Education & Migration</strong>, we do more than paperwork — we guide dreams. Whether you are pursuing <strong>education</strong>, seeking <strong>permanent residency</strong>, or looking for the right university match, we support you from counselling to visa filing, career planning, and scholarship guidance.
            </p>
            <Link className="btn btn-copper" to="/partners" style={{ marginTop: 18 }}>More Agencies</Link>
          </Reveal>
          <Reveal>
            <WorldMap alt="Global reach" />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <div className="cta-band">
            <img src="/assets/images/cta-3d.png" alt="Skilled work and technical courses abroad" className="cta-3d" />
            <h3>Get a skilled job in abroad taking our technical courses.</h3>
            <Link className="btn btn-copper" to="/contact">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Our Partners</p>
            <h2 className="section-title">Partner Institutions in Australia</h2>
            <p className="lead">
              We proudly collaborate with a wide network of <strong>trusted Australian institutions</strong> to deliver quality education and visa solutions. Over the years we have assisted students, business professionals, tourists, and people with medical needs. We also support <strong>family-based immigration</strong> and counselling for <strong>permanent residency</strong> and <strong>citizenship</strong> pathways.
            </p>
            <Link className="link" to="/partners">See All Partners →</Link>
          </Reveal>
          <div className="partners-marquee">
            <div className="marquee-track">
              {[...partners, ...partners].map((p, i) => (
                <div key={`${p.id}-${i}`} className="partner-logo-card">
                  <PartnerMark id={p.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-title">What Clients Say About Us and<br />Our Services</h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <Reveal className="center">
            <p className="eyebrow">Recent Blog</p>
            <h2 className="section-title">Recent Updates of Visa<br />And Immigration</h2>
          </Reveal>
          <div className="blog-grid">
            {blogs.map((b, i) => (
              <Reveal key={b.slug} delay={i * 0.08}>
                <TiltCard>
                <article className="blog-card">
                  <img src={b.image} alt={b.title} />
                  <div className="body">
                    <small>{b.date}</small>
                    <h3 className="serif" style={{ fontSize: '1.5rem', color: 'var(--navy)', margin: '8px 0' }}>{b.title}</h3>
                    <p>{b.excerpt}</p>
                  </div>
                </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
