import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Oswald } from 'next/font/google'
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' })

export const metadata = {
  title: 'ILTMC - Intrepidus Leones Tripura Motorcycle Club',
  description: 'Elite motorcycle club based in Tripura, India. Est. 2013. Brotherhood, Freedom, Respect.',
  keywords: 'motorcycle club, Tripura, ILTMC, bikers, riding club, India',
  openGraph: {
    title: 'ILTMC - Intrepidus Leones Tripura Motorcycle Club',
    description: 'Elite motorcycle club based in Tripura, India. Est. 2013.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${oswald.variable}`}>
      <head>
        <meta name="google-site-verification" content="WXPUxDpIv-zwhbwYK5P9uN6tGfdgF70MVjmeYx2O6-A" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
