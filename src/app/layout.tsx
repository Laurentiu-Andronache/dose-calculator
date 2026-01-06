import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'HED Calculator - Human Equivalent Dose',
  description:
    'Calculate human equivalent doses from animal studies using allometric scaling. Convert doses between mice, rats, and other species to human equivalent doses.',
  keywords: [
    'human equivalent dose',
    'HED',
    'dose calculator',
    'allometric scaling',
    'animal to human dose',
    'FDA scaling factor',
    'drug dose conversion',
  ],
  openGraph: {
    title: 'HED Calculator - Human Equivalent Dose',
    description: 'Calculate human equivalent doses from animal studies using allometric scaling.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 font-sans antialiased dark:bg-slate-900`}
      >
        {children}
      </body>
    </html>
  )
}
