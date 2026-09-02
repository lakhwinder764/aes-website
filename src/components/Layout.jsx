import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CursorGlow from './CursorGlow.jsx'
import DepthField from './DepthField.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import { Phone, MessageCircle } from 'lucide-react'
import { site } from '../data.js'

export default function Layout() {
  const { pathname } = useLocation()
  const overHero = true

  return (
    <>
      <DepthField />
      <CursorGlow />
      <Navbar overHero={overHero} />
      <AnimatePresence mode="wait">
        <motion.main
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
      <ScrollProgress />
      <div className="float-actions">
        <a className="call" href={site.mobileHref} aria-label="Call AES">
          <Phone size={20} />
        </a>
        <a className="wa" href="https://wa.me/61435266220" target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <MessageCircle size={20} />
        </a>
      </div>
    </>
  )
}
