"use client"
import {
  Sparkles,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer({ showApiDocs }) {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AdGenius AI</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your product marketing with AI-powered advertisement
              generation. Create professional ads in seconds, not hours.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                {showApiDocs ? (
                  <button
                    onClick={showApiDocs}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    API
                  </button>
                ) : (
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API
                  </a>
                )}
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 AdGenius AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
