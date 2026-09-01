import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { faqs } from '../data.js'

export default function FAQ() {
  const [tab, setTab] = useState('visa')
  const [open, setOpen] = useState(0)
  const list = faqs[tab]

  return (
    <>
      <PageHero title="Faq" theme="faq" />
      <section className="section">
        <div className="container split">
          <div>
            <Reveal>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="tabs">
                <button className={tab === 'visa' ? 'on' : ''} onClick={() => { setTab('visa'); setOpen(0) }}>Visa & Immigration</button>
                <button className={tab === 'support' ? 'on' : ''} onClick={() => { setTab('support'); setOpen(0) }}>Services & Support</button>
              </div>
            </Reveal>
            <div className="accordion">
              {list.map((f, i) => (
                <div className="acc" key={`${tab}-${f.q}`}>
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
    </>
  )
}
