"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, ExternalLink, Mail, GitFork, Link2, Code2 } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";

const roles = [
  "Full-Stack Web Developer",
  "Next.js Specialist",
  "TypeScript Engineer",
  "Backend Architect",
  "Problem Solver",
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX - innerWidth / 2) / innerWidth * 20);
    mouseY.set((e.clientY - innerHeight / 2) / innerHeight * 20);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["rgba(56,189,248,", "rgba(129,140,248,", "rgba(52,211,153,"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56,189,248,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // GSAP orbs
  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll(".orb");
    if (!orbs) return;
    orbs.forEach((orb, i) => {
      gsap.to(orb, { y: i % 2 === 0 ? -30 : 30, x: i % 3 === 0 ? 20 : -20, duration: 5 + i, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
  }, []);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 45 : 85;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === "") { setIsDeleting(false); setRoleIndex((prev) => (prev + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section ref={containerRef} className="hero-section grid-bg noise-overlay" id="hero">
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Orbs */}
      <motion.div className="orb orb-1" style={{ x: springX, y: springY }} />
      <motion.div className="orb orb-2" style={{ x: springX, y: springY }} />
      <motion.div className="orb orb-3" style={{ x: springX, y: springY }} />

      <div className="hero-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">

          {/* LEFT */}
          <div className="hero-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-badge shimmer-btn"
            >
              <span className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#38bdf8", display: "inline-block", flexShrink: 0 }} />
              <span>{personalInfo.availability}</span>
              <span style={{ marginLeft: "auto", fontSize: "10px", color: "#334155", borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "10px" }}>Open to work</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hero-name"
            >
              <span style={{ color: "#e2e8f0", display: "block" }}>Sabbir</span>
              <span className="outline-text text-glow-cyan" style={{ display: "block" }}>Rayhan</span>
              <span style={{ color: "#e2e8f0", display: "block" }}>Mahee</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hero-role-wrap"
            >
              <span className="hero-role-prefix">I am a </span>
              <span className="hero-role-text gradient-text">
                {displayed}
              </span>
              <span className="cursor-blink" style={{ color: "#38bdf8", fontFamily: "monospace", fontSize: "20px" }}>|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="hero-desc"
            >
              I build <strong style={{ color: "#e2e8f0", fontWeight: 600 }}>production-grade web applications</strong> end-to-end — from database schema and REST API design to pixel-perfect, responsive frontends.
              <span className="hero-stack">
                <span className="stack-tag">Next.js</span>
                <span className="stack-dot">·</span>
                <span className="stack-tag">Node.js</span>
                <span className="stack-dot">·</span>
                <span className="stack-tag">TypeScript</span>
                <span className="stack-dot">·</span>
                <span className="stack-tag">PostgreSQL</span>
              </span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="hero-btns"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                <span>View My Work</span>
                <ExternalLink size={14} />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline"
              >
                <Mail size={14} />
                <span>Get In Touch</span>
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="hero-socials"
            >
              <span className="hero-socials-label">Find me on</span>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {[
                  { href: personalInfo.social.github, label: "GitHub", icon: GitFork },
                  { href: personalInfo.social.linkedin, label: "LinkedIn", icon: Link2 },
                ].map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
                <a href={personalInfo.social.codeforces} target="_blank" rel="noopener noreferrer" className="social-icon-btn social-cf">
                  <Code2 size={14} />
                  <span>CF</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-photo-side"
          >
            <div className="hero-photo-wrap gradient-border">
              {/* Rotating ring */}
              <div className="photo-ring-outer" />
              <div className="photo-ring-inner" />

              <div className="hero-photo-box">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  priority
                  sizes="(max-width:768px) 220px, 300px"
                />
                {/* Color tint overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(5,8,16,0.7) 0%, rgba(5,8,16,0.1) 40%, transparent 100%)"
                }} />
                {/* Cyan tint */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(56,189,248,0.08) 0%, transparent 60%)"
                }} />
              </div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hero-float-badge hero-float-bl"
              >
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 800, fontSize: "11px", fontFamily: "monospace"
                }}>TS</div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#e2e8f0", lineHeight: 1.2 }}>Full-Stack</div>
                  <div style={{ fontSize: "10px", color: "#38bdf8", fontFamily: "monospace" }}>Next.js + Node.js</div>
                </div>
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="hero-float-badge hero-float-tr"
              >
                <div style={{ fontSize: "22px", fontWeight: 900, lineHeight: 1, fontFamily: "monospace" }} className="gradient-text">500+</div>
                <div style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}>Problems Solved</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="hero-stats"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="hero-stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
            >
              <div className="gradient-text hero-stat-num">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="hero-scroll-btn"
        style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", zIndex: 2 }}
      >
        <span style={{ fontSize: "9px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px", color: "#334155" }}>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={15} color="#334155" />
        </motion.div>
      </motion.button>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 100px 40px 72px;
          width: 100%;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 64px;
          align-items: center;
        }
        .hero-left {}

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid rgba(56,189,248,0.25);
          background: rgba(56,189,248,0.06);
          color: #38bdf8;
          font-size: 11.5px;
          font-family: monospace;
          margin-bottom: 32px;
          max-width: fit-content;
        }

        /* Name */
        .hero-name {
          font-size: clamp(44px, 6.5vw, 80px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -2.5px;
          margin-bottom: 20px;
        }

        /* Role typewriter */
        .hero-role-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 22px;
          min-height: 34px;
          flex-wrap: wrap;
        }
        .hero-role-prefix {
          font-size: 18px;
          color: #64748b;
          font-style: italic;
          font-family: Georgia, serif;
        }
        .hero-role-text {
          font-size: 18px;
          font-weight: 700;
          font-family: Georgia, serif;
          font-style: italic;
        }

        /* Desc */
        .hero-desc {
          color: #64748b;
          font-size: 15px;
          line-height: 1.85;
          max-width: 480px;
          margin-bottom: 36px;
        }
        .hero-stack {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        .stack-tag {
          font-size: 12px;
          font-family: monospace;
          color: #38bdf8;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.15);
          padding: 2px 10px;
          border-radius: 4px;
        }
        .stack-dot { color: #334155; font-size: 14px; }

        /* Buttons */
        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
        .btn-primary {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 26px;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          color: #050810;
          font-weight: 700; font-size: 14px;
          border-radius: 10px; border: none; cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(56,189,248,0.25);
          position: relative; overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(56,189,248,0.4);
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-outline {
          display: flex; align-items: center; gap: 8px;
          padding: 13px 26px;
          background: rgba(255,255,255,0.03);
          color: #94a3b8;
          font-weight: 500; font-size: 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: rgba(56,189,248,0.4);
          color: #38bdf8;
          background: rgba(56,189,248,0.05);
          transform: translateY(-2px);
        }

        /* Socials */
        .hero-socials { display: flex; align-items: center; gap: 14px; }
        .hero-socials-label {
          color: #334155; font-size: 10px;
          font-family: monospace; text-transform: uppercase; letter-spacing: 2px;
        }
        .social-icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          color: #475569; text-decoration: none;
          transition: all 0.25s;
          background: rgba(255,255,255,0.02);
        }
        .social-icon-btn:hover {
          border-color: rgba(56,189,248,0.4);
          color: #38bdf8;
          background: rgba(56,189,248,0.06);
          transform: translateY(-2px);
        }
        .social-cf {
          width: auto; padding: 0 12px; gap: 5px;
          font-size: 11px; font-family: monospace; font-weight: 600;
        }

        /* Photo */
        .hero-photo-side { display: flex; justify-content: center; align-items: center; }
        .hero-photo-wrap {
          position: relative;
          display: inline-block;
        }
        .photo-ring-outer {
          position: absolute;
          inset: -16px;
          border-radius: 22px;
          border: 1px solid rgba(56,189,248,0.12);
          pointer-events: none;
        }
        .photo-ring-inner {
          position: absolute;
          inset: -8px;
          border-radius: 19px;
          border: 1px solid rgba(129,140,248,0.08);
          pointer-events: none;
        }
        .hero-photo-box {
          position: relative;
          width: 280px; height: 360px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5),
                      0 0 0 1px rgba(56,189,248,0.05);
        }
        .hero-float-badge {
          position: absolute;
          background: rgba(8,13,26,0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: max-content;
        }
        .hero-float-bl { bottom: -18px; left: -20px; }
        .hero-float-tr { top: -18px; right: -20px; flex-direction: column; text-align: center; gap: 2px; padding: 14px 18px; }

        /* Stats */
        .hero-stats {
          margin-top: 60px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .hero-stat-item {
          text-align: center;
          padding: 20px 10px;
          border-radius: 12px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.04);
          transition: all 0.25s;
        }
        .hero-stat-item:hover {
          border-color: rgba(56,189,248,0.15);
          background: rgba(56,189,248,0.03);
          transform: translateY(-3px);
        }
        .hero-stat-num { font-size: 30px; font-weight: 900; margin-bottom: 6px; }
        .hero-stat-label {
          font-size: 10px; color: #475569;
          font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px;
        }

        /* Orbs */
        .orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(80px); }
        .orb-1 { top: 15%; left: 20%; width: 320px; height: 320px; background: rgba(56,189,248,0.07); }
        .orb-2 { bottom: 20%; right: 15%; width: 400px; height: 400px; background: rgba(129,140,248,0.06); }
        .orb-3 { top: 55%; left: 55%; width: 200px; height: 200px; background: rgba(52,211,153,0.05); }

        /* Scroll btn */
        .hero-scroll-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; background: none; border: none; cursor: pointer;
          transition: opacity 0.2s;
        }
        .hero-scroll-btn:hover { opacity: 0.7; }

        @media (max-width: 900px) {
          .hero-container { padding: 90px 24px 60px; }
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-photo-side { order: -1; }
          .hero-photo-box { width: 200px; height: 260px; }
          .hero-float-bl { left: -10px; bottom: -10px; }
          .hero-float-tr { right: -10px; top: -10px; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .hero-name { font-size: clamp(38px, 10vw, 56px); letter-spacing: -1.5px; }
        }
        @media (max-width: 480px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-stat-num { font-size: 24px; }
          .hero-badge { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
