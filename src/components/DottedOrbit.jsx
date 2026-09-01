import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function fibonacciSphere(count, radius) {
  const positions = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r * radius
    positions[i * 3 + 1] = y * radius
    positions[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return positions
}

function ring(count, radius, y = 0) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2
    positions[i * 3] = Math.cos(a) * radius
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(a) * radius
  }
  return positions
}

export default function DottedOrbit() {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40)
    camera.position.set(0, 0.15, 6.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    const globeGeo = new THREE.BufferGeometry()
    globeGeo.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(2200, 1.7), 3))
    const globe = new THREE.Points(
      globeGeo,
      new THREE.PointsMaterial({
        color: 0xe8d5b5,
        size: 0.028,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    )
    root.add(globe)

    const coreGeo = new THREE.BufferGeometry()
    coreGeo.setAttribute('position', new THREE.BufferAttribute(fibonacciSphere(700, 1.15), 3))
    const core = new THREE.Points(
      coreGeo,
      new THREE.PointsMaterial({
        color: 0xc4893d,
        size: 0.02,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
    )
    root.add(core)

    const ringGeo = new THREE.BufferGeometry()
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ring(160, 2.35, 0.08), 3))
    const orbit = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({
        color: 0xc4893d,
        size: 0.032,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    )
    orbit.rotation.x = 0.7
    root.add(orbit)

    const ring2Geo = new THREE.BufferGeometry()
    ring2Geo.setAttribute('position', new THREE.BufferAttribute(ring(110, 2.7, 0), 3))
    const orbit2 = new THREE.Points(
      ring2Geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.022,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    )
    orbit2.rotation.x = -0.45
    orbit2.rotation.z = 0.4
    root.add(orbit2)

    const size = () => {
      const w = el.clientWidth || window.innerWidth
      const h = el.clientHeight || 420
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }
    size()
    window.addEventListener('resize', size)

    let mx = 0
    let my = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.35
      my = (e.clientY / window.innerHeight - 0.5) * 0.2
    }
    window.addEventListener('pointermove', onMove)

    let frame = 0
    const tick = () => {
      if (!reduce) {
        globe.rotation.y += 0.0018
        core.rotation.y -= 0.0024
        orbit.rotation.z += 0.004
        orbit2.rotation.y += 0.003
        root.rotation.x += (my - root.rotation.x) * 0.04
        root.rotation.y += (mx - root.rotation.y) * 0.04
      }
      frame = requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', size)
      window.removeEventListener('pointermove', onMove)
      globeGeo.dispose()
      coreGeo.dispose()
      ringGeo.dispose()
      ring2Geo.dispose()
      globe.material.dispose()
      core.material.dispose()
      orbit.material.dispose()
      orbit2.material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="dotted-orbit" ref={wrap} aria-hidden="true" />
}
