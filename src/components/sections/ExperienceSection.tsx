"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { experience } from "@/data/portfolio";

const expTones = ["tone-sky", "tone-violet", "tone-sage"];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section">
      <div ref={ref} className="section-container">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-num">03</span> Experience</div>
          <h2 className="section-h2">Work &amp; <em>experience</em></h2>
        </div>

        <div className="exp-list">
          {experience.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`exp-row ${expTones[i % expTones.length]}`}
            >
              <div className="exp-meta">
                <div className="exp-period mono">{exp.period}</div>
                <span className="exp-type">{exp.type}</span>
              </div>

              <div className="card exp-card">
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-company">{exp.company}</div>
                <p className="exp-desc">{exp.description}</p>
                <ul className="exp-highlights">
                  {exp.highlights.map((h, j) => (
                    <li key={j}>
                      <span className="exp-check"><Check size={12} strokeWidth={2.5} /></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="exp-tech">
                  {exp.tech.map(t => <span key={t} className="chip chip-sm">{t}</span>)}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .exp-list { display: flex; flex-direction: column; gap: 24px; }
        .exp-row { display: grid; grid-template-columns: 220px 1fr; gap: 40px; align-items: start; }
        .exp-meta { position: sticky; top: 96px; padding-top: 30px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        .exp-period { font-size: 13px; color: var(--text-soft); }
        .exp-type { font-size: 12px; padding: 4px 12px; border-radius: 999px; color: var(--sand); background: var(--sand-soft); border: 1px solid rgba(217,188,140,0.22); }

        .exp-card { padding: 32px 36px; position: relative; overflow: hidden; }
        .exp-card::before { content: ""; position: absolute; left: 0; top: 28px; bottom: 28px; width: 2px; border-radius: 2px; background: linear-gradient(180deg, rgb(var(--tone) / 0.8), rgb(var(--tone) / 0)); }
        .exp-card:hover { border-color: var(--line-strong); }
        .exp-role { font-family: var(--font-serif); font-size: 26px; font-weight: 400; color: var(--text); margin: 0; letter-spacing: -0.01em; }
        .exp-company { font-size: 14.5px; color: rgb(var(--tone)); margin: 4px 0 18px; }
        .exp-desc { font-size: 15.5px; color: var(--muted); line-height: 1.8; margin: 0 0 22px; }
        .exp-highlights { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 12px; }
        .exp-highlights li { display: flex; gap: 12px; font-size: 15px; color: var(--text-soft); line-height: 1.65; }
        .exp-check { width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; color: rgb(var(--tone)); background: rgb(var(--tone) / 0.12); }
        .exp-tech { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 22px; border-top: 1px solid var(--line); }

        @media (max-width: 860px) {
          .exp-row { grid-template-columns: 1fr; gap: 14px; }
          .exp-meta { position: static; padding-top: 0; flex-direction: row; align-items: center; }
          .exp-card { padding: 24px; }
          .exp-role { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
