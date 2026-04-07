"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, ArrowUpRight, X } from "lucide-react";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const sel = projects.find(p => p.id === selected);

  const pill = (tag: string) => (
    <span key={tag} style={{ padding: "3px 10px", borderRadius: "6px", background: "#050810", border: "1px solid rgba(255,255,255,0.06)", color: "#64748b", fontSize: "10px", fontFamily: "monospace" }}>{tag}</span>
  );
  const linkBtn = (href: string, label: string, primary = false) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", fontSize: "11px", fontFamily: "monospace", textDecoration: "none", background: primary ? "#38bdf8" : "transparent", color: primary ? "#0f172a" : "#94a3b8", border: primary ? "none" : "1px solid rgba(255,255,255,0.1)", fontWeight: primary ? 600 : 400, transition: "all 0.2s" }}>
      {primary ? <ExternalLink size={12} /> : <GitFork size={12} />} {label}
    </a>
  );

  return (
    <section id="projects" style={{ padding: "96px 0", background: "#080d1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div ref={ref} style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#fb923c" }} />
          <span style={{ color: "#fb923c", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px" }}>04 — Projects</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <h2 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0" }}>
            Things I've <span style={{ color: "#fb923c" }}>built & shipped</span>
          </h2>
          <a href="https://github.com/Sabbir-Rayhan" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "12px", fontFamily: "monospace", textDecoration: "none" }}>
            View all on GitHub <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Featured */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
          {featured.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onClick={() => setSelected(p.id)}
              style={{ padding: "32px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", position: "relative", overflow: "hidden", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "2px" }}>{p.year} · Featured</span>
              </div>
              <h3 style={{ fontSize: "26px", fontWeight: 700, color: "#e2e8f0", marginBottom: "6px" }}>{p.title}</h3>
              <p style={{ fontSize: "13px", fontWeight: 500, color: p.color, marginBottom: "14px" }}>{p.subtitle}</p>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, maxWidth: "700px", marginBottom: "20px" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {p.tags.slice(0, 8).map(pill)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }} onClick={e => e.stopPropagation()}>
                {p.liveUrl && linkBtn(p.liveUrl, "Live Demo", true)}
                {p.githubFrontend && linkBtn(p.githubFrontend, "Frontend")}
                {p.githubBackend && linkBtn(p.githubBackend, "Backend")}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {rest.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              style={{ padding: "28px", borderRadius: "16px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.color }} />
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155" }}>{p.year}</span>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {p.githubFrontend && (
                    <a href={p.githubFrontend} target="_blank" rel="noopener noreferrer"
                      style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", textDecoration: "none" }}>
                      <GitFork size={13} />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                      style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", textDecoration: "none" }}>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>{p.title}</h3>
              <p style={{ fontSize: "11px", color: p.color, marginBottom: "12px" }}>{p.subtitle}</p>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, flex: 1, marginBottom: "16px" }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {p.tags.slice(0, 4).map(t => (
                  <span key={t} style={{ padding: "2px 8px", borderRadius: "4px", background: "#050810", border: "1px solid rgba(255,255,255,0.06)", color: "#475569", fontSize: "10px", fontFamily: "monospace" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && sel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "100%", maxWidth: "600px", background: "#0f1629", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px", maxHeight: "90vh", overflowY: "auto" }}>
              <button onClick={() => setSelected(null)}
                style={{ position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={16} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: sel.color }} />
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "2px" }}>{sel.year}</span>
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>{sel.title}</h3>
              <p style={{ fontSize: "12px", color: sel.color, marginBottom: "16px" }}>{sel.subtitle}</p>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, marginBottom: "12px" }}>{sel.description}</p>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.7, fontStyle: "italic", fontFamily: "Georgia, serif", marginBottom: "20px" }}>{sel.longDescription}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {sel.tags.map(pill)}
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {sel.liveUrl && linkBtn(sel.liveUrl, "Live Demo", true)}
                {sel.githubFrontend && linkBtn(sel.githubFrontend, "Frontend Repo")}
                {sel.githubBackend && linkBtn(sel.githubBackend, "Backend Repo")}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
