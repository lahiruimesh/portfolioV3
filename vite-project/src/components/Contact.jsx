import React, { useEffect, useRef } from "react";
import "./Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formCardRef = useRef(null);
  const titansRef = useRef([]);
  const scoutsRef = useRef([]);

  const titanAssets = [
    { src: "/images/col.png", alt: "Titan figure", top: "14%", width: "340px" },
    { src: "/images/pngwing.com.png", alt: "Titan figure", top: "28%", width: "260px" },
    { src: "/images/pngwing.com (1).png", alt: "Titan figure", top: "46%", width: "280px" },
  ];

  const scoutAssets = [
    { src: "/images/sc.png", alt: "Survey Corps figure", bottom: "18%", width: "340px" },
    { src: "/images/pngwing.png", alt: "Survey Corps figure", bottom: "34%", width: "260px" },
    { src: "/images/pngwing.com.png", alt: "Survey Corps figure", bottom: "50%", width: "240px" },
    { src: "/images/pngwing.com (1).png", alt: "Survey Corps figure", bottom: "64%", width: "220px" },
  ];

  const contactLinks = [
    { label: "Email", value: "lahiruimesh111@gmail.com", href: "mailto:lahiruimesh111@gmail.com" },
    { label: "Phone", value: "+94 70 686 8637", href: "tel:+94706868637" },
    { label: "GitHub", value: "github.com/lahiruimesh", href: "https://github.com/lahiruimesh" },
    { label: "LinkedIn", value: "lahiru-imesh-67350025a", href: "https://www.linkedin.com/in/lahiru-imesh-67350025a/" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Title Entrance Animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. Central Log Parchment Form Zoom Up Animation
      gsap.from(formCardRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.95,
        duration: 1.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: formCardRef.current,
          start: "top 85%",
        }
      });

      // 3. Dynamic Linked Parallax Scrolling for Titans Faction (Moves upward fast on scroll)
      titansRef.current.forEach((element, index) => {
        if (!element) return;
        gsap.fromTo(element,
          { y: 150 + index * 15, opacity: 0.25 },
          {
            y: -80 - index * 12,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            }
          }
        );
      });

      // 4. Dynamic Linked Parallax Scrolling for Survey Corps Units (Slides in horizontally & vertically)
      scoutsRef.current.forEach((element, index) => {
        if (!element) return;
        gsap.fromTo(element,
          { y: 220 + index * 10, x: 50, opacity: 0.35 },
          {
            y: -40 - index * 10,
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    // Connect your cloud message endpoints or backend api execution logs here
    alert("Message logged. Signal flare dispatched to the Survey Headquarters!");
  };

  return (
    <section className="contact-section" ref={sectionRef} id="contact">
      {/* Background Layer Canvas wrappers */}
      <div className="contact-bg-battlefield"></div>
      <div className="paper-texture"></div>
      <div className="blueprint"></div>

      {/* TITANS ILLUS - Rises over the walls on scroll left */}
      {titanAssets.map((asset, index) => (
        <div
          key={asset.src}
          className="titan-faction-left"
          ref={(el) => (titansRef.current[index] = el)}
          style={{ top: asset.top, width: asset.width, zIndex: 5 + index }}
        >
          <img src={asset.src} alt={asset.alt} loading="lazy" draggable="false" />
        </div>
      ))}

      {/* SURVEY CORPS DEFENDERS ILLUS - Emerges onto tower base right */}
      {scoutAssets.map((asset, index) => (
        <div
          key={asset.src}
          className="survey-corps-right"
          ref={(el) => (scoutsRef.current[index] = el)}
          style={{ bottom: asset.bottom, width: asset.width, zIndex: 6 + index }}
        >
          <img src={asset.src} alt={asset.alt} loading="lazy" draggable="false" />
        </div>
      ))}

      <div className="contact-container">
        {/* Top Badge Titles */}
        <div className="contact-top" ref={headerRef}>
          <span className="badge">Survey Corps • Mission Report</span>
          <h2>CONTACT</h2>
        </div>

        <div className="contact-links-strip">
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </a>
          ))}
        </div>

        {/* Central Communications Form Wrapper Frame */}
        <div className="form-wrapper" ref={formCardRef}>
          <form className="communication-log-card" onSubmit={handleDispatchSubmit}>
            {/* Embedded watermark insignia element behind inputs */}
            <img src="/images/shiganshina-wall.png" className="form-watermark-crest" alt="" />

            <h3>COMMUNICATION LOG</h3>

            <div className="input-field-group">
              <label htmlFor="coder-name">Name</label>
              <input 
                type="text" 
                id="coder-name" 
                placeholder="Lahiru Imesh" 
                required 
              />
            </div>

            <div className="input-field-group">
              <label htmlFor="coder-affiliation">Affiliation</label>
              <input 
                type="text" 
                id="coder-affiliation" 
                placeholder="Faculty of Information Technology, University of Moratuwa" 
              />
            </div>

            <div className="input-field-group">
              <label htmlFor="coder-report">Mission Report</label>
              <textarea 
                id="coder-report" 
                rows="5" 
                placeholder="Project, internship, or collaboration details..." 
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-send-dispatch">
              Send Dispatch
            </button>
          </form>
        </div>

        {/* Bottom Closing Theme Inscriptions */}
        <div className="contact-footer-signs">
          <div className="kanji-motto">心臓を捧げよ</div>
          <span className="sub-motto">Every project is a step closer to humanity's freedom.</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;