"use client";
import { GitFork, Link2, Mail, Zap } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import ScrollToTop from "@/components/layout/ScrollToTop";

const navLinks = ["About","Skills","Experience","Projects","CP","Contact"];
const socials = [
  { label: "GitHub", href: personalInfo.social.github, icon: GitFork },
  { label: "LinkedIn", href: personalInfo.social.linkedin, icon: Link2 },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: "Codeforces", href: personalInfo.social.codeforces, icon: Zap },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #38bdf8, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>SR</div>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "18px" }}>Mahee<span style={{ color: "#38bdf8" }}>.</span></span>
            </div>
            <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.75, maxWidth: "280px", marginBottom: "20px" }}>
              Full-Stack Web Developer specializing in Next.js, TypeScript, Node.js and PostgreSQL. Building production-grade applications from Bangladesh.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label} className="footer-social-btn">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Navigation</div>
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">{link}</a>
            ))}
          </div>

          <div>
            <div className="footer-col-title">Built With</div>
            {["Next.js 15","TypeScript","Tailwind CSS","Framer Motion","GSAP","Lenis"].map(t => (
              <div key={t} style={{ fontSize: "12px", color: "#475569", fontFamily: "monospace", marginBottom: "8px" }}>{t}</div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>© {new Date().getFullYear()} Sabbir Rayhan Mahee. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>
              Built by <span style={{ color: "#38bdf8" }}>Sabbir Rayhan Mahee</span>
            </span>
            <ScrollToTop />
          </div>
        </div>
      </div>

      <style>{`
        .footer { border-top: 1px solid rgba(255,255,255,0.06); background: #050810; padding: 48px 0 32px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
        .footer-brand {}
        .footer-col-title { font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 3px; color: #334155; margin-bottom: 16px; }
        .footer-link { display: block; font-size: 13px; color: #475569; text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
        .footer-link:hover { color: #38bdf8; }
        .footer-social-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); color: #475569; text-decoration: none; transition: all 0.2s; }
        .footer-social-btn:hover { color: #38bdf8; border-color: rgba(56,189,248,0.3); }
        .footer-bottom { padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.04); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }

        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
