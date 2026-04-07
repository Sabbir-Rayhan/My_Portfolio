"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "CP", href: "#cp" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: scrolled ? "12px 40px" : "20px 40px",
    background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
    transition: "all 0.3s",
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={navStyle}
      >
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "8px",
            background: "linear-gradient(135deg, #38bdf8, #818cf8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: "13px", fontFamily: "monospace"
          }}>SR</div>
          <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "18px" }}>
            Mahee<span style={{ color: "#38bdf8" }}>.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "4px", alignItems: "center" }}
          className="hidden-mobile">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                style={{
                  position: "relative", padding: "8px 16px", borderRadius: "8px",
                  background: isActive ? "rgba(56,189,248,0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(56,189,248,0.2)" : "1px solid transparent",
                  color: isActive ? "#38bdf8" : "#64748b",
                  fontSize: "13px", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#e2e8f0"; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#64748b"; } }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <a href={personalInfo.resumeUrl}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "8px",
              background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)",
              color: "#38bdf8", fontSize: "12px", fontFamily: "monospace",
              textDecoration: "none", transition: "all 0.2s"
            }}>
            <Download size={13} /> Resume
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: "36px", height: "36px", display: "flex", alignItems: "center",
              justifyContent: "center", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)", background: "none",
              color: "#64748b", cursor: "pointer"
            }}
            className="show-mobile">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "fixed", top: "60px", left: 0, right: 0, zIndex: 49,
              background: "rgba(8,13,26,0.98)", backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 24px"
            }}
          >
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "12px 16px", borderRadius: "8px",
                  background: "none", border: "none",
                  color: "#94a3b8", fontSize: "15px", fontWeight: 500,
                  cursor: "pointer", marginBottom: "4px"
                }}>
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </>
  );
}
