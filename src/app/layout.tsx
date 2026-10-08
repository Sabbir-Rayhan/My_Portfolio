import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/portfolio";
import SmoothScroll from "@/components/layout/SmoothScroll";
import DynamicBackground from "@/components/layout/DynamicBackground";

const siteUrl = "https://maheeportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Sabbir Rayhan Mahee",
  title: { default: `${personalInfo.name} | Software Engineer & Full-Stack Developer`, template: `%s | ${personalInfo.name}` },
  description: personalInfo.description,
  keywords: ["Full-Stack Developer","Software Engineer","Machine Learning","Deep Learning","Audio Deepfake Detection","Next.js","React","TypeScript","Node.js","PostgreSQL","Bangladesh","CUET","Sabbir Rayhan Mahee"],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  alternates: { canonical: "/" },
  verification: {
    google: "Mk3EfaAJhvUg7Utj6AV0cacpvfmY2tiJGiQS_zEIkEE",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sabbir Rayhan Mahee",
    title: `${personalInfo.name} | Software Engineer & Full-Stack Developer`,
    description: personalInfo.description,
    images: [{ url: personalInfo.photo, width: 800, height: 800, alt: personalInfo.name }],
  },
  robots: { index: true, follow: true },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"], axes: ["opsz"], display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"], display: "swap" });

export const viewport: Viewport = { themeColor: "#0d1012" };

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sabbir Rayhan Mahee",
  alternateName: ["Sabbir Rayhan Mahee Portfolio", "Mahee Portfolio"],
  url: siteUrl,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div className="page-glow" aria-hidden />
        <DynamicBackground />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}