"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Star } from "lucide-react"
import AdCreatorDemo from "./AdCreatorDemo"

export default function Hero() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <>
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">
                Trusted by 10,000+ sellers worldwide
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Create Stunning
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                AI-Powered{" "}
              </span>
              Product Ads
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your product photos into professional advertisement
              videos with AI models, stunning backgrounds, and engaging content.
              No expensive photo shoots required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button
                size="lg"
                onClick={() => setShowDemo(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg"
              >
                Start Creating Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  10,000+
                </div>
                <div className="text-gray-400">Ads Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-400">Customer Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">3x</div>
                <div className="text-gray-400">Higher Conversion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDemo && <AdCreatorDemo onClose={() => setShowDemo(false)} />}
    </>
  )
}
