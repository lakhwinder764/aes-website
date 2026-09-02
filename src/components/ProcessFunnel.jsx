import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Files,
  Flag,
  MessageCircle,
  Send,
  Upload,
} from 'lucide-react'

function stepIcon(title = '') {
  const t = title.toLowerCase()
  if (t.includes('document') || t.includes('gather') || t.includes('file')) return Files
  if (t.includes('submit') || t.includes('lodge') || t.includes('complete')) return Upload
  if (t.includes('interview') || t.includes('test') || t.includes('ceremony')) return Flag
  if (t.includes('discuss') || t.includes('consult') || t.includes('profile')) return MessageCircle
  if (t.includes('track') || t.includes('eoi')) return Send
  return ClipboardCheck
}

export default function ProcessFunnel({ steps }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = steps[active] || steps[0]
  const Icon = stepIcon(current?.title)
  const body = current?.hint || current?.text || ''
  const progress = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0

  useEffect(() => {
    setActive(0)
  }, [steps.map((s) => s.title).join('|')])

  useEffect(() => {
    if (paused || steps.length < 2) return undefined
    const id = setInterval(() => setActive((n) => (n + 1) % steps.length), 5200)
    return () => clearInterval(id)
  }, [paused, steps.length])

  const go = (index) => {
    setPaused(true)
    setActive((index + steps.length) % steps.length)
  }

  if (!current) return null

  return (
    <div className="stepper" onMouseEnter={() => setPaused(true)}>
      <div className="stepper-rail" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        <div className="stepper-line">
          <motion.span
            className="stepper-line-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {steps.map((step, i) => {
          const NodeIcon = stepIcon(step.title)
          const done = i < active
          const on = i === active
          return (
            <button
              key={step.title}
              type="button"
              className={`stepper-dot ${on ? 'on' : ''} ${done ? 'done' : ''}`}
              onClick={() => go(i)}
              aria-pressed={on}
            >
              {on ? (
                <motion.span
                  className="stepper-pulse"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : null}
              <span className="stepper-orb">
                {done ? <Check size={20} /> : <NodeIcon size={20} />}
              </span>
              <span className="stepper-index">0{i + 1}</span>
              <strong>{step.title}</strong>
            </button>
          )
        })}
      </div>

      <div className="stepper-stage">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.title}
            className="stepper-card"
            initial={{ opacity: 0, y: 28, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -18, rotateX: -6 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="stepper-card-icon"
              initial={{ scale: 0.7, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            >
              <Icon size={32} />
            </motion.div>
            <p className="eyebrow">Step 0{active + 1} / 0{steps.length}</p>
            <h3>{current.title}</h3>
            <p>{body}</p>
            <div className="stepper-nav">
              <button type="button" className="stepper-btn" onClick={() => go(active - 1)} aria-label="Previous step">
                <ChevronLeft size={18} />
              </button>
              <div className="stepper-pips">
                {steps.map((step, i) => (
                  <button
                    key={step.title}
                    type="button"
                    className={i === active ? 'on' : ''}
                    onClick={() => go(i)}
                    aria-label={step.title}
                  />
                ))}
              </div>
              <button type="button" className="stepper-btn" onClick={() => go(active + 1)} aria-label="Next step">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
