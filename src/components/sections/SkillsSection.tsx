"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Database, Wrench, Cpu } from "lucide-react";
import { skills } from "@/data/portfolio";

const iconMap: Record<string, React.ElementType> = { monitor: Monitor, server: Server, database: Database, tool: Wrench, cpu: Cpu };
const colors = [
  { bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)", text: "#38bdf8" },
  { bg: "rgba(129,140,248,0.08)", border: "rgba(129,140,248,0.2)", text: "#818cf8" },
  { bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)", text: "#34d399" },
  { bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.2)", text: "#fb923c" },
  { bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)", text: "#f472b6" },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="skills" style={{ padding: "96px 0", background: "#080d1a", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div ref={ref} style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#818cf8" }} />
          <span style={{ color: "#818cf8", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px" }}>02 — Skills</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", marginBottom: "56px" }}>
          My technical <span style={{ color: "#818cf8" }}>toolkit</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] || Monitor;
            const c = colors[i % colors.length];
            return (
              <motion.div key={group.category}
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ padding: "24px", borderRadius: "16px", background: c.bg, border: `1px solid ${c.border}`, transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={c.text} />
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>{group.category}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map(skill => (
                    <span key={skill} style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(5,8,16,0.6)", border: "1px solid rgba(255,255,255,0.06)", color: "#94a3b8", fontSize: "11px", fontFamily: "monospace" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
