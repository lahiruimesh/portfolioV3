import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000" || "https://portfoliov3-backend-ten.vercel.app/";


const fallbackProjects = [
  {
    id: 1,
    num: "01",
    title: "UniVibe - Campus Social & Dating Platform",
    description:
      "Developed a university-focused social networking platform connecting students through dating, friendship, and academic collaboration, with Google OAuth authentication and cloud deployment.",
    tech: [
      "Next.js",
      "FastAPI",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Google OAuth",
      "Cloudflare",
      "Railway",
    ],
    year: "2026",
    crest: "/images/001.png",
    art: "/images/001.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 2,
    num: "02",
    title: "Sellaro - Customizable E-Commerce Web Template System",
    description:
      "Built a multi-tenant e-commerce platform for SMEs featuring customizable storefront templates, product management, Stripe payments, order management, and role-based authentication.",
    tech: [
      "Next.js",
      "NestJS",
      "MongoDB",
      "Stripe",
      "Cloudinary",
      "JWT",
      "Figma",
    ],
    year: "2024-25",
    crest: "/images/col.png",
    art: "/images/col.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 3,
    num: "03",
    title: "UIStock - Stock Design Marketplace",
    description:
      "Developed an online marketplace where designers can upload, showcase, discover, and manage UI/UX, web, and graphic design resources, with secure authentication and cloud-based asset storage.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Tailwind CSS",
    ],
    year: "2025",
    crest: "/images/survey-logo.jpg",
    art: "/images/shiganshina-wall.jpg",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 4,
    num: "04",
    title: "YTNote - YouTube Summarizer Web Application",
    description:
      "Built an AI-powered web application that generates concise YouTube video summaries and allows users to authenticate, save, and manage their summaries.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google OAuth",
      "Gemini API",
      "Python",
    ],
    year: "2025",
    crest: "/images/col.png",
    art: "/images/col.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 5,
    num: "05",
    title: "CareerSpy AI - Autonomous Job Hunter Agent",
    description:
      "Built a multi-agent job discovery system that automates internship searches and extracts opportunities from dynamic career portals using browser automation, AI-powered filtering, and automated email notifications.",
    tech: [
      "Python",
      "LangGraph",
      "Google Gemini API",
      "Playwright",
      "BeautifulSoup",
      "Neon PostgreSQL",
      "Serper API",
      "GitHub Actions",
    ],
    year: "2026",
    crest: "/images/survey-logo.jpg",
    art: "/images/shiganshina-wall.jpg",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 6,
    num: "06",
    title: "Stateful AI Travel Orchestrator",
    description:
      "Developed an agentic AI travel planning system using LangGraph with stateful memory, dynamic workflow routing, and real-time weather, currency, and location API integrations.",
    tech: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Groq Llama 3.1",
      "n8n",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    year: "2026",
    crest: "/images/hero-wall.png",
    art: "/images/hero-wall.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 7,
    num: "07",
    title: "Local RAG Platform for Academic Data",
    description:
      "Built an end-to-end Retrieval-Augmented Generation application that enables users to query unstructured academic documents using LLMs, with automated Google Drive synchronization and vector-based document retrieval.",
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "LLaMA 3",
      "Ollama",
      "Groq",
      "ChromaDB",
      "Google Drive API",
    ],
    year: "2026",
    crest: "/images/survey-logo.jpg",
    art: "/images/shiganshina-wall.jpg",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 8,
    num: "08",
    title: "SMS Spam Detector - Fine-Tuned DistilBERT",
    description:
      "Developed and fine-tuned a DistilBERT model using PyTorch and Hugging Face Transformers to classify SMS messages as spam or legitimate, achieving 99.32% classification accuracy.",
    tech: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "Scikit-learn",
    ],
    year: "2026",
    crest: "/images/ArmoredTitan.png",
    art: "/images/ArmoredTitan.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 9,
    num: "09",
    title: "Brain Tumor Classification System",
    description:
      "Developed an EfficientNetB3 deep learning model to classify brain MRI scans into glioma, meningioma, pituitary tumor, and no-tumor categories using an OpenCV preprocessing pipeline.",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "EfficientNetB3",
      "OpenCV",
      "Scikit-learn",
      "NumPy",
    ],
    year: "2026",
    crest: "/images/ArmoredTitan.png",
    art: "/images/ArmoredTitan.png",
    github: "https://github.com/lahiruimesh",
    status: "Completed",
  },
  {
    id: 10,
    num: "10",
    title: "Healthcare Risk Prediction Platform",
    description:
      "Built a machine learning web application to predict heart disease, diabetes, and high cholesterol risks using XGBoost models, with an interactive Streamlit dashboard for predictions and visualizations.",
    tech: [
      "Python",
      "Streamlit",
      "XGBoost",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    year: "2026",
    crest: "/images/BeastTitan.png",
    art: "/images/BeastTitan.png",
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

        {/* Footer Subtitle Frame Accent Marker --- */}
        <div className="projects-footer-motto">
          <p>Every project is a step closer to humanity's freedom.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;