import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Aadhi | SOC Analyst Portfolio — Network & Cybersecurity",
  description:
    "Portfolio of Aadhithyan KM — B.Tech CSE student pursuing a SOC Analyst career. Hands-on home lab with Splunk, Wazuh & Kali Linux. Cisco CCST Cybersecurity certified.",
  keywords: [
    "SOC analyst",
    "cybersecurity portfolio",
    "network security",
    "splunk",
    "wazuh",
    "SIEM",
    "blue team",
    "kali linux",
    "cisco ccst",
    "incident response",
    "threat detection",
    "blockchain developer",
  ],
  authors: [{ name: "Aadhi" }],
  openGraph: {
    title: "Aadhi | Developer Portfolio",
    description: "Cybersecurity & CS — Immersive 3D Developer Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aadhi | Developer Portfolio",
    description: "Cybersecurity & CS — Immersive 3D Developer Portfolio",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground relative selection:bg-cyan-500/30">
        {/* Global boundary lines grid & scanlines */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 scanlines opacity-50 mix-blend-overlay" />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}