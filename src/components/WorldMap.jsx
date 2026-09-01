import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WATER = '#f4efe6'
const PINS = [
  { lat: -33.87, lng: 151.21, color: 0xc4893d },
  { lat: 29.69, lng: 76.99, color: 0xc4893d },
  { lat: 51.51, lng: -0.13, color: 0x1a1a1a },
  { lat: 40.71, lng: -74.01, color: 0xc4893d },
  { lat: 25.2, lng: 55.27, color: 0x1a1a1a },
]

function isLandPixel(r, g, b) {
  const ocean = b > r + 12 && b > g + 4
  const dark = r + g + b < 40
  return !ocean && !dark
}

function dottedLandTexture(image) {
  const tw = 1600
  const th = 800
  const src = document.createElement('canvas')
  src.width = tw
  src.height = th
  const sctx = src.getContext('2d', { willReadFrequently: true })
  sctx.drawImage(image, 0, 0, tw, th)
  const data = sctx.getImageData(0, 0, tw, th).data

  const canvas = document.createElement('canvas')
  canvas.width = tw
  canvas.height = th
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = WATER
  ctx.fillRect(0, 0, tw, th)

  const step = 5
  ctx.fillStyle = '#111111'
  for (let y = 2; y < th; y += step) {
    const offset = (Math.floor(y / step) % 2) * (step / 2)
    for (let x = offset; x < tw; x += step) {
      const ix = Math.min(tw - 1, Math.round(x))
      const iy = Math.min(th - 1, Math.round(y))
      const i = (iy * tw + ix) * 4
      if (isLandPixel(data[i], data[i + 1], data[i + 2])) {
        ctx.beginPath()
        ctx.arc(x, y, 1.55, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  return canvas
}

function latLngToVector(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function createPin(color) {
  const pin = new THREE.Group()
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.35,
    metalness: 0.15,
  })
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.036, 18, 18), mat)
  head.position.y = 0.078
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.07, 14), mat)
  tip.position.y = 0.026
  tip.rotation.x = Math.PI
  pin.add(head, tip)
  return pin
}

export default function WorldMap({ alt = 'Global reach' }) {
  const wrap = useRef(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20)
    camera.position.z = 3.55

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const globeGroup = new THREE.Group()
    globeGroup.rotation.x = 0.22
    globeGroup.rotation.z = -0.08
    scene.add(globeGroup)

    const sphere = new THREE.SphereGeometry(1, 96, 96)
    const globeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const globe = new THREE.Mesh(sphere, globeMat)
    globe.rotation.y = 2.15
    globeGroup.add(globe)

    scene.add(new THREE.AmbientLight(0xffffff, 1.2))
    const key = new THREE.DirectionalLight(0xffffff, 0.7)
    key.position.set(2.2, 2.2, 3.2)
    scene.add(key)

    const pinGeos = []
    PINS.forEach((item) => {
      const pin = createPin(item.color)
      const pos = latLngToVector(item.lat, item.lng, 1.025)
      pin.position.copy(pos)
      pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize())
      globe.add(pin)
      pin.children.forEach((child) => {
        if (child.geometry) pinGeos.push(child.geometry)
      })
    })

    const loader = new THREE.ImageLoader()
    loader.load('/assets/images/earth-marble.jpg', (image) => {
      const dotted = dottedLandTexture(image)
      const texture = new THREE.CanvasTexture(dotted)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.generateMipmaps = false
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      globeMat.map = texture
      globeMat.needsUpdate = true
    })

    const size = () => {
      const w = el.clientWidth || 420
      renderer.setSize(w, w, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }
    size()
    window.addEventListener('resize', size)

    let frame = 0
    const tick = () => {
      globe.rotation.y += 0.0028
      frame = requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', size)
      globeMat.map?.dispose()
      sphere.dispose()
      pinGeos.forEach((g) => g.dispose())
      globeMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="globe-wrap" aria-label={alt}>
      <div className="globe-rim" />
      <div className="globe-canvas" ref={wrap} />
    </div>
  )
}
