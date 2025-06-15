"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Play,
  Download,
  Trash2,
  Plus,
  CreditCard,
  Star,
  Calendar,
  Video,
  Eye,
  BarChart3,
  Sparkles
} from "lucide-react"
import AdCreatorDemo from "./AdCreatorDemo"
import FeedbackModal from "./FeedbackModal"
import UpgradePrompt from "./UpgradePrompt"

export default function Dashboard({
  user,
  generatedAds,
  onDeleteAd,
  onAddFeedback,
  onLogout
}) {
  const [showDemo, setShowDemo] = useState(false)
  const [selectedAd, setSelectedAd] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const handleCreateNew = () => {
    if (user.credits <= 0) {
      setShowUpgrade(true)
    } else {
      setShowDemo(true)
    }
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const handlePreview = ad => {
    setSelectedAd(ad)
    if (!ad.feedback) {
      setShowFeedback(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AdGenius AI</h1>
                <p className="text-sm text-gray-400">
                  Welcome back, {user.name}!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">
                  {user.credits} credits
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={onLogout}
                className="text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Low Credits Banner */}
        {user.credits <= 2 && (
          <div className="mb-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">
                  ⚠️ Running Low on Credits
                </h3>
                <p className="text-gray-300 text-sm">
                  You have {user.credits} credits remaining. Upgrade to continue
                  creating ads.
                </p>
              </div>
              <Button
                onClick={() => setShowUpgrade(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Ads</p>
                <p className="text-2xl font-bold text-white">
                  {generatedAds.length}
                </p>
              </div>
              <Video className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Credits Left</p>
                <p className="text-2xl font-bold text-white">{user.credits}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">
                  {generatedAds.filter(ad => ad.feedback).length > 0
                    ? (
                        generatedAds
                          .filter(ad => ad.feedback)
                          .reduce(
                            (sum, ad) => sum + (ad.feedback?.rating || 0),
                            0
                          ) / generatedAds.filter(ad => ad.feedback).length
                      ).toFixed(1)
                    : "—"}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">
                  {
                    generatedAds.filter(
                      ad =>
                        new Date(ad.createdAt).getMonth() ===
                        new Date().getMonth()
                    ).length
                  }
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">Your Advertisements</h2>
          <Button
            onClick={handleCreateNew}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Plus className="mr-2 w-5 h-5" />
            Create New Ad
          </Button>
        </div>

        {/* Ads Grid */}
        {generatedAds.length === 0 ? (
          <div className="text-center py-16">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No ads created yet
            </h3>
            <p className="text-gray-400 mb-6">
              Create your first AI-powered advertisement to get started
            </p>
            <Button
              onClick={handleCreateNew}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Plus className="mr-2 w-5 h-5" />
              Create Your First Ad
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedAds.map(ad => (
              <div
                key={ad.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all"
              >
                <div className="relative">
                  <img
                    src={ad.thumbnailUrl || "/placeholder.svg"}
                    alt={ad.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      onClick={() => handlePreview(ad)}
                      className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                    >
                      <Eye className="mr-2 w-4 h-4" />
                      Preview
                    </Button>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {ad.duration}s
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {ad.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{ad.productName}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(ad.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-1" />
                      {ad.resolution}
                    </div>
                  </div>

                  {ad.feedback && (
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < ad.feedback.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm ml-2">
                        ({ad.feedback.rating}/5)
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handlePreview(ad)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Play className="mr-2 w-4 h-4" />
                      Play
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeleteAd(ad.id)}
                      className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showDemo && <AdCreatorDemo onClose={() => setShowDemo(false)} />}
      {showUpgrade && <UpgradePrompt onClose={() => setShowUpgrade(false)} />}
      {showFeedback && selectedAd && (
        <FeedbackModal
          ad={selectedAd}
          onClose={() => {
            setShowFeedback(false)
            setSelectedAd(null)
          }}
          onSubmit={(rating, comment) => {
            onAddFeedback(selectedAd.id, rating, comment)
            setShowFeedback(false)
            setSelectedAd(null)
          }}
        />
      )}
    </div>
  )
}
