import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 10000, suffix: '+', label: 'Happy Clients', hint: 'Trusted families & students' },
  { end: 5000, suffix: '+', label: 'Visa and immigration', hint: 'Applications supported' },
  { end: 100, suffix: '+', label: 'Courses covered', hint: 'Study pathways matched' },
]

function formatValue(n) {
  return Math.round(n).toLocaleString('en-US')
}

function easeOut(t) {
  return 1 - (1 - t) ** 4
}

export default function Counters({ compact }) {
  const ref = useRef(null)
  const frameRef = useRef(0)
  const [values, setValues] = useState(stats.map(() => 0))
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const stop = () => {
      cancelAnimationFrame(frameRef.current)
    }

    const play = () => {
      stop()
      setDone(false)
      setValues(stats.map(() => 0))
      const started = performance.now()
      const duration = 2400
      const stagger = 220

      const tick = (now) => {
        const next = stats.map((stat, i) => {
          const local = now - started - i * stagger
          if (local <= 0) return 0
          const p = Math.min(1, local / duration)
          return stat.end * easeOut(p)
        })
        setValues(next)
        const finished = now - started > duration + stagger * (stats.length - 1)
        if (!finished) {
          frameRef.current = requestAnimationFrame(tick)
        } else {
          setValues(stats.map((s) => s.end))
          setDone(true)
        }
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        play()
      } else {
        stop()
        setDone(false)
        setValues(stats.map(() => 0))
      }
    }, { threshold: 0.4 })
    io.observe(el)

    return () => {
      io.disconnect()
      stop()
    }
  }, [])

  return (
    <div className={`stats ${done ? 'is-done' : ''}`} ref={ref} style={compact ? { marginTop: 0 } : undefined}>
      {stats.map((stat, i) => (
        <article className="stat" key={stat.label}>
          <b>
            <span className="stat-num">{formatValue(values[i])}</span>
            <span className="stat-suffix">{stat.suffix}</span>
          </b>
          <span className="stat-label">{stat.label}</span>
          <small>{stat.hint}</small>
        </article>
      ))}
    </div>
  )
}
