import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, FileCheck, GraduationCap, Landmark } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Counters from '../components/Counters.jsx'
import Testimonials from '../components/Testimonials.jsx'
import TiltCard from '../components/TiltCard.jsx'
import PartnerMark from '../components/PartnerLogos.jsx'
import WorldMap from '../components/WorldMap.jsx'
import ServiceMedia from '../components/ServiceMedia.jsx'
import FloatStage from '../components/FloatStage.jsx'
import { blogs, partners, services, migration } from '../data.js'

const slides = [
  { type: 'image', src: '/assets/images/bg-page-office.jpg' },
  { type: 'image', src: '/assets/images/bg-home-sydney.jpg' },
  { type: 'image', src: '/assets/images/bg-home-travel.jpg' },
  { type: 'image', src: '/assets/images/bg-home-campus.jpg' },
]

const visaIcons = [GraduationCap, Briefcase, Landmark, FileCheck]

const wordAnim = {
  hidden: { opacity: 0, y: 32, rotateX: 28 },
  show: (i) => ({ opacity: 1, y: 0, rotateX: 0, transition: { delay: 0.12 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
}

export default function Home() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6500)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <section className="hero">
        <img className="hero-bg-img" src={current.src} alt="" />
        <div className="hero-bg" style={{ backgroundImage: `url(${current.src})` }} />
        <div className="overlay" />
        <div className="float-orbs" aria-hidden="true">
          <div className="orb a" />
          <div className="orb b" />
        </div>
        <FloatStage variant="hero" theme="home" />
        <div className="container hero-copy">
          <motion.div className="hero-chip" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            Effective Visa Solution
          </motion.div>
          <h1>
            {['Visa &', 'Education', 'Consultation'].map((w, i) => (
              <motion.span key={w} style={{ display: 'block', transformOrigin: 'left bottom' }} custom={i} variants={wordAnim} initial="hidden" animate="show">
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
            Our professionalism, honesty, sincerity & dedication to client service has helped our clients to fulfill their wishes
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <Link className="btn btn-copper" to="/contact">Book Now</Link>
            <Link className="btn btn-ghost" to="/services">Explore Services</Link>
          </motion.div>
        </div>
        <div className="hero-nav">
          <button onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)} aria-label="Previous"><ArrowLeft size={18} /></button>
          <button onClick={() => setSlide((s) => (s + 1) % slides.length)} aria-label="Next"><ArrowRight size={18} /></button>
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
            <Link className="btn btn-navy" to="/migration" style={{ marginTop: 22 }}>View Migration Page</Link>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="scholarship">
            <img src="/assets/images/hero-3d-campus.jpg" alt="" />
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
              For over many years, Our experienced consultants are helping individuals realize their dreams of studying, working, visiting, or settling in Australia. We specialize in a wide range of Australian visa services, including student visas, skilled migration, visitor visas, family reunification, and business or investment-based immigration.
            </p>
            <p className="lead" style={{ marginTop: 14 }}>
              With deep knowledge of Australian immigration policies and strong ties with reputed Australian institutions, we offer personalized guidance every step of the way. Whether you're aiming to study at a top university, reunite with family, or build a future in Australia, AES is here to make the journey smooth and successful.
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
              At Anand Education Services, we do more than just paperwork — we guide dreams. Whether you're pursuing education, seeking permanent residency, or looking for the right university match, we’ve got your back. From counseling to visa filing, and from career planning to scholarship guidance, we offer end-to-end support tailored to your goals.
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
            <img src="/assets/images/cta-3d.png" alt="" className="cta-3d" />
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
              Partner Companies & Institutions in Australia We proudly collaborate with a wide network of trusted Australian institutions and companies to deliver quality education and visa solutions. Over the years, we have assisted students, business professionals, tourists, and individuals with medical needs in obtaining Australian visas. We also support family-based immigration and offer expert counseling for permanent residency and citizenship pathways in Australia.
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
