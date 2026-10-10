/**
 * Theme engine
 * ------------
 * Owns the site's colour theme. A theme is a set of RGB "triplet" CSS variables
 * (see src/lib/themes.ts) that globals.css turns into every colour on the page.
 *
 *  - Auto mode  : slowly cross-fades through all themes.
 *  - Fixed mode : visitor picked one theme; it is remembered in localStorage.
 *
 * Colours are blended in OKLab (perceptually even, no muddy mid-tones) and written
 * straight to <html> style, so every gradient, glow, border and the canvas background
 * fade together. Everything here is client-only and framework-free so it can drive
 * both React components and the canvas animation.
 */
import { THEMES, type RGB, type ThemeDef } from "./themes";

export const STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME_ID = THEMES[0].id;
export const THEME_EVENT = "portfolio:themechange";

/** how long each theme stays before auto mode moves on */
const DWELL_MS = 26000;
/** length of the colour cross-fade */
const TWEEN_MS = 2400;
/** first automatic change after the page loads */
const FIRST_DELAY_MS = 16000;
/** minimum time between style writes during a fade (~30 fps is plenty for slow colour changes) */
const FRAME_MS = 33;

export interface ThemeState {
  /** "auto" cycles themes, "fixed" holds the visitor's choice */
  mode: "auto" | "fixed";
  /** theme currently shown (or being faded towards) */
  themeId: string;
  /** visitor's system asks for less motion: auto-cycling is disabled */
  reducedMotion: boolean;
}

/* ───────────────────────── colour maths (OKLab) ───────────────────────── */

type Lab = [number, number, number];
const toLin = (c: number) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const toSrgb = (c: number) => {
  c = Math.max(0, Math.min(1, c));
  return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
};

