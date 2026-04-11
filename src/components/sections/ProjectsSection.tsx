"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, GitFork, ArrowUpRight, X, Star } from "lucide-react";
import { projects } from "@/data/portfolio";

import type { Variants } from "framer-motion";
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<string | null>(null);
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const sel = projects.find(p => p.id === selected);

  return (
    <section id="projects" className="projects-section">
      <div ref={ref} className="section-container">
        <div className="section-label-row">
          <div className="section-label-line" style={{ background: "#fb923c" }} />
          <span className="section-label" style={{ color: "#fb923c" }}>04 — Projects</span>
        </div>
        <div className="projects-header">
          <h2 className="section-h2" style={{ marginBottom: 0 }}>
            Things I&apos;ve <span style={{ color: "#fb923c" }}>built & shipped</span>
          </h2>
          <a href="https://github.com/Sabbir-Rayhan" target="_blank" rel="noopener noreferrer" className="github-all-link">
            View all on GitHub <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Featured */}
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="featured-list">
          {featured.map((p) => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              className="featured-card"
              onClick={() => setSelected(p.id)}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${p.color}30`;
                el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${p.color}15`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Top gradient line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${p.color}, ${p.color}40, transparent)` }} />

              {/* Featured badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "2px" }}>{p.year}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", padding: "2px 8px", borderRadius: "20px", fontSize: "9px", fontFamily: "monospace", background: `${p.color}12`, border: `1px solid ${p.color}25`, color: p.color }}>
                    <Star size={9} fill={p.color} /> Featured
                  </span>
                </div>
                <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>Click for details →</span>
              </div>

              <div className="featured-card-body">
                <div className="featured-card-left">
                  <h3 className="featured-title">{p.title}</h3>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: p.color, marginBottom: "14px", letterSpacing: "0.3px" }}>{p.subtitle}</p>
                  <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: 1.75, marginBottom: "20px" }}>{p.description}</p>

                  <div className="tag-row" style={{ marginBottom: "22px" }}>
                    {p.tags.slice(0, 7).map(tag => (
                      <span key={tag} className="proj-tag">{tag}</span>
                    ))}
                    {p.tags.length > 7 && <span className="proj-tag" style={{ color: "#475569" }}>+{p.tags.length - 7} more</span>}
                  </div>

                  <div className="proj-links-row" onClick={e => e.stopPropagation()}>
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-primary">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    )}
                    {p.githubFrontend && (
                      <a href={p.githubFrontend} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-ghost">
                        <GitFork size={13} /> Frontend
                      </a>
                    )}
                    {p.githubBackend && (
                      <a href={p.githubBackend} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-ghost">
                        <GitFork size={13} /> Backend
                      </a>
                    )}
                  </div>
                </div>

                {/* Year watermark */}
                <div className="featured-year-mark" style={{ color: p.color }}>{p.year.slice(2)}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other projects grid */}
        <motion.div
          className="other-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {rest.map((p) => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              className="other-card"
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${p.color}30`;
                el.style.transform = "translateY(-5px)";
                el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${p.color}10`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${p.color}80, transparent)` }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.color }} />
                  <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155" }}>{p.year}</span>
                </div>
                <div style={{ display: "flex", gap: "6px" }} onClick={e => e.stopPropagation()}>
                  {p.githubFrontend && (
                    <a href={p.githubFrontend} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <GitFork size={13} />
                    </a>
                  )}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="icon-btn">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#e2e8f0", marginBottom: "4px" }}>{p.title}</h3>
              <p style={{ fontSize: "11px", color: p.color, marginBottom: "12px", fontWeight: 500 }}>{p.subtitle}</p>
              <p style={{ fontSize: "13px", color: "#64748b", lineHeight: 1.7, flex: 1, marginBottom: "16px" }}>{p.description}</p>

              <div className="tag-row" style={{ paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {p.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="proj-tag" style={{ fontSize: "10px" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && sel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "100%", maxWidth: "620px", background: "#0c1220", border: `1px solid ${sel.color}25`, borderRadius: "20px", padding: "32px", maxHeight: "90vh", overflowY: "auto", boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px ${sel.color}15` }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", borderRadius: "20px 20px 0 0", background: `linear-gradient(90deg, ${sel.color}, ${sel.color}40, transparent)` }} />
              <button onClick={() => setSelected(null)}
                style={{ position: "absolute", top: "16px", right: "16px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={16} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: sel.color, boxShadow: `0 0 8px ${sel.color}` }} />
                <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#334155", textTransform: "uppercase", letterSpacing: "2px" }}>{sel.year}</span>
              </div>
              <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#e2e8f0", marginBottom: "4px" }}>{sel.title}</h3>
              <p style={{ fontSize: "12px", color: sel.color, marginBottom: "18px", fontWeight: 600 }}>{sel.subtitle}</p>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.75, marginBottom: "12px" }}>{sel.description}</p>
              <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.75, fontStyle: "italic", fontFamily: "Georgia,serif", marginBottom: "22px" }}>{sel.longDescription}</p>
              <div className="tag-row" style={{ marginBottom: "24px" }}>
                {sel.tags.map(tag => <span key={tag} className="proj-tag">{tag}</span>)}
              </div>
              <div className="proj-links-row">
                {sel.liveUrl && <a href={sel.liveUrl} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-primary"><ExternalLink size={13} /> Live Demo</a>}
                {sel.githubFrontend && <a href={sel.githubFrontend} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-ghost"><GitFork size={13} /> Frontend</a>}
                {sel.githubBackend && <a href={sel.githubBackend} target="_blank" rel="noopener noreferrer" className="proj-link-btn proj-link-ghost"><GitFork size={13} /> Backend</a>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .projects-section { padding: 96px 0; background: #080d1a; border-top: 1px solid rgba(255,255,255,0.04); }
        .projects-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
        .github-all-link { display: flex; align-items: center; gap: 5px; color: #475569; font-size: 12px; font-family: monospace; text-decoration: none; transition: color 0.2s; padding-bottom: 4px; }
        .github-all-link:hover { color: #38bdf8; }

        .featured-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; }
        .featured-card {
          padding: 28px 32px;
          border-radius: 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .featured-card-body { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
        .featured-card-left { flex: 1; }
        .featured-title { font-size: 26px; font-weight: 800; color: #e2e8f0; margin-bottom: 6px; letter-spacing: -0.5px; transition: color 0.2s; }
        .featured-card:hover .featured-title { color: #e2e8f0; }
        .featured-year-mark { font-size: 80px; font-weight: 900; opacity: 0.04; font-family: monospace; line-height: 1; flex-shrink: 0; user-select: none; }

        .other-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .other-card {
          padding: 24px;
          border-radius: 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        }

        .tag-row { display: flex; flex-wrap: wrap; gap: 5px; }
        .proj-tag { padding: 3px 9px; border-radius: 5px; background: rgba(5,8,16,0.8); border: 1px solid rgba(255,255,255,0.07); color: #475569; font-size: 11px; font-family: monospace; }

        .proj-links-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .proj-link-btn { display: flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 8px; font-size: 12px; font-family: monospace; font-weight: 600; text-decoration: none; transition: all 0.2s; }
        .proj-link-primary { background: #38bdf8; color: #050810; box-shadow: 0 4px 16px rgba(56,189,248,0.25); }
        .proj-link-primary:hover { background: #7dd3fc; transform: translateY(-1px); }
        .proj-link-ghost { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; }
        .proj-link-ghost:hover { border-color: rgba(255,255,255,0.2); color: #e2e8f0; }

        .icon-btn { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 7px; border: 1px solid rgba(255,255,255,0.08); color: #475569; text-decoration: none; transition: all 0.2s; }
        .icon-btn:hover { color: #38bdf8; border-color: rgba(56,189,248,0.3); }

        @media (max-width: 900px) {
          .projects-section { padding: 70px 0; }
          .featured-year-mark { display: none; }
          .other-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .featured-card { padding: 20px; }
          .featured-title { font-size: 20px; }
        }
      `}</style>
    </section>
  );
}
