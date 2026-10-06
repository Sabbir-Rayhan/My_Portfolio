export const personalInfo = {
  name: "Sabbir Rayhan Mahee",
  shortName: "SR Mahee",
  initials: "SRM",
  role: "Software Engineer | Full-Stack Developer | Applied ML",
  tagline: "Building production-grade web applications from database to UI.",
  description:
    "I'm a Computer Science student at CUET focused on full-stack web development and applied machine learning. I build scalable, real-world applications with Next.js, Node.js, TypeScript and PostgreSQL, and research deep learning solutions with Python and PyTorch.",
  email: "s.rayhanmahee@gmail.com",
  phone: "+880 1966-045476",
  location: "Khulna, Bangladesh",
  university: "Chittagong University of Engineering and Technology (CUET)",
  degree: "B.Sc. in Computer Science and Engineering",
  cgpa: "3.28",
  photo: "/images/mahee.jpg",
  availability: "Available for opportunities",
  social: {
    github: "https://github.com/Sabbir-Rayhan",
    linkedin: "https://www.linkedin.com/in/s-r-mahee-b48821343",
    codeforces: "https://codeforces.com/profile/S.R._Mahee",
  },
  resumeUrl: "/Sabbir_Rayhan_Mahee_Resume.pdf",
};

export const skills = [
  {
    category: "Frontend",
    icon: "monitor",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Zustand",
      "React Hook Form",
      "Better-Auth",
      "Firebase",
      "Zod",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    icon: "server",
    items: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT Authentication",
      "bcrypt",
      "SSLCommerz",
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: "brain",
    items: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "Hugging Face Transformers",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "Pandas",
      "SHAP",
      "Streamlit",
      "Gradio",
    ],
  },
  {
    category: "Database & ORM",
    icon: "database",
    items: ["PostgreSQL", "Prisma ORM", "MongoDB", "MySQL", "Neon"],
  },
  {
    category: "DevOps & Tools",
    icon: "tool",
    items: ["Git", "GitHub", "Vercel", "Railway", "Linux", "VS Code", "Postman"],
  },
  {
    category: "Competitive Programming",
    icon: "cpu",
    items: ["C++", "Data Structures", "Algorithms", "Problem Solving"],
  },
];

export const research = [
  {
    id: "bangla-deepfake",
    kind: "audio",
    type: "B.Sc. Thesis",
    status: "CUET · 2026",
    title: "Deepfake Detection from Bangla Audio using Deep Learning",
    paperTitle: "",
    summary:
      "Synthetic voice cloning is becoming increasingly realistic, while Bangla, spoken by over 230 million people, remains under-represented in audio anti-spoofing research. This thesis builds a deep learning system that distinguishes genuine Bangla speech from AI-generated speech, and deploys it as a public web application.",
    highlights: [
      "Fine-tuned Microsoft's self-supervised WavLM speech encoder, selectively unfreezing the upper transformer layers and adding a LayerNorm–GELU classification head.",
      "Segment-level inference: recordings are resampled to 16 kHz, split into fixed windows, and per-segment probabilities are aggregated into a clip-level verdict with confidence.",
      "Robust audio pipeline supporting WAV, MP3 and AAC/M4A uploads as well as live in-browser microphone recording (1–60 s).",
      "Deployed on Hugging Face Spaces with a Gradio interface for real-time genuine-vs-fake detection.",
    ],
    metrics: [
      { label: "Backbone", value: "WavLM" },
      { label: "Task", value: "Real / Fake" },
      { label: "Sample rate", value: "16 kHz" },
      { label: "Input", value: "1–60 s" },
    ],
    meta: "Supervised by Ashim Dey, Assistant Professor, Dept. of CSE, CUET.",
    tags: ["Python", "PyTorch", "Hugging Face Transformers", "WavLM", "Librosa", "Gradio"],
    liveUrl: "https://huggingface.co/spaces/Mahee56/Bangla-Audio_Deepfake_Detector",
    liveLabel: "Try the live demo",
    sourceUrl: "https://huggingface.co/spaces/Mahee56/Bangla-Audio_Deepfake_Detector/tree/main",
    sourceLabel: "Model & code",
  },
  {
    id: "drug-solubility",
    kind: "molecule",
    type: "IEEE Conference Paper",
    status: "Under review · 2026",
    title: "Scaffold-Aware Drug Solubility Prediction",
    paperTitle:
      "Scaffold-Aware Drug Solubility Classification: Quantifying Generalization Gaps in Machine Learning Models with SMOTE and Extended Molecular Fingerprints on AqSolDB",
    summary:
      "Aqueous solubility determines whether a drug can be absorbed by the body, so predicting it early saves costly lab synthesis. This work classifies molecules as High, Medium or Low solubility directly from SMILES strings, and shows how conventional random splits overstate real-world model performance.",
    highlights: [
      "Bemis–Murcko scaffold split keeps test molecules structurally novel, revealing that random splits overestimate accuracy by 3.91% and ROC-AUC by 5.62%.",
      "525-feature representation combining 13 RDKit physicochemical descriptors with dual ECFP4 + ECFP6 molecular fingerprints.",
      "SMOTE rebalancing for the minority high-solubility class (10.6% of data) with a tuned XGBoost classifier.",
      "SHAP explainability identifies LogP (lipophilicity) as the dominant predictor, consistent with established chemistry.",
    ],
    metrics: [
      { label: "Compounds", value: "9,982" },
      { label: "Features", value: "525" },
      { label: "ROC-AUC (scaffold)", value: "0.886" },
      { label: "Accuracy (scaffold)", value: "80.1%" },
    ],
    meta: "Dataset: AqSolDB (Sorkun et al., Scientific Data, 2019).",
    tags: ["Python", "XGBoost", "scikit-learn", "RDKit", "SMOTE", "SHAP", "Streamlit"],
    liveUrl: "https://drug-solubility-prediction-hpluq2ynhame4vpvyeuygn.streamlit.app/",
    liveLabel: "Open the live app",
    sourceUrl: "https://github.com/Sabbir-Rayhan/drug-solubility-prediction",
    sourceLabel: "Source code",
  },
];

