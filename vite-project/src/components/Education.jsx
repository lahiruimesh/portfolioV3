import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const nodesRef = useRef([]);

  const educationData = [
    {
      stage: "Current Degree",
      degree: "B.Sc. (Hons) in Information Technology",
      institution: "Faculty of Information Technology, University of Moratuwa",
      duration: "2022 — Present",
      status: "In Progress",
      gpa: "3.39 / 4.00",
      description: "Undergraduate study focused on information technology, software engineering, and applied AI/ML development.",
      modules: ["AI / ML", "Web Development", "Databases", "Software Engineering"],
      current: true
    },
    {
      stage: "Secondary Education",
      degree: "GCE Advanced Level",
      institution: "Bandarawela Central College",
      duration: "2018 — 2020",
      status: "Science Stream",
      gpa: "Z-score 1.6220",
      description: "Completed the science stream and built a strong foundation in analytical problem solving.",
      modules: ["Physics", "Chemistry", "Combined Mathematics"],
      current: false
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Text Entrance
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Map Tactical Tracking Vector Scale Line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".campaign-map",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true
        }
      });

      // Individual Expedition Node Cascades
      nodesRef.current.forEach((node, i) => {
        const beacon = node.querySelector(".beacon-circle");
        const panel = node.querySelector(".intel-panel");

        gsap.from(beacon, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
          }
        });

        gsap.from(panel, {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 75%",
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="education-section" ref={sectionRef} id="education">
      <div className="paper-texture"></div>
      <div className="blueprint"></div>

      <div className="education-container">
        {/* Section Top Header */}
        <div className="edu-top" ref={headerRef}>
          <span className="archive-badge">Regiment Intel Log</span>
          <h2>CAMPAIGN HISTORY</h2>
        </div>

        {/* Tactical Map Container */}
        <div className="campaign-map">
          <div className="tactical-line" ref={lineRef}></div>

          {educationData.map((edu, index) => (
            <div 
              key={index} 
              className={`expedition-node ${edu.current ? "current" : ""}`}
              ref={(el) => (nodesRef.current[index] = el)}
            >
              {/* Timeline Vector Target Point */}
              <div className="map-beacon">
                <div className="beacon-circle"></div>
              </div>

              {/* Dossier Information Card Grid */}
              <div className="intel-panel">
                <div className="intel-core">
                  <div className="intel-header">
                    <span className="campaign-tag">{edu.stage}</span>
                    <h3>{edu.degree}</h3>
                    <div className="institution-sub">{edu.institution}</div>
                  </div>

                  <div className="intel-body">
                    <p>{edu.description}</p>
                    
                    <div className="intel-log-sector">
                      <h4>Acquired Competencies</h4>
                      <div className="modules-tags">
                        {edu.modules.map((mod, mIdx) => (
                          <div key={mIdx} className="module-badge">
                            {mod}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Metadata Manifest Profile Column */}
                <div className="intel-manifest">
                  <div className="manifest-stat">
                    <label>Timeline Cycle</label>
                    <span>{edu.duration}</span>
                  </div>
                  <div className="manifest-stat">
                    <label>Expedition Rating</label>
                    <span className={edu.current ? "highlight-gpa" : ""}>{edu.gpa}</span>
                  </div>
                  <div className="manifest-stat">
                    <label>Sector Status</label>
                    <span style={{ color: edu.current ? "#8f1d1d" : "#8b7355", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {edu.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;