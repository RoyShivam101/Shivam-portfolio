import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shivam Roy - Personal Branding Specialist | LinkedIn Authority Builder',
  description: 'Transform your expertise into digital authority that attracts premium opportunities. Done-for-you LinkedIn personal branding for founders, lawyers, law firms and legal tech companies.',
  keywords: 'LinkedIn personal branding, digital authority, thought leadership, legal marketing, founder branding, LinkedIn strategy, professional branding',
  authors: [{ name: 'Shivam Roy' }],
  creator: 'Shivam Roy',
  publisher: 'Shivam Roy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Shivam Roy - Personal Branding Specialist',
    description: 'Build LinkedIn Authority That Attracts Premium Opportunities',
    siteName: 'Shivam Roy Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivam Roy - Personal Branding Specialist',
    description: 'Build LinkedIn Authority That Attracts Premium Opportunities',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Basic favicon as data URI - no external files needed */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨‍💼</text></svg>" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}