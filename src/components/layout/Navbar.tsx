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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="navbar"
        style={{
          background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          padding: scrolled ? "0 40px" : "0 40px",
          height: scrolled ? "58px" : "70px",
        }}
      >
        {/* Scroll progress bar */}
        <div className="scroll-progress-bar">
          <motion.div
            className="scroll-progress-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo"
        >
          <div className="nav-logo-box">
            <span>SR</span>
          </div>
          <span className="nav-logo-text">
            Mahee<span style={{ color: "#38bdf8" }}>.</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="nav-links-desktop">
          {navLinks.map(link => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="nav-active-pill"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="nav-right">
          <a href={personalInfo.resumeUrl} download className="nav-resume-btn">
            <Download size={13} />
            <span>Resume</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-hamburger"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                className={`mobile-nav-link ${activeSection === link.href.replace("#", "") ? "mobile-nav-active" : ""}`}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="mobile-menu-footer">
              <a href={personalInfo.resumeUrl} download className="nav-resume-btn" style={{ width: "100%", justifyContent: "center" }}>
                <Download size={13} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .scroll-progress-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1.5px;
          background: rgba(255,255,255,0.05);
        }
        .scroll-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          transition: width 0.1s;
        }

        /* Logo */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer;
          flex-shrink: 0;
        }
        .nav-logo-box {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 800; font-size: 12px; font-family: monospace;
          box-shadow: 0 4px 14px rgba(56,189,248,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-logo:hover .nav-logo-box {
          transform: rotate(8deg) scale(1.05);
          box-shadow: 0 6px 20px rgba(56,189,248,0.45);
        }
        .nav-logo-text {
          font-weight: 700; font-size: 18px; color: #e2e8f0;
          letter-spacing: -0.3px;
        }

        /* Desktop nav */
        .nav-links-desktop {
          display: flex; align-items: center; gap: 2px;
        }
        .nav-link {
          position: relative; padding: 7px 15px; border-radius: 8px;
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #64748b;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #e2e8f0; }
        .nav-link-active { color: #38bdf8; }
        .nav-active-pill {
          position: absolute; inset: 0; border-radius: 8px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
        }

        /* Resume btn */
        .nav-resume-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 8px;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          color: #38bdf8; font-size: 12px; font-family: monospace;
          text-decoration: none; transition: all 0.2s;
          white-space: nowrap;
        }
        .nav-resume-btn:hover {
          background: rgba(56,189,248,0.15);
          border-color: rgba(56,189,248,0.4);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(56,189,248,0.2);
        }

        /* Right */
        .nav-right {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }

        /* Hamburger */
        .nav-hamburger {
          display: none; width: 36px; height: 36px;
          align-items: center; justify-content: center;
          border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
          background: none; color: #64748b; cursor: pointer;
          transition: all 0.2s;
        }
        .nav-hamburger:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.2); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed; top: 58px; left: 0; right: 0; z-index: 49;
          background: rgba(5,8,16,0.98); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 16px 24px 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .mobile-nav-link {
          width: 100%; text-align: left;
          padding: 13px 16px; border-radius: 10px;
          background: none; border: none;
          color: #64748b; font-size: 15px; font-weight: 500; cursor: pointer;
          transition: all 0.15s;
        }
        .mobile-nav-link:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }
        .mobile-nav-active { color: #38bdf8; background: rgba(56,189,248,0.06); }
        .mobile-menu-footer {
          margin-top: 12px; padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
        }

        @media (max-width: 1024px) {
          .nav-links-desktop { display: none; }
          .nav-hamburger { display: flex; }
          .navbar { padding: 0 24px !important; }
        }
        @media (min-width: 1025px) {
          .nav-hamburger { display: none; }
        }
      `}</style>
    </>
  );
}
