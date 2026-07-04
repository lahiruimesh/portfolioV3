import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // FIXED: Removed duplicate declaration of sectionRef
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const quoteRef = useRef(null);
  const cardsRef = useRef([]);
  const canvasRef = useRef(null);
  const stampRef = useRef(null);

  useEffect(() => {
    // -------------------------------------
    // GSAP ANIMATIONS FRAMEWORK
    // -------------------------------------
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        delay: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        rotate: -5,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
        },
      });

      gsap.from(leftRef.current, {
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 75%",
        },
      });

      gsap.from(rightRef.current, {
        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 75%",
        },
      });

      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          opacity: 0,
          y: 80,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
          },
        });
      }

      gsap.from(quoteRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 85%",
        },
      });

      gsap.fromTo(
        stampRef.current,
        {
          scale: 3,
          opacity: 0,
          rotate: -20,
        },
        {
          scale: 1,
          opacity: 0.08,
          rotate: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    // -------------------------------------
    // FLOATING DUST PARTICLES (CANVAS)
    // -------------------------------------
    // FIXED: Moved logic up so it runs before any return statement
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Dust {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        canvasCtx.fillStyle = "rgba(216, 201, 163, 0.15)";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasCtx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Dust());
      }
    };

    const animate = () => {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener("resize", resize);

    // CLEANUP STAGE
    return () => {
      ctx.revert(); // Reverts GSAP Context cleanly
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId); // FIXED: Prevented continuous loop memory leaks
    };
  }, []);

  // 3D Perspective Card Tilt Effect
  useEffect(() => {
    const frame = document.querySelector(".profile-frame");
    if (!frame) return;

    const handleMove = (e) => {
      const rect = frame.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -10;
      const rotateY = (x / rect.width - 0.5) * 10;

      frame.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
    };

    const reset = () => {
      frame.style.transform = "rotate(-1deg) scale(1)";
    };

    frame.addEventListener("mousemove", handleMove);
    frame.addEventListener("mouseleave", reset);

    return () => {
      frame.removeEventListener("mousemove", handleMove);
      frame.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section className="about" ref={sectionRef} id="about">
      <canvas ref={canvasRef} className="dust-canvas" />

      <img
        ref={stampRef}
        src="/images/survey-logo.jpg"
        className="giant-stamp"
        alt=""
      />

      <div className="paper-texture"></div>
      <div className="blueprint"></div>

      <div className="about-container">
        {/* Heading */}
        <div className="section-top">
          <span className="archive-badge" ref={badgeRef}>
            SURVEY CORPS ARCHIVES
          </span>
          <h2 ref={titleRef}>PERSONNEL RECORD</h2>
        </div>

        {/* Main Content Panels */}
        <div className="about-main">
          {/* LEFT PANEL */}
          <div className="profile-panel" ref={leftRef}>
            <div className="profile-frame" ref={imageRef}>
              <img src="/images/profile.png" alt="profile" />
              <div className="frame-overlay"></div>
            </div>
            <img
              src="/images/survey-logo.jpg"
              className="logo-watermark"
              alt=""
            />
          </div>

          {/* RIGHT PANEL */}
          <div className="record-panel" ref={rightRef}>
            <div className="record-title">CLASSIFIED DOSSIER</div>
            <div className="record-grid">
              <div className="record-row">
                <span>Name</span>
                <p>Lahiru Imesh</p>
              </div>
              <div className="record-row">
                <span>Role</span>
                <p>AI / ML Intern</p>
              </div>
              <div className="record-row">
                <span>Affiliation</span>
                <p>Faculty of Information Technology, University of Moratuwa</p>
              </div>
              <div className="record-row">
                <span>Experience</span>
                <p>Intern Software Engineer at Simplibill | 7 months</p>
              </div>
              <div className="record-row">
                <span>Links</span>
                <p>
                  <a href="https://github.com/lahiruimesh" target="_blank" rel="noreferrer">GitHub</a>
                  {' '}
                  <span>•</span>
                  {' '}
                  <a href="https://www.linkedin.com/in/lahiru-imesh-67350025a/" target="_blank" rel="noreferrer">LinkedIn</a>
                  {' '}
                  <span>•</span>
                  {' '}
                  <a href="https://lahiruimesh.github.io/My-Portfolio-V2/" target="_blank" rel="noreferrer">Portfolio</a>
                </p>
              </div>
              <div className="record-row">
                <span>Mission</span>
                <p>
                  Building scalable AI, ML, and full-stack systems that solve real-world problems.
                </p>
              </div>
            </div>

            <div className="record-story">
              <p>
                Aspiring AI/ML Engineer with experience in data preprocessing, feature engineering, model development,
                and deployment using Python, Scikit-learn, XGBoost, FastAPI, LangChain, and LangGraph.
              </p>
              <p>
                I also build production-ready web applications with React, Next.js, NestJS, Streamlit, and modern
                databases while keeping a strong design and engineering workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {[
            ["Experience", "7 Months"],
            ["Projects", "5+"],
            ["GPA", "3.39"],
            ["Education", "2022-Present"],
          ].map((item, i) => (
            <div
              key={i}
              className="stat-card"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
            </div>
          ))}
        </div>

        {/* Quote Block */}
        <div className="quote-box" ref={quoteRef}>
          <p>
            "Every model, pipeline, and interface should earn its place by solving something real."
          </p>
          <span>— Lahiru Imesh</span>
        </div>
      </div>
    </section>
  );
};

export default About;