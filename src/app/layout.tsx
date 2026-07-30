import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

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
  },
  icons: {
    icon: '/favicon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-brand-navy text-white antialiased">
        {children}
      </body>
    </html>
  )
}
