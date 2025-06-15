import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AdGenius AI - AI-Powered Advertisement Generator",
  description:
    "Transform your product photos into professional advertisement videos with AI models, stunning backgrounds, and engaging content. Perfect for online sellers and small businesses.",
  keywords:
    "AI advertisement, product marketing, AI models, e-commerce ads, video generation",
  openGraph: {
    title: "AdGenius AI - AI-Powered Advertisement Generator",
    description:
      "Create professional product ads with AI in seconds. No expensive photo shoots required.",
    type: "website"
  },
  generator: "v0.dev"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
