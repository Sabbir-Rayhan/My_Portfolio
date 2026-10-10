/**
 * Interface strings, English + Bangla. Every visible word that is not portfolio data lives here.
 * `**bold**` markers are rendered as <strong> by the <Rich> component.
 * `h2` pairs are [plain part, emphasised part].
 */
export const uiEn = {
  brandAria: "SR Mahee — back to top",
  nav: {
    about: "About", skills: "Skills", experience: "Experience", research: "Research",
    projects: "Projects", cp: "CP", contact: "Contact",
    resume: "Resume", downloadResume: "Download Resume", menu: "Toggle menu", primary: "Primary",
  },
  theme: {
    change: "Change colour theme", title: "Colour theme", group: "Colour theme", suffix: "theme",
    autoTitle: "Auto-cycle colours", autoOn: "Slowly shifts every ~25 s",
    autoHeld: "Currently holding your choice", autoReduced: "Off because reduced motion is on",
    names: { sage: "Sage", ocean: "Ocean", crimson: "Crimson", gold: "Gold", violet: "Violet", rose: "Rose" } as Record<string, string>,
  },
  hero: {
    roles: [
      "Software Engineer", "Full-Stack Web Developer", "Next.js Specialist", "TypeScript Engineer",
      "Backend Architect", "Machine Learning Enthusiast", "Problem Solver",
    ],
    prefix: "I'm a",
    desc: "I build **production-grade web applications** end-to-end — from database schema and REST API design to calm, responsive interfaces — and apply **deep learning** to real-world problems through research.",
    viewWork: "View my work", getInTouch: "Get in touch",
    nameFirst: "Sabbir Rayhan", nameLast: "Mahee",
    chipTitle: "Full-Stack", chipSub: "problems solved", scrollAbout: "Scroll to about",
    socialEmail: "Email",
  },
  about: {
    eyebrow: "About",
    h2: ["Who I am & ", "what I do"] as [string, string],
    paragraphs: [
      "I'm a **Computer Science student at CUET, Bangladesh**, passionate about software engineering and building reliable, practical solutions to real-world problems.",
      "I enjoy working across the software development lifecycle — from designing systems and architecting backend services to building polished, performant user interfaces. My primary stack includes **Next.js, React, TypeScript, Node.js, PostgreSQL and Prisma**.",
      "I have experience developing and deploying full-stack applications with payment integrations, role-based authentication and database-driven systems for real users. I care about clean, maintainable code and systems that are scalable and easy to evolve.",
      "Alongside engineering, I work on **applied machine learning and deep learning research** in Python. My B.Sc. thesis detects AI-generated Bangla speech by fine-tuning a self-supervised speech model, and my IEEE conference paper (under review) studies how scaffold-aware evaluation exposes generalization gaps in drug solubility prediction.",
      "Beyond individual projects, I've collaborated on **university software projects** — from requirements and system design to implementation, testing and deployment — while continuously strengthening my engineering fundamentals.",
    ],
    factLocation: "Location", factUniversity: "University", factFocus: "Focus", factEmail: "Email",
    universityValue: "CUET, Bangladesh", focusValue: "Software Engineering · Full-Stack",
    photoRole: "Software Engineer · CUET", education: "Education",
  },
  skills: {
    eyebrow: "Skills",
    h2: ["My technical ", "toolkit"] as [string, string],
    sub: "Technologies and tools I use to design, build and ship production apps — and to train and deploy machine learning models.",
  },
  experience: { eyebrow: "Experience", h2: ["Work & ", "experience"] as [string, string] },
  research: {
    eyebrow: "Research",
    h2: ["Research & ", "applied AI"] as [string, string],
    sub: "Machine learning and deep learning work, from problem framing and rigorous evaluation to deployed, publicly usable models.",
  },
  projects: {
    eyebrow: "Projects",
    h2: ["Things I've ", "built & shipped"] as [string, string],
    viewAll: "View all on GitHub", liveDemo: "Live demo", frontend: "Frontend", backend: "Backend",
    source: "Source", featured: "Featured", details: "Details", close: "Close",
    screenshot: "screenshot", sourceAria: "Source code",
  },
  cp: {
    eyebrow: "Competitive Programming",
    h2: ["Sharpening ", "the fundamentals"] as [string, string],
    sub: "Active across multiple platforms since 2022. Problem-solving keeps me sharp on algorithms, data structures and optimization — directly improving how I design backend systems.",
    total: "Total problems solved", acrossAll: "across all platforms",
    cfRating: "CF rating", maxStreak: "Max streak", activeSince: "Active since", daySuffix: "d",
    rating: "Rating", solved: "Solved",
    quote: "Competitive programming isn't just about solving problems — it's about thinking systematically and writing code that works correctly under constraints.",
  },
  contact: {
    eyebrow: "Contact",
    h2: ["Let's build something ", "great together"] as [string, string],
    sub: "I'm currently open to new opportunities — full-time roles, internships, freelance projects, or just a good conversation. My inbox is always open.",
    yourName: "Your name", namePh: "John Doe", email: "Email", emailPh: "john@example.com",
    message: "Message", messagePh: "Tell me about your project or opportunity…",
    send: "Send message", sending: "Sending…", sent: "Message sent",
    thanks: "Thanks! I'll get back to you within 24–48 hours.",
    error: "Your message couldn't be sent right now.", fallback: "Send via your email app instead",
    directEmail: "Direct email", copyEmail: "Copy email", copied: "Copied to clipboard", basedIn: "Based in",
    avail: "Open to opportunities · replies within 24–48h",
  },
  footer: {
    ctaTitle: ["Have an idea? ", "Let's talk."] as [string, string],
    bio: "Software engineer building production-grade web applications with Next.js, TypeScript, Node.js and PostgreSQL — and applying deep learning to real-world problems.",
    navigation: "Navigation", builtWith: "Built with", getInTouch: "Get in touch", avail: "Open to opportunities",
    rights: "All rights reserved.", designedBy: "Designed & developed by",
    owner: "Sabbir Rayhan Mahee",
  },
};

