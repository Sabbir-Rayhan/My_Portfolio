"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Monitor, Server, Database, Wrench, Cpu, Brain } from "lucide-react";
import { skills } from "@/data/portfolio";

const iconMap: Record<string, React.ElementType> = { monitor: Monitor, server: Server, database: Database, tool: Wrench, cpu: Cpu, brain: Brain };
const toneMap: Record<string, string> = {
  "Frontend": "tone-sky",
  "Backend": "tone-sage",
  "AI & Machine Learning": "tone-violet",
  "Database & ORM": "tone-sand",
  "DevOps & Tools": "tone-rose",
  "Competitive Programming": "tone-teal",
};
const wideCategories = new Set(["Frontend", "AI & Machine Learning", "Competitive Programming"]);

const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section section-alt">
      <div ref={ref} className="section-container">
        <div className="section-head-row">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-num">02</span> Skills</div>
            <h2 className="section-h2">My technical <em>toolkit</em></h2>
          </div>
          <p className="section-sub" style={{ marginTop: 0, maxWidth: 360 }}>
            Technologies and tools I use to design, build and ship production apps — and to train and deploy machine learning models.
          </p>
        </div>

        <motion.div className="skills-grid" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {skills.map((group) => {
            const Icon = iconMap[group.icon] || Monitor;
            return (
              <motion.div key={group.category} variants={cardVariants} className={`card card-hover skill-card ${toneMap[group.category] ?? "tone-sage"} ${wideCategories.has(group.category) ? "skill-card-wide" : ""}`}>
                <div className="skill-card-top">
                  <div className="skill-icon"><Icon size={18} /></div>
                  <span className="skill-count mono">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <h3 className="skill-cat">{group.category}</h3>
                <div className="skill-chips">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .skill-card { padding: 28px; display: flex; flex-direction: column; }
        .skill-card-wide { grid-column: span 2; }
        .skill-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .skill-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: rgb(var(--tone)); background: rgb(var(--tone) / 0.1); border: 1px solid rgb(var(--tone) / 0.28); }
        .skill-card { background: radial-gradient(420px 180px at 0% 0%, rgb(var(--tone) / 0.07), transparent 70%), linear-gradient(180deg, var(--surface), rgba(22,27,30,0.6)); }
        .skill-count { font-size: 12px; color: var(--subtle); }
        .skill-cat { font-family: var(--font-serif); font-size: 22px; font-weight: 400; color: var(--text); margin: 0 0 18px; letter-spacing: -0.01em; }
        .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 980px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
          .skill-card-wide { grid-column: auto; }
          .skill-card { padding: 22px; }
        }
      `}</style>
    </section>
  );
}
