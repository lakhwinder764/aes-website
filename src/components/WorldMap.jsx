import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const WATER = '#f4efe6'
const LAND = '#111111'
const LAND_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json'

const PINS = [
  { lat: -33.87, lng: 151.21, color: 0xc4893d },
  { lat: 29.69, lng: 76.99, color: 0xc4893d },
  { lat: 51.51, lng: -0.13, color: 0x1a1a1a },
  { lat: 40.71, lng: -74.01, color: 0xc4893d },
  { lat: 25.2, lng: 55.27, color: 0x1a1a1a },
]

/** Fallback outlines if the Natural Earth file cannot load. [lng, lat] rings. */
const FALLBACK_LAND = [
  [[-168,71],[-166,64],[-164,66],[-161,69],[-156,71],[-141,70],[-141,60],[-135,57],[-130,55],[-126,50],[-124,48],[-124,40],[-118,34],[-117,32],[-115,32],[-110,31],[-105,31],[-97,26],[-90,21],[-87,21],[-84,22],[-81,25],[-80,26],[-81,31],[-76,35],[-75,39],[-70,43],[-67,45],[-66,44],[-60,47],[-53,47],[-56,51],[-62,58],[-64,60],[-78,62],[-85,65],[-88,70],[-95,72],[-120,74],[-140,70],[-156,71],[-168,71]],
  [[-82,9],[-84,10],[-88,16],[-91,18],[-97,16],[-105,20],[-110,24],[-117,32],[-97,26],[-90,21],[-87,16],[-83,9],[-82,9]],
  [[-81,8],[-77,8],[-75,11],[-72,12],[-62,10],[-60,8],[-62,4],[-70,12],[-77,8]],
  [[-81,2],[-79,1],[-77,-5],[-71,-18],[-70,-18],[-71,-22],[-70,-27],[-73,-42],[-75,-47],[-74,-52],[-68,-55],[-67,-55],[-65,-43],[-62,-39],[-58,-38],[-53,-34],[-48,-28],[-40,-22],[-35,-8],[-35,-5],[-44,-2],[-50,0],[-52,4],[-60,9],[-70,12],[-77,8],[-80,8],[-81,2]],
  [[-10,36],[-9,39],[-9,42],[-2,43],[0,46],[-2,47],[-5,48],[-5,50],[-2,51],[1,51],[2,48],[4,49],[8,49],[8,54],[8,57],[12,56],[13,55],[12,54],[10,54],[13,46],[16,45],[14,42],[18,40],[16,39],[15,42],[12,42],[9,44],[7,44],[4,43],[3,42],[-1,37],[-5,36],[-10,36]],
  [[-11,51],[-10,54],[-6,58],[-5,59],[-3,59],[-2,57],[-3,54],[-5,52],[-6,50],[-10,51],[-11,51]],
  [[5,58],[5,62],[8,63],[10,63],[12,65],[16,69],[20,70],[26,71],[31,71],[30,69],[25,65],[19,63],[12,59],[8,58],[5,58]],
  [[12,55],[13,56],[19,55],[24,57],[30,60],[32,70],[28,71],[22,70],[16,69],[12,65],[12,59],[12,55]],
  [[-17,21],[-17,15],[-16,12],[-12,7],[-5,5],[1,6],[8,4],[10,1],[9,-1],[13,-8],[12,-17],[14,-22],[12,-25],[16,-29],[18,-34],[20,-35],[26,-34],[29,-32],[32,-29],[33,-26],[29,-23],[32,-26],[36,-19],[35,-16],[40,-15],[40,-11],[39,-5],[42,-2],[43,1],[49,5],[51,12],[47,11],[44,12],[42,16],[40,16],[37,20],[35,24],[34,28],[32,31],[30,31],[25,32],[20,31],[12,33],[10,37],[5,37],[-2,35],[-6,36],[-10,31],[-15,28],[-17,21]],
  [[43,-12],[50,-12],[50,-26],[44,-25],[43,-22],[43,-12]],
  [[26,36],[29,41],[35,37],[36,36],[35,32],[32,31],[26,36]],
  [[27,41],[29,41],[36,42],[42,42],[44,40],[40,37],[36,36],[29,41]],
  [[44,37],[48,30],[54,27],[57,26],[61,25],[66,25],[68,24],[72,21],[73,16],[77,8],[80,6],[80,10],[85,22],[88,22],[92,21],[94,18],[98,10],[100,6],[104,1],[104,-3],[109,1],[110,3],[103,4],[101,3],[100,6],[103,13],[109,14],[109,22],[107,22],[105,12],[99,8],[98,16],[94,22],[98,27],[104,23],[109,20],[113,22],[119,25],[122,31],[121,37],[118,39],[122,40],[124,40],[126,38],[129,35],[129,38],[128,41],[125,40],[121,39],[117,39],[109,40],[98,42],[87,49],[80,43],[74,40],[70,39],[67,37],[61,37],[55,37],[50,40],[44,40],[44,37]],
  [[100,-3],[106,-6],[114,-8],[122,-9],[131,-3],[141,-2],[150,-2],[151,-11],[143,-11],[135,-12],[129,-8],[125,-9],[114,-9],[105,-7],[100,-3]],
  [[130,31],[131,32],[136,35],[141,36],[141,38],[140,41],[142,42],[145,43],[145,44],[141,46],[140,42],[136,34],[131,31],[130,31]],
  [[113,22],[121,22],[122,25],[120,27],[116,23],[113,22]],
  [[94,74],[80,72],[70,70],[66,67],[60,66],[44,66],[40,68],[36,66],[30,70],[40,72],[60,76],[80,78],[95,76],[100,78],[110,76],[130,71],[160,68],[170,66],[180,66],[180,71],[160,73],[140,76],[120,77],[94,74]],
  [[-72,77],[-60,76],[-44,70],[-44,60],[-48,61],[-53,66],[-58,68],[-70,70],[-72,77]],
  [[113,-22],[129,-14],[137,-12],[142,-11],[146,-19],[153,-25],[153,-28],[151,-30],[146,-38],[150,-38],[146,-43],[145,-38],[138,-36],[136,-35],[130,-32],[116,-35],[115,-34],[114,-22],[113,-22]],
  [[166,-34],[173,-34],[178,-37],[175,-41],[172,-44],[167,-46],[166,-45],[170,-42],[172,-41],[168,-39],[166,-34]],
  [[144,-6],[148,-10],[151,-11],[155,-6],[150,-2],[144,-6]],
  [[-180,-63],[-140,-66],[-90,-72],[-60,-63],[-40,-77],[-10,-72],[20,-70],[50,-67],[80,-67],[120,-66],[160,-70],[180,-72],[180,-85],[-180,-85],[-180,-63]],
]

