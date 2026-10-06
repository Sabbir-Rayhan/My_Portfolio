"use client";
import Image from "next/image";
import { MapPin, GraduationCap, Code2, Mail, ArrowUpRight } from "lucide-react";
import { personalInfo, education } from "@/data/portfolio";
import AboutAnimations from "@/components/sections/AboutAnimations";

export default function AboutSection() {
  const facts = [
    { icon: MapPin, label: "Location", value: personalInfo.location },
    { icon: GraduationCap, label: "University", value: "CUET, Bangladesh" },
    { icon: Code2, label: "Focus", value: "Software Engineering · Full-Stack" },
    { icon: Mail, label: "Email", value: personalInfo.email },
  ];

  return (
    <section id="about" className="section">
      <div className="section-container">
        <div className="section-head">
          <div className="eyebrow"><span className="eyebrow-num">01</span> About</div>
          <h2 className="section-h2">Who I am &amp; <em>what I do</em></h2>
        </div>

        <div className="about-grid">
          <div>
            <AboutAnimations>
              <div className="about-text">
                <p className="about-lead">
                  I&apos;m a <strong>Computer Science student at CUET, Bangladesh</strong>, passionate about software engineering and building reliable, practical solutions to real-world problems.
                </p>
                <p>
                  I enjoy working across the software development lifecycle — from designing systems and architecting backend services to building polished, performant user interfaces. My primary stack includes <strong>Next.js, React, TypeScript, Node.js, PostgreSQL and Prisma</strong>.
                </p>
                <p>
                  I have experience developing and deploying full-stack applications with payment integrations, role-based authentication and database-driven systems for real users. I care about clean, maintainable code and systems that are scalable and easy to evolve.
                </p>
                <p>
                  Alongside engineering, I work on <strong>applied machine learning and deep learning research</strong> in Python. My B.Sc. thesis detects AI-generated Bangla speech by fine-tuning a self-supervised speech model, and my IEEE conference paper (under review) studies how scaffold-aware evaluation exposes generalization gaps in drug solubility prediction.
                </p>
                <p>
                  Beyond individual projects, I&apos;ve collaborated on <strong>university software projects</strong> — from requirements and system design to implementation, testing and deployment — while continuously strengthening my engineering fundamentals.
                </p>
              </div>
            </AboutAnimations>

            <div className="about-facts">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="about-fact">
                  <div className="about-fact-icon"><Icon size={15} /></div>
                  <div style={{ minWidth: 0 }}>
                    <div className="about-fact-label">{label}</div>
                    <div className="about-fact-val">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-side">
            <div className="about-photo">
              <Image src={personalInfo.photo} alt={personalInfo.name} fill style={{ objectFit: "cover", objectPosition: "top center" }} sizes="(max-width:900px) 100vw, 45vw" />
              <div className="about-photo-shade" />
              <div className="about-photo-caption">
                <div className="about-photo-name">{personalInfo.name}</div>
                <div className="about-photo-role">Software Engineer · CUET</div>
              </div>
            </div>

            <div className="edu-block">
              <div className="edu-label">Education</div>
              <ol className="edu-list">
                {education.map((edu) => (
                  <li key={edu.degree} className="edu-item">
                    <span className="edu-dot" />
                    <div className="edu-top">
                      <span className="edu-period mono">{edu.period}</span>
                      <span className="edu-cgpa">{edu.cgpa}</span>
                    </div>
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="edu-inst">
                      {edu.institution} <ArrowUpRight size={13} />
                    </a>
                    <div className="edu-degree">{edu.degree}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 80px; align-items: start; }
        .about-text { color: var(--muted); font-size: 16.5px; line-height: 1.85; }
        .about-text p { margin: 0 0 18px; }
        .about-text strong { color: var(--text-soft); font-weight: 500; }
        .about-lead { font-family: var(--font-serif); font-size: 24px !important; line-height: 1.5 !important; color: var(--text-soft); font-weight: 350; }
        .about-lead strong { color: var(--text) !important; font-weight: 400 !important; font-style: italic; }

        .about-facts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 36px; }
        .about-fact {
          display: flex; align-items: center; gap: 14px; padding: 16px;
          border-radius: var(--radius-sm); border: 1px solid var(--line); background: rgba(255,255,255,0.015);
          transition: border-color 0.25s;
        }
        .about-fact:hover { border-color: var(--line-strong); }
        .about-fact-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--accent-strong); background: var(--accent-soft); }
        .about-fact-label { font-size: 12px; color: var(--subtle); margin-bottom: 2px; }
        .about-fact-val { font-size: 14px; color: var(--text-soft); overflow-wrap: anywhere; }
        .about-fact:nth-child(n+3) { grid-column: 1 / -1; }

        .about-side { display: flex; flex-direction: column; gap: 36px; }
        .about-photo { position: relative; aspect-ratio: 4 / 4.3; border-radius: 24px; overflow: hidden; border: 1px solid var(--line); }
        .about-photo-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,16,18,0.85), rgba(13,16,18,0.05) 50%); }
        .about-photo-caption { position: absolute; left: 22px; right: 22px; bottom: 20px; }
        .about-photo-name { font-family: var(--font-serif); font-size: 22px; color: var(--text); }
        .about-photo-role { font-size: 13px; color: var(--accent-strong); }

        .edu-label { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--subtle); margin-bottom: 18px; font-family: var(--font-mono); }
        .edu-list { list-style: none; margin: 0; padding: 0 0 0 22px; border-left: 1px solid var(--line-strong); display: flex; flex-direction: column; gap: 26px; }
        .edu-item { position: relative; }
        .edu-dot { position: absolute; left: -27px; top: 6px; width: 9px; height: 9px; border-radius: 50%; background: var(--bg); border: 2px solid var(--accent); }
        .edu-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
        .edu-period { font-size: 12px; color: var(--subtle); }
        .edu-cgpa { font-size: 12.5px; color: var(--sand); font-weight: 500; }
        .edu-inst { display: inline-flex; align-items: center; gap: 5px; font-size: 15.5px; font-weight: 500; color: var(--text); text-decoration: none; transition: color 0.2s; }
        .edu-inst:hover { color: var(--accent-strong); }
        .edu-degree { font-size: 14px; color: var(--muted); margin-top: 2px; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 56px; }
          .about-photo { aspect-ratio: 4 / 3.4; }
        }
        @media (max-width: 520px) {
          .about-facts { grid-template-columns: 1fr; }
          .about-lead { font-size: 20px !important; }
        }
      `}</style>
    </section>
  );
}
