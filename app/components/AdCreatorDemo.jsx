"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  X,
  Upload,
  Play,
  Pause,
  Download,
  Share2,
  Sparkles,
  Check,
  Volume2,
  VolumeX,
  RotateCcw
} from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function AdCreatorDemo({ onClose, onAdGenerated }) {
  const [currentStep, setCurrentStep] = useState("upload")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const { user, useCredit, addGeneratedAd } = useAuth()
  const [showFeedback, setShowFeedback] = useState(false)

  const models = [
    {
      id: "female",
      name: "Emma",
      description:
        "Professional model, perfect for fashion and lifestyle products",
      image: "/placeholder.svg?height=200&width=150",
      style: "Elegant & Modern"
    },
    {
      id: "male",
      name: "Alex",
      description: "Versatile model, great for tech and sports products",
      image: "/placeholder.svg?height=200&width=150",
      style: "Bold & Dynamic"
    }
  ]

  const handleFileUpload = file => {
    setUploadedFile(file)
    setTimeout(() => {
      setCurrentStep("model-selection")
    }, 1000)
  }

  const handleDrop = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = e => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const startGeneration = () => {
    // Use a credit
    const creditUsed = useCredit()
    if (!creditUsed) {
      alert("Unable to use credit. Please try again.")
      return
    }

    // Check if user has credits
    if (!user || user.credits <= 0) {
      alert("You need credits to generate ads. Please upgrade your plan.")
      return
    }

    setCurrentStep("generating")
    setGenerationProgress(0)

    // PLACEHOLDER: Real AI API call would go here
    /*
    // Example of where real AI API integration would happen:
    const generateAdWithAI = async () => {
      try {
        const response = await fetch('/api/generate-ad', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productImage: uploadedFile,
            modelType: selectedModel,
            userId: user.id
          })
        })
        
        const result = await response.json()
        
        if (result.success) {
          // Handle successful generation
          setCurrentStep("result")
          addGeneratedAd({
            title: result.adTitle,
            productName: result.productName,
            modelUsed: selectedModel,
            backgroundStyle: result.backgroundStyle,
            videoUrl: result.videoUrl,
            thumbnailUrl: result.thumbnailUrl,
            duration: result.duration,
            format: result.format,
            resolution: result.resolution
          })
        }
      } catch (error) {
        console.error('AI generation failed:', error)
        // Handle error - maybe refund the credit
      }
    }
    
    generateAdWithAI()
    */

    // Simulate AI processing for demo
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setCurrentStep("result")

            // Add the generated ad to user's collection
            if (addGeneratedAd) {
              addGeneratedAd({
                title: `${uploadedFile?.name || "Product"} Advertisement`,
                productName: uploadedFile?.name || "Product",
                modelUsed: selectedModel || "female",
                backgroundStyle: "Modern Studio",
                videoUrl: "/placeholder-video.mp4",
                thumbnailUrl: "/placeholder.svg?height=200&width=300",
                duration: 15,
                format: "MP4",
                resolution: "1080p"
              })
            }

            onAdGenerated?.({
              title: `${uploadedFile?.name || "Product"} Advertisement`,
              productName: uploadedFile?.name || "Product"
            })
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const resetDemo = () => {
    setCurrentStep("upload")
    setUploadedFile(null)
    setSelectedModel(null)
    setGenerationProgress(0)
    setIsPlaying(false)
    setIsMuted(true)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">AI Ad Creator</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { step: "upload", label: "Upload Product", icon: Upload },
              {
                step: "model-selection",
                label: "Choose Model",
                icon: Sparkles
              },
              { step: "generating", label: "AI Generation", icon: Play },
              { step: "result", label: "Your Ad", icon: Check }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep === item.step
                      ? "bg-purple-500 border-purple-500 text-white"
                      : index <
                        [
                          "upload",
                          "model-selection",
                          "generating",
                          "result"
                        ].indexOf(currentStep)
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-white/30 text-white/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep === item.step
                      ? "text-white font-medium"
                      : "text-white/70"
                  }`}
                >
                  {item.label}
                </span>
                {index < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      index <
                      [
                        "upload",
                        "model-selection",
                        "generating",
                        "result"
                      ].indexOf(currentStep)
                        ? "bg-green-500"
                        : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Step */}
          {currentStep === "upload" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Upload Your Product
              </h3>
              <p className="text-gray-300 mb-8">
                Upload a product image or 360° video to get started
              </p>

              <div
                className="border-2 border-dashed border-white/30 rounded-2xl p-12 hover:border-purple-500 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white text-lg mb-2">
                  Drag & drop your product file here
                </p>
                <p className="text-gray-400 mb-4">or click to browse</p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, GIF, MP4, MOV (max 100MB)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile && (
                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-white">✅ Uploaded: {uploadedFile.name}</p>
                </div>
              )}
            </div>
          )}

          {/* Model Selection Step */}
          {currentStep === "model-selection" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Choose Your AI Model
              </h3>
              <p className="text-gray-300 mb-8">
                Select the perfect model to showcase your product
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {models.map(model => (
                  <div
                    key={model.id}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedModel === model.id
                        ? "border-purple-500 bg-purple-500/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <img
                      src={model.image || "/placeholder.svg"}
                      alt={model.name}
                      className="w-32 h-48 object-cover rounded-lg mx-auto mb-4"
                    />
                    <h4 className="text-xl font-bold text-white mb-2">
                      {model.name}
                    </h4>
                    <p className="text-gray-300 text-sm mb-2">
                      {model.description}
                    </p>
                    <p className="text-purple-400 text-sm font-medium">
                      {model.style}
                    </p>
                  </div>
                ))}
              </div>

              {selectedModel && (
                <Button
                  onClick={startGeneration}
                  className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                >
                  Generate AI Advertisement
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          )}

          {/* Generation Step */}
          {currentStep === "generating" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Creating Your AI Advertisement
              </h3>
              <p className="text-gray-300 mb-8">
                Our AI is generating a professional ad with your product...
              </p>

              <div className="max-w-md mx-auto">
                <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <p className="text-white text-lg font-medium">
                  {Math.round(generationProgress)}% Complete
                </p>
              </div>

              <div className="mt-8 space-y-3 text-left max-w-md mx-auto">
                {[
                  {
                    text: "Analyzing product features...",
                    completed: generationProgress > 20
                  },
                  {
                    text: "Selecting optimal background...",
                    completed: generationProgress > 40
                  },
                  {
                    text: "Positioning AI model...",
                    completed: generationProgress > 60
                  },
                  {
                    text: "Adding promotional elements...",
                    completed: generationProgress > 80
                  },
                  {
                    text: "Finalizing advertisement...",
                    completed: generationProgress > 95
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed ? "bg-green-500" : "bg-white/20"
                      }`}
                    >
                      {item.completed && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={`${
                        item.completed ? "text-white" : "text-gray-400"
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result Step */}
          {currentStep === "result" && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your AI Advertisement is Ready!
                </h3>
                <p className="text-gray-300">
                  Professional quality ad generated in seconds
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Video Preview */}
                <div className="space-y-4">
                  <div className="relative bg-black rounded-2xl overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full aspect-video object-cover"
                      poster="/placeholder.svg?height=400&width=600"
                      muted={isMuted}
                      loop
                    >
                      <source src="/placeholder-video.mp4" type="video/mp4" />
                    </video>

                    {/* Video Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <Button
                        size="sm"
                        onClick={togglePlay}
                        className="bg-black/50 hover:bg-black/70 text-white"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>

                      <Button
                        size="sm"
                        onClick={toggleMute}
                        className="bg-black/50 hover:bg-black/70 text-white"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* Promotional Text Overlay */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 rounded-lg p-3">
                        <p className="text-white font-bold text-lg">
                          🔥 LIMITED TIME OFFER
                        </p>
                        <p className="text-white text-sm">
                          Get 30% OFF - Use code: SAVE30
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Duration:</span>
                      <span className="text-gray-300">15 seconds</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">
                        Resolution:
                      </span>
                      <span className="text-gray-300">1080p HD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Format:</span>
                      <span className="text-gray-300">MP4</span>
                    </div>
                  </div>
                </div>

                {/* Actions & Details */}
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">
                      Advertisement Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Model:</span>
                        <span className="text-white">
                          {selectedModel === "female" ? "Emma" : "Alex"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Background:</span>
                        <span className="text-white">Modern Studio</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Music:</span>
                        <span className="text-white">Upbeat Commercial</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Style:</span>
                        <span className="text-white">Professional</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3">
                      <Download className="mr-2 w-5 h-5" />
                      Download HD Video
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 py-3"
                    >
                      <Share2 className="mr-2 w-5 h-5" />
                      Share Advertisement
                    </Button>

                    <Button
                      onClick={() => setShowFeedback(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3"
                    >
                      Rate This Ad
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={resetDemo}
                      className="w-full text-white hover:bg-white/10 py-3"
                    >
                      <RotateCcw className="mr-2 w-5 h-5" />
                      Create Another Ad
                    </Button>
                  </div>

                  {/* Upgrade Prompt */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                    <h5 className="text-white font-bold mb-2">
                      🚀 Upgrade to Pro
                    </h5>
                    <p className="text-gray-300 text-sm mb-3">
                      Get unlimited downloads, 4K quality, and access to all AI
                      models
                    </p>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
