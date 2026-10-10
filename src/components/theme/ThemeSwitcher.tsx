"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES } from "@/lib/themes";
import {
  subscribe, getSnapshot, getServerSnapshot,
  selectTheme, enableAuto, holdAuto,
} from "@/lib/themeEngine";

function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Swatches + auto-cycle switch. Used inside the desktop popover and the mobile menu. */
export function ThemePanel({ compact = false }: { compact?: boolean }) {
  const { mode, themeId, reducedMotion } = useTheme();
  return (
    <div className={`theme-panel ${compact ? "theme-panel-compact" : ""}`}>
      <div className="theme-swatches" role="group" aria-label="Colour theme">
        {THEMES.map(t => {
          const active = mode === "fixed" && themeId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={`theme-swatch ${active ? "theme-swatch-active" : ""}`}
              aria-pressed={active}
              aria-label={`${t.name} theme`}
              onClick={() => selectTheme(t.id)}
              style={{ ["--sw-a" as string]: t.swatch[0], ["--sw-b" as string]: t.swatch[1], ["--sw-c" as string]: t.swatch[2] }}
            >
              <span className="theme-dot">{active && <Check size={13} strokeWidth={3} />}</span>
              <span className="theme-swatch-name">{t.name}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={mode === "auto"}
        disabled={reducedMotion}
        className="theme-auto"
        onClick={() => (mode === "auto" ? selectTheme(themeId) : enableAuto())}
      >
        <span className="theme-auto-text">
          <span className="theme-auto-title">Auto-cycle colours</span>
          <span className="theme-auto-sub">
            {reducedMotion ? "Off because reduced motion is on" : mode === "auto" ? "Slowly shifts every ~15 s" : "Currently holding your choice"}
          </span>
        </span>
        <span className="theme-switch" aria-hidden><span className="theme-switch-knob" /></span>
      </button>
    </div>
  );
}

/** Navbar button that opens the picker. */
export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    holdAuto(true); // don't change colours under the visitor's cursor
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      holdAuto(false);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="theme-switcher" ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className="icon-btn theme-trigger"
        aria-label="Change colour theme"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="theme-trigger-ring" aria-hidden />
        <Palette size={16} />
      </button>

      {open && (
        <div className="theme-pop" role="dialog" aria-label="Colour theme">
          <p className="theme-pop-title mono">Colour theme</p>
          <ThemePanel />
        </div>
      )}
    </div>
  );
}
