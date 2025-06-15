"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mail, Lock, User, Loader2 } from "lucide-react"

export default function AuthModal({ onClose, onAuth }) {
  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  })
  const [error, setError] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await onAuth(
        formData.email,
        formData.password,
        formData.name,
        isSignup
      )

      if (success) {
        onClose()
      } else {
        setError("Authentication failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignup && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, name: e.target.value }))
                  }
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  required={isSignup}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={e =>
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                }
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={e =>
                  setFormData(prev => ({ ...prev, password: e.target.value }))
                }
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                {isSignup ? "Creating Account..." : "Signing In..."}
              </>
            ) : isSignup ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          {isSignup && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <p className="text-purple-300 text-sm text-center">
                🎉 Get 10 free ad credits when you sign up!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
