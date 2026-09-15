import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

import { PageSeo } from '../components/Seo.jsx'

export default function CodeOfConduct() {
  return (
    <>
      <PageSeo path="/code-of-conduct" />
      <PageHero title="Code of Conduct" theme="conduct" />
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Registered Migration Agent</p>
            <h2 className="section-title">Code of Conduct for registered migration agents</h2>
            <p className="lead">
              Anand Education & Migration follows the official <strong>Code of Conduct for registered migration agents</strong>. You can read the full document below or <strong>download the PDF</strong> for your records.
            </p>
            <img className="section-photo" src="/assets/images/art-conduct.jpg" alt="Professional standards" style={{ margin: '20px 0', maxHeight: 280 }} />
            <a className="btn btn-copper" href="/assets/code-of-conduct.pdf" target="_blank" rel="noreferrer" style={{ margin: '20px 0 28px' }}>
              Download PDF
            </a>
          </Reveal>
          <iframe
            title="Code of Conduct"
            src="/assets/code-of-conduct.pdf"
            style={{ width: '100%', minHeight: '80vh', border: 0, borderRadius: 20, background: '#fff' }}
          />
        </div>
      </section>
    </>
  )
}
