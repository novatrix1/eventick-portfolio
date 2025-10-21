import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eventick | Réinventons l’expérience des événements",
    template: "%s | Eventick",
  },
  description:
    "Eventick est une plateforme moderne de gestion et de billetterie d'événements. Découvrez, réservez et vivez vos événements préférés en un clic.",
  keywords: [
    "Eventick",
    "billetterie",
    "événements",
    "réservation",
    "Mauritanie",
    "ticket",
    "Next.js",
    "startup",
  ],
  authors: [{ name: "Novatrix", url: "https://www.novatrix.dev" }],
  creator: "Novatrix",
  publisher: "Eventick",
  metadataBase: new URL("https://eventick.novatrix.dev"),
  openGraph: {
    title: "Eventick – Réinventons la billetterie en ligne",
    description:
      "Découvrez et réservez vos événements préférés sur Eventick. Simple, rapide et sécurisé.",
    url: "https://eventick.novatrix.dev",
    siteName: "Eventick",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "//manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a9a9b" />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
         
        `}
      >
        <Header />

        <main className="flex-1 container mx-auto px-4 md:px-8 py-20">
          {children}
        </main>

        {/* FOOTER GLOBAL */}
        <Footer />

        {/* Script Analytics (facultatif si tu veux l’ajouter plus tard) */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}
