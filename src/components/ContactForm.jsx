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
      <input name="name" required placeholder="Your Name" />
      <input name="email" type="email" required placeholder="Your Email" />
      <input name="phone" required placeholder="Your Phone" />
      <textarea name="message" required placeholder="Your Message" />
      <button className="btn btn-copper" type="submit">Submit Now</button>
      {sent && <p className="success">Thank you. Your email app will open so we can receive your enquiry.</p>}
    </form>
  )
}
