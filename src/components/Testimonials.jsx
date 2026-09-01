import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { testimonials } from '../data.js'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [])
  const item = testimonials[index]

  return (
    <div className="testimonial-wrap">
      <AnimatePresence mode="wait">
        <motion.article
          key={item.name}
          className="testimonial"
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.45 }}
        >
          <p>“{item.text}”</p>
          <h4>{item.name}</h4>
        </motion.article>
      </AnimatePresence>
      <div className="dots">
        {testimonials.map((t, i) => (
          <button key={t.name} className={i === index ? 'on' : ''} onClick={() => setIndex(i)} aria-label={t.name} />
        ))}
      </div>
    </div>
  )
}
