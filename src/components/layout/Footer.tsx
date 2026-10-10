"use client";
import { GitFork, Link2, Mail, Code2, MapPin } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import ScrollToTop from "@/components/layout/ScrollToTop";

const navLinks = ["About", "Skills", "Experience", "Research", "Projects", "CP", "Contact"];
const socials = [
  { label: "GitHub", href: personalInfo.social.github, icon: GitFork },
  { label: "LinkedIn", href: personalInfo.social.linkedin, icon: Link2 },
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
  { label: "Codeforces", href: personalInfo.social.codeforces, icon: Code2 },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-cta">
          <h2 className="footer-cta-title">Have an idea? <em>Let&apos;s talk.</em></h2>
          <a href={`mailto:${personalInfo.email}`} className="btn btn-primary"><Mail size={15} /> {personalInfo.email}</a>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-mark">SR</span>
              <span>Mahee<span style={{ color: "var(--sand)" }}>.</span></span>
            </div>
            <p className="footer-bio">
              Software engineer building production-grade web applications with Next.js, TypeScript, Node.js and PostgreSQL — and applying deep learning to real-world problems.
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label} className="icon-btn">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-label">Navigation</div>
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">{link}</a>
            ))}
          </div>

          <div>
            <div className="footer-col-label">Built with</div>
            {["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Lenis"].map(t => (
              <div key={t} className="footer-tech">{t}</div>
            ))}
          </div>

          <div>
            <div className="footer-col-label">Get in touch</div>
            <a href={`mailto:${personalInfo.email}`} className="footer-link footer-email">{personalInfo.email}</a>
            <p className="footer-tech" style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={13} /> {personalInfo.location}</p>
            <div className="footer-avail"><span className="status-dot" /> Open to opportunities</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sabbir Rayhan Mahee. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span>Designed &amp; developed by <span style={{ color: "var(--text-soft)" }}>Sabbir Rayhan Mahee</span></span>
            <ScrollToTop />
          </div>
        </div>
      </div>

      <style>{`
        .footer { position: relative; border-top: 1px solid var(--line); overflow: hidden; }
        .footer::before { content: ""; position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 900px; height: 400px; border-radius: 50%; background: rgb(var(--accent-rgb) / 0.06); filter: blur(90px); pointer-events: none; }
        .footer-cta { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; padding: 72px 0 56px; border-bottom: 1px solid var(--line); }
        .footer-cta-title { font-family: var(--font-serif); font-size: clamp(30px, 4vw, 46px); font-weight: 350; letter-spacing: -0.02em; color: var(--text); margin: 0; }
        .footer-cta-title em { font-style: italic; padding-right: 0.06em; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent; }
        .footer-grid { position: relative; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.3fr; gap: 48px; padding: 56px 0 48px; }
        .footer-logo { display: flex; align-items: center; gap: 11px; margin-bottom: 18px; font-family: var(--font-serif); font-size: 21px; color: var(--text); }
        .footer-mark { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: var(--font-sans); font-size: 13.5px; font-weight: 700; letter-spacing: 0.02em; color: rgb(var(--on-accent-rgb)); background: var(--grad); box-shadow: inset 0 1px 0 rgba(255,255,255,0.35); }
        .footer-bio { color: var(--muted); font-size: 14.5px; line-height: 1.75; margin: 0 0 22px; max-width: 320px; }
        .footer-socials { display: flex; gap: 8px; }
        .footer-col-label { font-size: 12px; font-family: var(--font-mono); letter-spacing: 0.16em; text-transform: uppercase; color: var(--subtle); margin-bottom: 18px; }
        .footer-link { display: block; width: fit-content; font-size: 14.5px; color: var(--text-soft); text-decoration: none; margin-bottom: 11px; transition: color 0.2s; }
        .footer-link:hover { color: var(--accent-strong); }
        .footer-email { overflow-wrap: anywhere; }
        .footer-tech { font-size: 14.5px; color: var(--muted); margin: 0 0 11px; }
        .footer-avail { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--accent-strong); }
        .footer-bottom { position: relative; padding: 24px 0 32px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--subtle); }

        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } .footer-brand { grid-column: 1 / -1; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr; } .footer-bottom { flex-direction: column; align-items: flex-start; } .footer-cta .btn { width: 100%; } }
      `}</style>
    </footer>
  );
}