export const projects = [
  {
    id: "planora",
    title: "Planora",
    subtitle: "Event Management Platform",
    description:
      "A full-stack event management platform where users can create, manage, and join events. Features role-based access (User/Admin), public & private events, SSLCommerz payment integration, invitation system with host approval/rejection, and smart payment retry flow.",
    longDescription:
      "Built with Next.js 16 App Router — SSR for SEO-critical pages (homepage, event listings, event details) and CSR for interactive components. Backend with Node.js, Express.js, TypeScript, and Prisma ORM over PostgreSQL deployed on Neon and Railway.",
    image: "/projects/planora.jpg",
    liveUrl: "https://planora-frontend-orpin.vercel.app",
    githubFrontend: "https://github.com/Sabbir-Rayhan/Planora-frontend",
    githubBackend: "https://github.com/Sabbir-Rayhan/Planora-backend",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "SSLCommerz", "Tailwind CSS", "Shadcn UI", "Zustand", "Railway", "Vercel"],
    year: "2026",
    featured: true,
    color: "#38bdf8",
  },
  {
    id: "dragon-news",
    title: "Dragon News",
    subtitle: "Responsive News Portal",
    description:
      "A fully responsive news portal with category-based browsing, live news ticker, and social authentication. Features Google/GitHub login via Firebase, a mobile slide-in drawer for quick access to social links and widgets, and a clean, newspaper-inspired UI built for readability across every screen size.",
    longDescription:
      "Built with React 19 and Vite, styled with Tailwind CSS v4 and DaisyUI. Firebase Authentication powers social login (Google & GitHub) with protected routes for news detail pages. Fully responsive layout — collapsible chip-style category navigation on mobile, sticky sidebars on desktop, and a custom slide-in drawer that surfaces the right-hand widgets (login, socials, media) on smaller screens. Routing handled with React Router v7, deployed on Vercel.",
    image: "/projects/dragon-news.jpg",
    liveUrl: "https://online-news-dusky.vercel.app",
    githubFrontend: "https://github.com/Sabbir-Rayhan/Online-News-Portal",
    tags: ["React 19", "Vite", "Tailwind CSS v4", "DaisyUI", "Firebase Auth", "React Router", "Vercel"],
    year: "2026",
    featured: true,
    color: "#dc2626",
  },
  {
    id: "skillbridge",
    title: "SkillBridge",
    subtitle: "Tutoring Marketplace",
    description:
      "A tutoring marketplace where students browse tutor profiles, book sessions, and manage bookings from a personal dashboard. Features separate role-based dashboards for Students, Tutors, and Admins.",
    longDescription:
      "Built with Next.js 15 and TypeScript. Uses better-auth for authentication and Axios for API communication. Admin panel handles user management, booking overview, and category management. Deployed on Vercel.",
    image: "/projects/skillbridge.jpg",
    liveUrl: "https://skillbridge-topaz.vercel.app",
    githubFrontend: "https://github.com/Sabbir-Rayhan/skillbridge-frontend2",
    githubBackend: "https://github.com/Sabbir-Rayhan/skillbridge-backend2",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "better-auth", "Axios", "REST API", "Vercel"],
    year: "2026",
    featured: true,
    color: "#1b730f",
  },
  
  {
    id: "cuetfinders",
    title: "CUETFinders",
    subtitle: "Campus Lost & Found Platform",
    description:
      "A web platform for CUET students to report and locate lost items on campus. Features search, filtering, item status tracking, and a fully mobile-optimized interface.",
    longDescription:
      "Backend powered by Node.js, Express.js, and MongoDB. Mobile-first responsive design ensures ease of use across all devices on campus.",
    image: "",
    liveUrl: "",
    githubFrontend: "https://github.com/Sabbir-Rayhan/CUETFinders",
    githubBackend: "",
    tags: ["Node.js", "Express.js", "MongoDB", "JavaScript", "HTML/CSS"],
    year: "2025",
    featured: false,
    color: "#34d399",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    subtitle: "Full-Stack Shopping Platform",
    description:
      "A fully functional e-commerce site with product listings, shopping cart, and secure checkout flow. Built with Node.js, EJS templating, and MongoDB for dynamic product management.",
    longDescription:
      "Server-rendered e-commerce application using EJS for templating. Includes product CRUD, cart management, and order processing.",
    image: "",
    liveUrl: "",
    githubFrontend: "https://github.com/Sabbir-Rayhan/Ecommerce-Website",
    githubBackend: "",
    tags: ["Node.js", "EJS", "MongoDB", "JavaScript", "CSS"],
    year: "2025",
    featured: false,
    color: "#fb923c",
  },
];

