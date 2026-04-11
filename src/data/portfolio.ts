export const personalInfo = {
  name: "Sabbir Rayhan Mahee",
  shortName: "SR Mahee",
  initials: "SRM",
  role: "Full-Stack Web Developer",
  tagline: "Building production-grade web applications from database to UI.",
  description:
    "I'm a Computer Science student at CUET with a strong focus on full-stack web development. I specialize in Next.js, Node.js, TypeScript, and PostgreSQL — building scalable, real-world applications with clean architecture and exceptional user experiences.",
  email: "s.rayhanmahee@gmail.com",
  phone: "+880 1966-045476",
  location: "Khulna, Bangladesh",
  university: "Chittagong University of Engineering and Technology (CUET)",
  degree: "B.Sc. in Computer Science and Engineering",
  cgpa: "3.22",
  photo: "/images/mahee.jpg",
  availability: "Available for opportunities",
  social: {
    github: "https://github.com/Sabbir-Rayhan",
    linkedin: "https://www.linkedin.com/in/s-r-mahee-b48821343",
    codeforces: "https://codeforces.com/profile/S.R_Mahee",
  },
  resumeUrl: "#",
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

export const projects = [
  {
    id: "planora",
    title: "Planora",
    subtitle: "Event Management Platform",
    description:
      "A full-stack event management platform where users can create, manage, and join events. Features role-based access (User/Admin), public & private events, SSLCommerz payment integration, invitation system with host approval/rejection, and smart payment retry flow.",
    longDescription:
      "Built with Next.js 16 App Router — SSR for SEO-critical pages (homepage, event listings, event details) and CSR for interactive components. Backend with Node.js, Express.js, TypeScript, and Prisma ORM over PostgreSQL deployed on Neon and Railway.",
    image: "/projects/planora.png",
    liveUrl: "https://planora-frontend-orpin.vercel.app",
    githubFrontend: "https://github.com/Sabbir-Rayhan/Planora-frontend",
    githubBackend: "https://github.com/Sabbir-Rayhan/Planora-backend",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "SSLCommerz", "Tailwind CSS", "Shadcn UI", "Zustand", "Railway", "Vercel"],
    year: "2026",
    featured: true,
    color: "#38bdf8",
  },
  {
    id: "skillbridge",
    title: "SkillBridge",
    subtitle: "Tutoring Marketplace",
    description:
      "A tutoring marketplace where students browse tutor profiles, book sessions, and manage bookings from a personal dashboard. Features separate role-based dashboards for Students, Tutors, and Admins.",
    longDescription:
      "Built with Next.js 15 and TypeScript. Uses better-auth for authentication and Axios for API communication. Admin panel handles user management, booking overview, and category management. Deployed on Vercel.",
    image: "/projects/skillbridge.png",
    liveUrl: "https://skillbridge-topaz.vercel.app",
    githubFrontend: "https://github.com/Sabbir-Rayhan/skillbridge-frontend2",
    githubBackend: "https://github.com/Sabbir-Rayhan/skillbridge-backend2",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "better-auth", "Axios", "REST API", "Vercel"],
    year: "2026",
    featured: true,
    color: "#818cf8",
  },
  {
    id: "cuetfinders",
    title: "CUETFinders",
    subtitle: "Campus Lost & Found Platform",
    description:
      "A web platform for CUET students to report and locate lost items on campus. Features search, filtering, item status tracking, and a fully mobile-optimized interface.",
    longDescription:
      "Backend powered by Node.js, Express.js, and MongoDB. Mobile-first responsive design ensures ease of use across all devices on campus.",
    image: "/projects/cuetfinders.png",
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
    image: "/projects/ecommerce.png",
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
    { name: "Codeforces", handle: "S.R_Mahee", solved: "321+", rating: "1077", color: "#f87171", url: "https://codeforces.com/profile/S.R_Mahee" },
    { name: "LeetCode", handle: "SR_Mahee", solved: "100+", rating: "—", color: "#fbbf24", url: "#" },
    { name: "Others", handle: "VJudge / CodeChef", solved: "80+", rating: "—", color: "#4ade80", url: "#" },
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
    period: "March 2022 – Present",
    cgpa: "3.22 / 4.00",
    url: "https://www.cuet.ac.bd",
  },
  {
    degree: "Higher Secondary Certificate — Science",
    institution: "Noapara Govt. College",
    period: "2018 – 2020",
    cgpa: "GPA 5.00 / 5.00",
    url: "",
  },
];

export const stats = [
  { label: "Projects Shipped", value: "4+" },
  { label: "Problems Solved", value: "500+" },
  { label: "Technologies", value: "15+" },
  { label: "Years Coding", value: "3+" },
];