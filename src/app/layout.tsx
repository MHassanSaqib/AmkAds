import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import CursorGlow from '@/components/CursorGlow'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AmkAds — Leading Out-of-Home Media & Advertising Agency',
  description:
    'AmkAds is a premier Out-of-Home (OOH) advertising agency delivering nationwide billboard, transit, digital, and airport media solutions with cutting-edge planning tech.',
  keywords: [
    'OOH advertising', 'out-of-home media', 'billboard advertising',
    'AmkAds', 'outdoor advertising Pakistan', 'media buying', 'DOOH',
  ],
  openGraph: {
    title: 'AmkAds — Leading OOH Advertising Agency',
    description: 'End-to-end outdoor media planning, buying & analytics.',
    type: 'website',
    images: ['/images/amk-ads-logo-final.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/amk-ads-logo-final.png'],
  },
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-brand-black text-white antialiased">
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
