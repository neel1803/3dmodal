'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Boxes, Cuboid, Menu, Move3d, X, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ServiceItem = [string, string, LucideIcon]
const services: ServiceItem[] = [
  ['3D Printing', 'FDM, resin and specialty materials for precise, production-ready parts.', Cuboid],
  ['Design & Modeling', 'From rough sketch to production CAD, shaped around your vision.', Move3d],
  ['Rapid Prototyping', 'Test form, function and fit before committing to a final run.', Zap],
  ['Custom Products', 'One-off objects, gifts and functional pieces made personal.', Boxes],
]
const projects = [
  { name: 'Orbit Lamp', category: 'Custom Products', detail: 'Layered light study', tone: 'sky' },
  { name: 'Mysuru Pavilion', category: 'Architecture', detail: 'Parametric model', tone: 'cobalt' },
  { name: 'Aero Bracket', category: 'Prototypes', detail: 'Functional nylon part', tone: 'cyan' },
  { name: 'Kinetic Bloom', category: 'Decorative Objects', detail: 'Generative sculpture', tone: 'royal' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [activeProject, setActiveProject] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el))
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.width = `${(window.scrollY / height) * 100}%`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { reveal.disconnect(); window.removeEventListener('scroll', handleScroll) }
  }, [])

  const tilt = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--rx', `${y * -8}deg`)
    card.style.setProperty('--ry', `${x * 10}deg`)
  }
  const resetTilt = (event: React.MouseEvent<HTMLElement>) => { event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg') }
  const filteredProjects = filter === 'All' ? projects : projects.filter((project) => project.category === filter)

  return (
    <main className="site-shell">
      <div className="scroll-progress" ref={progressRef} />
      <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}><span className="brand-mark">D</span><span>DRISHTI<span className="brand-muted">/3D</span></span></a>
        <div className="nav-links">{['About', 'Services', 'Work', 'Process', 'Contact'].map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span className="live-dot" /> Mysuru · Karnataka · India</p>
          <h1>Ideas into<br /><em>3D reality.</em></h1>
          <p className="hero-intro">We design, prototype and print objects that move from imagination to your hands.</p>
          <div className="hero-actions"><a className="button button-bright" href="#work">Explore our work <ArrowDownRight size={16} /></a><a className="text-link" href="#contact">Get a quote <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="hero-object" aria-label="Abstract floating 3D printed form">
          <div className="orbital orbital-one" /><div className="orbital orbital-two" /><div className="hero-cube"><div className="cube-face cube-front" /><div className="cube-face cube-side" /><div className="cube-face cube-top" /><div className="cube-core" /></div>
          <div className="object-label label-top">OBJECT_001 <span>●</span></div><div className="object-label label-bottom">PRINT / 04:32:18</div>
        </div>
        <div className="hero-foot"><span>SCROLL TO DISCOVER</span><span className="line" /><span>01 / 06</span></div>
      </section>

      <section className="intro section" id="about"><div className="section-kicker reveal">01 <span /> About Drishti</div><div className="intro-layout"><h2 className="reveal">We don&apos;t just print.<br /><span>We build.</span></h2><div className="intro-text reveal"><p>Drishti 3D is a design and fabrication studio in Mysuru, turning digital ideas into tangible objects with precision and personality.</p><a className="circle-link" href="#services">Our approach <ArrowDownRight size={18} /></a></div></div><div className="stats reveal">{[['500+', 'Projects'], ['1K+', 'Prints'], ['12', 'Materials'], ['∞', 'Custom ideas']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section className="services section" id="services"><div className="section-kicker reveal">02 <span /> What we do</div><div className="section-heading reveal"><h2>Built for the<br /><span>unimagined.</span></h2><p>From first spark to final surface, every project is a collaboration between your idea and our craft.</p></div><div className="service-grid">{services.map(([title, description, Icon], i) => <article className="service-card reveal" key={title} onMouseMove={tilt} onMouseLeave={resetTilt}><div className="service-number">0{i + 1}</div><Icon className="service-icon" strokeWidth={1} /><h3>{title as string}</h3><p>{description as string}</p><a href="#contact">Explore <ArrowUpRight size={14} /></a></article>)}</div></section>

      <section className="showcase section" id="work"><div className="section-kicker reveal">03 <span /> Selected work</div><div className="showcase-top reveal"><h2>Objects with<br /><span>a point of view.</span></h2><div className="filter-row">{['All', 'Prototypes', 'Architecture', 'Custom Products'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="project-grid">{filteredProjects.map((project, i) => <button className={`project project-${project.tone} reveal`} key={project.name} onClick={() => setActiveProject(i)} onMouseMove={tilt} onMouseLeave={resetTilt}><div className="project-art"><div className="art-shape" /><span>VIEW / 0{i + 1}</span></div><div className="project-meta"><div><h3>{project.name}</h3><p>{project.detail}</p></div><ArrowUpRight size={18} /></div></button>)}</div><div className="project-note reveal"><span>Selected / {projects[activeProject]?.name}</span><span>Scroll to explore <ArrowDownRight size={16} /></span></div></section>

      <section className="process section" id="process"><div className="section-kicker reveal">04 <span /> Digital to reality</div><div className="process-layout"><h2 className="reveal">Six steps.<br /><span>One object.</span></h2><div className="process-list">{['Concept', '3D Modeling', 'Slicing', 'Printing', 'Finishing', 'Final Product'].map((step, i) => <div className="process-step reveal" key={step}><span>0{i + 1}</span><h3>{step}</h3><i>{i === 3 ? 'Layer by layer, made real.' : 'The detail that moves it forward.'}</i></div>)}</div></div><div className="printer-demo reveal"><div className="printer-head"><span className="nozzle" /></div><div className="print-stack">{Array.from({ length: 7 }).map((_, i) => <span key={i} style={{ '--i': i } as React.CSSProperties} />)}</div><div className="print-bed" /><div className="demo-caption">LIVE BUILD <span>●</span></div></div></section>

      <section className="cta section" id="contact"><div className="cta-orbit" /><div className="section-kicker reveal">05 <span /> Start something</div><h2 className="reveal">Have an<br /><em>idea?</em></h2><p className="reveal">Let&apos;s turn your idea into something you can hold.</p><a className="button button-bright reveal" href="mailto:hello@drishti3d.in">Start your project <ArrowUpRight size={16} /></a></section>
      <footer><a href="#home" className="brand"><span className="brand-mark">D</span><span>DRISHTI<span className="brand-muted">/3D</span></span></a><p>Digital thinking. Physical making.<br />Mysuru, Karnataka.</p><div className="footer-links"><a href="#services">Services</a><a href="#work">Instagram</a><a href="mailto:hello@drishti3d.in">hello@drishti3d.in</a></div><small>© 2025 Drishti 3D. Made with intention.</small></footer>
    </main>
  )
}
