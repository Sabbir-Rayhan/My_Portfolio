"use client";
import { useMemo } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { uiEn, uiBn, type UI } from "@/data/ui";
import {
  personalInfo, skills, research, projects, experience, competitiveProgramming, education, stats,
} from "@/data/portfolio";
import {
  bnPersonal, bnStats, bnStatValues, bnSkillCategories, bnSkillItems, bnResearch, bnProjects,
  bnExperience, bnEducation, bnCP,
} from "@/data/portfolio.bn";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Format a number for the active language (Bangla digits in Bangla mode). */
export function formatNumber(n: number | string, lang: Lang): string {
  const s = String(n);
  return lang === "bn" ? s.replace(/\d/g, d => bnDigits[Number(d)]) : s;
}

function buildEn() {
  return {
    ui: uiEn,
    personalInfo,
    skills: skills.map(g => ({ ...g, label: g.category })),
    research,
    projects,
    experience,
    competitiveProgramming,
    education,
    stats,
  };
}

function buildBn() {
  return {
    ui: uiBn,
    personalInfo: { ...personalInfo, ...bnPersonal },
    skills: skills.map(g => ({
      ...g,
      label: bnSkillCategories[g.category] ?? g.category,
      items: g.items.map(i => bnSkillItems[i] ?? i),
    })),
    research: research.map(r => {
      const b = bnResearch[r.id];
      if (!b) return r;
      return {
        ...r,
        type: b.type, status: b.status, title: b.title, summary: b.summary, highlights: b.highlights,
        metrics: r.metrics.map((m, i) => ({ label: b.metrics[i] ?? m.label, value: b.metricValues[i] ?? m.value })),
        meta: b.meta, liveLabel: b.liveLabel, sourceLabel: b.sourceLabel,
      };
    }),
    projects: projects.map(p => {
      const b = bnProjects[p.id];
      return b ? { ...p, ...b, title: b.title ?? p.title } : p;
    }),
    experience: experience.map(e => {
      const b = bnExperience[e.id];
      return b ? { ...e, ...b } : e;
    }),
    competitiveProgramming: {
      ...competitiveProgramming,
      totalSolved: bnCP.totalSolved,
      platforms: competitiveProgramming.platforms.map((p, i) => ({
        ...p,
        name: i === 2 ? bnCP.othersName : p.name,
        solved: bnCP.platformSolved[i] ?? p.solved,
        rating: bnCP.platformRating[i] ?? p.rating,
      })),
    },
    education: education.map((e, i) => ({ ...e, ...(bnEducation[i] ?? {}) })),
    stats: stats.map((s, i) => ({ label: bnStats[i] ?? s.label, value: bnStatValues[i] ?? s.value })),
  };
}

type PortfolioData = ReturnType<typeof buildEn>;

let enCache: PortfolioData | null = null;
let bnCache: PortfolioData | null = null;

/** Portfolio content + interface strings for the active language. English until the visitor switches. */
export function useData(): PortfolioData & { lang: Lang } {
  const lang = useLang();
  return useMemo(() => {
    if (lang === "bn") return { ...(bnCache ??= buildBn() as PortfolioData), lang };
    return { ...(enCache ??= buildEn()), lang };
  }, [lang]);
}

export type { UI };
