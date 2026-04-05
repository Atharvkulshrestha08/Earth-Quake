import type { Metadata } from "next";
import { Inter, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Earth-Quake | Disaster Intelligence Platform",
    template: "%s | Earth-Quake",
  },
  description:
    "Predict early. Alert everyone. Save lives. Real-time disaster alerts and emergency response coordination platform for India.",
  keywords: [
    "disaster alert",
    "earthquake warning",
    "flood alert",
    "cyclone warning",
    "emergency response",
    "India disaster management",
  ],
  authors: [{ name: "Earth-Quake Team" }],
  creator: "Earth-Quake",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://earthquake.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Earth-Quake",
    title: "Earth-Quake | Disaster Intelligence Platform",
    description: "Predict early. Alert everyone. Save lives.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earth-Quake | Disaster Intelligence Platform",
    description: "Predict early. Alert everyone. Save lives.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { DisasterProvider } from "@/providers/DisasterProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <DisasterProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </DisasterProvider>
      </body>
    </html>
  );
}
