"use client";
import { setLang, useLang, type Lang } from "@/lib/i18n";

const OPTIONS: { id: Lang; short: string; label: string; aria: string }[] = [
  { id: "en", short: "EN", label: "English", aria: "Switch language to English" },
  { id: "bn", short: "বাং", label: "বাংলা", aria: "ভাষা বাংলা করুন" },
];

/** Two-option segmented control. Always visible in the navbar (desktop + mobile). */
export default function LanguageSwitcher() {
  const lang = useLang();
  return (
    <div className="lang-switch" role="group" aria-label="Language / ভাষা">
      {OPTIONS.map(o => (
        <button
          key={o.id}
          type="button"
          lang={o.id}
          className={`lang-opt ${lang === o.id ? "lang-opt-active" : ""}`}
          aria-pressed={lang === o.id}
          aria-label={o.aria}
          title={o.label}
          onClick={() => setLang(o.id)}
        >
          {o.short}
        </button>
      ))}
    </div>
  );
}
