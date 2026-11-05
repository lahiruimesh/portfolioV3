import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";


const fallbackSkillCategories = [
  {
    title: "Programming Languages",
    description:
      "Programming foundations for building software applications, backend services, and intelligent systems.",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C",
    ],
  },
  {
    title: "AI & Machine Learning",
    description:
      "Machine learning, deep learning, predictive modeling, and computer vision implementations.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Scikit-learn",
      "XGBoost",
      "Optuna",
    ],
  },
  {
    title: "Generative AI & Agentic Systems",
    description:
      "LLM-powered applications, retrieval-augmented generation, and intelligent AI agent workflows.",
    skills: [
      "LangChain",
      "LangGraph",
      "RAG",
      "LLMs",
      "ChromaDB",
      "Hugging Face",
      "Gemini API",
      "LLaMA",
      "Ollama",
      "Groq",
    ],
  },
  {
    title: "Frontend Development",
    description:
      "Building responsive, interactive, and user-friendly web interfaces using modern frontend technologies.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & API Development",
    description:
      "Developing backend services, RESTful APIs, authentication systems, and application integrations.",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "FastAPI",
      "Laravel",
      "REST APIs",
    ],
  },
  {
    title: "Databases & Data Analytics",
    description:
      "Database management, data processing, statistical analysis, and data visualization.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQL",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Power BI",
    ],
  },
  {
    title: "Web Scraping & Workflow Automation",
    description:
      "Automating browser interactions, extracting web data, and building intelligent workflows and integrations.",
    skills: [
      "Playwright",
      "BeautifulSoup",
      "n8n",
      "Make.com",
      "Zapier",
      "Webhooks",
    ],
  },
  {
    title: "DevOps, Version Control & Deployment",
    description:
      "Managing source code, automating development workflows, and deploying applications.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "GitHub Actions",
      "Cloudflare",
      "Railway",
      "CI/CD",
    ],
  },
  {
    title: "UI/UX & Design Tools",
    description:
      "Creating user interfaces, designing digital experiences, and preparing visual assets.",
    skills: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva",
    ],
  },
];


const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [skillCategories, setSkillCategories] = useState(fallbackSkillCategories);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/skills`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setSkillCategories(
            data.map((cat) => ({
              ...cat,
              skills: Array.isArray(cat.skills)
                ? cat.skills.map((s) => (typeof s === "string" ? s : s.name))
                : [],
            }))
          );
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setSkillCategories(fallbackSkillCategories);
        }
      }
    };

    fetchSkills();
    return () => controller.abort();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards staggered entrance
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".skills-grid",
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [skillCategories]);

  return (
    <section className="skills-section" ref={sectionRef} id="skills">
      <div className="skills-container">
        {/* HEADER */}
        <div className="skills-header">
          <span className="report-tag">CLASSIFIED SURVEY REPORT</span>
          <h2>OPERATIONAL CAPABILITIES</h2>
          <p>
            Classified assessment of tactical engineering proficiency and system integration under active deployment.
          </p>
        </div>

        {/* MODERN RESPONSIVE GRID (NO IMAGES) */}
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="skill-category-card"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="card-blueprint"></div>
              
              <div className="category-header">
                <span className="category-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{cat.title}</h3>
              </div>
              
              {cat.description && <p className="category-desc">{cat.description}</p>}

              {/* Tag / Badge style skill list */}
              <div className="skill-tags">
                {cat.skills.map((skill, si) => (
                  <span key={si} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;