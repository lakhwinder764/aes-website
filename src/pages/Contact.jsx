import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { Smartphone } from 'lucide-react'
import LandlineIcon from '../components/LandlineIcon.jsx'
import { PageSeo } from '../components/Seo.jsx'
import { site } from '../data.js'

export default function Contact() {
  return (
    <>
      <PageSeo path="/contact" />
      <PageHero title="Contact Us" theme="contact" />
      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <ContactForm />
          </Reveal>
          <div>
            <Reveal>
              <article className="office js-hot-section">
                <img src="/assets/images/bg-contact.jpg" alt="Australia office" />
                <div className="office-body">
                  <h3 className="serif hot-info">{site.name} – Australia Office</h3>
                  <dl className="office-list">
                    <div>
                      <dt>Address</dt>
                      <dd>{site.australia.address}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
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
                      <dt>Opening</dt>
                      <dd>Monday – Friday, 10:00 AM – 6:00 PM<br />Saturday &amp; Sunday — Closed</dd>
                    </div>
                    <div>
                      <dt>MARN</dt>
                      <dd>{site.marn.replace(/^MARN\s*/i, '')}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="office js-hot-section">
                <img src="/assets/images/about-city-3d.jpg" alt="India office" />
                <div className="office-body">
                  <h3 className="serif">India Office</h3>
                  <dl className="office-list">
                    <div>
                      <dt>Address</dt>
                      <dd>{site.india.address}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
            <iframe
              className="map-frame"
              title="Anand Education and Migration Services Blacktown office"
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
