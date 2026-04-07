"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, GitFork, Link2, Mail, MapPin, Copy, Check, Zap, MessageSquare } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => { navigator.clipboard.writeText(personalInfo.email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false); setSent(true); setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#e2e8f0", fontSize: "13px", fontFamily: "monospace", outline: "none", transition: "border-color 0.2s" };

  return (
    <section id="contact" style={{ padding: "96px 0", background: "#080d1a", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div ref={ref} style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "24px", height: "1px", background: "#38bdf8" }} />
          <span style={{ color: "#38bdf8", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px" }}>06 — Contact</span>
        </div>
        <h2 style={{ fontSize: "clamp(32px,5vw,50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", marginBottom: "16px" }}>
          Let's build something{" "}
          <span className="gradient-text">great together</span>
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", lineHeight: 1.8, marginBottom: "48px" }}>
          I'm currently open to new opportunities — full-time roles, internships, freelance projects, or just a good conversation. My inbox is always open.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "48px" }}>
          {/* Form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#475569", marginBottom: "8px" }}>Your Name</label>
                <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={e => (e.target.style.borderColor = "rgba(56,189,248,0.5)")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#475569", marginBottom: "8px" }}>Email</label>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={e => (e.target.style.borderColor = "rgba(56,189,248,0.5)")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "2px", color: "#475569", marginBottom: "8px" }}>Message</label>
              <textarea required rows={6} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} onFocus={e => (e.target.style.borderColor = "rgba(56,189,248,0.5)")} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
            <button type="submit" disabled={sending || sent}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "13px 26px", borderRadius: "10px", background: sent ? "#34d399" : "#38bdf8", color: "#0f172a", fontWeight: 700, fontSize: "13px", border: "none", cursor: "pointer", width: "fit-content", transition: "all 0.2s", opacity: sending ? 0.7 : 1 }}>
              {sent ? <><Check size={15} /> Sent!</> : sending ? <><div style={{ width: "14px", height: "14px", border: "2px solid rgba(15,23,42,0.3)", borderTopColor: "#0f172a", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />Sending...</> : <><Send size={15} /> Send Message</>}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Email card */}
            <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={14} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Direct email</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{personalInfo.email}</div>
                </div>
              </div>
              <button onClick={copyEmail} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", background: "none", color: copied ? "#34d399" : "#64748b", fontSize: "11px", fontFamily: "monospace", cursor: "pointer", transition: "all 0.2s" }}>
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            {/* Location */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={14} color="#34d399" />
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Based in</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>{personalInfo.location}</div>
              </div>
            </div>

            {/* Availability */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 18px", borderRadius: "12px", background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399" }} className="pulse-dot" />
              <span style={{ fontSize: "13px", color: "#34d399", fontWeight: 500 }}>Open to opportunities</span>
            </div>

            {/* Socials */}
            <div>
              <div style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px", color: "#334155", marginBottom: "10px" }}>Find me online</div>
              {[
                { label: "GitHub", handle: "Sabbir-Rayhan", href: personalInfo.social.github, icon: GitFork },
                { label: "LinkedIn", handle: "s-r-mahee", href: personalInfo.social.linkedin, icon: Link2 },
                { label: "Codeforces", handle: "S.R_Mahee", href: personalInfo.social.codeforces, icon: Zap },
              ].map(({ label, handle, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textDecoration: "none", marginBottom: "8px", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.color = "#38bdf8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={15} color="#475569" />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>{label}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>@{handle}</span>
                </a>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px", borderRadius: "10px", border: "1px dashed rgba(255,255,255,0.06)" }}>
              <MessageSquare size={14} color="#334155" style={{ marginTop: "2px", flexShrink: 0 }} />
              <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.7, fontStyle: "italic", fontFamily: "Georgia, serif" }}>
                I typically respond within 24–48 hours. For urgent matters, reach out directly via email or LinkedIn.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
