"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, RotateCcw, ArrowUpRight, Mail, Download, ArrowDown } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useData } from "@/data/useData";
import { FAQ, chatUi, isGreeting, matchFaq, type FaqAction } from "@/data/faq";
import Rich from "@/components/lang/Rich";

type Msg = {
  id: number;
  role: "user" | "bot";
  kind: "welcome" | "greet" | "faq" | "fallback" | "text";
  faqId?: string;
  text?: string;
};

const WELCOME: Msg = { id: 0, role: "bot", kind: "welcome" };
const TYPING_MS = 650;

export default function FaqChat() {
  const { lang, ui } = useData();
  const t = chatUi[lang];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const idRef = useRef(1);
  const timers = useRef<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced.current ? "auto" : "smooth" });
  }, [msgs, typing, open]);

  // Esc closes; focus the box on desktop (on phones that would pop the keyboard open)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); launcherRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const f = window.setTimeout(() => { if (window.innerWidth > 640) inputRef.current?.focus(); }, 280);
    return () => { document.removeEventListener("keydown", onKey); clearTimeout(f); };
  }, [open]);

  const ask = useCallback((text: string, faqId?: string) => {
    if (typing) return;
    const userMsg: Msg = { id: idRef.current++, role: "user", kind: faqId ? "faq" : "text", faqId, text: faqId ? undefined : text };
    let reply: Omit<Msg, "id">;
    if (faqId) reply = { role: "bot", kind: "faq", faqId };
    else if (isGreeting(text)) reply = { role: "bot", kind: "greet" };
    else {
      const hit = matchFaq(text);
      reply = hit ? { role: "bot", kind: "faq", faqId: hit } : { role: "bot", kind: "fallback" };
    }
    setMsgs(m => [...m, userMsg]);
    setTyping(true);
    const id = window.setTimeout(() => {
      setMsgs(m => [...m, { ...reply, id: idRef.current++ }]);
      setTyping(false);
    }, reduced.current ? 0 : TYPING_MS);
    timers.current.push(id);
  }, [typing]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    ask(text);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    idRef.current = 1;
    setTyping(false);
    setMsgs([WELCOME]);
    setDraft("");
  };

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (window.innerWidth <= 640) setOpen(false); // on phones the panel covers the page
  };

  const asked = new Set(msgs.filter(m => m.role === "bot" && m.kind === "faq").map(m => m.faqId));
  const chips = FAQ.filter(f => !asked.has(f.id));

  const renderAction = (a: FaqAction, i: number) => {
    if (a.kind === "scroll") {
      const label = a.label === "contactForm" ? t.contactForm : t.goTo(ui.nav[a.id]);
      return <button key={i} type="button" className="chat-act" onClick={() => goTo(a.id)}><ArrowDown size={13} /> {label}</button>;
    }
    if (a.kind === "email") return <a key={i} className="chat-act" href={`mailto:${personalInfo.email}`}><Mail size={13} /> {t.emailMe}</a>;
    if (a.kind === "resume") return <a key={i} className="chat-act" href={personalInfo.resumeUrl} download><Download size={13} /> {t.downloadResume}</a>;
    const href = a.site === "linkedin" ? personalInfo.social.linkedin : personalInfo.social.github;
    return <a key={i} className="chat-act" href={href} target="_blank" rel="noopener noreferrer">{a.site === "linkedin" ? "LinkedIn" : "GitHub"} <ArrowUpRight size={13} /></a>;
  };

  const renderBot = (m: Msg) => {
    if (m.kind === "welcome") return <Rich text={t.welcome} />;
    if (m.kind === "greet") return <Rich text={t.greet} />;
    if (m.kind === "fallback") {
      return (
        <>
          <Rich text={t.fallback} />
          <div className="chat-acts">{renderAction({ kind: "email" }, 0)}</div>
        </>
      );
    }
    const item = FAQ.find(f => f.id === m.faqId);
    if (!item) return null;
    return (
      <>
        <Rich text={item.a[lang].replace("{email}", personalInfo.email)} />
        {item.actions.length > 0 && <div className="chat-acts">{item.actions.map(renderAction)}</div>}
      </>
    );
  };

  const userText = (m: Msg) => (m.kind === "faq" ? FAQ.find(f => f.id === m.faqId)?.q[lang] : m.text);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            ref={launcherRef}
            type="button"
            className="chat-launcher"
            aria-label={t.open}
            aria-expanded={false}
            aria-haspopup="dialog"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(true)}
          >
            <span className="chat-launcher-ring" aria-hidden />
            <MessageCircle size={21} />
            <span className="chat-launcher-label">{t.launcher}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            className="chat-panel"
            role="dialog"
            aria-label={t.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="chat-head">
              <span className="chat-avatar chat-avatar-lg" aria-hidden>SR</span>
              <div className="chat-head-text">
                <div className="chat-title">{t.title}</div>
                <div className="chat-sub"><span className="status-dot" /> {t.sub}</div>
              </div>
              <button type="button" className="chat-icon" onClick={reset} aria-label={t.reset} title={t.reset}><RotateCcw size={15} /></button>
              <button type="button" className="chat-icon" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} aria-label={t.close} title={t.close}><X size={17} /></button>
            </header>

            <div ref={listRef} className="chat-list" data-lenis-prevent aria-live="polite" aria-relevant="additions">
              {msgs.map(m => (
                <div key={m.id} className={`chat-row ${m.role === "user" ? "chat-row-user" : "chat-row-bot"}`}>
                  {m.role === "bot" && <span className="chat-avatar" aria-hidden>SR</span>}
                  <div className="chat-bubble">{m.role === "bot" ? renderBot(m) : userText(m)}</div>
                </div>
              ))}
              {typing && (
                <div className="chat-row chat-row-bot" role="status" aria-label={t.typing}>
                  <span className="chat-avatar" aria-hidden>SR</span>
                  <div className="chat-bubble chat-typing" aria-hidden><span /><span /><span /></div>
                </div>
              )}
            </div>

            {chips.length > 0 && (
              <div className="chat-sugg" data-lenis-prevent role="group" aria-label={t.suggested}>
                {chips.map(f => (
                  <button key={f.id} type="button" className="chat-chip" disabled={typing} onClick={() => ask(f.q[lang], f.id)}>
                    {f.q[lang]}
                  </button>
                ))}
              </div>
            )}

            <form className="chat-form" onSubmit={submit}>
              <input
                ref={inputRef}
                className="chat-input"
                type="text"
                value={draft}
                maxLength={200}
                onChange={e => setDraft(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                autoComplete="off"
              />
              <button type="submit" className="chat-send" disabled={!draft.trim() || typing} aria-label={t.send}><Send size={17} /></button>
            </form>
            <p className="chat-note">{t.note}</p>
          </motion.section>
        )}
      </AnimatePresence>

      <style>{`
        .chat-launcher {
          position: fixed; right: 20px; bottom: 20px; z-index: 70;
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          height: 54px; min-width: 54px; padding: 0 20px 0 17px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14); cursor: pointer;
          background: var(--grad); color: rgb(var(--on-accent-rgb));
          font-family: var(--font-sans); font-size: 14.5px; font-weight: 600; line-height: 1;
          box-shadow: 0 18px 40px -14px rgb(var(--accent-rgb) / 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
          transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
        }
        .chat-launcher:hover { transform: translateY(-2px); box-shadow: 0 22px 46px -14px rgb(var(--accent-rgb) / 0.75), inset 0 1px 0 rgba(255,255,255,0.3); }
        .chat-launcher-ring {
          position: absolute; inset: -5px; border-radius: inherit; pointer-events: none;
          border: 1.5px solid rgb(var(--accent-rgb) / 0.55); animation: chat-pulse 2.8s ease-out infinite;
        }
        @keyframes chat-pulse { 0% { transform: scale(0.96); opacity: 0.9; } 70%, 100% { transform: scale(1.14); opacity: 0; } }

        .chat-panel {
          position: fixed; right: 20px; bottom: 20px; z-index: 71;
          width: 396px; height: min(640px, calc(100dvh - 40px));
          display: flex; flex-direction: column; overflow: hidden; border-radius: 24px;
          background: rgb(var(--surface-rgb) / 0.95);
          backdrop-filter: blur(22px) saturate(140%); -webkit-backdrop-filter: blur(22px) saturate(140%);
          border: 1px solid var(--line-strong);
          box-shadow: 0 40px 90px -24px rgba(0,0,0,0.75), 0 0 0 1px rgb(var(--accent-rgb) / 0.06);
        }
        .chat-head { display: flex; align-items: center; gap: 12px; padding: 14px 14px 14px 16px; border-bottom: 1px solid var(--line); background: rgb(var(--text-rgb) / 0.025); }
        .chat-head-text { flex: 1; min-width: 0; }
        .chat-title { font-size: 15.5px; font-weight: 600; color: var(--text); line-height: 1.3; }
        .chat-sub { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--muted); margin-top: 2px; }
        .chat-icon {
          width: 34px; height: 34px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; flex: none;
          border: 1px solid transparent; background: transparent; color: var(--muted); cursor: pointer; transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .chat-icon:hover { color: var(--text); background: rgb(var(--text-rgb) / 0.06); border-color: var(--line); }

        .chat-avatar {
          width: 26px; height: 26px; border-radius: 9px; flex: none; display: inline-flex; align-items: center; justify-content: center;
          background: var(--grad); color: rgb(var(--on-accent-rgb)); font-family: var(--font-sans); font-size: 10px; font-weight: 700;
        }
        .chat-avatar-lg { width: 40px; height: 40px; border-radius: 13px; font-size: 13.5px; }

        .chat-list { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 18px 14px 8px; display: flex; flex-direction: column; gap: 12px; }
        .chat-row { display: flex; align-items: flex-end; gap: 8px; animation: chat-in 0.38s cubic-bezier(0.16,1,0.3,1) both; }
        .chat-row-user { justify-content: flex-end; }
        @keyframes chat-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .chat-bubble { max-width: 86%; padding: 11px 15px; border-radius: 18px; font-size: 14.5px; line-height: 1.65; overflow-wrap: anywhere; }
        .chat-row-bot .chat-bubble { background: rgb(var(--text-rgb) / 0.06); border: 1px solid var(--line); color: var(--text-soft); border-bottom-left-radius: 6px; }
        .chat-row-bot .chat-bubble strong { color: var(--text); font-weight: 600; }
        .chat-row-user .chat-bubble { background: var(--grad); color: rgb(var(--on-accent-rgb)); font-weight: 500; border-bottom-right-radius: 6px; }

        .chat-acts { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
        .chat-act {
          display: inline-flex; align-items: center; gap: 6px; padding: 7px 13px; border-radius: 999px;
          border: 1px solid var(--accent-line); background: var(--accent-soft); color: var(--accent-strong);
          font-family: var(--font-sans); font-size: 13px; font-weight: 500; line-height: 1.2; text-decoration: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .chat-act:hover { transform: translateY(-1px); background: rgb(var(--accent-rgb) / 0.2); }

        .chat-typing { display: inline-flex; align-items: center; gap: 5px; padding: 14px 16px; }
        .chat-typing span { width: 7px; height: 7px; border-radius: 50%; background: var(--muted); animation: chat-dot 1.2s ease-in-out infinite; }
        .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes chat-dot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.45; } 30% { transform: translateY(-5px); opacity: 1; } }

        .chat-sugg { display: flex; gap: 8px; overflow-x: auto; padding: 8px 14px 12px; scrollbar-width: none; overscroll-behavior-x: contain; }
        .chat-sugg::-webkit-scrollbar { display: none; }
        .chat-chip {
          flex: none; white-space: nowrap; padding: 8px 14px; border-radius: 999px; cursor: pointer;
          border: 1px solid var(--line-strong); background: rgb(var(--text-rgb) / 0.03); color: var(--text-soft);
          font-family: var(--font-sans); font-size: 13px; line-height: 1.2; transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .chat-chip:hover:not(:disabled) { border-color: var(--accent-line); color: var(--accent-strong); background: var(--accent-soft); }
        .chat-chip:disabled { opacity: 0.5; cursor: default; }

        .chat-form { display: flex; align-items: center; gap: 8px; padding: 10px 14px 6px; border-top: 1px solid var(--line); }
        .chat-input {
          flex: 1; min-width: 0; height: 44px; padding: 0 16px; border-radius: 999px;
          border: 1px solid var(--line-strong); background: rgb(var(--text-rgb) / 0.05); color: var(--text);
          font-family: var(--font-sans); font-size: 15px; outline: none; transition: border-color 0.2s, background 0.2s;
        }
        .chat-input::placeholder { color: var(--subtle); }
        .chat-input:focus { border-color: var(--accent-line); background: rgb(var(--text-rgb) / 0.07); }
        .chat-send {
          width: 44px; height: 44px; border-radius: 50%; flex: none; display: inline-flex; align-items: center; justify-content: center;
          border: none; cursor: pointer; background: var(--grad); color: rgb(var(--on-accent-rgb)); transition: opacity 0.2s, transform 0.2s;
        }
        .chat-send:hover:not(:disabled) { transform: scale(1.06); }
        .chat-send:disabled { opacity: 0.4; cursor: default; }
        .chat-note { margin: 0; padding: 4px 16px 12px; text-align: center; font-size: 11.5px; line-height: 1.5; color: var(--subtle); }

        @media (max-width: 640px) {
          .chat-launcher { right: 14px; bottom: 14px; width: 54px; padding: 0; }
          .chat-launcher-label { display: none; }
          .chat-panel { right: 10px; left: 10px; bottom: 10px; width: auto; height: min(84dvh, 680px); border-radius: 22px; }
          .chat-input { font-size: 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-row, .chat-launcher-ring { animation: none; }
          .chat-launcher-ring { display: none; }
          .chat-typing span { animation: none; opacity: 0.7; }
        }
      `}</style>
    </>
  );
}
