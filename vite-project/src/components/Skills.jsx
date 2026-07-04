import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);

  // Data categorization structure
  const skillCategories = [
    {
      title: "Programming Languages",
      description: "Core languages used across AI, automation, and product development.",
      image: "/images/Human.png",
      skills: [
        { name: "Java", level: "Strong", style: { width: "92%" } },
        { name: "Python", level: "95%", style: { width: "95%" } },
        { name: "JavaScript", level: "88%", style: { width: "88%" } },
      ],
    },
    {
      title: "Machine Learning & AI",
      description: "Model development, preprocessing, evaluation, and agentic workflows.",
      image: "/images/ArmoredTitan.png",
      reverse: true,
      skills: [
        { name: "TensorFlow / Keras", level: "90%", style: { width: "90%" } },
        { name: "Scikit-Learn / XGBoost", level: "92%", style: { width: "92%" } },
        { name: "LangChain / LangGraph / n8n", level: "87%", style: { width: "87%" } },
      ],
    },
    {
      title: "Web & Full-Stack",
      description: "Frontend and backend application development for scalable products.",
      image: "/images/PureTitan.png",
      skills: [
        { name: "ReactJS / NextJS", level: "88%", style: { width: "88%" } },
        { name: "FastAPI / NestJS", level: "90%", style: { width: "90%" } },
        { name: "Streamlit", level: "84%", style: { width: "84%" } },
      ],
    },
    {
      title: "Data Science & Analytics",
      description: "Analysis, visualization, and data preparation for decision making.",
      image: "/images/BeastTitan.png",
      reverse: true,
      skills: [
        { name: "Pandas / NumPy", level: "92%", style: { width: "92%" } },
        { name: "Matplotlib / Seaborn", level: "86%", style: { width: "86%" } },
        { name: "Feature Engineering", level: "90%", style: { width: "90%" } },
      ],
    },
    {
      title: "Databases & Tools",
      description: "Storage, collaboration, and delivery tools used in daily development.",
      image: "/images/col.png",
      skills: [
        { name: "MySQL / PostgreSQL / MongoDB", level: "88%", style: { width: "88%" } },
        { name: "Git / GitHub", level: "95%", style: { width: "95%" } },
        { name: "Adobe / Canva / VS Code", level: "86%", style: { width: "86%" } },
      ],
    },
  ];

  useLayoutEffect(() => {
    const categories = categoryRefs.current.filter(Boolean);

    categories.forEach((cat) => {
      const infoPanel = cat.querySelector(".cat-info-panel");
      const imagePanel = cat.querySelector(".cat-image-panel");
      const skillCards = cat.querySelectorAll(".skill-card");

      const directionX = cat.classList.contains("reverse") ? 80 : -80;

      // Set initial state visibility directly in GSAP to prevent flash or black void spaces
      gsap.set([infoPanel, imagePanel, skillCards], { opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: cat,
          start: "top 85%", // Triggers slightly earlier to guarantee viewability
          toggleActions: "play none none none"
        },
      })
        .fromTo(infoPanel, { x: directionX, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(imagePanel, { x: -directionX, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo(skillCards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4");
    });

    gsap.fromTo(".skills-header", 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section className="skills-section" ref={sectionRef} id="skills">
      <div className="skills-container">

        {/* HEADER - Standard Survey Report theme */}
        <div className="skills-header">
          <span className="report-tag">CLASSIFIED SURVEY REPORT</span>
          <h2>OPERATIONAL CAPABILITIES</h2>
          <p>
            Classified assessment of tactical engineering proficiency
            and system integration under active deployment.
          </p>
        </div>

        {/* CATEGORIES LIST */}
        <div className="category-list">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className={`skill-category ${cat.reverse ? "reverse" : ""}`}
              ref={(el) => (categoryRefs.current[i] = el)}
            >
              
              {/* Left/Right Info Panel */}
              <div className="cat-info-panel">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>

                <div className="skills-subgrid">
                  {cat.skills.map((skill, si) => (
                    <div key={si} className="skill-card">
                      {/* New blueprint scan effect */}
                      <div className="card-blueprint"></div>
                      
                      <div className="card-top">
                        <h4>{skill.name}</h4>
                        <span className="level-stat">{skill.level}</span>
                      </div>

                      <div className="level-bar">
                        <div className="bar-fill" style={skill.style}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right/Left Image Panel */}
              <div className="cat-image-panel">
                <img src={cat.image} alt={cat.title} />
              </div>

            </div>
            
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;