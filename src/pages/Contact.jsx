import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { site } from '../data.js'

export default function Contact() {
  return (
    <>
      <PageHero title="Contact" theme="contact" />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <ContactForm />
          </Reveal>
          <div>
            <Reveal>
              <article className="office">
                <h3 className="serif" style={{ fontSize: '1.8rem' }}>Anand Education Services – Australia Office</h3>
                <p style={{ marginTop: 12 }}><b>Address:</b> {site.australia.address}</p>
                <p><b>Email:</b> <a href={`mailto:${site.email}`}>{site.email}</a></p>
                <p><b>Landline:</b> <a href={site.phoneHref}>{site.phone}</a></p>
                <p><b>Phone:</b> <a href={site.mobileHref}>{site.mobile}</a></p>
                <p><b>Opening:</b> Monday -Friday -10:00 AM -6:00 PM , Saturday & Sunday — Closed</p>
                <p style={{ marginTop: 10 }}>{site.marn}</p>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="office">
                <h3 className="serif" style={{ fontSize: '1.8rem' }}>India Office</h3>
                <p style={{ marginTop: 12 }}><b>Address:</b> {site.india.address}</p>
              </article>
            </Reveal>
            <iframe
              className="map-frame"
              title="AES Blacktown office"
              src="https://maps.google.com/maps?q=Unit%202/34-36%20Flushcombe%20Road,%20Blacktown,%20NSW%202148&t=&z=15&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  )
}
