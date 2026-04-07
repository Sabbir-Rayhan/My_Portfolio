import type { Metadata } from "next";
import "./globals.css";
import { personalInfo } from "@/data/portfolio";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: { default: `${personalInfo.name} | Full-Stack Developer`, template: `%s | ${personalInfo.name}` },
  description: personalInfo.description,
  keywords: ["Full-Stack Developer","Next.js","React","TypeScript","Node.js","PostgreSQL","Bangladesh","CUET","Sabbir Rayhan Mahee"],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    title: `${personalInfo.name} | Full-Stack Developer`,
    description: personalInfo.description,
    images: [{ url: personalInfo.photo, width: 800, height: 800, alt: personalInfo.name }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#050810] text-slate-200">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
