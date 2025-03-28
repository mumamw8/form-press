import type { Metadata } from "next"
import { Inter, Barlow } from "next/font/google"

import "./globals.css"
import { Providers } from "@/components/providers"
import { ClerkProvider } from "@clerk/nextjs"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import StyledComponentsRegistry from "@/lib/registry"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "forma",
  description: "Forms for business",
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
        <head>
          {/* <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"/> */}
        </head>
        <body className="min-h-[calc(100vh-1px)] font-sans bg-brand-50 text-brand-950 antialiased">
          <StyledComponentsRegistry>
            <NuqsAdapter>
              <main
              // className="relative flex-1 flex flex-col"
              >
                <NextTopLoader />
                <Providers>{children}</Providers>
              </main>
              <Toaster />
            </NuqsAdapter>
          </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  )
}
