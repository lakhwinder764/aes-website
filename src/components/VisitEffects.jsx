import { useEffect } from 'react'

const SKIP = ['logo', 'f3d', 'stamp', 'holo-grid', 'scene-chip-img']

export default function VisitEffects({ path }) {
  useEffect(() => {
    let io
    const id = window.setTimeout(() => {
      const skip = (el) => SKIP.some((c) => el.classList.contains(c))
      const images = [...document.querySelectorAll('img')].filter((el) => !skip(el))
      const sections = document.querySelectorAll('.js-hot-section, .office, .facts-block, .footer')
      const hot = document.querySelectorAll('.hot-info, a[href^="tel:"], a[href^="mailto:"]')

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visited')
            if (entry.target.matches('.js-hot-section, .office, .facts-block, .footer')) {
              entry.target.querySelectorAll('.hot-info, a[href^="tel:"], a[href^="mailto:"]').forEach((el) => {
                el.classList.add('is-visited')
              })
            }
            io.unobserve(entry.target)
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
      )

      images.forEach((el) => {
        el.classList.add('zoom-media')
        io.observe(el)
      })
      hot.forEach((el) => io.observe(el))
      sections.forEach((el) => io.observe(el))
    }, 180)

    return () => {
      window.clearTimeout(id)
      io?.disconnect()
    }
  }, [path])

  return null
}