export const experience = [
  {
    id: "cuet-projects",
    role: "Full-Stack Developer",
    company: "University Group Projects — CUET",
    period: "2023 – Present",
    type: "Academic",
    description:
      "Collaborated in a team of 3–4 developers on multiple university-assigned full-stack projects. Took ownership of backend architecture, API design, and database schema while contributing to frontend development. Practiced agile workflows using GitHub for version control and code review.",
    highlights: [
      "Led backend development for CUETFinders — a real-world campus platform actively used by CUET students",
      "Designed RESTful API architecture with proper authentication, authorization, and error handling",
      "Collaborated on frontend-backend integration using Git branching strategies and pull request reviews",
      "Delivered projects under academic deadlines while maintaining code quality and documentation",
    ],
    tech: ["Node.js", "MongoDB", "Express.js", "JavaScript", "Git", "GitHub"],
  },
  {
    id: "self-learning",
    role: "Independent Developer",
    company: "Personal & Freelance Projects",
    period: "2024 – Present",
    type: "Self-Directed",
    description:
      "Independently designed and shipped production-grade full-stack applications using modern technologies. Focused on learning industry-standard practices including type safety with TypeScript, ORM-based database management, payment gateway integration, and cloud deployment.",
    highlights: [
      "Built and deployed Planora — a live event management platform with SSLCommerz payment integration",
      "Implemented JWT-based authentication, role-based access control, and refresh token systems",
      "Deployed full-stack applications on Vercel (frontend) and Railway (backend) with CI/CD via GitHub",
      "Integrated Prisma ORM over PostgreSQL for type-safe database operations",
    ],
    tech: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "Vercel", "Railway"],
  },
];

export const competitiveProgramming = {
  totalSolved: "500+",
  platforms: [
    { name: "Codeforces", handle: "S.R_Mahee", solved: "321+", rating: "1077", color: "#f87171", url: "https://codeforces.com/profile/S.R._Mahee" },
    { name: "LeetCode", handle: "SR_Mahee", solved: "100+", rating: "—", color: "#fbbf24", url: "https://leetcode.com/u/mahee45/" },
    { name: "Others", handle: "VJudge / CodeChef", solved: "80+", rating: "—", color: "#4ade80", url: "https://vjudge.net/user/mahee45" },
  ],
  stats: {
    maxStreak: 13,
    activeSince: 2022,
    cfRating: 1077,
  },
};

export const education = [
  {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Chittagong University of Engineering and Technology (CUET)",
    period: "Mar 2022 – Aug 2026",
    cgpa: "3.28 / 4.00",
    url: "https://www.cuet.ac.bd",
  },
  {
    degree: "Higher Secondary Certificate — Science",
    institution: "Noapara Govt. College",
    period: "2018 – 2020",
    cgpa: "GPA 5.00 / 5.00",
    url: "https://noaparacollegeabhoynagar.jessoreboard.gov.bd/",
  },
];

export const stats = [
  { label: "Projects Shipped", value: "5+" },
  { label: "Problems Solved", value: "500+" },
  { label: "Technologies", value: "20+" },
  { label: "Years Coding", value: "4+" },
];