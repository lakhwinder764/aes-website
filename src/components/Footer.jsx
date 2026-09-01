import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { services, site } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/assets/logo.jpg" alt="AES" style={{ height: 60, borderRadius: 10, marginBottom: 16, background: '#fff', padding: '4px 8px' }} />
          <p>Effective Visa Solution. Our professionalism, honesty, sincerity & dedication to client service has helped our clients to fulfill their wishes.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">services</Link></li>
            <li><Link to="/migration">Migration</Link></li>
            <li><Link to="/partners">Partners</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faq">Faq</Link></li>
            <li><Link to="/contact">Contact</Link></li>
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
          <ul>
            <li><a href={site.phoneHref}><Phone size={14} /> {site.phone}</a></li>
            <li><a href={site.mobileHref}><Phone size={14} /> {site.mobile}</a></li>
            <li><a href={`mailto:${site.email}`}><Mail size={14} /> {site.email}</a></li>
            <li>{site.marn}</li>
            <li><a href={site.australia.map} target="_blank" rel="noreferrer"><MapPin size={14} /> {site.australia.address}</a></li>
            <li><a href={site.india.map} target="_blank" rel="noreferrer"><MapPin size={14} /> {site.india.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="container">
        <p className="ack">
          Anand Education Services acknowledges the traditional owners of the land upon which we live and work, and we pay our respects to the elders both past and present.
        </p>
        <div className="legal">
          <span>Copyright © 2026 Anand Education Services®. All rights reserved.</span>
          <a href={site.phoneHref}>Call - Or - SMS {site.phone}</a>
        </div>
      </div>
    </footer>
  )
}
