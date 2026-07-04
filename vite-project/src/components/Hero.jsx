import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Hero = () => {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)

  const ch1TitleRef = useRef(null)
  const ch1SubRef = useRef(null)
  const ch2TitleRef = useRef(null)
  const ch2SubRef = useRef(null)
  const ch3TitleRef = useRef(null)
  const ch3SubRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let timeline = null

    const ensurePlayback = () => {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    }

    video.muted = true
    video.playsInline = true
    video.loop = true
    video.autoplay = true
    video.currentTime = 0
    video.playbackRate = 1
    ensurePlayback()

    gsap.set(
      [
        ch1TitleRef.current,
        ch1SubRef.current,
        ch2TitleRef.current,
        ch2SubRef.current,
        ch3TitleRef.current,
        ch3SubRef.current,
      ],
      { opacity: 0 }
    )

    gsap.set(overlayRef.current, { opacity: 0.55 })

    timeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.65,
      defaults: { ease: 'power3.out' },
    })

    timeline.fromTo(
      ch1TitleRef.current,
      { opacity: 0, y: 56, filter: 'blur(12px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }
    )
    timeline.fromTo(
      ch1SubRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.55 },
      '<0.15'
    )
    timeline.to(
      [ch1TitleRef.current, ch1SubRef.current],
      { opacity: 0, y: -28, filter: 'blur(8px)', duration: 0.5 },
      '+=1.0'
    )

    timeline.fromTo(
      ch2TitleRef.current,
      { opacity: 0, letterSpacing: '0.5em', filter: 'blur(16px)' },
      { opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)', duration: 0.9 }
    )
    timeline.fromTo(
      ch2SubRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.5 },
      '<0.18'
    )
    timeline.to(
      [ch2TitleRef.current, ch2SubRef.current],
      { opacity: 0, y: -24, duration: 0.45 },
      '+=1.1'
    )
    timeline.to(overlayRef.current, { opacity: 0.15, duration: 0.45 }, '<')

    timeline.fromTo(
      ch3TitleRef.current,
      { opacity: 0, scale: 1.12, filter: 'blur(14px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.0 }
    )
    timeline.fromTo(
      ch3SubRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.55 },
      '<0.2'
    )
    timeline.to(
      [ch3TitleRef.current, ch3SubRef.current],
      { opacity: 0, y: -18, duration: 0.55 },
      '+=1.15'
    )
    timeline.to(overlayRef.current, { opacity: 0.55, duration: 0.35 })

    const keepPlaybackAlive = () => {
      ensurePlayback()
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        ensurePlayback()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('scroll', keepPlaybackAlive, { passive: true })
    window.addEventListener('wheel', keepPlaybackAlive, { passive: true })
    window.addEventListener('touchmove', keepPlaybackAlive, { passive: true })

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', keepPlaybackAlive)
      window.removeEventListener('wheel', keepPlaybackAlive)
      window.removeEventListener('touchmove', keepPlaybackAlive)

      if (timeline) {
        timeline.kill()
      }
    }
  }, [])

  return (
    <section className="hero" ref={sectionRef} id="home">
      <div className="hero__sticky" ref={stickyRef}>
        <video
          ref={videoRef}
          className="hero__video"
          src="/video/one.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div className="hero__overlay" ref={overlayRef} />

        <div className="hero__grain" />

        <div className="hero__chapter hero__ch1">
          <div className="hero__eyebrow">
            <span className="hero__rule" />
            <span className="hero__eyebrow-txt">2022-Present · University of Moratuwa</span>
            <span className="hero__rule" />
          </div>
          <h1 className="hero__ch1-title" ref={ch1TitleRef}>
            Lahiru <em>Imesh</em><br />
            <span>AI / ML Intern</span>
          </h1>
          <p className="hero__ch1-sub" ref={ch1SubRef}>
            Aspiring AI/ML Engineer focused on machine learning, data preprocessing, feature engineering, model development, and AI deployment.
          </p>
        </div>

        <div className="hero__chapter hero__ch2">
          <p className="hero__ch2-title" ref={ch2TitleRef}>PYTHON • FASTAPI • XGBOOST</p>
          <p className="hero__ch2-sub" ref={ch2SubRef}>— Full-stack AI systems, data-driven products, and practical problem solving —</p>
        </div>

        <div className="hero__chapter hero__ch3">
          <h2 className="hero__ch3-title" ref={ch3TitleRef}>
            BUILDING<br /><span>INTELLIGENT SYSTEMS</span>
          </h2>
          <p className="hero__ch3-sub" ref={ch3SubRef}>
            GitHub, LinkedIn, portfolio, and projects below.
          </p>
        </div>

        <div className="hero__scroll-hint">
          <span />
        </div>
      </div>
    </section>
  )
}

export default Hero