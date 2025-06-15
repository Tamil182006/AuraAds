"use client"
import { useState } from "react"
import { Menu, X, Sparkles, User, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../hooks/useAuth"
import AuthModal from "./AuthModal"

export default function Header({ showApiDocs }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const { isAuthenticated, user, login, signup } = useAuth()

  const handleAuth = async (email, password, name, isSignup) => {
    if (isSignup && name) {
      return await signup(email, password, name)
    } else {
      return await login(email, password)
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AdGenius AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
            {showApiDocs && (
              <button
                onClick={showApiDocs}
                className="text-gray-300 hover:text-white transition-colors flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                API Docs
              </button>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.name}</span>
                </div>
                <Button
                  onClick={() => (window.location.href = "#dashboard")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowAuth(true)}
                  className="text-white hover:bg-white/10"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => setShowAuth(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </a>
              {showApiDocs && (
                <button
                  onClick={showApiDocs}
                  className="text-gray-300 hover:text-white transition-colors text-left flex items-center"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  API Docs
                </button>
              )}
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 justify-start"
                >
                  Sign In
                </Button>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />
      )}
    </header>
  )
}
