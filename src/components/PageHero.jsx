import { motion } from 'framer-motion'
import { heroThemes, site } from '../data.js'

export default function PageHero({ title, theme = 'services', eyebrow, description }) {
  const pack = heroThemes[theme] || heroThemes.services

  return (
    <section className="page-hero">
      {pack.bg ? (
        <img className="page-hero-bg" src={pack.bg} alt="" />
      ) : null}
      <div className="shade" />
      <div className="copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#e0a85a', justifyContent: 'center' }}
        >
          <span className="hot-info brand-name">{eyebrow || site.name}</span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            className="page-hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  )
}
