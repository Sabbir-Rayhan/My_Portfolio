/**
 * Content for the chat-style FAQ. Every answer is written from the portfolio's own data —
 * nothing here is generated at runtime, so the assistant can never invent facts about Mahee.
 * `**bold**` is rendered as <strong>; `{email}` is replaced with the real address.
 */
import type { Lang } from "@/lib/i18n";

export type NavId = "about" | "skills" | "experience" | "research" | "projects" | "cp" | "contact";

export type FaqAction =
  | { kind: "scroll"; id: NavId; label?: "contactForm" }
  | { kind: "email" }
  | { kind: "resume" }
  | { kind: "link"; site: "linkedin" | "github" };

export interface FaqItem {
  id: string;
  q: Record<Lang, string>;
  a: Record<Lang, string>;
  /** English words match whole words (or word starts for long words); Bangla keywords match as substrings. */
  keywords: string[];
  actions: FaqAction[];
}

export const FAQ: FaqItem[] = [
  {
    id: "about",
    q: { en: "Who are you?", bn: "আপনি কে?" },
    a: {
      en: "I'm **Sabbir Rayhan Mahee**, a Computer Science and Engineering student at **CUET**, Bangladesh. I build full-stack web applications with Next.js, TypeScript, Node.js and PostgreSQL, and I do applied machine learning research in Python.",
      bn: "আমি **সাব্বির রায়হান মাহী**, বাংলাদেশের **চুয়েটের** কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ের শিক্ষার্থী। আমি Next.js, TypeScript, Node.js ও PostgreSQL দিয়ে ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন তৈরি করি এবং Python-এ অ্যাপ্লাইড মেশিন লার্নিং গবেষণা করি।",
    },
    keywords: ["who", "yourself", "introduce", "introduction", "mahee", "name", "bio", "আপনি কে", "তুমি কে", "পরিচয়", "নিজের সম্পর্কে", "নিজের কথা"],
    actions: [{ kind: "scroll", id: "about" }],
  },
  {
    id: "hire",
    q: { en: "Are you available for work?", bn: "আপনি কি কাজের জন্য প্রস্তুত?" },
    a: {
      en: "Yes — I'm open to **full-time roles, internships and freelance projects**. The fastest way to reach me is email, and I usually reply within 24–48 hours.",
      bn: "হ্যাঁ — আমি **ফুল-টাইম চাকরি, ইন্টার্নশিপ ও ফ্রিল্যান্স প্রজেক্টের** জন্য উন্মুক্ত। আমার সঙ্গে যোগাযোগের দ্রুততম উপায় ইমেইল; আমি সাধারণত ২৪–৪৮ ঘণ্টার মধ্যে উত্তর দিই।",
    },
    keywords: ["hire", "hiring", "hired", "available", "availability", "job", "jobs", "opportunity", "opportunities", "freelance", "internship", "intern", "recruit", "recruiter", "চাকরি", "চাকুরি", "কাজের জন্য", "প্রস্তুত", "নিয়োগ", "ফ্রিল্যান্স", "ইন্টার্নশিপ", "হায়ার"],
    actions: [{ kind: "email" }, { kind: "scroll", id: "contact", label: "contactForm" }],
  },
  {
    id: "stack",
    q: { en: "What is your tech stack?", bn: "আপনার টেক স্ট্যাক কী?" },
    a: {
      en: "My main stack is **Next.js, React, TypeScript, Node.js, Express, PostgreSQL and Prisma**. For machine learning I use **Python, PyTorch, scikit-learn and XGBoost**, and I deploy on Vercel and Railway.",
      bn: "আমার প্রধান স্ট্যাক **Next.js, React, TypeScript, Node.js, Express, PostgreSQL ও Prisma**। মেশিন লার্নিংয়ে আমি **Python, PyTorch, scikit-learn ও XGBoost** ব্যবহার করি, আর ডিপ্লয় করি Vercel ও Railway-তে।",
    },
    keywords: ["stack", "tech", "technology", "technologies", "skill", "skills", "tools", "tool", "framework", "frameworks", "languages", "টেক স্ট্যাক", "স্ট্যাক", "প্রযুক্তি", "দক্ষতা", "টুল"],
    actions: [{ kind: "scroll", id: "skills" }],
  },
  {
    id: "projects",
    q: { en: "What projects have you built?", bn: "আপনি কী কী প্রজেক্ট তৈরি করেছেন?" },
    a: {
      en: "Highlights: **Planora** (event management platform with SSLCommerz payments), **Dragon News** (responsive news portal with Firebase login) and **SkillBridge** (tutoring marketplace with role-based dashboards). I've also built CUETFinders and an e-commerce site.",
      bn: "উল্লেখযোগ্য প্রজেক্ট: **Planora** (SSLCommerz পেমেন্টসহ ইভেন্ট ম্যানেজমেন্ট প্ল্যাটফর্ম), **Dragon News** (Firebase লগইনসহ রেসপন্সিভ নিউজ পোর্টাল) এবং **SkillBridge** (রোল-ভিত্তিক ড্যাশবোর্ডসহ টিউটরিং মার্কেটপ্লেস)। এছাড়া CUETFinders ও একটি ই-কমার্স সাইটও তৈরি করেছি।",
    },
    keywords: ["project", "projects", "built", "build", "apps", "planora", "skillbridge", "dragon", "cuetfinders", "প্রজেক্ট", "অ্যাপ", "তৈরি করেছেন", "ওয়েবসাইট"],
    actions: [{ kind: "scroll", id: "projects" }],
  },
  {
    id: "research",
    q: { en: "Tell me about your research", bn: "আপনার গবেষণা সম্পর্কে বলুন" },
    a: {
      en: "My B.Sc. thesis detects AI-generated **Bangla speech** by fine-tuning the WavLM model, deployed as a public Hugging Face demo. My IEEE conference paper (under review) studies **scaffold-aware drug solubility prediction**.",
      bn: "আমার B.Sc. থিসিসে WavLM মডেল ফাইন-টিউন করে এআই-তৈরি **বাংলা কণ্ঠ** শনাক্ত করা হয়েছে, যা Hugging Face-এ পাবলিক ডেমো হিসেবে ডিপ্লয় করা আছে। আমার IEEE কনফারেন্স পেপারে (রিভিউ চলছে) **স্ক্যাফোল্ড-সচেতন ওষুধ দ্রবণীয়তা পূর্বাভাস** নিয়ে কাজ করা হয়েছে।",
    },
    keywords: ["research", "thesis", "paper", "papers", "publication", "publications", "ieee", "deepfake", "wavlm", "solubility", "machine learning", "deep learning", "গবেষণা", "থিসিস", "পেপার", "ডিপফেক", "মেশিন লার্নিং"],
    actions: [{ kind: "scroll", id: "research" }],
  },
  {
    id: "education",
    q: { en: "Where did you study, and what is your CGPA?", bn: "আপনি কোথায় পড়েছেন, সিজিপিএ কত?" },
    a: {
      en: "I'm a B.Sc. student in Computer Science and Engineering at **CUET** (CGPA **3.28 / 4.00**). Before that I completed HSC in Science at Noapara Govt. College with **GPA 5.00 / 5.00**.",
      bn: "আমি **চুয়েটে** কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে বি.এসসি. করছি (সিজিপিএ **৩.২৮ / ৪.০০**)। এর আগে নোয়াপাড়া সরকারি কলেজ থেকে বিজ্ঞান বিভাগে এইচএসসি সম্পন্ন করেছি, জিপিএ **৫.০০ / ৫.০০**।",
    },
    keywords: ["education", "study", "studied", "studying", "university", "cuet", "cgpa", "gpa", "degree", "college", "school", "শিক্ষা", "পড়", "বিশ্ববিদ্যালয়", "চুয়েট", "সিজিপিএ", "জিপিএ", "ডিগ্রি", "কলেজ"],
    actions: [{ kind: "scroll", id: "about" }],
  },
  {
    id: "cp",
    q: { en: "Do you do competitive programming?", bn: "আপনি কি প্রতিযোগিতামূলক প্রোগ্রামিং করেন?" },
    a: {
      en: "Yes, since 2022. I've solved **500+ problems** across platforms — **321+ on Codeforces** (rating 1077), 100+ on LeetCode and 80+ on others.",
      bn: "হ্যাঁ, ২০২২ সাল থেকে। বিভিন্ন প্ল্যাটফর্ম মিলিয়ে **৫০০+ সমস্যা** সমাধান করেছি — **Codeforces-এ ৩২১+** (রেটিং ১০৭৭), LeetCode-এ ১০০+ এবং অন্যান্য প্ল্যাটফর্মে ৮০+।",
    },
    keywords: ["competitive", "codeforces", "leetcode", "cp", "contest", "contests", "algorithm", "algorithms", "rating", "প্রতিযোগিতামূলক", "কোডফোর্সেস", "লিটকোড", "অ্যালগরিদম", "কনটেস্ট", "রেটিং"],
    actions: [{ kind: "scroll", id: "cp" }],
  },
  {
    id: "experience",
    q: { en: "What experience do you have?", bn: "আপনার কাজের অভিজ্ঞতা কী?" },
    a: {
      en: "I've worked in teams of 3–4 on university full-stack projects — leading the backend of **CUETFinders** — and independently built and deployed production-style apps like **Planora**, with JWT auth, role-based access and payment integration.",
      bn: "বিশ্ববিদ্যালয়ের ফুল-স্ট্যাক প্রজেক্টে ৩–৪ জনের দলে কাজ করেছি — **CUETFinders**-এর ব্যাকএন্ডে নেতৃত্ব দিয়েছি — এবং JWT অথেন্টিকেশন, রোল-ভিত্তিক অ্যাক্সেস ও পেমেন্ট ইন্টিগ্রেশনসহ **Planora**-র মতো প্রোডাকশন-মানের অ্যাপ নিজে তৈরি ও ডিপ্লয় করেছি।",
    },
    keywords: ["experience", "experienced", "career", "history", "অভিজ্ঞতা"],
    actions: [{ kind: "scroll", id: "experience" }],
  },
  {
    id: "contact",
    q: { en: "How can I contact you?", bn: "কীভাবে যোগাযোগ করব?" },
    a: {
      en: "Email me at **{email}**, use the contact form, or find me on LinkedIn, GitHub and Codeforces.",
      bn: "ইমেইল করুন **{email}**-এ, কিংবা কন্টাক্ট ফর্ম ব্যবহার করুন; LinkedIn, GitHub ও Codeforces-এও আমাকে পাবেন।",
    },
    keywords: ["contact", "email", "mail", "reach", "message", "linkedin", "github", "যোগাযোগ", "ইমেইল", "মেইল", "ফোন", "লিংকডইন", "গিটহাব", "বার্তা"],
    actions: [{ kind: "email" }, { kind: "scroll", id: "contact", label: "contactForm" }, { kind: "link", site: "linkedin" }, { kind: "link", site: "github" }],
  },
  {
    id: "location",
    q: { en: "Where are you based?", bn: "আপনি কোথায় থাকেন?" },
    a: {
      en: "I'm based in **Khulna, Bangladesh**, and I study at CUET in Chattogram.",
      bn: "আমার অবস্থান **খুলনা, বাংলাদেশ**। আমি চট্টগ্রামে চুয়েটে পড়ছি।",
    },
    keywords: ["where", "location", "based", "live", "city", "country", "bangladesh", "khulna", "কোথায় থাকেন", "কোথায় থাকো", "অবস্থান", "খুলনা", "ঠিকানা", "শহর"],
    actions: [{ kind: "scroll", id: "contact", label: "contactForm" }],
  },
  {
    id: "resume",
    q: { en: "Can I download your résumé?", bn: "আপনার রেজ্যুমে কি ডাউনলোড করা যাবে?" },
    a: {
      en: "Yes — you can download my résumé as a PDF below.",
      bn: "অবশ্যই — নিচ থেকে আমার রেজ্যুমে PDF আকারে ডাউনলোড করতে পারেন।",
    },
    keywords: ["resume", "résumé", "cv", "curriculum", "download", "রেজ্যুমে", "সিভি", "ডাউনলোড", "রিজিউম"],
    actions: [{ kind: "resume" }],
  },
];

