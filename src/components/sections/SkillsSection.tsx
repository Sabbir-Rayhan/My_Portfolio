"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Database, Wrench, Cpu } from "lucide-react";
import { skills } from "@/data/portfolio";

const iconMap: Record<string, React.ElementType> = { monitor: Monitor, server: Server, database: Database, tool: Wrench, cpu: Cpu };

const colors = [
  { bg: "rgba(56,189,248,0.06)", border: "rgba(56,189,248,0.18)", hover: "rgba(56,189,248,0.25)", text: "#38bdf8", glow: "rgba(56,189,248,0.15)" },
  { bg: "rgba(129,140,248,0.06)", border: "rgba(129,140,248,0.18)", hover: "rgba(129,140,248,0.25)", text: "#818cf8", glow: "rgba(129,140,248,0.15)" },
  { bg: "rgba(52,211,153,0.06)", border: "rgba(52,211,153,0.18)", hover: "rgba(52,211,153,0.25)", text: "#34d399", glow: "rgba(52,211,153,0.15)" },
  { bg: "rgba(251,146,60,0.06)", border: "rgba(251,146,60,0.18)", hover: "rgba(251,146,60,0.25)", text: "#fb923c", glow: "rgba(251,146,60,0.15)" },
  { bg: "rgba(244,114,182,0.06)", border: "rgba(244,114,182,0.18)", hover: "rgba(244,114,182,0.25)", text: "#f472b6", glow: "rgba(244,114,182,0.15)" },
];

import type { Variants } from "framer-motion";
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};
const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.04, duration: 0.3 } }),
};

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="skills-section">
      <div ref={ref} className="section-container">
        <div className="section-label-row">
          <div className="section-label-line" style={{ background: "#818cf8" }} />
          <span className="section-label" style={{ color: "#818cf8" }}>02 — Skills</span>
        </div>

        <div className="skills-header">
          <h2 className="section-h2" style={{ marginBottom: 0 }}>
            My technical <span style={{ color: "#818cf8" }}>toolkit</span>
          </h2>
          <p className="skills-sub">Technologies I use to build production apps.</p>
        </div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] || Monitor;
            const c = colors[i % colors.length];
            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                className="skill-card-wrap"
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.hover;
                  el.style.boxShadow = `0 8px 32px ${c.glow}, 0 0 0 1px ${c.border}`;
                  el.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.border;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              >
                {/* Card top bar */}
                <div className="skill-card-top">
                  <div className="skill-icon-box" style={{ background: `${c.text}18` }}>
                    <Icon size={20} color={c.text} />
                  </div>
                  <div>
                    <div className="skill-cat-name">{group.category}</div>
                    <div className="skill-cat-count" style={{ color: c.text }}>{group.items.length} technologies</div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: `${c.text}14`, margin: "14px 0" }} />

                {/* Pills */}
                <div className="skill-pills">
                  {group.items.map((skill, j) => (
                    <motion.span
                      key={skill}
                      custom={j}
                      variants={chipVariants}
                      className="skill-chip"
                      style={{ borderColor: `${c.text}20`, color: "#94a3b8" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = c.text;
                        (e.currentTarget as HTMLElement).style.color = c.text;
                        (e.currentTarget as HTMLElement).style.background = `${c.text}10`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${c.text}20`;
                        (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                        (e.currentTarget as HTMLElement).style.background = "rgba(5,8,16,0.5)";
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .skills-section {
          padding: 96px 0;
          background: #080d1a;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          position: relative;
          overflow: hidden;
        }
        .skills-section::before {
          content: '';
          position: absolute;
          top: -100px; right: -100px;
          width: 400px; height: 400px;
          background: rgba(129,140,248,0.04);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .skills-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .skills-sub {
          font-size: 13px;
          color: #475569;
          font-family: monospace;
          padding-bottom: 6px;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .skill-card-wrap {
          padding: 22px;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .skill-card-wrap::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          background: radial-gradient(circle, currentColor 0%, transparent 70%);
          opacity: 0.03;
          pointer-events: none;
        }
        .skill-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .skill-icon-box {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .skill-cat-name {
          font-size: 14px;
          font-weight: 700;
          color: #e2e8f0;
          line-height: 1.3;
        }
        .skill-cat-count {
          font-size: 10px;
          font-family: monospace;
          margin-top: 1px;
        }
        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-chip {
          padding: 4px 11px;
          border-radius: 6px;
          background: rgba(5,8,16,0.5);
          border: 1px solid;
          font-size: 11px;
          font-family: monospace;
          transition: all 0.2s;
          cursor: default;
        }

        @media (max-width: 768px) {
          .skills-section { padding: 70px 0; }
          .skills-header { flex-direction: column; align-items: flex-start; }
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
