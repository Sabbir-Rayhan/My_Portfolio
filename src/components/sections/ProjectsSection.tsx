"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ExternalLink, GitFork, ArrowUpRight, X, Plus } from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/portfolio";

const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const projectTones = ["tone-sky", "tone-violet", "tone-sage", "tone-sand", "tone-rose"];

type Project = (typeof projects)[number];

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="proj-links" onClick={e => e.stopPropagation()}>
      {p.liveUrl && (
        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
          <ExternalLink size={14} /> Live demo
        </a>
      )}
      {p.githubFrontend && (
        <a href={p.githubFrontend} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          <GitFork size={14} /> {p.githubBackend ? "Frontend" : "Source"}
        </a>
      )}
      {"githubBackend" in p && p.githubBackend && (
        <a href={p.githubBackend} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          <GitFork size={14} /> Backend
        </a>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<string | null>(null);
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);
  const sel = projects.find(p => p.id === selected);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="projects" className="section section-alt">
      <div ref={ref} className="section-container">
        <div className="section-head-row">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-num">05</span> Projects</div>
            <h2 className="section-h2">Things I&apos;ve <em>built &amp; shipped</em></h2>
          </div>
          <a href="https://github.com/Sabbir-Rayhan" target="_blank" rel="noopener noreferrer" className="link-arrow">
            View all on GitHub <ArrowUpRight size={15} />
          </a>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="featured-list">
          {featured.map((p, i) => (
            <motion.article
              key={p.id}
              variants={cardVariants}
              className={`card featured-card ${projectTones[i % projectTones.length]}`}
              onClick={() => setSelected(p.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter") setSelected(p.id); }}
            >
              <div className="featured-body">
                <div className="featured-top">
                  <span className="featured-index serif">{String(i + 1).padStart(2, "0")}</span>
                  <span className="featured-year mono">{p.year}</span>
                  <span className="featured-badge">Featured</span>
                </div>
                <h3 className="featured-title">{p.title}</h3>
                <p className="featured-sub">{p.subtitle}</p>
                <p className="featured-desc">{p.description}</p>
                <div className="tag-row">
                  {p.tags.slice(0, 6).map(tag => <span key={tag} className="chip chip-sm">{tag}</span>)}
                  {p.tags.length > 6 && <span className="chip chip-sm" style={{ color: "var(--subtle)" }}>+{p.tags.length - 6}</span>}
                </div>
                <div className="featured-foot">
                  <ProjectLinks p={p} />
                  <span className="featured-more"><Plus size={14} /> Details</span>
                </div>
              </div>
              {p.image && (
                <div className="featured-shot">
                  <div className="featured-shot-bar"><span /><span /><span /></div>
                  <div className="featured-shot-img">
                    <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(max-width:860px) 100vw, 520px" style={{ objectFit: "cover", objectPosition: "top center" }} />
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div className="other-grid" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {rest.map((p, j) => (
            <motion.article key={p.id} variants={cardVariants} className={`card card-hover other-card ${projectTones[(featured.length + j) % projectTones.length]}`} onClick={() => setSelected(p.id)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter") setSelected(p.id); }}>
              <div className="other-top">
                <span className="featured-year mono">{p.year}</span>
                <div className="other-icons" onClick={e => e.stopPropagation()}>
                  {p.githubFrontend && <a href={p.githubFrontend} target="_blank" rel="noopener noreferrer" className="icon-btn other-icon" aria-label="Source code"><GitFork size={14} /></a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="icon-btn other-icon" aria-label="Live demo"><ExternalLink size={14} /></a>}
                </div>
              </div>
              <h3 className="other-title">{p.title}</h3>
              <p className="featured-sub">{p.subtitle}</p>
              <p className="other-desc">{p.description}</p>
              <div className="tag-row other-tags">
                {p.tags.slice(0, 4).map(tag => <span key={tag} className="chip chip-sm">{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && sel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="proj-modal-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="proj-modal"
              role="dialog"
              aria-modal="true"
              aria-label={sel.title}
              data-lenis-prevent
            >
              <button onClick={() => setSelected(null)} className="icon-btn proj-modal-close" aria-label="Close"><X size={16} /></button>
              <span className="featured-year mono">{sel.year}</span>
              <h3 className="proj-modal-title">{sel.title}</h3>
              <p className="featured-sub">{sel.subtitle}</p>
              <p className="proj-modal-desc">{sel.description}</p>
              <p className="proj-modal-long">{sel.longDescription}</p>
              <div className="tag-row" style={{ marginBottom: 28 }}>
                {sel.tags.map(tag => <span key={tag} className="chip chip-sm">{tag}</span>)}
              </div>
              <ProjectLinks p={sel} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .featured-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; }
        .featured-card { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; padding: 40px 40px 40px 44px; cursor: pointer; }
        .featured-card:nth-child(even) .featured-shot { order: -1; }
        .featured-shot { border-radius: 14px; overflow: hidden; border: 1px solid var(--line-strong); background: rgb(var(--bg-rgb)); box-shadow: 0 30px 60px -30px rgba(0,0,0,0.7), 0 0 0 1px rgb(var(--tone) / 0.08); transform: translateZ(0); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s; }
        .featured-card:hover .featured-shot { transform: translateY(-4px); box-shadow: 0 40px 70px -30px rgba(0,0,0,0.75), 0 0 0 1px rgb(var(--tone) / 0.25); }
        .featured-shot-bar { display: flex; gap: 6px; padding: 10px 12px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--line); }
        .featured-shot-bar span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.14); }
        .featured-shot-img { position: relative; aspect-ratio: 16 / 10; }
        .featured-card:hover { border-color: rgb(var(--tone) / 0.32); }
        .featured-card, .other-card { background: radial-gradient(520px 220px at 0% 0%, rgb(var(--tone) / 0.06), transparent 70%), linear-gradient(180deg, var(--surface), rgb(var(--surface-rgb) / 0.6)); }
        .featured-index { font-size: 30px; font-weight: 300; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgb(var(--tone) / 0.55); letter-spacing: -0.03em; transition: color 0.4s ease; }
        .featured-card:hover .featured-index { color: rgb(var(--tone) / 0.14); }
        .featured-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .featured-year { font-size: 12px; color: var(--subtle); }
        .featured-badge { font-size: 11.5px; padding: 3px 10px; border-radius: 999px; color: var(--sand); background: var(--sand-soft); border: 1px solid rgb(var(--sand-rgb) / 0.22); }
        .featured-title { font-family: var(--font-serif); font-size: clamp(28px, 3.4vw, 38px); font-weight: 400; line-height: 1.1; color: var(--text); margin: 0 0 6px; letter-spacing: -0.02em; }
        .featured-sub { font-size: 14.5px; color: rgb(var(--tone)); margin: 0 0 16px; }
        .featured-desc { font-size: 15.5px; color: var(--muted); line-height: 1.8; margin: 0 0 22px; max-width: 760px; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .featured-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--line); }
        .featured-more { display: inline-flex; align-items: center; gap: 6px; font-size: 13.5px; color: var(--muted); transition: color 0.2s; }
        .featured-card:hover .featured-more { color: var(--accent-strong); }
        .proj-links { display: flex; gap: 10px; flex-wrap: wrap; }

        .other-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .other-card { padding: 28px; display: flex; flex-direction: column; cursor: pointer; }
        .other-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .other-icons { display: flex; gap: 8px; }
        .other-icon { width: 34px; height: 34px; }
        .other-title { font-family: var(--font-serif); font-size: 24px; font-weight: 400; color: var(--text); margin: 0 0 4px; }
        .other-desc { font-size: 14.5px; color: var(--muted); line-height: 1.75; flex: 1; margin: 0 0 20px; }
        .other-tags { padding-top: 18px; border-top: 1px solid var(--line); }

        .proj-modal-overlay { position: fixed; inset: 0; z-index: 60; display: flex; align-items: center; justify-content: center; padding: 16px; background: rgb(var(--bg-rgb) / 0.78); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .proj-modal { position: relative; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; padding: 40px; border-radius: 24px; background: var(--surface); border: 1px solid var(--line-strong); box-shadow: 0 50px 100px -30px rgba(0,0,0,0.8); }
        .proj-modal-close { position: absolute; top: 18px; right: 18px; width: 36px; height: 36px; }
        .proj-modal-title { font-family: var(--font-serif); font-size: 36px; font-weight: 400; color: var(--text); margin: 10px 0 4px; letter-spacing: -0.02em; }
        .proj-modal-desc { font-size: 15.5px; color: var(--text-soft); line-height: 1.8; margin: 0 0 14px; }
        .proj-modal-long { font-size: 15px; color: var(--muted); line-height: 1.8; margin: 0 0 24px; }

        @media (max-width: 860px) {
          .featured-card { grid-template-columns: 1fr; padding: 24px; gap: 24px; }
          .featured-card:nth-child(even) .featured-shot { order: 0; }
          .featured-shot { order: -1; }
          .featured-index { font-size: 26px; }
          .other-grid { grid-template-columns: 1fr; }
          .proj-modal { padding: 28px 22px; }
          .proj-modal-title { font-size: 28px; }
        }
      `}</style>
    </section>
  );
}
