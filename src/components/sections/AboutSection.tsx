"use client";
import Image from "next/image";
import { MapPin, GraduationCap, Code2, Mail } from "lucide-react";
import { personalInfo, education } from "@/data/portfolio";
import AboutAnimations from "@/components/sections/AboutAnimations";

export default function AboutSection() {
  const s = {
    section: { padding: "96px 0", position: "relative" } as React.CSSProperties,
    container: { maxWidth: "1180px", margin: "0 auto", padding: "0 40px" } as React.CSSProperties,
    label: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" } as React.CSSProperties,
    labelLine: { width: "24px", height: "1px", background: "#38bdf8" } as React.CSSProperties,
    labelText: { color: "#38bdf8", fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px" },
    h2: { fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#e2e8f0", marginBottom: "56px", lineHeight: 1.1 } as React.CSSProperties,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" } as React.CSSProperties,
    para: { fontFamily: "Georgia, serif", fontSize: "18px", color: "#94a3b8", lineHeight: 1.85, marginBottom: "18px" } as React.CSSProperties,
    strong: { color: "#e2e8f0", fontWeight: 600 } as React.CSSProperties,
    infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "32px" } as React.CSSProperties,
    infoCard: { display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" } as React.CSSProperties,
    iconBox: { width: "32px", height: "32px", borderRadius: "8px", background: "rgba(56,189,248,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } as React.CSSProperties,
    infoLabel: { fontSize: "10px", color: "#334155", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "1px" },
    infoVal: { fontSize: "13px", color: "#94a3b8", marginTop: "2px" },
    photoWrap: { position: "relative", width: "100%", paddingTop: "75%", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px" } as React.CSSProperties,
    eduCard: { padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "10px" } as React.CSSProperties,
  };

  return (
    <section id="about" style={s.section}>
      <div style={s.container}>
        <div style={s.label}>
          <div style={s.labelLine} />
          <span style={s.labelText}>01 — About</span>
        </div>
        <h2 style={s.h2}>
          Who I am &{" "}
          <span className="gradient-text">what I do</span>
        </h2>

        <div style={s.grid}>
          <div>
            <AboutAnimations>
              <p style={s.para}>
                I'm a <strong style={s.strong}>Computer Science student at CUET, Bangladesh</strong>, passionate about crafting software that solves real problems. My focus is full-stack web development — from architecting robust backend APIs to delivering polished, performant frontends.
              </p>
              <p style={s.para}>
                I specialize in <strong style={{ ...s.strong, color: "#38bdf8" }}>Next.js, TypeScript, Node.js, and PostgreSQL</strong> with Prisma ORM. I've shipped live applications with payment integrations, role-based authentication systems, and real users — not just side projects.
              </p>
              <p style={s.para}>
                Beyond individual work, I've collaborated in <strong style={s.strong}>university team projects</strong>, contributing to full-stack solutions from initial design through deployment. I care deeply about clean architecture, code quality, and developer experience.
              </p>
            </AboutAnimations>

            <div style={s.infoGrid}>
              {[
                { icon: MapPin, label: "Location", value: personalInfo.location },
                { icon: Mail, label: "Email", value: personalInfo.email },
                { icon: GraduationCap, label: "University", value: "CUET, Bangladesh" },
                { icon: Code2, label: "Focus", value: "Full-Stack Development" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={s.infoCard}>
                  <div style={s.iconBox}><Icon size={14} color="#38bdf8" /></div>
                  <div>
                    <div style={s.infoLabel}>{label}</div>
                    <div style={s.infoVal}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={s.photoWrap}>
              <Image src={personalInfo.photo} alt={personalInfo.name} fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 1024px) 100vw, 50vw" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to tr, rgba(5,8,16,0.4), transparent)" }} />
              <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px" }}>
                <div style={{ background: "rgba(5,8,16,0.8)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>{personalInfo.name}</div>
                  <div style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>Full-Stack Developer · CUET</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "8px" }}>
              <div style={{ fontSize: "10px", fontFamily: "monospace", textTransform: "uppercase" as const, letterSpacing: "3px", color: "#334155", marginBottom: "12px" }}>Education</div>
              {education.map((edu) => (
                <div key={edu.degree} style={s.eduCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>{edu.institution}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{edu.degree}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "10px", color: "#334155", fontFamily: "monospace" }}>{edu.period}</div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", fontFamily: "monospace", marginTop: "2px" }}>{edu.cgpa}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .about-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
