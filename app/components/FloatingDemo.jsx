"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import AdCreatorDemo from "./AdCreatorDemo"

export default function FloatingDemo() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <>
      {/* Floating Demo Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setShowDemo(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          <Sparkles className="mr-2 w-5 h-5" />
          Try Demo
        </Button>
      </div>

      {showDemo && <AdCreatorDemo onClose={() => setShowDemo(false)} />}
    </>
  )
}