export type UI = typeof uiEn;

export const uiBn: UI = {
  brandAria: "SR Mahee — উপরে ফিরে যান",
  nav: {
    about: "পরিচিতি", skills: "দক্ষতা", experience: "অভিজ্ঞতা", research: "গবেষণা",
    projects: "প্রজেক্ট", cp: "সিপি", contact: "যোগাযোগ",
    resume: "রেজ্যুমে", downloadResume: "রেজ্যুমে ডাউনলোড করুন", menu: "মেনু খুলুন বা বন্ধ করুন", primary: "প্রধান মেনু",
  },
  theme: {
    change: "রঙের থিম পরিবর্তন করুন", title: "রঙের থিম", group: "রঙের থিম", suffix: "থিম",
    autoTitle: "রং নিজে নিজে বদলাক", autoOn: "প্রায় প্রতি ২৫ সেকেন্ডে ধীরে বদলায়",
    autoHeld: "এখন আপনার পছন্দের রংটি ধরে রাখা আছে", autoReduced: "রিডিউসড মোশন চালু থাকায় বন্ধ আছে",
    names: { sage: "সেজ", ocean: "সাগর", crimson: "ক্রিমসন", gold: "সোনালি", violet: "বেগুনি", rose: "গোলাপি" },
  },
  hero: {
    roles: [
      "সফটওয়্যার ইঞ্জিনিয়ার", "ফুল-স্ট্যাক ওয়েব ডেভেলপার", "Next.js বিশেষজ্ঞ", "TypeScript ইঞ্জিনিয়ার",
      "ব্যাকএন্ড আর্কিটেক্ট", "মেশিন লার্নিংয়ে আগ্রহী", "সমস্যা সমাধানকারী",
    ],
    prefix: "আমি একজন",
    desc: "ডেটাবেস স্কিমা ও REST API ডিজাইন থেকে শুরু করে পরিচ্ছন্ন, রেসপন্সিভ ইন্টারফেস পর্যন্ত — আমি **প্রোডাকশন-গ্রেড ওয়েব অ্যাপ্লিকেশন** এন্ড-টু-এন্ড তৈরি করি, এবং গবেষণার মাধ্যমে বাস্তব সমস্যায় **ডিপ লার্নিং** প্রয়োগ করি।",
    viewWork: "আমার কাজ দেখুন", getInTouch: "যোগাযোগ করুন",
    nameFirst: "সাব্বির রায়হান", nameLast: "মাহী",
    chipTitle: "ফুল-স্ট্যাক", chipSub: "সমস্যা সমাধান করেছি", scrollAbout: "পরিচিতি অংশে যান",
    socialEmail: "ইমেইল",
  },
  about: {
    eyebrow: "পরিচিতি",
    h2: ["আমি কে ও ", "আমি কী করি"],
    paragraphs: [
      "আমি **বাংলাদেশের চুয়েটের কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ের শিক্ষার্থী**। সফটওয়্যার ইঞ্জিনিয়ারিং এবং বাস্তব সমস্যার নির্ভরযোগ্য, ব্যবহারিক সমাধান তৈরিতে আমার গভীর আগ্রহ আছে।",
      "সিস্টেম ডিজাইন ও ব্যাকএন্ড সার্ভিসের আর্কিটেকচার থেকে শুরু করে মসৃণ, দ্রুত ইউজার ইন্টারফেস তৈরি পর্যন্ত — সফটওয়্যার ডেভেলপমেন্টের পুরো ধাপেই কাজ করতে আমি পছন্দ করি। আমার প্রধান স্ট্যাক **Next.js, React, TypeScript, Node.js, PostgreSQL ও Prisma**।",
      "পেমেন্ট ইন্টিগ্রেশন, রোল-ভিত্তিক অথেন্টিকেশন এবং ডেটাবেসনির্ভর সিস্টেমসহ ফুল-স্ট্যাক অ্যাপ্লিকেশন তৈরি ও ডিপ্লয় করার অভিজ্ঞতা আমার আছে, যা বাস্তব ব্যবহারকারীদের জন্য তৈরি। আমি পরিচ্ছন্ন ও রক্ষণাবেক্ষণযোগ্য কোড এবং এমন সিস্টেমে গুরুত্ব দিই, যা সহজে স্কেল করা যায় ও সময়ের সঙ্গে উন্নত করা যায়।",
      "ইঞ্জিনিয়ারিংয়ের পাশাপাশি আমি Python-এ **অ্যাপ্লাইড মেশিন লার্নিং ও ডিপ লার্নিং গবেষণা** করি। আমার B.Sc. থিসিসে সেলফ-সুপারভাইজড স্পিচ মডেল ফাইন-টিউন করে এআই-তৈরি বাংলা কণ্ঠ শনাক্ত করা হয়েছে, আর আমার IEEE কনফারেন্স পেপারে (রিভিউ চলছে) ওষুধের দ্রবণীয়তা পূর্বাভাসে স্ক্যাফোল্ড-সচেতন মূল্যায়ন কীভাবে সাধারণীকরণের ঘাটতি প্রকাশ করে, তা বিশ্লেষণ করা হয়েছে।",
      "ব্যক্তিগত প্রজেক্টের বাইরেও আমি **বিশ্ববিদ্যালয়ের সফটওয়্যার প্রজেক্টে** দলগতভাবে কাজ করেছি — প্রয়োজনীয়তা বিশ্লেষণ ও সিস্টেম ডিজাইন থেকে বাস্তবায়ন, টেস্টিং ও ডিপ্লয়মেন্ট পর্যন্ত — এবং নিয়মিত আমার ইঞ্জিনিয়ারিং ভিত্তি মজবুত করছি।",
    ],
    factLocation: "অবস্থান", factUniversity: "বিশ্ববিদ্যালয়", factFocus: "মূল ক্ষেত্র", factEmail: "ইমেইল",
    universityValue: "চুয়েট, বাংলাদেশ", focusValue: "সফটওয়্যার ইঞ্জিনিয়ারিং · ফুল-স্ট্যাক",
    photoRole: "সফটওয়্যার ইঞ্জিনিয়ার · চুয়েট", education: "শিক্ষাজীবন",
  },
  skills: {
    eyebrow: "দক্ষতা",
    h2: ["আমার টেকনিক্যাল ", "টুলকিট"],
    sub: "প্রোডাকশন অ্যাপ ডিজাইন, তৈরি ও ডিপ্লয় করতে এবং মেশিন লার্নিং মডেল ট্রেন ও ডিপ্লয় করতে আমি যেসব প্রযুক্তি ও টুল ব্যবহার করি।",
  },
  experience: { eyebrow: "অভিজ্ঞতা", h2: ["কাজ ও ", "অভিজ্ঞতা"] },
  research: {
    eyebrow: "গবেষণা",
    h2: ["গবেষণা ও ", "অ্যাপ্লাইড এআই"],
    sub: "মেশিন লার্নিং ও ডিপ লার্নিং নিয়ে কাজ — সমস্যা নির্ধারণ ও কঠোর মূল্যায়ন থেকে শুরু করে প্রকাশ্যে ব্যবহারযোগ্য, ডিপ্লয় করা মডেল পর্যন্ত।",
  },
  projects: {
    eyebrow: "প্রজেক্ট",
    h2: ["আমার তৈরি ও ডিপ্লয় করা ", "প্রজেক্টসমূহ"],
    viewAll: "GitHub-এ সব দেখুন", liveDemo: "লাইভ ডেমো", frontend: "ফ্রন্টএন্ড", backend: "ব্যাকএন্ড",
    source: "সোর্স", featured: "বিশেষ", details: "বিস্তারিত", close: "বন্ধ করুন",
    screenshot: "স্ক্রিনশট", sourceAria: "সোর্স কোড",
  },
  cp: {
    eyebrow: "প্রতিযোগিতামূলক প্রোগ্রামিং",
    h2: ["মৌলিক দক্ষতাকে ", "আরও শাণিত করা"],
    sub: "২০২২ সাল থেকে একাধিক প্ল্যাটফর্মে সক্রিয়। সমস্যা সমাধান আমাকে অ্যালগরিদম, ডেটা স্ট্রাকচার ও অপ্টিমাইজেশনে ধারালো রাখে — যা সরাসরি ব্যাকএন্ড সিস্টেম ডিজাইনের দক্ষতা বাড়ায়।",
    total: "মোট সমাধান করা সমস্যা", acrossAll: "সব প্ল্যাটফর্ম মিলিয়ে",
    cfRating: "CF রেটিং", maxStreak: "সর্বোচ্চ স্ট্রিক", activeSince: "সক্রিয় সাল থেকে", daySuffix: " দিন",
    rating: "রেটিং", solved: "সমাধান",
    quote: "প্রতিযোগিতামূলক প্রোগ্রামিং শুধু সমস্যা সমাধানের নাম নয় — এটি পদ্ধতিগতভাবে চিন্তা করা এবং সীমাবদ্ধতার মধ্যেও সঠিকভাবে কাজ করে এমন কোড লেখার অনুশীলন।",
  },
  contact: {
    eyebrow: "যোগাযোগ",
    h2: ["চলুন একসঙ্গে ", "দারুণ কিছু গড়ি"],
    sub: "আমি এখন নতুন সুযোগের জন্য উন্মুক্ত — ফুল-টাইম চাকরি, ইন্টার্নশিপ, ফ্রিল্যান্স প্রজেক্ট, কিংবা শুধু একটি ভালো আলাপ। আমার ইনবক্স সবসময় খোলা।",
    yourName: "আপনার নাম", namePh: "যেমন: রহিম উদ্দিন", email: "ইমেইল", emailPh: "rahim@example.com",
    message: "বার্তা", messagePh: "আপনার প্রজেক্ট বা সুযোগ সম্পর্কে জানান…",
    send: "বার্তা পাঠান", sending: "পাঠানো হচ্ছে…", sent: "বার্তা পাঠানো হয়েছে",
    thanks: "ধন্যবাদ! আমি ২৪–৪৮ ঘণ্টার মধ্যে উত্তর দেব।",
    error: "এই মুহূর্তে আপনার বার্তা পাঠানো যায়নি।", fallback: "বরং আপনার ইমেইল অ্যাপ দিয়ে পাঠান",
    directEmail: "সরাসরি ইমেইল", copyEmail: "ইমেইল কপি করুন", copied: "কপি হয়েছে", basedIn: "অবস্থান",
    avail: "নতুন সুযোগের জন্য উন্মুক্ত · ২৪–৪৮ ঘণ্টার মধ্যে উত্তর",
  },
  footer: {
    ctaTitle: ["মাথায় কোনো আইডিয়া আছে? ", "চলুন কথা বলি।"],
    bio: "একজন সফটওয়্যার ইঞ্জিনিয়ার, যিনি Next.js, TypeScript, Node.js ও PostgreSQL দিয়ে প্রোডাকশন-গ্রেড ওয়েব অ্যাপ্লিকেশন তৈরি করেন এবং বাস্তব সমস্যায় ডিপ লার্নিং প্রয়োগ করেন।",
    navigation: "নেভিগেশন", builtWith: "যা দিয়ে তৈরি", getInTouch: "যোগাযোগ", avail: "নতুন সুযোগের জন্য উন্মুক্ত",
    rights: "সর্বস্বত্ব সংরক্ষিত।", designedBy: "ডিজাইন ও ডেভেলপমেন্ট:",
    owner: "সাব্বির রায়হান মাহী",
  },
};
