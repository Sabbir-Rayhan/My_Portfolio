"use client";
import { useEffect } from "react";
import { initLang } from "@/lib/i18n";

/** Restores the saved language after hydration (renders nothing). */
export default function LanguageController() {
  useEffect(() => { initLang(); }, []);
  return null;
}
