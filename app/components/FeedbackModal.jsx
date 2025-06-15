"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Star } from "lucide-react"

export default function FeedbackModal({ ad, onClose, onSubmit }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment.trim() || undefined)
    }
  }

  const ratingLabels = {
    1: "😞 Poor",
    2: "😐 Fair",
    3: "🙂 Good",
    4: "😊 Great",
    5: "🤩 Excellent"
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">How was this ad?</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Ad Preview */}
          <div className="text-center">
            <img
              src={ad.thumbnailUrl || "/placeholder.svg"}
              alt={ad.title}
              className="w-32 h-20 object-cover rounded-lg mx-auto mb-2"
            />
            <p className="text-white font-medium">{ad.title}</p>
            <p className="text-gray-400 text-sm">{ad.productName}</p>
          </div>

          {/* Rating */}
          <div className="text-center">
            <p className="text-white font-medium mb-4">Rate your experience</p>
            <div className="flex justify-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {(hoveredRating || rating) > 0 && (
              <p className="text-purple-300 text-sm">
                {ratingLabels[hoveredRating || rating]}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="text-white font-medium mb-2 block">
              Additional feedback (optional)
            </label>
            <Textarea
              placeholder="Tell us what you think about this ad..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
