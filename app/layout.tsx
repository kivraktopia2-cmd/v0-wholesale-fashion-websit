import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://direnber.eu"),
  title: {
    default: "DiRENBER - Hurtownia Odzieży Damskiej | Sprzedaż Hurtowa",
    template: "%s | DiRENBER",
  },
  description:
    "DiRENBER - profesjonalna hurtownia odzieży damskiej. Wysokiej jakości sukienki, bluzki, spodnie w asortymentach hurtowych. Minimum zamówienie 300 PLN. Dostawa 2-3 dni robocze.",
  keywords: [
    "hurtownia odzieży damskiej",
    "odzież damska hurt",
    "sukienki hurt",
    "bluzki hurt",
    "spodnie hurt",
    "sprzedaż hurtowa odzieży",
    "DiRENBER",
    "hurtownia Polska",
  ],
  authors: [{ name: "DiRENBER" }],
  creator: "DiRENBER",
  publisher: "DIRENBER Sp. z o.o.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://direnber.eu",
    siteName: "DiRENBER",
    title: "DiRENBER - Hurtownia Odzieży Damskiej",
    description: "Wysokiej jakości odzież damska w asortymentach hurtowych. Minimum zamówienie 300 PLN.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiRENBER - Hurtownia Odzieży Damskiej",
    description: "Wysokiej jakości odzież damska w asortymentach hurtowych",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl">
      <body className={`font-sans ${inter.variable}`}>
        <AnalyticsTracker />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
