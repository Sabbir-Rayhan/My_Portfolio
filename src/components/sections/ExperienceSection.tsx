"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { experience } from "@/data/portfolio";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="experience" style={{ padding: "96px 0" }}>
      <div ref={ref} style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#34d399" }} />
          <span style={{ color: "#34d399", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px" }}>03 — Experience</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", marginBottom: "56px" }}>
          Work & <span style={{ color: "#34d399" }}>experience</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {experience.map((exp, i) => (
            <motion.div key={exp.id}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(52,211,153,0.2)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <Briefcase size={14} color="#34d399" />
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#e2e8f0" }}>{exp.role}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>{exp.company}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontFamily: "monospace", background: exp.type === "Academic" ? "rgba(129,140,248,0.1)" : "rgba(56,189,248,0.1)", border: exp.type === "Academic" ? "1px solid rgba(129,140,248,0.2)" : "1px solid rgba(56,189,248,0.2)", color: exp.type === "Academic" ? "#818cf8" : "#38bdf8" }}>
                    {exp.type}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#334155", fontSize: "11px", fontFamily: "monospace" }}>
                    <Calendar size={11} /> {exp.period}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, fontStyle: "italic", fontFamily: "Georgia, serif", marginBottom: "16px" }}>{exp.description}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
                {exp.highlights.map((h, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#94a3b8" }}>
                    <ChevronRight size={14} color="#34d399" style={{ marginTop: "2px", flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {exp.tech.map(t => (
                  <span key={t} style={{ padding: "3px 10px", borderRadius: "6px", background: "#050810", border: "1px solid rgba(255,255,255,0.06)", color: "#64748b", fontSize: "11px", fontFamily: "monospace" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
