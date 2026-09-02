import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  HelpCircle,
  Landmark,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'

const PACKS = {
  home: [
    { src: '/assets/images/carousel-student.jpg', to: '/services/student-visa', label: 'Student visa', Icon: GraduationCap },
    { src: '/assets/images/carousel-work.jpg', to: '/services/work-visa', label: 'Work visa', Icon: Briefcase },
    { src: '/assets/images/carousel-pr.jpg', to: '/services/permanent-residency', label: 'PR', Icon: Landmark },
    { src: '/assets/images/carousel-citizenship.jpg', to: '/services/citizenship-applications', label: 'Citizenship', Icon: Award },
    { src: '/assets/images/bg-home-sydney.jpg', to: '/about', label: 'About us', Icon: Building2 },
  ],
  about: [
    { src: '/assets/images/about-consult-3d.jpg', to: '/contact', label: 'Consult', Icon: Phone },
    { src: '/assets/images/about-students-3d.jpg', to: '/services/student-visa', label: 'Study', Icon: GraduationCap },
    { src: '/assets/images/about-city-3d.jpg', to: '/migration', label: 'Migration', Icon: Landmark },
    { src: '/assets/images/art-about.jpg', to: '/partners', label: 'Partners', Icon: Users },
    { src: '/assets/images/art-services.jpg', to: '/services', label: 'Services', Icon: BookOpen },
  ],
  services: [
    { src: '/assets/images/service-student-3d.jpg', to: '/services/student-visa', label: 'Student', Icon: GraduationCap },
    { src: '/assets/images/service-work-3d.jpg', to: '/services/work-visa', label: 'Work', Icon: Briefcase },
    { src: '/assets/images/service-pr-3d.jpg', to: '/services/permanent-residency', label: 'PR', Icon: Landmark },
    { src: '/assets/images/service-citizenship-3d.jpg', to: '/services/citizenship-applications', label: 'Citizen', Icon: Award },
    { src: '/assets/images/art-contact.jpg', to: '/contact', label: 'Apply', Icon: Phone },
  ],
  student: [
    { src: '/assets/images/bg-student-visa.jpg', to: '/contact', label: 'Apply', Icon: Phone },
    { src: '/assets/images/art-student.jpg', to: '/partners', label: 'Unis', Icon: Building2 },
    { src: '/assets/images/about-students-3d.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
    { src: '/assets/images/hero-3d-campus.jpg', to: '/services', label: 'Services', Icon: BookOpen },
    { src: '/assets/images/carousel-student.jpg', to: '/about', label: 'About', Icon: Users },
  ],
  work: [
    { src: '/assets/images/bg-work-visa.jpg', to: '/contact', label: 'Apply', Icon: Phone },
    { src: '/assets/images/art-work.jpg', to: '/migration', label: 'Pathways', Icon: Landmark },
    { src: '/assets/images/service-work-3d.jpg', to: '/services', label: 'Visas', Icon: Briefcase },
    { src: '/assets/images/carousel-work.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
    { src: '/assets/images/bg-page-office.jpg', to: '/about', label: 'About', Icon: Building2 },
  ],
  pr: [
    { src: '/assets/images/bg-pr-visa.jpg', to: '/contact', label: 'Apply', Icon: Phone },
    { src: '/assets/images/art-pr.jpg', to: '/migration', label: 'Migration', Icon: Landmark },
    { src: '/assets/images/carousel-pr.jpg', to: '/services/citizenship-applications', label: 'Citizen', Icon: Award },
    { src: '/assets/images/about-city-3d.jpg', to: '/about', label: 'Life in AU', Icon: Building2 },
    { src: '/assets/images/bg-home-sydney.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
  ],
  citizenship: [
    { src: '/assets/images/bg-citizenship.jpg', to: '/contact', label: 'Apply', Icon: Phone },
    { src: '/assets/images/art-citizenship.jpg', to: '/services/permanent-residency', label: 'PR first', Icon: Landmark },
    { src: '/assets/images/carousel-citizenship.jpg', to: '/code-of-conduct', label: 'Conduct', Icon: Scale },
    { src: '/assets/images/bg-home-sydney.jpg', to: '/about', label: 'About', Icon: Users },
    { src: '/assets/images/art-faq.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
  ],
  partners: [
    { src: '/assets/images/bg-home-campus.jpg', to: '/services/student-visa', label: 'Study', Icon: GraduationCap },
    { src: '/assets/images/hero-3d-campus.jpg', to: '/contact', label: 'Enquire', Icon: Phone },
    { src: '/assets/images/art-partners.jpg', to: '/about', label: 'About', Icon: Users },
    { src: '/assets/images/about-students-3d.jpg', to: '/services', label: 'Services', Icon: BookOpen },
    { src: '/assets/images/art-faq.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
  ],
  faq: [
    { src: '/assets/images/art-contact.jpg', to: '/contact', label: 'Ask us', Icon: Phone },
    { src: '/assets/images/art-services.jpg', to: '/services', label: 'Services', Icon: BookOpen },
    { src: '/assets/images/art-migration.jpg', to: '/migration', label: 'Migration', Icon: Landmark },
    { src: '/assets/images/about-consult-3d.jpg', to: '/about', label: 'About', Icon: Users },
    { src: '/assets/images/art-conduct.jpg', to: '/code-of-conduct', label: 'Conduct', Icon: ShieldCheck },
  ],
  migration: [
    { src: '/assets/images/migration-agent-3d.jpg', to: '/contact', label: 'Consult', Icon: Phone },
    { src: '/assets/images/art-migration.jpg', to: '/services/permanent-residency', label: 'PR', Icon: Landmark },
    { src: '/assets/images/bg-home-sydney.jpg', to: '/services/work-visa', label: 'Work', Icon: Briefcase },
    { src: '/assets/images/bg-page-office.jpg', to: '/code-of-conduct', label: 'Conduct', Icon: Scale },
    { src: '/assets/images/carousel-pr.jpg', to: '/services', label: 'Visas', Icon: BookOpen },
  ],
  contact: [
    { src: '/assets/images/bg-contact.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
    { src: '/assets/images/art-contact.jpg', to: '/services', label: 'Services', Icon: BookOpen },
    { src: '/assets/images/about-consult-3d.jpg', to: '/about', label: 'About', Icon: Users },
    { src: '/assets/images/about-city-3d.jpg', to: '/migration', label: 'Migration', Icon: Landmark },
    { src: '/assets/images/bg-page-office.jpg', to: '/code-of-conduct', label: 'Office', Icon: Building2 },
  ],
  conduct: [
    { src: '/assets/images/art-conduct.jpg', to: '/migration', label: 'Agent', Icon: Scale },
    { src: '/assets/images/bg-page-office.jpg', to: '/contact', label: 'Talk', Icon: Phone },
    { src: '/assets/images/about-consult-3d.jpg', to: '/about', label: 'About', Icon: Users },
    { src: '/assets/images/art-faq.jpg', to: '/faq', label: 'FAQ', Icon: HelpCircle },
    { src: '/assets/images/bg-about.jpg', to: '/services', label: 'Services', Icon: ShieldCheck },
  ],
}

function samePage(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

function ChipFace({ src, Icon, label }) {
  const [tone, setTone] = useState('light')

  useEffect(() => {
    let gone = false
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(img, 0, 0, 32, 32)
        const { data } = ctx.getImageData(0, 0, 32, 32)
        let sum = 0
        const n = data.length / 4
        for (let i = 0; i < data.length; i += 4) {
          sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        }
        if (!gone) setTone(sum / n > 148 ? 'dark' : 'light')
      } catch {
        if (!gone) setTone('light')
      }
    }
    img.onerror = () => {
      if (!gone) setTone('light')
    }
    img.src = src
    return () => {
      gone = true
    }
  }, [src])

  return (
    <span className={`scene-chip-face tone-${tone}`}>
      <img className="scene-chip-img" src={src} alt="" />
      <span className="scene-chip-mark">
        <span className="scene-chip-icon"><Icon size={30} strokeWidth={2.2} /></span>
        <em>{label}</em>
      </span>
    </span>
  )
}

export default function SceneChips({ theme = 'home' }) {
  const { pathname } = useLocation()
  const ref = useRef(null)
  const pack = PACKS[theme] || PACKS.home

  const chips = useMemo(() => {
    const related = pack.filter((chip) => !samePage(pathname, chip.to))
    const extras = PACKS.home.filter((chip) => !samePage(pathname, chip.to) && !related.some((r) => r.to === chip.to))
    return [...related, ...extras].slice(0, 5).map((chip, i) => ({ ...chip, className: `c${i + 1}` }))
  }, [pack, pathname])

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      el.style.setProperty('--cx', `${x}px`)
      el.style.setProperty('--cy', `${y}px`)
      el.style.setProperty('--crx', `${-y * 0.45}deg`)
      el.style.setProperty('--cry', `${x * 0.5}deg`)
    }
    const onScroll = () => {
      el.style.setProperty('--cz', `${Math.min(48, window.scrollY * 0.04)}px`)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="scene-chips" ref={ref}>
      {chips.map((chip) => {
        const Icon = chip.Icon
        return (
          <Link
            key={`${chip.className}-${chip.to}`}
            className={`scene-chip ${chip.className}`}
            to={chip.to}
            aria-label={chip.label}
          >
            <ChipFace src={chip.src} Icon={Icon} label={chip.label} />
          </Link>
        )
      })}
    </div>
  )
}
