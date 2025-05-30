import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'CourseCrafter - AI-Powered Course Creation',
    template: '%s | CourseCrafter',
  },
  description:
    'Transform your expertise into structured, engaging courses with AI power. Create comprehensive learning content effortlessly with CourseCrafter - the modern course creation platform for educators and professionals.',
  keywords: [
    'course creation',
    'AI course generator',
    'educational content',
    'online learning',
    'course builder',
    'AI education',
    'learning management',
    'course design',
    'educational technology',
    'teaching tools',
  ],
  authors: [{ name: 'Bartug Kaan' }],
  creator: 'Bartug Kaan',
  publisher: 'CourseCrafter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://course-crafter-amber.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CourseCrafter - AI-Powered Course Creation',
    description:
      'Transform your expertise into structured, engaging courses with AI power. Create comprehensive learning content effortlessly.',
    url: 'https://course-crafter-amber.vercel.app/',
    siteName: 'CourseCrafter',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CourseCrafter - AI-Powered Course Creation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CourseCrafter - AI-Powered Course Creation',
    description:
      'Transform your expertise into structured, engaging courses with AI power.',
    images: ['/og-image.png'],
    creator: '@BartugKaan',
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
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/favicon-16x16.png?v=2',
    apple: '/apple-touch-icon.png?v=2',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CourseCrafter',
    description:
      'Transform your expertise into structured, engaging courses with AI power. Create comprehensive learning content effortlessly.',
    url: 'https://course-crafter-amber.vercel.app/',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Person',
      name: 'Bartug Kaan',
    },
    featureList: [
      'AI-Powered Course Generation',
      'Multi-Language Support',
      'Customizable Course Levels',
      'Video Resource Integration',
      'Mobile-Responsive Design',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#059669" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
