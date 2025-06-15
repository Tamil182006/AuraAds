import { Upload, Users, Sparkles } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Product",
      description:
        "Upload your product image or 360° video. Our AI analyzes your product automatically.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Choose AI Model",
      description:
        "Select from our diverse collection of AI-generated models that best fit your brand.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Sparkles,
      title: "Generate Ad",
      description:
        "Watch as AI creates a professional advertisement video with music and promotional text.",
      color: "from-pink-500 to-orange-500"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create professional product advertisements in just three simple
            steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-white mr-3">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
