"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, GitFork, Link2, Mail, MapPin, Copy, Check, Code2, ArrowUpRight, AlertCircle } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const sending = status === "sending";
  const sent = status === "sent";
  const ease = [0.16, 1, 0.3, 1] as const;

  const copyEmail = () => { navigator.clipboard.writeText(personalInfo.email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const mailtoFallback = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`)}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return;
    setStatus("sending"); setErrorMsg("");
    const subject = `New portfolio message from ${form.name}`;
    try {
      const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      const res = web3Key
        ? await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ access_key: web3Key, subject, from_name: "SR Mahee Portfolio", name: form.name, email: form.email, message: form.message }),
          })
        : await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ name: form.name, email: form.email, message: form.message, _subject: subject, _template: "table", _captcha: "false" }),
          });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && (data.success === true || data.success === "true");
      if (!ok) throw new Error(typeof data.message === "string" ? data.message : "Request failed");
      setStatus("sent"); setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setErrorMsg("Your message couldn't be sent right now.");
    }
  };

  const socials = [
    { label: "GitHub", handle: "Sabbir-Rayhan", href: personalInfo.social.github, icon: GitFork },
    { label: "LinkedIn", handle: "s-r-mahee", href: personalInfo.social.linkedin, icon: Link2 },
    { label: "Codeforces", handle: "S.R_Mahee", href: personalInfo.social.codeforces, icon: Code2 },
  ];

  return (
    <section id="contact" className="section section-alt">
      <div ref={ref} className="section-container">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-num">07</span> Contact</div>
          <h2 className="section-h2">Let&apos;s build something <em>great together</em></h2>
          <p className="section-sub">
            I&apos;m currently open to new opportunities — full-time roles, internships, freelance projects, or just a good conversation. My inbox is always open.
          </p>
        </div>

        <div className="contact-layout">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className="card contact-form">
            <div className="form-row">
              <label className="form-group">
                <span className="form-label">Your name</span>
                <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="form-input" />
              </label>
              <label className="form-group">
                <span className="form-label">Email</span>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="form-input" />
              </label>
            </div>
            <label className="form-group">
              <span className="form-label">Message</span>
              <textarea required rows={6} placeholder="Tell me about your project or opportunity…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="form-input form-textarea" />
            </label>
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={e => setHoney(e.target.value)} className="form-honey" aria-hidden />
            <div className="form-foot">
              <button type="submit" disabled={sending || sent} className="btn btn-primary form-submit">
                {sent ? <><Check size={16} /> Message sent</> : sending ? <><span className="spinner" /> Sending…</> : <><Send size={15} /> Send message</>}
              </button>
              <div role="status" aria-live="polite" className="form-status">
                {sent && <span className="form-ok"><Check size={14} /> Thanks! I&apos;ll get back to you within 24–48 hours.</span>}
                {status === "error" && (
                  <span className="form-err">
                    <AlertCircle size={14} /> {errorMsg} <a href={mailtoFallback}>Send via your email app instead</a>.
                  </span>
                )}
              </div>
            </div>
          </motion.form>

          <motion.aside initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.12, ease }} className="contact-info">
            <div className="card contact-email">
              <div className="contact-email-row">
                <div className="contact-icon"><Mail size={16} /></div>
                <div style={{ minWidth: 0 }}>
                  <div className="contact-k">Direct email</div>
                  <a href={`mailto:${personalInfo.email}`} className="contact-v contact-mail">{personalInfo.email}</a>
                </div>
              </div>
              <button onClick={copyEmail} className="btn btn-ghost btn-sm" style={{ width: "100%" }}>
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied to clipboard" : "Copy email"}
              </button>
            </div>

            <div className="contact-meta">
              <div className="contact-icon"><MapPin size={16} /></div>
              <div>
                <div className="contact-k">Based in</div>
                <div className="contact-v">{personalInfo.location}</div>
              </div>
            </div>

            <div className="contact-avail">
              <span className="status-dot" />
              <span>Open to opportunities · replies within 24–48h</span>
            </div>

            <div className="contact-socials">
              {socials.map(({ label, handle, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-social">
                  <span className="contact-social-left"><Icon size={15} /> {label}</span>
                  <span className="contact-social-right mono">@{handle} <ArrowUpRight size={13} /></span>
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      <style>{`
        .contact-layout { display: grid; grid-template-columns: 1fr 380px; gap: 20px; align-items: start; }
        .contact-form { padding: 36px; display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-label { font-size: 13px; color: var(--text-soft); font-weight: 500; }
        .form-input {
          padding: 14px 16px; border-radius: var(--radius-sm); width: 100%;
          background: rgba(13,16,18,0.6); border: 1px solid var(--line-strong);
          color: var(--text); font-size: 15px; font-family: var(--font-sans); outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .form-input::placeholder { color: var(--subtle); }
        .form-input:focus { border-color: var(--accent-line); box-shadow: 0 0 0 4px rgba(140,192,168,0.1); background: rgba(13,16,18,0.85); }
        .form-textarea { resize: vertical; min-height: 150px; line-height: 1.6; }
        .form-submit { align-self: flex-start; flex-shrink: 0; }
        .form-foot { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .form-status { font-size: 13.5px; line-height: 1.5; }
        .form-ok, .form-err { display: inline-flex; align-items: flex-start; gap: 8px; }
        .form-ok { color: var(--accent-strong); }
        .form-err { color: #e8a3ab; display: inline; }
        .form-err svg { display: inline-block; vertical-align: -2px; margin-right: 6px; }
        .form-err a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; }
        .form-honey { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
        .spinner { width: 14px; height: 14px; border: 2px solid rgba(13,23,20,0.3); border-top-color: #0d1714; border-radius: 50%; animation: spin 0.8s linear infinite; }

        .contact-info { display: flex; flex-direction: column; gap: 12px; }
        .contact-email { padding: 22px; display: flex; flex-direction: column; gap: 18px; }
        .contact-email-row { display: flex; align-items: center; gap: 14px; }
        .contact-icon { width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--accent-strong); background: var(--accent-soft); }
        .contact-k { font-size: 12px; color: var(--subtle); }
        .contact-v { font-size: 14.5px; color: var(--text-soft); }
        .contact-mail { text-decoration: none; overflow-wrap: anywhere; transition: color 0.2s; }
        .contact-mail:hover { color: var(--accent-strong); }
        .contact-meta { display: flex; align-items: center; gap: 14px; padding: 18px 22px; border-radius: var(--radius); border: 1px solid var(--line); background: rgba(255,255,255,0.015); }
        .contact-avail { display: flex; align-items: center; gap: 12px; padding: 16px 22px; border-radius: var(--radius); border: 1px solid var(--accent-line); background: var(--accent-soft); color: var(--accent-strong); font-size: 13.5px; }
        .contact-socials { display: flex; flex-direction: column; border-radius: var(--radius); border: 1px solid var(--line); overflow: hidden; }
        .contact-social { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 22px; text-decoration: none; transition: background 0.2s; }
        .contact-social + .contact-social { border-top: 1px solid var(--line); }
        .contact-social:hover { background: rgba(255,255,255,0.025); }
        .contact-social-left { display: inline-flex; align-items: center; gap: 12px; font-size: 14.5px; color: var(--text-soft); }
        .contact-social-right { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--subtle); transition: color 0.2s; }
        .contact-social:hover .contact-social-right { color: var(--accent-strong); }

        @media (max-width: 960px) { .contact-layout { grid-template-columns: 1fr; } }
        @media (max-width: 520px) { .form-row { grid-template-columns: 1fr; } .contact-form { padding: 24px; } }
      `}</style>
    </section>
  );
}
