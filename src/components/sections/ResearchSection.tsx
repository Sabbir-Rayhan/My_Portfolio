"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { ExternalLink, GitFork, Check, FlaskConical, AudioLines } from "lucide-react";
import { research } from "@/data/portfolio";

const containerVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Waveform() {
  return (
    <div className="rs-wave" aria-hidden>
      {Array.from({ length: 36 }, (_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 12) * 0.11}s`, height: `${28 + Math.abs(Math.sin(i * 0.7)) * 62}%` }} />
      ))}
    </div>
  );
}

function Molecule() {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k - Math.PI / 6;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
    });
  const a = hex(70, 60, 26);
  const b = hex(115, 86, 26);
  const ring = (pts: readonly (readonly [number, number])[]) => pts.map(p => p.join(",")).join(" ");
  return (
    <svg className="rs-mol" viewBox="0 0 200 130" aria-hidden>
      <polygon points={ring(a)} />
      <polygon points={ring(b)} />
      <line x1={a[4][0]} y1={a[4][1]} x2={a[4][0]} y2={a[4][1] - 24} />
      <line x1={b[1][0]} y1={b[1][1]} x2={b[1][0] + 22} y2={b[1][1] + 12} />
      <line x1={b[0][0]} y1={b[0][1]} x2={b[0][0] + 26} y2={b[0][1] - 10} />
      {[...a, ...b].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} style={{ animationDelay: `${i * 0.18}s` }} />)}
      <circle cx={a[4][0]} cy={a[4][1] - 24} r={4} className="rs-mol-o" />
      <circle cx={b[0][0] + 26} cy={b[0][1] - 10} r={4} className="rs-mol-n" />
    </svg>
  );
}

export default function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="research" className="section">
      <div ref={ref} className="section-container">
        <div className="section-head-row">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-num">04</span> Research</div>
            <h2 className="section-h2">Research &amp; <em>applied AI</em></h2>
          </div>
          <p className="section-sub" style={{ marginTop: 0, maxWidth: 380 }}>
            Machine learning and deep learning work, from problem framing and rigorous evaluation to deployed, publicly usable models.
          </p>
        </div>

        <motion.div className="rs-list" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          {research.map(r => {
            const Icon = r.kind === "audio" ? AudioLines : FlaskConical;
            return (
              <motion.article key={r.id} variants={cardVariants} className={`card rs-card ${r.kind === "audio" ? "tone-violet" : "tone-teal"}`}>
                <div className="rs-main">
                  <div className="rs-top">
                    <span className="rs-icon"><Icon size={16} /></span>
                    <span className="rs-badge">{r.type}</span>
                    <span className="rs-status mono">{r.status}</span>
                  </div>
                  <h3 className="rs-title">{r.title}</h3>
                  {r.paperTitle && <p className="rs-paper">&ldquo;{r.paperTitle}&rdquo;</p>}
                  <p className="rs-desc">{r.summary}</p>

                  <ul className="rs-highlights">
                    {r.highlights.map(h => (
                      <li key={h}><span className="rs-check"><Check size={11} /></span>{h}</li>
                    ))}
                  </ul>

                  <div className="tag-row rs-tags">
                    {r.tags.map(t => <span key={t} className="chip chip-sm">{t}</span>)}
                  </div>

                  <div className="rs-links">
                    <a href={r.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <ExternalLink size={14} /> {r.liveLabel}
                    </a>
                    {r.sourceUrl && (
                      <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                        <GitFork size={14} /> {r.sourceLabel}
                      </a>
                    )}
                  </div>
                </div>

                <aside className="rs-side">
                  <div className="rs-visual">{r.kind === "audio" ? <Waveform /> : <Molecule />}</div>
                  <dl className="rs-metrics">
                    {r.metrics.map(m => (
                      <div key={m.label} className="rs-metric">
                        <dt>{m.label}</dt>
                        <dd className="serif">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {r.meta && <p className="rs-meta">{r.meta}</p>}
                </aside>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .rs-list { display: flex; flex-direction: column; gap: 20px; }
        .rs-card { display: grid; grid-template-columns: 1fr 340px; gap: 44px; padding: 40px 44px; position: relative; overflow: hidden; }
        .rs-card::before {
          content: ""; position: absolute; inset: 0 0 auto 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgb(var(--tone) / 0.6), transparent);
        }
        .rs-card:hover { border-color: rgb(var(--tone) / 0.32); }
        .rs-card { background: radial-gradient(600px 260px at 100% 0%, rgb(var(--tone) / 0.07), transparent 70%), linear-gradient(180deg, var(--surface), rgba(22,27,30,0.6)); }
        .rs-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
        .rs-icon { width: 32px; height: 32px; border-radius: 10px; display: grid; place-items: center; color: rgb(var(--tone)); background: rgb(var(--tone) / 0.1); border: 1px solid rgb(var(--tone) / 0.3); }
        .rs-badge { font-size: 12px; padding: 4px 11px; border-radius: 999px; color: var(--sand); background: var(--sand-soft); border: 1px solid rgba(217,188,140,0.25); }
        .rs-status { font-size: 11.5px; color: var(--muted); letter-spacing: 0.04em; }
        .rs-title { font-family: var(--font-serif); font-size: clamp(24px, 2.6vw, 32px); font-weight: 400; line-height: 1.2; letter-spacing: -0.015em; color: var(--text); margin: 0 0 10px; }
        .rs-paper { font-family: var(--font-serif); font-style: italic; font-size: 15px; color: rgb(var(--tone)); line-height: 1.55; margin: 0 0 16px; }
        .rs-desc { font-size: 15px; line-height: 1.75; color: var(--muted); margin: 0 0 22px; }
        .rs-highlights { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 11px; }
        .rs-highlights li { display: flex; gap: 12px; font-size: 14.5px; line-height: 1.6; color: var(--text-soft); }
        .rs-check { flex-shrink: 0; width: 20px; height: 20px; margin-top: 2px; border-radius: 50%; display: grid; place-items: center; color: rgb(var(--tone)); background: rgb(var(--tone) / 0.12); }
        .rs-tags { margin-bottom: 26px; }
        .rs-links { display: flex; gap: 10px; flex-wrap: wrap; }

        .rs-side { display: flex; flex-direction: column; gap: 16px; }
        .rs-visual { height: 150px; border-radius: var(--radius-sm); border: 1px solid var(--line); background: radial-gradient(120% 90% at 50% 0%, rgb(var(--tone) / 0.1), transparent 70%), rgba(255,255,255,0.012); display: grid; place-items: center; overflow: hidden; }
        .rs-wave { display: flex; align-items: center; gap: 4px; height: 70%; width: 82%; }
        .rs-wave span { flex: 1; border-radius: 3px; background: linear-gradient(180deg, #c3b8ea, rgba(143,184,222,0.3)); transform-origin: center; animation: rsWave 1.6s ease-in-out infinite; opacity: 0.85; }
        .rs-wave span:nth-child(3n) { background: linear-gradient(180deg, #dea6aa, rgba(222,166,170,0.2)); }
        .rs-wave span:nth-child(4n) { background: linear-gradient(180deg, #8fb8de, rgba(143,184,222,0.2)); }
        @keyframes rsWave { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
        .rs-mol { width: 82%; height: 88%; }
        .rs-mol polygon, .rs-mol line { fill: none; stroke: rgb(var(--tone) / 0.6); stroke-width: 1.2; }
        .rs-mol circle { fill: rgb(var(--tone)); animation: rsPulse 2.8s ease-in-out infinite; }
        .rs-mol .rs-mol-o { fill: var(--sand); }
        .rs-mol .rs-mol-n { fill: #9db7d6; }
        @keyframes rsPulse { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }

        .rs-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 0; }
        .rs-metric { padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--line); background: rgba(255,255,255,0.015); }
        .rs-metric dt { font-size: 11.5px; color: var(--muted); margin-bottom: 4px; }
        .rs-metric dd { margin: 0; font-size: 20px; color: var(--text); letter-spacing: -0.01em; }
        .rs-meta { font-size: 12.5px; line-height: 1.6; color: var(--subtle); margin: 0; }

        @media (max-width: 960px) {
          .rs-card { grid-template-columns: 1fr; gap: 28px; padding: 32px 28px; }
          .rs-side { order: -1; }
        }
        @media (max-width: 520px) {
          .rs-card { padding: 26px 20px; }
          .rs-visual { height: 120px; }
        }
      `}</style>
    </section>
  );
}
