import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "29",
      period: "month",
      description: "Perfect for small businesses getting started",
      features: [
        "50 AI-generated ads per month",
        "Basic AI models",
        "Standard backgrounds",
        "720p video quality",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "79",
      period: "month",
      description: "Ideal for growing online stores",
      features: [
        "200 AI-generated ads per month",
        "Premium AI models",
        "Custom backgrounds",
        "1080p video quality",
        "Priority support",
        "Analytics dashboard",
        "Commercial license"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      period: "month",
      description: "For large businesses and agencies",
      features: [
        "Unlimited AI-generated ads",
        "All AI models & styles",
        "Custom brand integration",
        "4K video quality",
        "Dedicated account manager",
        "API access",
        "White-label solution"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a
            14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500 scale-105"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                Start Free Trial
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