export interface ChatUi {
  title: string; sub: string; launcher: string; open: string; close: string; reset: string;
  welcome: string; greet: string; fallback: string; placeholder: string; send: string;
  suggested: string; note: string; emailMe: string; contactForm: string; downloadResume: string;
  typing: string; goTo: (section: string) => string;
}

export const chatUi: Record<Lang, ChatUi> = {
  en: {
    title: "Ask Mahee", sub: "Instant answers about my work", launcher: "Ask me", open: "Open chat", close: "Close chat", reset: "Start over",
    welcome: "Hi! I'm Mahee's portfolio assistant. Pick a question below or type your own.",
    greet: "Hello! What would you like to know — my projects, skills, research or availability?",
    fallback: "I don't have an answer for that yet. I can answer questions about my background, skills, projects, research and availability — or you can email me directly.",
    placeholder: "Ask about my work, skills, availability…", send: "Send",
    suggested: "Suggested questions", note: "Automated answers written from this portfolio — not an AI.",
    emailMe: "Email me", contactForm: "Open contact form", downloadResume: "Download résumé", typing: "Typing…",
    goTo: s => `Go to ${s}`,
  },
  bn: {
    title: "মাহীকে জিজ্ঞাসা করুন", sub: "আমার কাজ নিয়ে দ্রুত উত্তর", launcher: "প্রশ্ন করুন", open: "চ্যাট খুলুন", close: "চ্যাট বন্ধ করুন", reset: "নতুন করে শুরু",
    welcome: "হ্যালো! আমি মাহীর পোর্টফোলিও সহকারী। নিচ থেকে একটি প্রশ্ন বেছে নিন, অথবা নিজের প্রশ্ন লিখুন।",
    greet: "হ্যালো! আপনি কী জানতে চান — আমার প্রজেক্ট, দক্ষতা, গবেষণা নাকি কাজের প্রাপ্যতা?",
    fallback: "এই প্রশ্নের উত্তর আমার কাছে এখনও নেই। আমি আমার পটভূমি, দক্ষতা, প্রজেক্ট, গবেষণা ও কাজের প্রাপ্যতা নিয়ে প্রশ্নের উত্তর দিতে পারি — অথবা সরাসরি ইমেইল করতে পারেন।",
    placeholder: "আমার কাজ, দক্ষতা, প্রাপ্যতা নিয়ে জিজ্ঞাসা করুন…", send: "পাঠান",
    suggested: "প্রস্তাবিত প্রশ্ন", note: "এই পোর্টফোলিওর তথ্য থেকে লেখা স্বয়ংক্রিয় উত্তর — এআই নয়।",
    emailMe: "ইমেইল করুন", contactForm: "কন্টাক্ট ফর্ম খুলুন", downloadResume: "রেজ্যুমে ডাউনলোড", typing: "লিখছে…",
    goTo: s => `${s} অংশে যান`,
  },
};

const GREETING = /^\s*(hi|hello|hey|hii+|yo|salam|assalamu\s*alaikum|good\s*(morning|afternoon|evening)|হাই|হ্যালো|আসসালামু\s*আলাইকুম|সালাম|নমস্কার)(?=[\s!.?]|$)[\s!.?]*$/i;
export const isGreeting = (text: string) => GREETING.test(text.trim());

/** Returns the best-matching FAQ id for a typed question, or null. */
export function matchFaq(input: string): string | null {
  const text = input.toLowerCase().normalize("NFC");
  const tokens = text.split(/[^a-z0-9+#.é]+/).filter(Boolean);
  let best: { id: string; score: number } | null = null;
  for (const item of FAQ) {
    let score = 0;
    for (const kw of item.keywords) {
      const isLatin = /^[a-zé ]+$/.test(kw);
      if (isLatin) {
        if (kw.includes(" ")) { if (text.includes(kw)) score += 2; }
        else if (tokens.some(t => t === kw || (kw.length >= 4 && t.startsWith(kw)))) score += 1;
      } else if (text.includes(kw)) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { id: item.id, score };
  }
  return best ? best.id : null;
}