function rgbToLab([r, g, b]: RGB): Lab {
  const lr = toLin(r), lg = toLin(g), lb = toLin(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function labToRgb([L, a, b]: Lab): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    Math.round(toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    Math.round(toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    Math.round(toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ];
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/* ───────────────────────────── engine state ───────────────────────────── */

const SERVER_STATE: ThemeState = { mode: "auto", themeId: DEFAULT_THEME_ID, reducedMotion: false };
let state: ThemeState = SERVER_STATE;
const listeners = new Set<() => void>();

const byId = (id: string): ThemeDef | undefined => THEMES.find(t => t.id === id);
const labCache = new Map<string, { vars: Record<string, Lab>; canvas: Lab[] }>();
function labsOf(theme: ThemeDef) {
  let hit = labCache.get(theme.id);
  if (!hit) {
    const vars: Record<string, Lab> = {};
    for (const k of Object.keys(theme.vars)) vars[k] = rgbToLab(theme.vars[k]);
    hit = { vars, canvas: theme.canvas.map(rgbToLab) };
    labCache.set(theme.id, hit);
  }
  return hit;
}

/** colours currently on screen (mid-fade values included), in OKLab */
let current: { vars: Record<string, Lab>; canvas: Lab[] } | null = null;
/** canvas palette as "r, g, b" strings, refreshed on every style write */
let canvasPalette: string[] = THEMES[0].canvas.map(c => c.join(", "));

let initialised = false;
let rafId = 0;
let timerId: ReturnType<typeof setTimeout> | undefined;
let holds = 0; // >0 while something (e.g. the open picker) asks auto mode to wait

function setState(next: Partial<ThemeState>) {
  state = { ...state, ...next };
  listeners.forEach(l => l());
}

export const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
export const getSnapshot = () => state;
export const getServerSnapshot = () => SERVER_STATE;
export const getCanvasPalette = () => canvasPalette;

/* ─────────────────────────────── applying ─────────────────────────────── */

function write(vars: Record<string, Lab>, canvas: Lab[], metaHex?: string) {
  const root = document.documentElement.style;
  for (const k in vars) {
    const [r, g, b] = labToRgb(vars[k]);
    root.setProperty(k, `${r} ${g} ${b}`);
  }
  canvasPalette = canvas.map(c => labToRgb(c).join(", "));
  if (metaHex) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", metaHex);
  }
}

function applyNow(theme: ThemeDef) {
  const t = labsOf(theme);
  current = { vars: { ...t.vars }, canvas: [...t.canvas] };
  write(t.vars, t.canvas, theme.meta);
  // lets a paused (reduced-motion) canvas repaint with the new colours
  window.dispatchEvent(new Event(THEME_EVENT));
}

function fadeTo(theme: ThemeDef, ms: number) {
  cancelAnimationFrame(rafId);
  if (!current || ms <= 0 || document.hidden) { applyNow(theme); return; }

  const from = { vars: { ...current.vars }, canvas: [...current.canvas] };
  const to = labsOf(theme);
  const keys = Object.keys(to.vars);
  const start = performance.now();
  let last = 0;

  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / ms);
    if (p < 1 && now - last < FRAME_MS) { rafId = requestAnimationFrame(frame); return; }
    last = now;
    const e = easeInOut(p);
    const mix = (a: Lab, b: Lab): Lab => [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e];
    const vars: Record<string, Lab> = {};
    for (const k of keys) vars[k] = mix(from.vars[k] ?? to.vars[k], to.vars[k]);
    const canvas = to.canvas.map((c, i) => mix(from.canvas[i] ?? c, c));
    current = { vars, canvas };
    if (p < 1) {
      write(vars, canvas);
      rafId = requestAnimationFrame(frame);
    } else {
      applyNow(theme);
    }
  };
  rafId = requestAnimationFrame(frame);
}

/* ───────────────────────────── auto cycling ───────────────────────────── */

const nextId = (id: string) => {
  const i = THEMES.findIndex(t => t.id === id);
  return THEMES[(i + 1) % THEMES.length].id;
};

function clearTimer() { if (timerId !== undefined) { clearTimeout(timerId); timerId = undefined; } }

function schedule(delay: number) {
  clearTimer();
  if (state.mode !== "auto" || state.reducedMotion) return;
  timerId = setTimeout(() => {
    timerId = undefined;
    if (state.mode !== "auto" || state.reducedMotion) return;
    // wait while the tab is hidden or the picker is open, then try again
    if (document.hidden || holds > 0) { schedule(2000); return; }
    const id = nextId(state.themeId);
    setState({ themeId: id });
    fadeTo(byId(id)!, TWEEN_MS);
    schedule(DWELL_MS + TWEEN_MS);
  }, delay);
}

/* ───────────────────────────── public actions ───────────────────────────── */

function store(value: string) { try { localStorage.setItem(STORAGE_KEY, value); } catch { /* storage may be blocked */ } }

/** visitor picked a specific theme */
export function selectTheme(id: string) {
  const theme = byId(id);
  if (!theme || !initialised) return;
  clearTimer();
  setState({ mode: "fixed", themeId: id });
  store(id);
  fadeTo(theme, state.reducedMotion ? 0 : 900);
}

/** visitor turned auto-cycling on */
export function enableAuto() {
  if (!initialised || state.reducedMotion) return;
  setState({ mode: "auto" });
  store("auto");
  // show something different straight away so the toggle feels responsive
  const id = nextId(state.themeId);
  setState({ themeId: id });
  fadeTo(byId(id)!, TWEEN_MS);
  schedule(DWELL_MS + TWEEN_MS);
}

/** ask auto mode to wait (picker open). Call with false to release. */
export function holdAuto(hold: boolean) {
  holds = Math.max(0, holds + (hold ? 1 : -1));
}

/** start the engine (idempotent, browser only) */
export function initThemeEngine() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let saved: string | null = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
  const savedTheme = saved && saved !== "auto" ? byId(saved) : undefined;

  const theme = savedTheme ?? THEMES[0];
  applyNow(theme); // matches what the inline boot script already painted
  setState({
    mode: savedTheme ? "fixed" : "auto",
    themeId: theme.id,
    reducedMotion: mq.matches,
  });

  mq.addEventListener("change", e => {
    setState({ reducedMotion: e.matches });
    if (e.matches) clearTimer(); else schedule(DWELL_MS);
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.mode === "auto" && !state.reducedMotion && timerId === undefined) schedule(DWELL_MS);
  });

  schedule(FIRST_DELAY_MS);
}

/* ─────────────────── helpers used by the layout's boot script ─────────────────── */

/** theme table in the compact shape the inline <head> script needs */
export function bootTable() {
  const out: Record<string, { v: Record<string, string>; m: string }> = {};
  for (const t of THEMES) {
    const v: Record<string, string> = {};
    for (const k of Object.keys(t.vars)) v[k] = t.vars[k].join(" ");
    out[t.id] = { v, m: t.meta };
  }
  return out;
}
