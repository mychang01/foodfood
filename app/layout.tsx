import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reduce Food Waste",
  description: "Join the movement to reduce food waste and create a sustainable future.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-600 text-white">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              FoodSaver - AI suggest your dish
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:underline">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/importance" className="hover:underline">
                  Why It Matters
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-green-600 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} FoodSaver. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

