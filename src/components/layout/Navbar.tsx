"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowDownToLine } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "CP", href: "#cp" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="navbar-inner">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-logo" aria-label="SR Mahee — back to top">
            <span className="nav-logo-mark">SR</span>
            <span className="nav-logo-text">Mahee<span className="nav-logo-dot">.</span></span>
          </button>

          <nav className="nav-links-desktop" aria-label="Primary">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button key={link.href} onClick={() => scrollTo(link.href)} className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
                  {isActive && (
                    <motion.span layoutId="nav-active-pill" className="nav-active-pill" transition={{ type: "spring", bounce: 0.18, duration: 0.5 }} />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="nav-right">
            <ThemeSwitcher />
            <a href={personalInfo.resumeUrl} download className="btn btn-ghost btn-sm nav-resume">
              <ArrowDownToLine size={14} />
              <span>Resume</span>
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-hamburger" aria-label="Toggle menu" aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-menu"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(link.href)}
                className={`mobile-nav-link ${activeSection === link.href.replace("#", "") ? "mobile-nav-active" : ""}`}
              >
                <span className="mono mobile-nav-num">0{i + 1}</span>
                {link.label}
              </motion.button>
            ))}
            <a href={personalInfo.resumeUrl} download className="btn btn-primary" style={{ marginTop: 12 }}>
              <ArrowDownToLine size={15} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
        }
        .navbar-scrolled {
          background: rgb(var(--bg-rgb) / 0.72);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border-bottom-color: var(--line);
        }
        .navbar-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 40px;
          height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 24px;
          transition: height 0.4s ease;
        }
        .navbar-scrolled .navbar-inner { height: 62px; }
        .scroll-progress {
          position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
          background: linear-gradient(90deg, var(--accent), var(--sand));
          transform-origin: left; opacity: 0.7;
        }

        .nav-logo { display: flex; align-items: center; gap: 11px; background: none; border: none; cursor: pointer; padding: 0; }
        .nav-logo-mark {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-sans); font-size: 13.5px; font-weight: 700; letter-spacing: 0.02em;
          color: rgb(var(--on-accent-rgb));
          background: var(--grad);
          box-shadow: 0 6px 18px -8px rgb(var(--sky-rgb) / 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition: transform 0.3s ease;
        }
        .nav-logo:hover .nav-logo-mark { transform: rotate(-6deg); }
        .nav-logo-text { font-family: var(--font-serif); font-size: 21px; font-weight: 500; color: var(--text); letter-spacing: -0.01em; }
        .nav-logo-dot { color: var(--sand); }

        .nav-links-desktop {
          display: flex; align-items: center; gap: 2px; padding: 4px;
          border-radius: 999px; border: 1px solid var(--line); background: rgba(255,255,255,0.02);
        }
        .nav-link {
          position: relative; padding: 7px 16px; border-radius: 999px;
          background: none; border: none; cursor: pointer;
          font-size: 13.5px; font-weight: 450; color: var(--muted);
          transition: color 0.25s;
        }
        .nav-link:hover { color: var(--text); }
        .nav-link-active { color: var(--text); }
        .nav-active-pill { position: absolute; inset: 0; border-radius: 999px; background: rgba(255,255,255,0.06); border: 1px solid var(--line-strong); }

        .nav-right { display: flex; align-items: center; gap: 10px; }
        .nav-hamburger {
          display: none; width: 40px; height: 40px; align-items: center; justify-content: center;
          border-radius: 999px; border: 1px solid var(--line-strong); background: transparent;
          color: var(--text-soft); cursor: pointer;
        }

        .mobile-menu {
          position: fixed; top: 62px; left: 12px; right: 12px; z-index: 49;
          background: rgb(var(--bg-alt-rgb) / 0.97); backdrop-filter: blur(18px);
          border: 1px solid var(--line-strong); border-radius: 20px;
          padding: 14px; display: flex; flex-direction: column; gap: 2px;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6);
        }
        .mobile-nav-link {
          display: flex; align-items: center; gap: 14px; width: 100%; text-align: left;
          padding: 13px 14px; border-radius: 12px; background: none; border: none;
          color: var(--text-soft); font-size: 16px; cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .mobile-nav-link:hover { background: rgba(255,255,255,0.03); color: var(--text); }
        .mobile-nav-active { color: var(--accent-strong); background: var(--accent-soft); }
        .mobile-nav-num { font-size: 11px; color: var(--subtle); }

        @media (max-width: 1024px) {
          .nav-links-desktop { display: none; }
          .nav-hamburger { display: flex; }
        }
        @media (max-width: 640px) {
          .navbar-inner { padding: 0 20px; }
          .nav-resume { display: none; }
        }
      `}</style>
    </>
  );
}