function decodeArc(topo, index) {
  const reverse = index < 0
  const raw = topo.arcs[reverse ? ~index : index]
  const { scale, translate } = topo.transform
  let x = 0
  let y = 0
  const coords = raw.map(([dx, dy]) => {
    x += dx
    y += dy
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]]
  })
  return reverse ? coords.slice().reverse() : coords
}

function ringFromArcs(topo, ring) {
  const pts = []
  ring.forEach((arcIndex, i) => {
    const coords = decodeArc(topo, arcIndex)
    pts.push(...(i ? coords.slice(1) : coords))
  })
  return pts
}

function landRingsFromTopo(topo) {
  const rings = []
  const geometries = topo.objects?.land?.geometries || []
  geometries.forEach((geom) => {
    const polygons = geom.type === 'MultiPolygon' ? geom.arcs : [geom.arcs]
    polygons.forEach((polygon) => {
      polygon.forEach((ring) => rings.push(ringFromArcs(topo, ring)))
    })
  })
  return rings
}

function splitDateline(ring) {
  if (ring.length < 3) return []
  const parts = [[ring[0]]]
  for (let i = 1; i < ring.length; i += 1) {
    const prev = parts[parts.length - 1]
    const last = prev[prev.length - 1]
    const cur = ring[i]
    if (Math.abs(cur[0] - last[0]) > 180) {
      const sign = last[0] > 0 ? 1 : -1
      prev.push([180 * sign, last[1]])
      parts.push([[-180 * sign, cur[1]], cur])
    } else {
      prev.push(cur)
    }
  }
  return parts.filter((part) => part.length >= 3)
}

function project(lng, lat, width, height) {
  return [
    ((lng + 180) / 360) * width,
    ((90 - lat) / 180) * height,
  ]
}

function drawLandMask(ctx, rings, width, height) {
  ctx.fillStyle = WATER
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#1a1a1a'
  ctx.beginPath()
  rings.forEach((ring) => {
    splitDateline(ring).forEach((part) => {
      part.forEach(([lng, lat], i) => {
        const [x, y] = project(lng, lat, width, height)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.closePath()
    })
  })
  ctx.fill('evenodd')
}

function dottedFromMask(mask, width, height) {
  const data = mask.getImageData(0, 0, width, height).data
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = WATER
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = LAND
  const step = 5
  for (let y = 2; y < height; y += step) {
    const offset = (Math.floor(y / step) % 2) * (step / 2)
    for (let x = offset; x < width; x += step) {
      const ix = Math.min(width - 1, Math.round(x))
      const iy = Math.min(height - 1, Math.round(y))
      const i = (iy * width + ix) * 4
      if (data[i] + data[i + 1] + data[i + 2] < 180) {
        ctx.beginPath()
        ctx.arc(x, y, 1.45, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  return canvas
}

function makeDottedEarth(rings) {
  const width = 2048
  const height = 1024
  const src = document.createElement('canvas')
  src.width = width
  src.height = height
  const sctx = src.getContext('2d', { willReadFrequently: true })
  drawLandMask(sctx, rings, width, height)
  return dottedFromMask(sctx, width, height)
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
    globeGroup.rotation.x = 0.18
    scene.add(globeGroup)

    const sphere = new THREE.SphereGeometry(1, 96, 96)
    const globeMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const globe = new THREE.Mesh(sphere, globeMat)
    globe.rotation.y = -0.35
    globeGroup.add(globe)

    scene.add(new THREE.AmbientLight(0xffffff, 1.15))
    const key = new THREE.DirectionalLight(0xffffff, 0.55)
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

    const applyTexture = (canvas) => {
      globeMat.map?.dispose()
      const texture = new THREE.CanvasTexture(canvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.RepeatWrapping
      texture.generateMipmaps = false
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      globeMat.map = texture
      globeMat.needsUpdate = true
    }

    applyTexture(makeDottedEarth(FALLBACK_LAND))

    let cancelled = false
    fetch(LAND_URL)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((topo) => {
        if (cancelled) return
        applyTexture(makeDottedEarth(landRingsFromTopo(topo)))
      })
      .catch(() => {})

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
      cancelled = true
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
