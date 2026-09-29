import { useMemo, useState } from 'react'
import { site } from '../data.js'

const TIMES = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
]

const VISA_TYPES = [
  'Student visa',
  'Work visa',
  'Permanent residency',
  'Citizenship',
  'Partner / family visa',
  'Visitor visa',
  'General migration advice',
]

function weekdayOnly(dateValue) {
  if (!dateValue) return true
  const day = new Date(`${dateValue}T12:00:00`).getDay()
  return day !== 0 && day !== 6
}

function requiredMessage(el) {
  if (el.validity.valueMissing) {
    el.setCustomValidity('Please fill out this field.')
    return
  }
  if (el.validity.typeMismatch && el.type === 'email') {
    el.setCustomValidity('Please include an @ in the email address.')
    return
  }
  el.setCustomValidity('')
}

export default function AppointmentForm() {
  const [sent, setSent] = useState(false)
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), [])

  function onInvalid(e) {
    requiredMessage(e.target)
  }

  function onFieldInput(e) {
    e.target.setCustomValidity('')
  }

  function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const office = String(data.get('office') || '').trim()
    const date = String(data.get('date') || '').trim()
    const time = String(data.get('time') || '').trim()
    const visa = String(data.get('visa') || '').trim()
    const message = String(data.get('message') || '').trim()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (!weekdayOnly(date)) {
      const dateInput = form.elements.namedItem('date')
      if (dateInput) {
        dateInput.setCustomValidity('Please choose a weekday. The office is closed Saturday and Sunday.')
        dateInput.reportValidity()
        dateInput.setCustomValidity('')
      }
      return
    }

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Office: ${office}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Visa / enquiry: ${visa}`,
        '',
        message,
      ].join('\n'),
    )
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Migration appointment request from ${name}`,
    )}&body=${body}`
    setSent(true)
  }

  return (
    <form className="form" onSubmit={onSubmit} onInvalid={onInvalid}>
      <h3 className="serif" style={{ fontSize: '2rem', color: 'var(--navy)' }}>
        Book an appointment
      </h3>
      <p className="lead" style={{ margin: 0, fontSize: '1rem' }}>
        Consultations run Monday to Friday, 10:00 AM – 6:00 PM. We will confirm your slot by email.
      </p>

      <label htmlFor="appt-name">Your name <span className="req" aria-hidden="true">*</span></label>
      <input id="appt-name" name="name" required placeholder="Full name" autoComplete="name" onInput={onFieldInput} />

      <div className="form-row">
        <div>
          <label htmlFor="appt-email">Your email <span className="req" aria-hidden="true">*</span></label>
          <input id="appt-email" name="email" type="email" required placeholder="name@email.com" autoComplete="email" onInput={onFieldInput} />
        </div>
        <div>
          <label htmlFor="appt-phone">Your phone <span className="req" aria-hidden="true">*</span></label>
          <input id="appt-phone" name="phone" required placeholder="Mobile number" autoComplete="tel" onInput={onFieldInput} />
        </div>
      </div>

      <label htmlFor="appt-office">Preferred office <span className="req" aria-hidden="true">*</span></label>
      <select id="appt-office" name="office" required defaultValue="" onChange={onFieldInput}>
        <option value="" disabled>
          Select location
        </option>
        <option value="Australia — Blacktown">Australia — Blacktown</option>
        <option value="India — Karnal">India — Karnal</option>
        <option value="Online video consult">Online video consult</option>
      </select>

      <label htmlFor="appt-visa">Visa / enquiry type <span className="req" aria-hidden="true">*</span></label>
      <select id="appt-visa" name="visa" required defaultValue="" onChange={onFieldInput}>
        <option value="" disabled>
          Select a pathway
        </option>
        {VISA_TYPES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="form-row">
        <div>
          <label htmlFor="appt-date">Preferred date <span className="req" aria-hidden="true">*</span></label>
          <input id="appt-date" name="date" type="date" required min={minDate} onInput={onFieldInput} />
        </div>
        <div>
          <label htmlFor="appt-time">Preferred time <span className="req" aria-hidden="true">*</span></label>
          <select id="appt-time" name="time" required defaultValue="" onChange={onFieldInput}>
            <option value="" disabled>
              Select a time
            </option>
            {TIMES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label htmlFor="appt-message">Notes for the agent <span className="req" aria-hidden="true">*</span></label>
      <textarea id="appt-message" name="message" required placeholder="Goals, current visa, or questions" onInput={onFieldInput} />

      <button className="btn btn-copper" type="submit">
        Request appointment
      </button>
      {sent && (
        <p className="success">
          <strong>Thank you.</strong> Your email app should open a message addressed to {site.email}. Send that email and the appointment request will arrive there.
        </p>
      )}
    </form>
  )
}
