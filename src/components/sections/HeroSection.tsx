"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Mail, GitFork, Link2, Code2, MapPin } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";

const roles = [
  "Software Engineer",
  "Full-Stack Web Developer",
  "Next.js Specialist",
  "TypeScript Engineer",
  "Backend Architect",
  "Machine Learning Enthusiast",
  "Problem Solver",
];

const ease = [0.16, 1, 0.3, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setTimeout(() => setIsDeleting(true), 2200);
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === "") { setIsDeleting(false); setRoleIndex((prev) => (prev + 1) % roles.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const socials = [
    { href: personalInfo.social.github, label: "GitHub", icon: GitFork },
    { href: personalInfo.social.linkedin, label: "LinkedIn", icon: Link2 },
    { href: personalInfo.social.codeforces, label: "Codeforces", icon: Code2 },
    { href: `mailto:${personalInfo.email}`, label: "Email", icon: Mail },
  ];

  return (
    <section className="hero grain" id="hero">
      <div className="hero-bg" aria-hidden>
        <div className="hero-grid-lines" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-left">
            <motion.div {...rise(0.1)} className="hero-badge">
              <span className="status-dot" />
              <span>{personalInfo.availability}</span>
            </motion.div>

            <motion.h1 {...rise(0.2)} className="hero-name">
              Sabbir Rayhan
              <span className="hero-name-accent">Mahee<span className="hero-name-dot">.</span></span>
            </motion.h1>

            <motion.div {...rise(0.35)} className="hero-role">
              <span className="hero-role-prefix">I&apos;m a</span>
              <span className="hero-role-text">{displayed}</span>
              <span className="cursor-blink hero-cursor" aria-hidden />
            </motion.div>

            <motion.p {...rise(0.45)} className="hero-desc">
              I build <strong>production-grade web applications</strong> end-to-end — from database schema
              and REST API design to calm, responsive interfaces — and apply <strong>deep learning</strong> to
              real-world problems through research.
            </motion.p>

            <motion.div {...rise(0.55)} className="hero-btns">
              <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-primary">
                View my work <ArrowRight size={16} />
              </button>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost">
                <Mail size={15} /> Get in touch
              </button>
            </motion.div>

            <motion.div {...rise(0.65)} className="hero-socials">
              {socials.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="icon-btn" aria-label={label} title={label}>
                  <Icon size={16} />
                </a>
              ))}
              <span className="hero-socials-sep" />
              <span className="hero-location"><MapPin size={14} /> {personalInfo.location}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="hero-photo-side"
          >
            <div className="hero-photo-frame">
              <div className="hero-photo-box">
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  priority
                  sizes="(max-width:900px) 260px, 360px"
                />
                <div className="hero-photo-shade" />
              </div>

              <div className="hero-chip hero-chip-bl">
                <div className="hero-chip-icon"><Code2 size={16} /></div>
                <div>
                  <div className="hero-chip-title">Full-Stack</div>
                  <div className="hero-chip-sub">Next.js · Node.js</div>
                </div>
              </div>

              <div className="hero-chip hero-chip-tr">
                <div className="hero-chip-num">500+</div>
                <div className="hero-chip-sub">problems solved</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.dl {...rise(0.8)} className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat">
              <dt className="hero-stat-label">{s.label}</dt>
              <dd className="hero-stat-num">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="hero-scroll" aria-label="Scroll to about"
      >
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex" }}>
          <ArrowDown size={15} />
        </motion.span>
      </motion.button>

      <style>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; pointer-events: none; }
        .hero-grid-lines {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgb(var(--text-rgb) / 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--text-rgb) / 0.035) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%);
        }
        .hero-blob { position: absolute; border-radius: 50%; filter: blur(90px); }
        .hero-blob-1 { width: 520px; height: 520px; top: -120px; right: -80px; background: rgb(var(--accent-rgb) / 0.11); }
        .hero-blob-2 { width: 420px; height: 420px; bottom: -160px; left: -120px; background: rgb(var(--sand-rgb) / 0.06); }

        .hero-container { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; padding: 128px 40px 80px; width: 100%; }
        .hero-grid { display: grid; grid-template-columns: 1fr 380px; gap: 72px; align-items: center; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 7px 16px 7px 12px; border-radius: 999px;
          border: 1px solid var(--accent-line); background: var(--accent-soft);
          color: var(--accent-strong); font-size: 13px; font-weight: 500; margin-bottom: 32px;
        }

        .hero-name {
          font-family: var(--font-serif); font-optical-sizing: auto;
          font-size: clamp(46px, 7vw, 92px); font-weight: 350;
          line-height: 1.0; letter-spacing: -0.035em; color: var(--text); margin: 0 0 26px;
        }
        .hero-name-accent { display: block; font-style: italic; font-weight: 300; padding-right: 0.08em; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
        .hero-name-dot { -webkit-text-fill-color: var(--sand); }
        .hero-name-dot { color: var(--sand); font-style: normal; }

        .hero-role { display: flex; align-items: center; gap: 10px; min-height: 32px; margin-bottom: 22px; font-size: 19px; }
        .hero-role-prefix { color: var(--muted); }
        .hero-role-text { color: var(--text); font-weight: 500; }
        .hero-cursor { display: inline-block; width: 2px; height: 22px; background: var(--accent); margin-left: -6px; border-radius: 2px; }

        .hero-desc { color: var(--muted); font-size: 17px; line-height: 1.8; max-width: 520px; margin: 0 0 38px; }
        .hero-desc strong { color: var(--text-soft); font-weight: 500; }

        .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }

        .hero-socials { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .hero-socials-sep { width: 1px; height: 22px; background: var(--line-strong); margin: 0 8px; }
        .hero-location { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 13.5px; }

        .hero-photo-side { display: flex; justify-content: center; }
        .hero-photo-frame { position: relative; padding: 12px; border-radius: 30px; border: 1px solid var(--line-strong); background: rgba(255,255,255,0.015); }
        .hero-photo-box {
          position: relative; width: 340px; height: 430px; border-radius: 22px; overflow: hidden;
          box-shadow: 0 40px 80px -30px rgba(0,0,0,0.7);
        }
        .hero-photo-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgb(var(--bg-rgb) / 0.55), transparent 45%); }

        .hero-chip {
          position: absolute; display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 16px;
          background: rgb(var(--surface-rgb) / 0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--line-strong); box-shadow: 0 20px 40px -16px rgba(0,0,0,0.6);
        }
        .hero-chip-bl { bottom: 28px; left: -36px; }
        .hero-chip-tr { top: 36px; right: -32px; flex-direction: column; align-items: flex-start; gap: 0; }
        .hero-chip-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: rgb(var(--sky-rgb)); background: rgb(var(--sky-rgb) / 0.12); }
        .hero-chip-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.3; }
        .hero-chip-sub { font-size: 12px; color: var(--muted); }
        .hero-chip-num { font-family: var(--font-serif); font-size: 28px; line-height: 1.1; color: var(--sand); }

        .hero-stats {
          margin: 88px 0 0; display: grid; grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
        }
        .hero-stat { padding: 28px 24px; display: flex; flex-direction: column-reverse; gap: 6px; }
        .hero-stat + .hero-stat { border-left: 1px solid var(--line); }
        .hero-stat-num { margin: 0; font-family: var(--font-serif); font-size: 40px; font-weight: 350; line-height: 1; color: var(--text); letter-spacing: -0.02em; }
        .hero-stat-label { font-size: 13px; color: var(--muted); }
        .hero-stat-num::after { content: ""; display: block; width: 22px; height: 2px; border-radius: 2px; margin-top: 14px; background: rgb(var(--tone) / 0.7); }
        .hero-stat:nth-child(1) { --tone: var(--sage-rgb); }
        .hero-stat:nth-child(2) { --tone: var(--sky-rgb); }
        .hero-stat:nth-child(3) { --tone: var(--violet-rgb); }
        .hero-stat:nth-child(4) { --tone: var(--sand-rgb); }

        .hero-scroll {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 2;
          width: 38px; height: 38px; border-radius: 999px; display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--line-strong); background: transparent; color: var(--muted); cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }
        .hero-scroll:hover { color: var(--accent-strong); border-color: var(--accent-line); }

        @media (max-width: 1100px) { .hero-scroll { display: none; } }
        @media (max-width: 960px) {
          .hero-container { padding: 112px 28px 64px; }
          .hero-grid { grid-template-columns: 1fr; gap: 56px; }
          .hero-photo-side { order: -1; }
          .hero-photo-box { width: 240px; height: 300px; }
          .hero-chip-bl { left: -24px; bottom: 16px; }
          .hero-chip-tr { right: -24px; top: 20px; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); margin-top: 64px; }
          .hero-stat:nth-child(3) { border-left: none; }
          .hero-stat:nth-child(n+3) { border-top: 1px solid var(--line); }
        }
        @media (max-width: 520px) {
          .hero-container { padding: 100px 22px 56px; }
          .hero-role { font-size: 17px; }
          .hero-desc { font-size: 16px; }
          .hero-stat { padding: 22px 16px; }
          .hero-stat-num { font-size: 32px; }
          .hero-chip-bl { left: -14px; }
          .hero-chip-tr { right: -14px; }
          .hero-chip { padding: 10px 12px; }
          .hero-socials-sep, .hero-location { display: none; }
        }
      `}</style>
    </section>
  );
}
