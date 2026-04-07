"use client";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] text-slate-500 hover:text-sky-400 hover:border-sky-400/30 transition-all"
    >
      <ArrowUp size={14} />
    </button>
  );
}
