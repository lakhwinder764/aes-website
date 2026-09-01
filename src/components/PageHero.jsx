import { motion } from 'framer-motion'
import { heroThemes } from '../data.js'

export default function PageHero({ title, theme = 'services' }) {
  const pack = heroThemes[theme] || heroThemes.services

  return (
    <section className="page-hero">
      {pack.bg ? (
        <div className="page-hero-bg" style={{ backgroundImage: `url(${pack.bg})` }} />
      ) : null}
      <div className="shade" />
      <div className="copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#e0a85a', justifyContent: 'center' }}
        >
          Anand Education Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          {title}
        </motion.h1>
      </div>
    </section>
  )
}
