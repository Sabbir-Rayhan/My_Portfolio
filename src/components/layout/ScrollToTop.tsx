"use client";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" className="icon-btn" style={{ width: 36, height: 36 }}>
      <ArrowUp size={14} />
    </button>
  );
}
