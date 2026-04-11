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

  return (
    <section id="contact" className="contact-section">
      <div ref={ref} className="section-container">
        <div className="section-label-row">
          <div className="section-label-line" style={{ background: "#38bdf8" }} />
          <span className="section-label" style={{ color: "#38bdf8" }}>06 — Contact</span>
        </div>
        <h2 className="section-h2">Let&apos;s build something <span className="gradient-text">great together</span></h2>
        <p className="contact-intro">I&apos;m currently open to new opportunities — full-time roles, internships, freelance projects, or just a good conversation. My inbox is always open.</p>

        <div className="contact-layout">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea required rows={6} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="form-input form-textarea" />
            </div>
            <button type="submit" disabled={sending || sent} className="form-submit">
              {sent ? <><Check size={15} /> Sent!</> : sending ? <><div className="spinner" /> Sending...</> : <><Send size={15} /> Send Message</>}
            </button>
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="contact-info">
            <div className="contact-email-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Mail size={14} color="#38bdf8" />
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Direct email</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>{personalInfo.email}</div>
                </div>
              </div>
              <button onClick={copyEmail} className="copy-btn">
                {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? "Copied!" : "Copy email"}
              </button>
            </div>

            <div className="contact-meta-row">
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={14} color="#34d399" />
              </div>
              <div>
                <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "1px" }}>Based in</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>{personalInfo.location}</div>
              </div>
            </div>

            <div className="contact-avail">
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399" }} className="pulse-dot" />
              <span style={{ fontSize: "13px", color: "#34d399", fontWeight: 500 }}>Open to opportunities</span>
            </div>

            <div>
              <div className="socials-label">Find me online</div>
              {[
                { label: "GitHub", handle: "Sabbir-Rayhan", href: personalInfo.social.github, icon: GitFork },
                { label: "LinkedIn", handle: "s-r-mahee", href: personalInfo.social.linkedin, icon: Link2 },
                { label: "Codeforces", handle: "S.R_Mahee", href: personalInfo.social.codeforces, icon: Zap },
              ].map(({ label, handle, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-row">
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Icon size={15} color="#475569" />
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#94a3b8" }}>{label}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#334155", fontFamily: "monospace" }}>@{handle}</span>
                </a>
              ))}
            </div>

            <div className="contact-note">
              <MessageSquare size={14} color="#334155" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: "12px", color: "#334155", lineHeight: 1.7, fontStyle: "italic", fontFamily: "Georgia,serif" }}>
                I typically respond within 24–48 hours. For urgent matters, reach out via email or LinkedIn.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section { padding: 96px 0; background: #080d1a; border-top: 1px solid rgba(255,255,255,0.04); }
        .contact-intro { color: #64748b; font-size: 15px; max-width: 480px; line-height: 1.8; margin-bottom: 48px; }
        .contact-layout { display: grid; grid-template-columns: 1fr 340px; gap: 48px; }
        .contact-form { display: flex; flex-direction: column; gap: 16px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .form-group { display: flex; flex-direction: column; }
        .form-label { font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; color: #475569; margin-bottom: 8px; }
        .form-input { padding: 12px 16px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #e2e8f0; font-size: 13px; font-family: monospace; outline: none; transition: border-color 0.2s; width: 100%; }
        .form-input:focus { border-color: rgba(56,189,248,0.5); }
        .form-textarea { resize: none; }
        .form-submit { display: flex; align-items: center; gap: 8px; padding: 13px 26px; border-radius: 10px; background: #38bdf8; color: #0f172a; font-weight: 700; font-size: 13px; border: none; cursor: pointer; width: fit-content; transition: all 0.2s; }
        .form-submit:hover { background: #7dd3fc; }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner { width: 14px; height: 14px; border: 2px solid rgba(15,23,42,0.3); border-top-color: #0f172a; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-info { display: flex; flex-direction: column; gap: 12px; }
        .contact-email-card { padding: 18px; border-radius: 14px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .copy-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; background: none; color: #64748b; font-size: 11px; font-family: monospace; cursor: pointer; transition: all 0.2s; }
        .copy-btn:hover { color: #38bdf8; border-color: rgba(56,189,248,0.3); }
        .contact-meta-row { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); }
        .contact-avail { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; background: rgba(52,211,153,0.05); border: 1px solid rgba(52,211,153,0.15); }
        .socials-label { font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 3px; color: #334155; margin-bottom: 10px; }
        .social-row { display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-radius: 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); text-decoration: none; margin-bottom: 8px; transition: all 0.2s; }
        .social-row:hover { border-color: rgba(56,189,248,0.3); }
        .contact-note { display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 10px; border: 1px dashed rgba(255,255,255,0.06); }

        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr; }
          .contact-info { order: -1; }
        }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
