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
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      id="hero"
    >
      {/* Background orbs */}
      <div className="orb absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(56,189,248,0.06)", filter: "blur(60px)" }} />
      <div className="orb absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(129,140,248,0.06)", filter: "blur(60px)" }} />
      <div className="orb absolute top-1/2 right-1/3 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "rgba(52,211,153,0.04)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-400/20 bg-sky-400/10 text-sky-400 text-xs font-medium mb-8"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 pulse-dot" />
              {personalInfo.availability}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontSize: "clamp(48px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "16px" }}
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
              style={{ height: "36px", marginBottom: "20px", display: "flex", alignItems: "center" }}
            >
              <span style={{ fontSize: "20px", fontStyle: "italic", color: "#94a3b8", fontFamily: "Georgia, serif" }}>
                {displayed}
                <span className="cursor-blink" style={{ color: "#38bdf8", fontStyle: "normal", fontFamily: "monospace" }}>|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ color: "#64748b", fontSize: "15px", lineHeight: 1.8, maxWidth: "480px", marginBottom: "32px" }}
            >
              I build{" "}
              <span style={{ color: "#e2e8f0", fontWeight: 500 }}>production-grade web applications</span>{" "}
              end-to-end — from database schema and REST API design to pixel-perfect, responsive frontends.
              <br />
              <span style={{ color: "#475569", fontSize: "13px", fontFamily: "monospace", display: "block", marginTop: "8px" }}>
                Next.js · Node.js · TypeScript · PostgreSQL
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 24px", background: "#38bdf8", color: "#0f172a",
                  fontWeight: 600, fontSize: "14px", borderRadius: "8px", border: "none",
                  cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#7dd3fc")}
                onMouseLeave={e => (e.currentTarget.style.background = "#38bdf8")}
              >
                View My Work <ExternalLink size={14} />
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 24px", background: "transparent",
                  color: "#94a3b8", fontWeight: 500, fontSize: "14px",
                  borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#e2e8f0"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94a3b8"; }}
              >
                <Mail size={14} /> Get In Touch
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <span style={{ color: "#334155", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "2px" }}>
                Find me on
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { href: personalInfo.social.github, label: "GitHub", icon: GitFork },
                  { href: personalInfo.social.linkedin, label: "LinkedIn", icon: Link2 },
                ].map(({ href, label, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      width: "36px", height: "36px", display: "flex", alignItems: "center",
                      justifyContent: "center", borderRadius: "8px",
                      border: "1px solid rgba(255,255,255,0.08)", color: "#475569",
                      transition: "all 0.2s", textDecoration: "none"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)"; e.currentTarget.style.color = "#38bdf8"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#475569"; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
                <a href={personalInfo.social.codeforces} target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: "0 12px", height: "36px", display: "flex", alignItems: "center",
                    borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)",
                    color: "#475569", fontSize: "11px", fontFamily: "monospace",
                    transition: "all 0.2s", textDecoration: "none"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.4)"; e.currentTarget.style.color = "#38bdf8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#475569"; }}
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
            style={{ display: "flex", justifyContent: "center", position: "relative" }}
          >
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: "-12px -12px 12px 12px",
                border: "1.5px solid rgba(56,189,248,0.2)", borderRadius: "16px"
              }} />

              {/* Fixed height container for Image */}
              <div style={{ position: "relative", width: "300px", height: "380px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Image
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  priority
                  sizes="300px"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(5,8,16,0.6) 0%, transparent 50%)"
                }} />
              </div>

              {/* Floating badge bottom-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", bottom: "-16px", left: "-16px",
                  background: "#0f1629", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.4)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: "rgba(56,189,248,0.15)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "#38bdf8", fontWeight: 700, fontSize: "11px", fontFamily: "monospace"
                  }}>TS</div>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "#e2e8f0" }}>Full-Stack</div>
                    <div style={{ fontSize: "10px", color: "#475569", fontFamily: "monospace" }}>Next.js + Node.js</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge top-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{
                  position: "absolute", top: "-16px", right: "-16px",
                  background: "#0f1629", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "12px", boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "20px", fontWeight: 800, color: "#38bdf8", fontFamily: "monospace" }}>500+</div>
                <div style={{ fontSize: "10px", color: "#475569" }}>Problems Solved</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{
            marginTop: "64px", paddingTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px"
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="gradient-text" style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#475569", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "2px" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
          color: "#334155", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s"
        }}
      >
        <span style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "3px" }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
