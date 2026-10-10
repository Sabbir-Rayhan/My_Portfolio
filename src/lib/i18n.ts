"use client";
import { useSyncExternalStore } from "react";

export type Lang = "en" | "bn";
export const LANG_KEY = "portfolio-lang";
export const DEFAULT_LANG: Lang = "en";

let current: Lang = DEFAULT_LANG;
let initialised = false;
const listeners = new Set<() => void>();

function apply(lang: Lang) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.lang = lang;
  el.classList.toggle("lang-bn", lang === "bn");
}

function emit() {
  listeners.forEach(l => l());
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
export const getSnapshot = (): Lang => current;
// The server (and the first client render) is always English, so SEO and hydration stay stable.
export const getServerSnapshot = (): Lang => DEFAULT_LANG;

/** Called once after hydration: restore the visitor's saved language. */
export function initLang() {
  if (initialised) return;
  initialised = true;
  let saved: string | null = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch { /* storage blocked */ }
  if (saved === "bn" || saved === "en") {
    current = saved;
    apply(current);
    emit();
  }
}

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
  apply(lang);
  emit();
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Split into user-perceived characters so Bangla conjuncts never get cut in half while typing. */
export function graphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new (Intl as unknown as { Segmenter: new (l?: string, o?: { granularity: string }) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter("bn", { granularity: "grapheme" });
    return Array.from(seg.segment(text), s => s.segment);
  }
  return Array.from(text);
}
