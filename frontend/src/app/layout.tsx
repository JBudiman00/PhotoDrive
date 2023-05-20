import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './components/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PhotoDrive',
  description: 'Store your photos conveniently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
    </html>
  )
}
