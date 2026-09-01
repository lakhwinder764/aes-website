import { useEffect, useRef } from 'react'

export default function DepthField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = canvas.getContext('2d')
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      s: 0.4 + Math.random() * 1.6,
    }))
    let raf = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)
      dots.forEach((d) => {
        d.z -= 0.0018
        if (d.z <= 0) d.z = 1
        const k = 0.55 / d.z
        const x = w / 2 + d.x * w * k * 0.42
        const y = h / 2 + d.y * h * k * 0.42
        const a = (1 - d.z) * 0.38
        ctx.beginPath()
        ctx.fillStyle = `rgba(196, 137, 61, ${a})`
        ctx.arc(x, y, d.s * (1.2 - d.z) * 2.2, 0, Math.PI * 2)
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="depth-field" aria-hidden="true" />
}
