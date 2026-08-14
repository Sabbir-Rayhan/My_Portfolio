"use client";
import Image from "next/image";
import { MapPin, GraduationCap, Code2, Mail } from "lucide-react";
import { personalInfo, education } from "@/data/portfolio";
import AboutAnimations from "@/components/sections/AboutAnimations";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-label-row">
          <div className="section-label-line" style={{ background: "#38bdf8" }} />
          <span className="section-label" style={{ color: "#38bdf8" }}>01 — About</span>
        </div>
        <h2 className="section-h2">
          Who I am & <span className="gradient-text">what I do</span>
        </h2>

        <div className="about-grid">
          <div>
            <AboutAnimations>
              <div className="about-text">
                <p>
                  I&apos;m a <strong>Computer Science student at CUET, Bangladesh</strong>, passionate about software engineering and building reliable, practical solutions to real-world problems. I enjoy working across the software development lifecycle — from designing systems and architecting backend services to building polished, performant user interfaces.
                </p>

                <p>
                  My primary stack includes <strong style={{ color: "#38bdf8" }}>Next.js, React, TypeScript, Node.js, PostgreSQL and Prisma</strong>. I have experience developing and deploying full-stack applications, payment integrations, role-based authentication, database-driven systems, and real users. I&apos;m particularly interested in writing clean, maintainable code and designing systems that are scalable and easy to evolve.
                </p>

                <p>
                  Beyond individual projects, I&apos;ve collaborated on <strong>university software projects</strong>, contributing throughout the development process — from requirements and system design to implementation, testing, and deployment. I&apos;m continuously strengthening my software engineering fundamentals while building practical experience as a <strong>Software Engineer and Full-Stack Developer</strong>.
                </p>
              </div>

            </AboutAnimations>

            <div className="about-info-grid">
              {[
                { icon: MapPin, label: "Location", value: personalInfo.location },
                { icon: Mail, label: "Email", value: personalInfo.email },
                { icon: GraduationCap, label: "University", value: "CUET, Bangladesh" },
                { icon: Code2, label: "Focus", value: "Software Engineer  |  Full-Stack Development" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="about-info-card">
                  <div className="about-info-icon"><Icon size={14} color="#38bdf8" /></div>
                  <div>
                    <div className="about-info-label">{label}</div>
                    <div className="about-info-val">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="about-photo-wrap">
              <Image src={personalInfo.photo} alt={personalInfo.name} fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="(max-width:768px) 100vw, 50vw" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to tr, rgba(5,8,16,0.4), transparent)" }} />
              <div className="about-photo-caption">
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e8f0" }}>{personalInfo.name}</div>
                <div style={{ fontSize: "11px", color: "#38bdf8", fontFamily: "monospace" }}>Software Engineer · CUET</div>
              </div>
            </div>

            <div style={{ marginTop: "8px" }}>
              <div className="edu-label">Education</div>
              {education.map((edu) => (
                <div key={edu.degree} className="edu-card">
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
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
        .about-section { padding:96px 0; position:relative; }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .about-text { font-family:Georgia,serif; font-size:17px; color:#94a3b8; line-height:1.85; }
        .about-text p { margin-bottom:16px; }
        .about-text strong { color:#e2e8f0; font-weight:600; }
        .about-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:28px; }
        .about-info-card { display:flex; align-items:flex-start; gap:10px; padding:12px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); transition:border-color 0.2s; }
        .about-info-card:hover { border-color:rgba(56,189,248,0.2); }
        .about-info-icon { width:32px; height:32px; border-radius:8px; background:rgba(56,189,248,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .about-info-label { font-size:10px; color:#334155; font-family:monospace; text-transform:uppercase; letter-spacing:1px; }
        .about-info-val { font-size:12px; color:#94a3b8; margin-top:2px; }
        .about-photo-wrap { position:relative; width:100%; padding-top:75%; border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.06); margin-bottom:20px; }
        .about-photo-caption { position:absolute; bottom:12px; left:12px; right:12px; background:rgba(5,8,16,0.8); backdrop-filter:blur(8px); border-radius:12px; padding:10px 14px; border:1px solid rgba(255,255,255,0.08); }
        .edu-label { font-size:10px; font-family:monospace; text-transform:uppercase; letter-spacing:3px; color:#334155; margin-bottom:12px; }
        .edu-card { padding:14px 16px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); margin-bottom:10px; transition:border-color 0.2s; }
        .edu-card:hover { border-color:rgba(255,255,255,0.12); }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns:1fr; gap:40px; }
          .about-info-grid { grid-template-columns:1fr; }
        }
        @media (max-width: 480px) {
          .about-info-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
