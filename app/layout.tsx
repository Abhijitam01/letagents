import React from "react"
import type { Metadata } from "next"
import { Courier_Prime, Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { getSiteUrl } from "@/lib/env"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plex",
})
const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "LetAgents — Let agents run the cloud.",
  description: "Infrastructure that lets AI coding agents deploy, operate, and debug real applications.",
  keywords: ["AI infrastructure", "coding agents", "agent-native cloud", "developer tools", "LetAgents"],
  authors: [{ name: "LetAgents" }],
  openGraph: {
    title: "LetAgents — Let agents run the cloud.",
    description: "Infrastructure that lets AI coding agents deploy, operate, and debug real applications.",
    type: "website",
    url: siteUrl,
    siteName: "LetAgents",
  },
  twitter: {
    card: "summary_large_image",
    title: "LetAgents — Let agents run the cloud.",
    description: "Infrastructure that lets AI coding agents deploy, operate, and debug real applications.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${plex.variable} ${courier.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
