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
    <section id="cp" style={{ padding: "96px 0" }}>
      <div ref={ref} style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#f472b6" }} />
          <span style={{ color: "#f472b6", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px" }}>05 — Competitive Programming</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", marginBottom: "16px" }}>
          Sharpening <span style={{ color: "#f472b6" }}>the fundamentals</span>
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "520px", lineHeight: 1.8, marginBottom: "48px" }}>
          Active across multiple platforms since 2022. Problem-solving keeps me sharp on algorithms, data structures, and optimization — directly improving how I design backend systems.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Left: big stat */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            style={{ padding: "36px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(244,114,182,0.08), rgba(15,22,41,1), rgba(129,140,248,0.08))", border: "1px solid rgba(244,114,182,0.2)", position: "relative", overflow: "hidden" }}>
            <div className="gradient-text" style={{ fontSize: "80px", fontWeight: 900, fontFamily: "monospace", lineHeight: 1, marginBottom: "8px" }}>
              {competitiveProgramming.totalSolved}
            </div>
            <div style={{ color: "#64748b", fontSize: "12px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", marginBottom: "32px" }}>Total Problems Solved — All Platforms</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { icon: Trophy, label: "CF Rating", value: competitiveProgramming.stats.cfRating, color: "#fbbf24" },
                { icon: Flame, label: "Max Streak", value: competitiveProgramming.stats.maxStreak, suffix: "d", color: "#fb923c" },
                { icon: Clock, label: "Since", value: competitiveProgramming.stats.activeSince, color: "#38bdf8" },
              ].map(({ icon: Icon, label, value, suffix, color }) => (
                <div key={label} style={{ padding: "14px", borderRadius: "12px", background: "rgba(5,8,16,0.6)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                  <Icon size={14} color={color} style={{ margin: "0 auto 8px" }} />
                  <div style={{ fontSize: "20px", fontWeight: 800, color, fontFamily: "monospace" }}>
                    <CountUp target={value} />{suffix || ""}
                  </div>
                  <div style={{ fontSize: "9px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: platforms */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {competitiveProgramming.platforms.map((p, i) => (
              <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Zap size={16} color={p.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: "14px" }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#475569", fontFamily: "monospace" }}>@{p.handle}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              style={{ padding: "16px", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.08)", color: "#475569", fontSize: "13px", fontStyle: "italic", fontFamily: "Georgia, serif", lineHeight: 1.75 }}>
              "Competitive programming isn't just about solving problems — it's about thinking systematically and writing code that works correctly under constraints."
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
