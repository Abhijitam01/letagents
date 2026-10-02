import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Courier_Prime } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _courierPrime = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LetAgents — Let agents run the cloud.',
  description: 'Infrastructure that lets AI coding agents deploy, operate, and debug real applications.',
  keywords: ['AI infrastructure', 'coding agents', 'agent-native cloud', 'developer tools', 'LetAgents'],
  authors: [{ name: 'LetAgents' }],
  openGraph: {
    title: 'LetAgents — Let agents run the cloud.',
    description: 'Infrastructure that lets AI coding agents deploy, operate, and debug real applications.',
    type: 'website',
    url: 'https://letagents.dev',
    siteName: 'LetAgents',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LetAgents — Let agents run the cloud.',
    description: 'Infrastructure that lets AI coding agents deploy, operate, and debug real applications.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
