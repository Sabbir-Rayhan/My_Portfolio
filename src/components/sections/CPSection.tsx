"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Trophy, Flame, Clock, Zap } from "lucide-react";
import { competitiveProgramming } from "@/data/portfolio";

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (1600 / 16);
    const t = setInterval(() => { start = Math.min(start + step, target); setCount(Math.floor(start)); if (start >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}</span>;
}

export default function CPSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="cp" className="cp-section">
      <div ref={ref} className="section-container">
        <div className="section-label-row">
          <div className="section-label-line" style={{ background: "#f472b6" }} />
          <span className="section-label" style={{ color: "#f472b6" }}>05 — Competitive Programming</span>
        </div>
        <h2 className="section-h2">Sharpening <span style={{ color: "#f472b6" }}>the fundamentals</span></h2>
        <p className="cp-intro">Active across multiple platforms since 2022. Problem-solving keeps me sharp on algorithms, data structures, and optimization — directly improving how I design backend systems.</p>

        <div className="cp-grid-layout">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="cp-big-card">
            <div className="gradient-text cp-big-num">{competitiveProgramming.totalSolved}</div>
            <div className="cp-big-label">Total Problems Solved — All Platforms</div>
            <div className="cp-mini-grid">
              {[
                { icon: Trophy, label: "CF Rating", value: competitiveProgramming.stats.cfRating, color: "#fbbf24" },
                { icon: Flame, label: "Max Streak", value: competitiveProgramming.stats.maxStreak, suffix: "d", color: "#fb923c" },
                { icon: Clock, label: "Since", value: competitiveProgramming.stats.activeSince, color: "#38bdf8" },
              ].map(({ icon: Icon, label, value, suffix, color }) => (
                <div key={label} className="cp-mini-box">
                  <Icon size={14} color={color} style={{ marginBottom: "6px" }} />
                  <div style={{ fontSize: "20px", fontWeight: 800, color, fontFamily: "monospace" }}>
                    <CountUp target={value} />{suffix || ""}
                  </div>
                  <div style={{ fontSize: "9px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="cp-platforms">
            {competitiveProgramming.platforms.map((p, i) => (
              <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="cp-platform-row">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Zap size={16} color={p.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "14px" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>@{p.handle}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {p.rating !== "—" && (
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace" }}>Rating</div>
                      <div style={{ fontWeight: 700, fontSize: "14px", color: p.color, fontFamily: "monospace" }}>{p.rating}</div>
                    </div>
                  )}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace" }}>Solved</div>
                    <div style={{ fontWeight: 700, fontSize: "20px", color: p.color, fontFamily: "monospace" }}>{p.solved}</div>
                  </div>
                  <ExternalLink size={14} color="#334155" />
                </div>
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="cp-quote">
              &ldquo;Competitive programming isn&apos;t just about solving problems — it&apos;s about thinking systematically and writing code that works correctly under constraints.&rdquo;
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .cp-section { padding: 96px 0; }
        .cp-intro { color: #64748b; font-size: 15px; max-width: 520px; line-height: 1.8; margin-bottom: 48px; }
        .cp-grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
        .cp-big-card { padding: 32px; border-radius: 20px; background: linear-gradient(135deg, rgba(244,114,182,0.08), rgba(15,22,41,1), rgba(129,140,248,0.08)); border: 1px solid rgba(244,114,182,0.2); position: relative; overflow: hidden; }
        .cp-big-num { font-size: clamp(40px, 8vw, 80px); font-weight: 900; font-family: monospace; line-height: 1; margin-bottom: 8px; }
        .cp-big-label { color: #64748b; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 28px; }
        .cp-mini-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cp-mini-box { padding: 14px 10px; border-radius: 12px; background: rgba(5,8,16,0.6); border: 1px solid rgba(255,255,255,0.06); text-align: center; }
        .cp-platforms { display: flex; flex-direction: column; gap: 12px; }
        .cp-platform-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); text-decoration: none; transition: all 0.2s; }
        .cp-platform-row:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-2px); }
        .cp-quote { padding: 16px; border-radius: 12px; border: 1px dashed rgba(255,255,255,0.08); color: #475569; font-size: 13px; font-style: italic; font-family: Georgia,serif; line-height: 1.75; }

        @media (max-width: 900px) {
          .cp-grid-layout { grid-template-columns: 1fr; }
          .cp-big-num { font-size: 56px; }
        }
        @media (max-width: 480px) {
          .cp-mini-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .cp-platform-row { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
