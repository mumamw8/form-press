import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { EB_Garamond, Barlow } from "next/font/google"
import { cn } from "@/utils"

import "./globals.css"
import { Providers } from "@/components/providers"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
// const eb_garamond = EB_Garamond({
//   subsets: ["latin"],
//   variable: "--font-heading",
// })

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "jStack App",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, barlow.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <main className="relative flex-1 flex flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
