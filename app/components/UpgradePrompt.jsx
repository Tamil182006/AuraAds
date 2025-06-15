"use client"
import { Button } from "@/components/ui/button"
import { X, Zap, Check, CreditCard } from "lucide-react"

export default function UpgradePrompt({ onClose }) {
  const plans = [
    {
      name: "Starter Pack",
      credits: 50,
      price: 19,
      popular: false,
      features: ["50 AI-generated ads", "HD quality", "Basic models"]
    },
    {
      name: "Pro Pack",
      credits: 200,
      price: 49,
      popular: true,
      features: [
        "200 AI-generated ads",
        "4K quality",
        "Premium models",
        "Priority support"
      ]
    },
    {
      name: "Business Pack",
      credits: 500,
      price: 99,
      popular: false,
      features: [
        "500 AI-generated ads",
        "4K quality",
        "All models",
        "API access",
        "White-label"
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl w-full max-w-4xl border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Upgrade Your Plan</h2>
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

        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">
              You're out of credits!
            </h3>
            <p className="text-gray-300">
              Choose a plan to continue creating amazing AI advertisements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all ${
                  plan.popular
                    ? "border-purple-500 scale-105"
                    : "border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl font-bold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-1">one-time</span>
                  </div>
                  <p className="text-purple-400 font-medium">
                    {plan.credits} credits
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  <CreditCard className="mr-2 w-4 h-4" />
                  Get {plan.credits} Credits
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              💳 Secure payment • 💯 Money-back guarantee • 🔒 Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
