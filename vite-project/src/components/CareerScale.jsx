import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PORTFOLIO_METRICS = [
  {
    id      : 'cadet',
    name    : 'Academic Profile',
    height  : 'Lv. 1',
    color   : '#c4a450',
    desc    : 'B.Sc. (Hons) in Information Technology at the University of Moratuwa, GPA 3.39.',
    imgH    : 10,   
    imgW    : 10,   
    img     : '/images/Human.png',
    meta    : '2022-Present'
  },
  {
    id      : 'experience',
    name    : 'Industry Experience',
    height  : 'Lv. 2',
    color   : '#b0a090',
    desc    : 'Intern Software Engineer at Simplibill, delivering scalable features and optimizing backend systems.',
    imgH    : 18,
    imgW    : 14,
    img     : '/images/PureTitan.png',
    meta    : '7 Months'
  },
  {
    id      : 'contributions',
    name    : 'Project Portfolio',
    height  : 'Lv. 3',
    color   : '#8c8c8c',
    desc    : 'RAG, agentic AI, healthcare ML, brain MRI classification, and e-commerce systems across Python and web stacks.',
    imgH    : 28,
    imgW    : 16,
    img     : '/images/ArmoredTitan.png',
    meta    : '5+ Projects'
  },
  {
    id      : 'credentials',
    name    : 'Technical Stack',
    height  : 'Lv. 4',
    color   : '#c49090',
    desc    : 'Python, Scikit-learn, XGBoost, FastAPI, LangGraph, React, Next.js, NestJS, and Streamlit.',
    imgH    : 38,
    imgW    : 20,
    img     : '/images/FemaleTitan.png',
    meta    : 'AI / ML + Full-Stack'
  },
  {
    id      : 'networks',
    name    : 'Global Links',
    height  : 'Lv. Max',
    color   : '#c0522a',
    desc    : 'Direct links to GitHub, LinkedIn, email, and portfolio.',
    imgH    : 55,
    imgW    : 30,
    img     : '/images/col.png',
    meta    : 'LinkedIn • GitHub • Mail'
  },
]

export default function CareerScale() {
  const sectionRef = useRef(null)
  const stickyRef  = useRef(null)
  const metricRefs = useRef([])
  const labelRefs  = useRef([])
  const lineRefs   = useRef([])
  const headerRef  = useRef(null)
  const fogRef     = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    const cleanupAnimations = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const matches =
          trigger &&
          ((trigger.trigger === section) ||
            (trigger.pin === sticky) ||
            (trigger.vars && (
              trigger.vars.trigger === section ||
              trigger.vars.pin === sticky
            )))

        if (matches) trigger.kill()
      })
    }

    cleanupAnimations()

    const isMobile = window.matchMedia('(max-width: 640px)').matches

    if (isMobile) {
      section.style.height = 'auto'
      section.style.minHeight = 'auto'
      sticky.style.position = 'relative'
      sticky.style.height = 'auto'
      sticky.style.width = '100%'
      sticky.style.overflow = 'visible'
      gsap.set(
        [headerRef.current, fogRef.current, ...metricRefs.current, ...labelRefs.current, ...lineRefs.current],
        { clearProps: 'all', opacity: 1, x: 0, y: 0 }
      )
      return () => cleanupAnimations()
    }

    section.style.height = 'auto'
    section.style.minHeight = 'auto'
    sticky.style.position = 'relative'
    sticky.style.height = 'auto'
    sticky.style.width = '100%'
    sticky.style.overflow = 'visible'

    gsap.set(sticky, { clearProps: 'all' })
    gsap.set([headerRef.current, ...metricRefs.current, ...labelRefs.current, ...lineRefs.current], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
    })

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } }
    )

    PORTFOLIO_METRICS.forEach((_, i) => {
      const el = metricRefs.current[i]
      const label = labelRefs.current[i]
      const line = lineRefs.current[i]
      if (!el) return

      gsap.fromTo(
        el,
        { yPercent: 95, opacity: 0, filter: 'blur(4px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        [label, line],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 90%',
            once: true,
          },
        }
      )
    })

    gsap.fromTo(
      fogRef.current,
      { opacity: 0.9 },
      {
        opacity: 0.15,
        duration: 1.2,
        ease: 'sine.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    )

    return () => cleanupAnimations()
  }, [])

  return (
    <section className="ts-section" ref={sectionRef}>
      <div className="ts-sticky" ref={stickyRef}>

        <div className="ts-sky" />
        <div className="ts-ground" />
        <div className="ts-fog" ref={fogRef} />

        <div className="ts-header" ref={headerRef}>
          <span className="ts-header-rule" />
          <div>
            <p className="ts-header-eyebrow">Strategic Evaluation Dossier</p>
            <h2 className="ts-header-title">CREATIVE ENGINEERING SCALE</h2>
          </div>
          <span className="ts-header-rule" />
        </div>

        <div className="ts-stage">
          {PORTFOLIO_METRICS.map((metric, i) => (
            <div
              key={metric.id}
              className="ts-titan-slot"
              style={{ '--color': metric.color }}
            >
              <div
                className="ts-figure"
                ref={el => metricRefs.current[i] = el}
              >
                <img
                  src={metric.img}
                  alt={metric.name}
                  className="ts-figure-img"
                  draggable={false}
                  style={{
                    height  : `${metric.imgH}vh`,
                    width   : `${metric.imgW}vh`,
                  }}
                />
              </div>

              <div
                className="ts-measure-line"
                ref={el => lineRefs.current[i] = el}
                style={{ height: `${metric.imgH}vh` }}
              />

              <div
                className="ts-label"
                ref={el => labelRefs.current[i] = el}
              >
                <span className="ts-label-height">{metric.height}</span>
                <span className="ts-label-name">{metric.name}</span>
                <span className="ts-label-desc">{metric.desc}</span>
                
                {/* Custom dynamic interactive links injection block */}
                {metric.id === 'networks' ? (
                  <div className="ts-social-links-row">
                    <a href="https://github.com/lahiruimesh" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/lahiru-imesh-67350025a/" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:lahiruimesh111@gmail.com">Email</a>
                  </div>
                ) : (
                  <span className="ts-label-meta">{metric.meta}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Repurposed Wall Boundary Metric */}
        <div className="ts-wall-line">
          <span className="ts-wall-label">Industry Baseline · 2026 Target Standard</span>
        </div>

        <div className="ts-grain" />
      </div>
    </section>
  )
}