import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const SkillsRadar = () => {
  const radarRef = useRef(null);
  const scanRef = useRef(null);

  const skills = [
    { name: "Python", angle: 0 },
    { name: "Machine Learning", angle: 60 },
    { name: "FastAPI", angle: 120 },
    { name: "ReactJS", angle: 180 },
    { name: "LangGraph", angle: 240 },
    { name: "XGBoost", angle: 300 },
  ];

  useEffect(() => {
    gsap.to(scanRef.current, {
      rotation: 360,
      transformOrigin: "center",
      duration: 6,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <section className="radar-section">
      <div className="radar-title">
        <span>SURVEY CORPS ANALYSIS</span>
        <h2>TACTICAL SKILL RADAR</h2>
        <p>Live AI Engineer capability scanning system</p>
      </div>

      <div className="radar-container" ref={radarRef}>

        {/* Radar circles */}
        <div className="circle c1"></div>
        <div className="circle c2"></div>
        <div className="circle c3"></div>

        {/* rotating scan */}
        <div className="scan" ref={scanRef}></div>

        {/* center node */}
        <div className="center-node">
          YOU
        </div>

        {/* skill nodes */}
        {skills.map((skill, i) => (
          <div
            key={i}
            className="skill-node"
            style={{
              transform: `rotate(${skill.angle}deg) translate(140px) rotate(-${skill.angle}deg)`,
            }}
          >
            {skill.name}
          </div>
        ))}

      </div>
    </section>
  );
};

export default SkillsRadar;