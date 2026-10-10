"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Trophy, Flame, CalendarDays } from "lucide-react";
import { competitiveProgramming } from "@/data/portfolio";

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (1400 / 16);
    const t = setInterval(() => { start = Math.min(start + step, target); setCount(Math.floor(start)); if (start >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}</span>;
}

export default function CPSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="cp" className="section">
      <div ref={ref} className="section-container">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-num">06</span> Competitive Programming</div>
          <h2 className="section-h2">Sharpening <em>the fundamentals</em></h2>
          <p className="section-sub">
            Active across multiple platforms since 2022. Problem-solving keeps me sharp on algorithms, data structures and optimization — directly improving how I design backend systems.
          </p>
        </div>

        <div className="cp-layout">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className="card cp-big">
            <div className="cp-big-label">Total problems solved</div>
            <div className="cp-big-num serif">{competitiveProgramming.totalSolved}</div>
            <div className="cp-big-note">across all platforms</div>
            <div className="cp-mini-grid">
              {[
                { icon: Trophy, label: "CF rating", value: competitiveProgramming.stats.cfRating },
                { icon: Flame, label: "Max streak", value: competitiveProgramming.stats.maxStreak, suffix: "d" },
                { icon: CalendarDays, label: "Active since", value: competitiveProgramming.stats.activeSince },
              ].map(({ icon: Icon, label, value, suffix }) => (
                <div key={label} className="cp-mini">
                  <Icon size={15} className="cp-mini-icon" />
                  <div className="cp-mini-val serif"><CountUp target={value} />{suffix || ""}</div>
                  <div className="cp-mini-label">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="cp-platforms">
            {competitiveProgramming.platforms.map((p, i) => (
              <motion.a
                key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className={`card cp-platform ${["tone-sky", "tone-sand", "tone-violet"][i % 3]}`}
              >
                <div className="cp-platform-left">
                  <div className="cp-platform-mark serif">{p.name.charAt(0)}</div>
                  <div>
                    <div className="cp-platform-name">{p.name}</div>
                    <div className="cp-platform-handle mono">@{p.handle}</div>
                  </div>
                </div>
                <div className="cp-platform-right">
                  {p.rating !== "—" && (
                    <div className="cp-platform-stat">
                      <div className="cp-platform-stat-label">Rating</div>
                      <div className="cp-platform-stat-val">{p.rating}</div>
                    </div>
                  )}
                  <div className="cp-platform-stat">
                    <div className="cp-platform-stat-label">Solved</div>
                    <div className="cp-platform-stat-val cp-solved">{p.solved}</div>
                  </div>
                  <ArrowUpRight size={16} className="cp-arrow" />
                </div>
              </motion.a>
            ))}
            <motion.blockquote initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }} className="cp-quote">
              &ldquo;Competitive programming isn&apos;t just about solving problems — it&apos;s about thinking systematically and writing code that works correctly under constraints.&rdquo;
            </motion.blockquote>
          </div>
        </div>
      </div>

      <style>{`
        .cp-layout { display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; align-items: stretch; }
        .cp-big { padding: 40px; position: relative; overflow: hidden; background: radial-gradient(500px 260px at 0% 0%, rgb(var(--accent-rgb) / 0.1), transparent 70%), radial-gradient(420px 240px at 100% 100%, rgb(var(--violet-rgb) / 0.08), transparent 70%), linear-gradient(180deg, var(--surface), rgb(var(--surface-rgb) / 0.6)); }
        .cp-big-label { font-size: 13px; color: var(--muted); }
        .cp-big-num { font-size: clamp(72px, 10vw, 120px); font-weight: 300; line-height: 1; color: var(--text); letter-spacing: -0.04em; margin: 10px 0 4px; }
        .cp-big-note { font-size: 14px; color: var(--accent); margin-bottom: 36px; }
        .cp-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cp-mini { padding: 16px; border-radius: var(--radius-sm); background: rgb(var(--bg-rgb) / 0.55); border: 1px solid var(--line); }
        .cp-mini-icon { color: var(--sand); margin-bottom: 10px; }
        .cp-mini-val { font-size: 26px; color: var(--text); line-height: 1.1; }
        .cp-mini-label { font-size: 12px; color: var(--subtle); margin-top: 4px; }

        .cp-platforms { display: flex; flex-direction: column; gap: 12px; }
        .cp-platform { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 22px; text-decoration: none; }
        .cp-platform:hover { border-color: rgb(var(--tone) / 0.32); transform: translateY(-2px); }
        .cp-platform-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .cp-platform-mark { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: rgb(var(--tone)); background: rgb(var(--tone) / 0.1); border: 1px solid rgb(var(--tone) / 0.28); flex-shrink: 0; }
        .cp-platform-name { font-size: 15.5px; font-weight: 500; color: var(--text); }
        .cp-platform-handle { font-size: 12px; color: var(--subtle); }
        .cp-platform-right { display: flex; align-items: center; gap: 22px; }
        .cp-platform-stat { text-align: right; }
        .cp-platform-stat-label { font-size: 11.5px; color: var(--subtle); }
        .cp-platform-stat-val { font-size: 16px; font-weight: 500; color: var(--text-soft); }
        .cp-solved { color: rgb(var(--tone)); }
        .cp-arrow { color: var(--subtle); transition: color 0.2s, transform 0.2s; }
        .cp-platform:hover .cp-arrow { color: var(--accent-strong); transform: translate(2px, -2px); }
        .cp-quote { margin: 8px 0 0; padding: 20px 22px; border-left: 2px solid var(--accent-line); font-family: var(--font-serif); font-style: italic; font-size: 17px; line-height: 1.7; color: var(--muted); }

        @media (max-width: 900px) { .cp-layout { grid-template-columns: 1fr; } .cp-big { padding: 28px; } }
        @media (max-width: 480px) {
          .cp-platform { flex-direction: column; align-items: flex-start; }
          .cp-platform-right { width: 100%; justify-content: flex-start; }
          .cp-arrow { margin-left: auto; }
          .cp-mini { padding: 12px; }
          .cp-mini-val { font-size: 22px; }
        }
      `}</style>
    </section>
  );
}
