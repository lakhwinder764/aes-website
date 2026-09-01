import { useEffect, useRef } from 'react'
import { heroThemes } from '../data.js'

const CLASSES = ['a', 'b', 'c', 'd']

export default function FloatStage({ variant = 'hero', theme = 'home' }) {
  const ref = useRef(null)
  const floats = heroThemes[theme]?.floats || heroThemes.home.floats

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return undefined
    const move = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24
      const y = (e.clientY / window.innerHeight - 0.5) * 16
      el.style.setProperty('--px', `${x}px`)
      el.style.setProperty('--py', `${y}px`)
      el.style.setProperty('--rx', `${-y * 0.35}deg`)
      el.style.setProperty('--ry', `${x * 0.4}deg`)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div ref={ref} className={`float-stage ${variant}`} aria-hidden="true">
      <div className="holo-grid" />
      {floats.map((src, i) => (
        <img key={src} src={src} alt="" className={`f3d ${CLASSES[i] || 'a'}`} />
      ))}
    </div>
  )
}
