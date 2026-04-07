# Sabbir Rayhan Mahee — Portfolio

Professional portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP & Lenis.

## Tech Stack
- **Next.js 15** (App Router) — SSG/SSR/CSR
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **GSAP** — Hero orb animations
- **Lenis** — Smooth scroll

## Project Structure
```
src/
├── app/
│   ├── layout.tsx            ← Root layout, SEO metadata
│   ├── page.tsx              ← Main page (SSG)
│   └── globals.css           ← Design tokens, animations
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        ← Sticky nav, active section
│   │   ├── Footer.tsx
│   │   ├── SmoothScroll.tsx  ← Lenis provider
│   │   └── ScrollToTop.tsx
│   └── sections/
│       ├── HeroSection.tsx       ← Typewriter + GSAP orbs
│       ├── AboutSection.tsx      ← SSG server component
│       ├── AboutAnimations.tsx   ← Client wrapper
│       ├── SkillsSection.tsx
│       ├── ExperienceSection.tsx ← Timeline
│       ├── ProjectsSection.tsx   ← Cards + modal
│       ├── CPSection.tsx         ← Competitive programming
│       └── ContactSection.tsx    ← Form + socials
├── data/
│   └── portfolio.ts          ← ALL content here
└── lib/
    └── utils.ts
```

## Getting Started
```bash
# 1. Extract
tar -xzf mahee-portfolio.tar.gz
cd mahee-portfolio

# 2. Install
npm install

# 3. Run
npm run dev
# → http://localhost:3000
```

## Update Your Content
Edit ONE file: src/data/portfolio.ts
- personalInfo → name, email, photo, social links
- projects → add/edit projects
- skills → add/remove skills
- experience → update experience
- competitiveProgramming → update CP stats

## Deploy to Vercel
```bash
git init && git add . && git commit -m "portfolio"
git remote add origin https://github.com/Sabbir-Rayhan/portfolio.git
git push -u origin main
```
Then import repo on vercel.com → auto-deploys on every push.
