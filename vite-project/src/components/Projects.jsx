import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const fallbackProjects = [
  {
    id: 1,
    num: "01",
    title: "Local RAG Platform for Academic Data",
    description:
      "Built an end-to-end RAG application with FastAPI, LangChain, and LLaMA 3 to query unstructured academic data.",
    tech: ["Python", "FastAPI", "LangChain", "LLaMA 3", "Chroma DB", "Google Drive API"],
    year: "2026",
    crest: "/images/survey-logo.jpg",
    art: "/images/shiganshina-wall.jpg",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 2,
    num: "02",
    title: "Stateful AI Travel Orchestrator",
    description:
      "Built an agentic AI travel system using LangGraph with memory, dynamic workflow routing, and real-time APIs.",
    tech: ["Python", "LangGraph", "FastAPI", "Groq (Llama 3.1)", "n8n", "Next.js", "TypeScript"],
    year: "2026",
    crest: "/images/hero-wall.png",
    art: "/images/hero-wall.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 3,
    num: "03",
    title: "Brain Tumor Classification System",
    description:
      "Developed an EfficientNetB3 deep learning model for MRI scan classification with an OpenCV preprocessing pipeline.",
    tech: ["Python", "TensorFlow", "Keras", "EfficientNetB3", "OpenCV", "Scikit-learn", "NumPy"],
    year: "2026",
    crest: "/images/ArmoredTitan.png",
    art: "/images/ArmoredTitan.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 4,
    num: "04",
    title: "Healthcare Risk Prediction Platform",
    description:
      "Built a machine learning web application to predict heart disease, diabetes, and high cholesterol risk with Streamlit dashboards.",
    tech: ["Python", "Streamlit", "XGBoost", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    year: "2026",
    crest: "/images/BeastTitan.png",
    art: "/images/BeastTitan.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 5,
    num: "05",
    title: "Sellaro Customizable E-Commerce Web Template System",
    description:
      "Built a multi-tenant e-commerce platform for SMEs with secure Stripe integration, product management, and customizable UI templates.",
    tech: ["Next.js", "NestJS", "MongoDB", "Stripe", "Cloudinary", "JWT", "Figma"],
    year: "2024-25",
    crest: "/images/col.png",
    art: "/images/col.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
];

const normalizeProject = (project, index) => ({
  id: project.id ?? index,
  num: project.num ?? String(index + 1).padStart(2, "0"),
  title: project.title ?? "Untitled Project",
  description: project.description ?? "",
  tech: Array.isArray(project.tech) ? project.tech : [],
  year: project.year ?? "",
  crest: project.crest ?? "/images/survey-logo.jpg",
  art: project.art ?? `/images/project-art-${project.num ?? String(index + 1).padStart(2, "0")}.jpg`,
  github: project.github ?? "#",
  status: project.status ?? "Completed",
});

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const normalizedProjects = Array.isArray(data) ? data.map(normalizeProject) : [];

        if (normalizedProjects.length > 0) {
          setProjects(normalizedProjects);
          setLoadError("");
        } else {
          setProjects(fallbackProjects);
          setLoadError("Backend returned no projects, so the local portfolio data is shown instead.");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setProjects(fallbackProjects);
        setLoadError("FastAPI is not reachable yet, so the local portfolio data is shown instead.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate top header content elements
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Staggered cascade entrance animation for individual layout cards
      const projectCards = sectionRef.current?.querySelectorAll(".project-card");
      if (projectCards && projectCards.length > 0) {
        gsap.from(projectCards, {
          opacity: 0,
          y: 100,
          stagger: 0.25,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".projects-list",
            start: "top 75%",
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length]);

  return (
    <section className="projects-section" ref={sectionRef} id="projects">
      {/* Structural visual paper wrappers matching the structural design system patterns */}
      <div className="paper-texture"></div>
      <div className="blueprint"></div>

      {/* Decorative Structural Side Strings */}
      <div className="side-motto">Dedicate Your Heart</div>
      <div className="side-motto-kanji">心臓を捧げよ</div>

      <div className="projects-container">
        {/* Header Block Section */}
        <div className="projects-top" ref={headerRef}>
          <span className="sub-header-badge">Survey Corps • Mission Logs</span>
          <h2>PROJECTS</h2>
          <p>Missions Undertaken. Systems Built. Impact Delivered.</p>
        </div>

        {(loading || loadError) && (
          <div className="projects-status-banner" role="status" aria-live="polite">
            {loading ? "Loading project missions from FastAPI..." : loadError}
          </div>
        )}

        {/* Dynamic Project Loop Framework Row Grid Container */}
        <div className="projects-list">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
            >
              {/* Column 01: Numerical Badge Identification */}
              <div className="proj-num-col">
                <h3>{project.num}</h3>
                <span>Mission</span>
              </div>

              {/* Column 02: Tactical Blueprint Artwork Document Segment */}
              <div className="proj-art-col">
                {/* Dynamically fallback gracefully to styled generic canvas blueprint items if art files are missing */}
                <img src={project.art} alt="" onError={(e) => {
                  e.target.style.display = 'none';
                }}/>
                <div className="frame-overlay" style={{background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 100%)'}}></div>
              </div>

              {/* Column 03: Text Payload & Tech Stack Data Assembly Row */}
              <div className="proj-info-col">
                <div>
                  <div className="proj-status">Mission Status: <span>{project.status}</span></div>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                </div>
                
                <div className="proj-tech-row">
                  <span className="label">Tech Stack:</span>
                  <div className="proj-tech-list">
                    {project.tech.map((techName, tIdx) => (
                      <span key={tIdx}>
                        {techName} {tIdx < project.tech.length - 1 && <span className="tech-separator"> • </span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 04: GitHub Deployment Redirection Anchor Link Column Block */}
              <div className="proj-link-col">
                <span className="proj-year">{project.year}</span>
                <img src={project.crest} className="regiment-crest" alt="" />
                <a href={project.github} target="_blank" rel="noreferrer" className="github-link">
                  View On Github
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Subtitle Frame Accent Marker */}
        <div className="projects-footer-motto">
          <p>Every project is a step closer to humanity's freedom.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;