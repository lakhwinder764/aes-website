import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  Camera,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileText,
  Flag,
  GraduationCap,
  HeartPulse,
  Home,
  IdCard,
  Landmark,
  Languages,
  Plane,
  Receipt,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  Users,
  Wallet,
} from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import ServiceMedia from '../components/ServiceMedia.jsx'
import { serviceFaqs, services, site } from '../data.js'

function documentIcon(text) {
  const t = text.toLowerCase()
  if (t.includes('passport') && t.includes('photo')) return Camera
  if (t.includes('photograph')) return Camera
  if (t.includes('passport') || t.includes('id document')) return IdCard
  if (t.includes('enrolment') || t.includes('coe')) return GraduationCap
  if (t.includes('english')) return Languages
  if (t.includes('health') || t.includes('oshc') || t.includes('insurance')) return HeartPulse
  if (t.includes('financial') || t.includes('funds')) return Wallet
  if (t.includes('gte') || t.includes('genuine')) return ClipboardCheck
  if (t.includes('skill')) return BadgeCheck
  if (t.includes('employment') || t.includes('job') || t.includes('work experience')) return Briefcase
  if (t.includes('police') || t.includes('character')) return ShieldCheck
  if (t.includes('fee') || t.includes('payment') || t.includes('receipt')) return Receipt
  if (t.includes('birth')) return ScrollText
  if (t.includes('residenc') || t.includes('residence')) return Home
  if (t.includes('travel')) return Plane
  if (t.includes('form') || t.includes('eoi')) return FileText
  return FileText
}

function detailIcon(label) {
  const t = label.toLowerCase()
  if (t.includes('processing')) return Clock
  if (t.includes('stay')) return CalendarDays
  if (t.includes('entry') || t.includes('person')) return Users
  if (t.includes('insurance')) return HeartPulse
  if (t.includes('medical')) return Stethoscope
  if (t.includes('charge') || t.includes('fee')) return CreditCard
  if (t.includes('visa type')) return Landmark
  if (t.includes('interview') || t.includes('test')) return ClipboardCheck
  if (t.includes('final')) return Flag
  if (t.includes('book')) return BookOpen
  return FileText
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const mapped = slug === 'job-work-visa' ? 'work-visa' : slug
  const service = services.find((s) => s.slug === mapped)
  const [open, setOpen] = useState(0)

  if (!service) return <Navigate to="/services" replace />

  return (
    <>
      <PageHero title={service.title} theme={service.theme || 'services'} />
      <section className="section">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">{service.eyebrow}</p>
            <h2 className="section-title">{service.heading}</h2>
            {service.intro.map((p) => (
              <p key={p.slice(0, 24)} className="lead" style={{ marginBottom: 14 }}>{p}</p>
            ))}
          </Reveal>
          <Reveal>
            <ServiceMedia service={service} className="service-detail-media" />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h2 className="section-title">{service.processTitle}</h2>
            {service.processLead && <p className="lead">{service.processLead}</p>}
          </Reveal>
          <div className="process" style={{ marginTop: 28 }}>
            {service.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <article className="step">
                  <div className="num">0{i + 1}</div>
                  <h3 className="serif" style={{ fontSize: '1.6rem', color: 'var(--navy)', margin: '8px 0' }}>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section facts-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h3 className="section-title" style={{ fontSize: '2.2rem' }}>Necessary Documents</h3>
            <div className="docs">
              {service.documents.map((d) => {
                const Icon = documentIcon(d)
                return (
                  <div className="doc" key={d}>
                    <span className="card-icon"><Icon size={18} /></span>
                    <span>{d}</span>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal className="facts-block">
            <h3 className="section-title" style={{ fontSize: '2.2rem' }}>Application Overview</h3>
            <div className="details-grid">
              {service.details.map((d) => {
                const Icon = detailIcon(d.label)
                return (
                  <div className="detail" key={d.label}>
                    <span className="card-icon"><Icon size={18} /></span>
                    <div>
                      <b>{d.label}</b>
                      {d.value}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="facts-call">
              Call us: <a className="link" href={site.mobileHref}>{site.mobile}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <p className="lead">{service.closing}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div>
            <Reveal>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </Reveal>
            <div className="accordion">
              {serviceFaqs.map((f, i) => (
                <div className="acc" key={f.q}>
                  <button onClick={() => setOpen(open === i ? -1 : i)}>
                    {f.q}
                    <span>{open === i ? '–' : '+'}</span>
                  </button>
                  {open === i && <p>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <h3>Ask Us Custom</h3>
            <Link className="btn btn-copper" to="/contact">Book Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}
