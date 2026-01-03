import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Robot & The Kid - Learn JavaScript',
  description: 'A story-driven game where learning JavaScript is the only way to progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}




