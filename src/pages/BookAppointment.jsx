import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import AppointmentForm from '../components/AppointmentForm.jsx'
import { Smartphone } from 'lucide-react'
import LandlineIcon from '../components/LandlineIcon.jsx'
import { PageSeo } from '../components/Seo.jsx'
import { migration, site } from '../data.js'

export default function BookAppointment() {
  return (
    <>
      <PageSeo path="/book-appointment" />
      <PageHero title="Book an Appointment" theme="migration" />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <AppointmentForm />
          </Reveal>
          <div>
            <Reveal>
              <article className="agent-card agent-card-text">
                <div>
                  <p className="eyebrow">Migration Agent</p>
                  <h3>{migration.agent.name}</h3>
                  <p>{migration.agent.role}</p>
                  <p className="agent-marn">{migration.agent.marn}</p>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.08}>
              <article className="office js-hot-section" style={{ marginTop: 16 }}>
                <img src="/assets/images/bg-contact.jpg" alt="Consultation desk" />
                <div className="office-body">
                  <h3 className="serif hot-info">Consultation details</h3>
                  <dl className="office-list">
                    <div>
                      <dt>Hours</dt>
                      <dd>Monday – Friday, 10:00 AM – 6:00 PM<br />Saturday &amp; Sunday — Closed</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${site.email}`}>{site.email}</a>
                      </dd>
                    </div>
                    <div>
                      <dt>Landline</dt>
                      <dd>
                        <a className="office-line" href={site.phoneHref}>
                          <LandlineIcon size={16} />
                          <span>{site.phone}</span>
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Mobile</dt>
                      <dd>
                        <a className="office-line" href={site.mobileHref}>
                          <Smartphone size={16} />
                          <span>{site.mobile}</span>
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt>Australia</dt>
                      <dd>{site.australia.address}</dd>
                    </div>
                    <div>
                      <dt>India</dt>
                      <dd>{site.india.address}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
