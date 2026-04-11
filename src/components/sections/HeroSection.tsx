"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, ExternalLink, Mail, GitFork, Link2 } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";

const roles = [
  "Full-Stack Web Developer",
  "Next.js Specialist",
  "TypeScript Engineer",
  "Backend Architect",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
  const current = roles[roleIndex];
  const speed = isDeleting ? 45 : 85;

  const timeout = setTimeout(() => {
    if (!isDeleting) {
      const next = current.slice(0, displayed.length + 1);
      setDisplayed(next);
      if (next === current) {
        // Fully typed — wait 2s then start deleting
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      const next = current.slice(0, displayed.length - 1);
      setDisplayed(next);
      if (next === "") {
        // Fully deleted — move to next role
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
  }, speed);

  return () => clearTimeout(timeout);
}, [displayed, isDeleting, roleIndex]);

  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll(".orb");
    if (!orbs) return;
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: i % 2 === 0 ? -20 : 20,
        x: i % 3 === 0 ? 15 : -15,
        duration: 4 + i * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="hero-section grid-bg" id="hero">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-container">
        <div className="hero-grid">
          {/* LEFT */}
          <div className="hero-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-badge"
            >
              <span
                className="pulse-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#38bdf8",
                  display: "inline-block",
                }}
              />
              {personalInfo.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hero-name"
            >
              <span style={{ color: "#e2e8f0" }}>Sabbir</span>
              <br />
              <span className="outline-text">Rayhan</span>
              <br />
              <span style={{ color: "#e2e8f0" }}>Mahee</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hero-role-wrap"
            >
              <span className="hero-role-text">
                {displayed}
                <span
                  className="cursor-blink"
                  style={{
                    color: "#38bdf8",
                    fontStyle: "normal",
                    fontFamily: "monospace",
                  }}
                >
                  |
                </span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hero-desc"
            >
              I build{" "}
              <strong style={{ color: "#e2e8f0", fontWeight: 500 }}>
                production-grade web applications
              </strong>{" "}
              end-to-end — from database schema and REST API design to
              pixel-perfect, responsive frontends.
              <span className="hero-stack">
                Next.js · Node.js · TypeScript · PostgreSQL
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="hero-btns"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary"
              >
                View My Work <ExternalLink size={14} />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline"
              >
                <Mail size={14} /> Get In Touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="hero-socials"
            >
              <span className="hero-socials-label">Find me on</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  {
                    href: personalInfo.social.github,
                    label: "GitHub",
                    icon: GitFork,
                  },
                  {
                    href: personalInfo.social.linkedin,
                    label: "LinkedIn",
                    icon: Link2,
                  },
                ].map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                  >
                    <Icon size={16} />
                  </a>
                ))}
                <a
                  href={personalInfo.social.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn social-cf"
                >
                  CF
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-photo-side"
          >
            <div className="hero-photo-wrap">
              <div className="hero-photo-ring-outer" />
              <div className="hero-photo-box">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  priority
                  sizes="(max-width:768px) 240px, 300px"
                />
                <div className="hero-photo-overlay" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="hero-badge-float hero-badge-float-bl"
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(56,189,248,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                >
                  TS
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#e2e8f0",
                    }}
                  >
                    Full-Stack
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#475569",
                      fontFamily: "monospace",
                    }}
                  >
                    Next.js + Node.js
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="hero-badge-float hero-badge-float-tr"
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#38bdf8",
                    fontFamily: "monospace",
                  }}
                >
                  500+
                </div>
                <div style={{ fontSize: "10px", color: "#475569" }}>
                  Problems Solved
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="hero-stats"
        >
          {stats.map((s) => (
            <div key={s.label} className="hero-stat-item">
              <div className="gradient-text hero-stat-num">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="hero-scroll-btn"
      >
        <span
          style={{
            fontSize: "10px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>

      <style>{`
        .hero-section { position:relative; min-height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden; }
        .hero-container { max-width:1180px; margin:0 auto; padding:96px 40px 64px; width:100%; }
        .hero-grid { display:grid; grid-template-columns:1fr 320px; gap:60px; align-items:center; }
        .hero-left {}
        .hero-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border-radius:100px; border:1px solid rgba(56,189,248,0.2); background:rgba(56,189,248,0.08); color:#38bdf8; font-size:11px; font-family:monospace; margin-bottom:28px; }
        .hero-name { font-size:clamp(42px,6vw,76px); font-weight:900; line-height:1.05; letter-spacing:-2px; margin-bottom:14px; }
        .hero-role-wrap { height:36px; display:flex; align-items:center; margin-bottom:18px; }
        .hero-role-text { font-size:18px; font-style:italic; color:#94a3b8; font-family:Georgia,serif; }
        .hero-desc { color:#64748b; font-size:15px; line-height:1.8; max-width:480px; margin-bottom:32px; }
        .hero-stack { display:block; margin-top:8px; color:#475569; font-size:13px; font-family:monospace; }
        .hero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:32px; }
        .btn-primary { display:flex; align-items:center; gap:8px; padding:12px 24px; background:#38bdf8; color:#0f172a; font-weight:600; font-size:14px; border-radius:8px; border:none; cursor:pointer; transition:background 0.2s; }
        .btn-primary:hover { background:#7dd3fc; }
        .btn-outline { display:flex; align-items:center; gap:8px; padding:12px 24px; background:transparent; color:#94a3b8; font-weight:500; font-size:14px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); cursor:pointer; transition:all 0.2s; }
        .btn-outline:hover { border-color:rgba(255,255,255,0.2); color:#e2e8f0; }
        .hero-socials { display:flex; align-items:center; gap:12px; }
        .hero-socials-label { color:#334155; font-size:11px; font-family:monospace; text-transform:uppercase; letter-spacing:2px; }
        .social-icon-btn { width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:8px; border:1px solid rgba(255,255,255,0.08); color:#475569; text-decoration:none; transition:all 0.2s; }
        .social-icon-btn:hover { border-color:rgba(56,189,248,0.4); color:#38bdf8; }
        .social-cf { padding:0 12px; width:auto; font-size:11px; font-family:monospace; }
        .hero-photo-side { display:flex; justify-content:center; }
        .hero-photo-wrap { position:relative; }
        .hero-photo-ring-outer { position:absolute; inset:-12px -12px 12px 12px; border:1.5px solid rgba(56,189,248,0.2); border-radius:16px; }
        .hero-photo-box { position:relative; width:280px; height:360px; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
        .hero-photo-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(5,8,16,0.6) 0%, transparent 50%); }
        .hero-badge-float { position:absolute; background:#0f1629; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:10px 12px; box-shadow:0 8px 30px rgba(0,0,0,0.4); display:flex; align-items:center; gap:8px; }
        .hero-badge-float-bl { bottom:-14px; left:-14px; }
        .hero-badge-float-tr { top:-14px; right:-14px; flex-direction:column; align-items:center; gap:2px; }
        .hero-stats { margin-top:56px; padding-top:36px; border-top:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .hero-stat-item { text-align:center; }
        .hero-stat-num { font-size:28px; font-weight:800; margin-bottom:4px; }
        .hero-stat-label { font-size:10px; color:#475569; font-family:monospace; text-transform:uppercase; letter-spacing:2px; }
        .hero-scroll-btn { position:absolute; bottom:28px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:6px; color:#334155; background:none; border:none; cursor:pointer; transition:color 0.2s; }
        .hero-scroll-btn:hover { color:#38bdf8; }
        .orb { position:absolute; border-radius:50%; pointer-events:none; }
        .orb-1 { top:25%; left:25%; width:256px; height:256px; background:rgba(56,189,248,0.06); filter:blur(60px); }
        .orb-2 { bottom:33%; right:25%; width:320px; height:320px; background:rgba(129,140,248,0.06); filter:blur(60px); }
        .orb-3 { top:50%; right:33%; width:192px; height:192px; background:rgba(52,211,153,0.04); filter:blur(60px); }

        @media (max-width: 900px) {
          .hero-container { padding:90px 24px 60px; }
          .hero-grid { grid-template-columns:1fr; gap:40px; }
          .hero-photo-side { order:-1; }
          .hero-photo-box { width:200px; height:260px; }
          .hero-stats { grid-template-columns:repeat(2,1fr); gap:12px; }
          .hero-name { font-size:clamp(38px,10vw,56px); }
        }
        @media (max-width: 480px) {
          .hero-stats { grid-template-columns:repeat(2,1fr); }
          .hero-stat-num { font-size:22px; }
          .hero-badge-float-bl { left:-8px; bottom:-8px; }
          .hero-badge-float-tr { right:-8px; top:-8px; }
        }
      `}</style>
    </section>
  );
}
