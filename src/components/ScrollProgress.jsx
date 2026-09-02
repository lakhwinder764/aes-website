import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SIZE = 56
const STROKE = 3.5
const RADIUS = (SIZE - STROKE) / 2 - 1
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const next = max > 0 ? Math.min(1, el.scrollTop / max) : 0
      setProgress(next)
      setVisible(el.scrollTop > 240)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      className={`scroll-progress ${visible ? 'is-visible' : ''}`}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg className="scroll-progress-ring" viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle className="track" cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} />
        <circle
          className="bar"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE * (1 - progress),
          }}
        />
      </svg>
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  )
}
