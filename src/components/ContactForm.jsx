import { useState } from 'react'
import { site } from '../data.js'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    const phone = data.get('phone')
    const message = data.get('message')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`)
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Website enquiry from ' + name)}&body=${body}`
    setSent(true)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--navy)' }}>Get in Touch</h3>
      <p className="lead" style={{ margin: 0, fontSize: '1rem' }}>
        Your details are emailed to <a href={`mailto:${site.email}`}>{site.email}</a>. Submitting opens your email app with the message ready to send.
      </p>
      <label htmlFor="enquiry-name">Your name</label>
      <input id="enquiry-name" name="name" required placeholder="Full name" />
      <label htmlFor="enquiry-email">Your email</label>
      <input id="enquiry-email" name="email" type="email" required placeholder="name@email.com" />
      <label htmlFor="enquiry-phone">Your phone</label>
      <input id="enquiry-phone" name="phone" required placeholder="Mobile number" />
      <label htmlFor="enquiry-message">Your message</label>
      <textarea id="enquiry-message" name="message" required placeholder="How can we help?" />
      <button className="btn btn-copper" type="submit">Submit Now</button>
      {sent && <p className="success"><strong>Thank you.</strong> Your email app should open a message addressed to {site.email}. Send that email and we will receive your enquiry there.</p>}
    </form>
  )
}
