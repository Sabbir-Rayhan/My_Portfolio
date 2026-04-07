"use client";
import { GitFork, Link2, Mail, Zap, ArrowUp } from "lucide-react";
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
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#050810" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "linear-gradient(135deg, #38bdf8, #818cf8)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "13px", fontFamily: "monospace" }}>SR</div>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "18px" }}>Mahee<span style={{ color: "#38bdf8" }}>.</span></span>
            </div>
            <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.75, maxWidth: "300px", marginBottom: "20px" }}>
              Full-Stack Web Developer specializing in Next.js, TypeScript, Node.js and PostgreSQL. Building production-grade applications from Bangladesh.
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              {socials.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label}
                  style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", color: "#475569", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px", color: "#334155", marginBottom: "16px" }}>Navigation</div>
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                style={{ display: "block", fontSize: "13px", color: "#475569", textDecoration: "none", marginBottom: "8px", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}>
                {link}
              </a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px", color: "#334155", marginBottom: "16px" }}>Built With</div>
            {["Next.js 15","TypeScript","Tailwind CSS","Framer Motion","GSAP","Lenis"].map(t => (
              <div key={t} style={{ fontSize: "12px", color: "#475569", fontFamily: "monospace", marginBottom: "8px" }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>© {new Date().getFullYear()} Sabbir Rayhan Mahee. All rights reserved.</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>Designed & built by <span style={{ color: "#38bdf8" }}>Sabbir Rayhan Mahee</span></span>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
