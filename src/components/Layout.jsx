import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import DepthField from './DepthField.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import VisitEffects from './VisitEffects.jsx'
import { Phone, MessageCircle } from 'lucide-react'
import { site } from '../data.js'

export default function Layout() {
  const { pathname } = useLocation()
  const overHero = true

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <DepthField />
      <Navbar overHero={overHero} />
      <VisitEffects path={pathname} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={pathname}
          initial={{ opacity: 0, y: 28, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -16, rotateX: -6 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <div className="float-actions">
        <ScrollProgress />
        <a className="call" href={site.phoneHref} aria-label={`Call ${site.phone}`}>
          <Phone size={18} />
          <span>Call {site.phone}</span>
        </a>
        <a className="sms" href={site.smsHref} aria-label={`SMS ${site.mobile}`}>
          <MessageCircle size={18} />
          <span>SMS {site.mobile}</span>
        </a>
      </div>
    </>
  )
}
