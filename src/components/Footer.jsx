import { Link } from 'react-router-dom'
import { BadgeCheck, Facebook, Instagram, Mail, MapPin, Smartphone } from 'lucide-react'
import LandlineIcon from './LandlineIcon.jsx'
import { services, site } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer js-hot-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img className="logo footer-logo" src="/assets/logo.png" alt={site.name} />
          <p className="footer-name hot-info">{site.name}</p>
          <p>{site.acknowledgment}</p>
          <div className="footer-social">
            <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/migration">Migration</Link></li>
            <li><Link to="/book-appointment">Book Appointment</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/code-of-conduct">Code of Conduct</Link></li>
          </ul>
        </div>
        <div>
          <h4>Visa Information</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <ul className="foot-contact">
            <li>
              <a className="foot-row hot-info" href={site.phoneHref}>
                <LandlineIcon size={16} />
                <span>{site.phoneLabel} {site.phone}</span>
              </a>
            </li>
            <li>
              <a className="foot-row hot-info" href={site.mobileHref}>
                <Smartphone size={16} />
                <span>{site.mobileLabel} {site.mobile}</span>
              </a>
            </li>
            <li>
              <a className="foot-row hot-info" href={`mailto:${site.email}`}>
                <Mail size={16} />
                <span>{site.email}</span>
              </a>
            </li>
            <li>
              <p className="foot-row foot-marn hot-info">
                <BadgeCheck size={16} />
                <span>Registered migration agent<br />{site.marn}</span>
              </p>
            </li>
            <li>
              <a className="foot-row hot-info" href={site.australia.map} target="_blank" rel="noreferrer">
                <MapPin size={16} />
                <span>{site.australia.address}</span>
              </a>
            </li>
            <li>
              <a className="foot-row hot-info" href={site.india.map} target="_blank" rel="noreferrer">
                <MapPin size={16} />
                <span>{site.india.address}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <p className="ack">
          {site.name} acknowledges the traditional owners of the land upon which we live and work, and we pay our respects to the elders both past and present.
        </p>
        <div className="legal">
          <span>Copyright © 2026 {site.name}. All rights reserved.</span>
          <span className="legal-phones">
            <a className="hot-info" href={site.phoneHref}>Call {site.phone}</a>
            <a className="hot-info" href={site.smsHref}>SMS {site.mobile}</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
