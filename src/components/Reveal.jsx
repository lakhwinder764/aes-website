import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className = '', y = 36 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: 12, transformPerspective: 900 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
