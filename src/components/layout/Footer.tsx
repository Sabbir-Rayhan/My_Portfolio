"use client";
import { GitFork, Link2, Mail, Zap, ArrowUp, Heart } from "lucide-react";
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
      {/* Top wave decoration */}
      <div className="footer-top-line" />

      <div className="section-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <div className="footer-logo-box">SR</div>
              <span>Mahee<span style={{ color: "#38bdf8" }}>.</span></span>
            </div>
            <p className="footer-bio">
              Full-Stack Web Developer specializing in Next.js, TypeScript, Node.js and PostgreSQL. Building production-grade applications from Bangladesh 🇧🇩
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social"
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "#38bdf8";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(56,189,248,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(56,189,248,0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "#475569";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-label">Navigation</div>
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="footer-link"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#38bdf8"; (e.currentTarget as HTMLElement).style.paddingLeft = "4px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#475569"; (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Tech stack */}
          <div>
            <div className="footer-col-label">Built With</div>
            {["Next.js 15","TypeScript","Tailwind CSS","Framer Motion","GSAP","Lenis"].map(t => (
              <div key={t} className="footer-tech">{t}</div>
            ))}
          </div>

          {/* Contact quick */}
          <div>
            <div className="footer-col-label">Get In Touch</div>
            <a href={`mailto:${personalInfo.email}`} className="footer-email-quick">{personalInfo.email}</a>
            <p className="footer-location">📍 {personalInfo.location}</p>
            <div className="footer-avail">
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block", marginRight: "7px", flexShrink: 0 }} className="pulse-dot" />
              Open to opportunities
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#334155", fontFamily: "monospace" }}>
            <span>© {new Date().getFullYear()} Sabbir Rayhan Mahee</span>
            <span style={{ color: "#1e293b" }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              All rights reserved
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "11px", color: "#1e293b", fontFamily: "monospace" }}>
              Designed & Developed by <span style={{ color: "#38bdf8" }}>Sabbir Rayhan Mahee</span>
            </span>
            <ScrollToTop />
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: #050810;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; transform: translateX(-50%);
          width: 600px; height: 200px;
          background: rgba(56,189,248,0.02);
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .footer-top-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56,189,248,0.3), rgba(129,140,248,0.3), transparent);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.4fr;
          gap: 48px;
          padding: 48px 0 40px;
        }
        .footer-brand-col {}
        .footer-logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
          font-weight: 700; font-size: 18px; color: #e2e8f0;
        }
        .footer-logo-box {
          width: 36px; height: 36px; border-radius: 9px;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          display: flex; align-items: center; justify-content: center;
          color: white; font-weight: 800; font-size: 12px; font-family: monospace;
        }
        .footer-bio {
          color: #475569; font-size: 13px; line-height: 1.75;
          margin-bottom: 20px; max-width: 280px;
        }
        .footer-socials { display: flex; gap: 8px; }
        .footer-social {
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          color: #475569; text-decoration: none;
          transition: all 0.25s;
        }
        .footer-col-label {
          font-size: 10px; font-family: monospace;
          text-transform: uppercase; letter-spacing: 3px;
          color: #94a3b8; margin-bottom: 16px; font-weight: 600;
        }
        .footer-link {
          display: block; font-size: 13px; color: #475569;
          text-decoration: none; margin-bottom: 10px;
          transition: all 0.2s;
        }
        .footer-tech {
          font-size: 12px; color: #475569; font-family: monospace;
          margin-bottom: 9px; padding-left: 0;
        }
        .footer-email-quick {
          display: block; font-size: 12px; color: #38bdf8;
          text-decoration: none; margin-bottom: 10px; font-family: monospace;
          transition: opacity 0.2s;
          word-break: break-all;
        }
        .footer-email-quick:hover { opacity: 0.7; }
        .footer-location { font-size: 12px; color: #475569; margin-bottom: 12px; }
        .footer-avail {
          display: flex; align-items: center;
          font-size: 12px; color: #34d399; font-weight: 500;
        }
        .footer-bottom {
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 12px;
        }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-brand-col { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
