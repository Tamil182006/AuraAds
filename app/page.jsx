"use client"

import { useState } from "react"
import { useAuth } from "./hooks/useAuth"
import Header from "./components/Header"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import Features from "./components/Features"
import Pricing from "./components/Pricing"
import Testimonials from "./components/Testimonials"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"
import FloatingDemo from "./components/FloatingDemo"
import Dashboard from "./components/Dashboard"
import ApiDocs from "./components/ApiDocs"

export default function Home() {
  const {
    isAuthenticated,
    user,
    generatedAds,
    logout,
    deleteAd,
    addFeedback
  } = useAuth()
  const [showApiDocs, setShowApiDocs] = useState(false)

  // Show API docs if requested
  if (showApiDocs) {
    return <ApiDocs />
  }

  // Show dashboard if user is authenticated
  if (isAuthenticated && user) {
    return (
      <Dashboard
        user={user}
        generatedAds={generatedAds}
        onDeleteAd={deleteAd}
        onAddFeedback={addFeedback}
        onLogout={logout}
      />
    )
  }

  // Show landing page for non-authenticated users
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header showApiDocs={() => setShowApiDocs(true)} />
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
      <FloatingDemo />
    </main>
  )
}
