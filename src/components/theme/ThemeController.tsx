"use client";
import { useEffect } from "react";
import { initThemeEngine } from "@/lib/themeEngine";

/** Starts the colour-theme engine once the page has loaded. Renders nothing. */
export default function ThemeController() {
  useEffect(() => { initThemeEngine(); }, []);
  return null;
}
