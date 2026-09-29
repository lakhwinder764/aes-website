import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Clock, MapPin, Menu, Smartphone, X } from 'lucide-react'
import LandlineIcon from './LandlineIcon.jsx'
import { site, services } from '../data.js'

export default function Navbar({ overHero }) {
  const [solid, setSolid] = useState(!overHero)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18 || !overHero)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [overHero])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className={`header ${solid ? 'solid' : ''} ${overHero ? 'over-hero' : ''}`}>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="top-hours">
            <Clock size={13} />
            <span>Opening Time : {site.hours}</span>
          </div>
          <div className="top-links">
            <a href={site.australia.map} target="_blank" rel="noreferrer">
              <MapPin size={13} /> Our Location
            </a>
            <a href={site.phoneHref}><LandlineIcon size={13} /> {site.phoneLabel} {site.phone}</a>
            <a href={site.mobileHref}><Smartphone size={13} /> {site.mobileLabel} {site.mobile}</a>
            <Link to="/contact">Apply Now</Link>
          </div>
        </div>
      </div>
      <div className="nav-shell">
        <div className="container nav">
          <Link to="/" onClick={() => setOpen(false)}>
            <img className="logo" src="/assets/logo.png" alt={site.name} />
          </Link>
          <button className="menu-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
          <nav className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
            <NavLink to="/" end>Home</NavLink>
            <div className="dropdown" onClick={(e) => e.stopPropagation()}>
              <NavLink className="drop-btn" to="/services" onClick={() => setOpen(false)}>Services</NavLink>
              <div className="dropdown-menu">
                {services.map((s) => (
                  <NavLink key={s.slug} to={`/services/${s.slug}`} onClick={() => setOpen(false)}>{s.title}</NavLink>
                ))}
              </div>
            </div>
            <NavLink to="/migration">Migration</NavLink>
            <NavLink to="/book-appointment">Book Appointment</NavLink>
            <NavLink to="/partners">Partners</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/about">About</NavLink>
            <Link className="nav-contact" to="/contact">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
