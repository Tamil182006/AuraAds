import { Zap, Shield, Palette, Clock, Globe, TrendingUp } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate professional ads in under 60 seconds"
    },
    {
      icon: Shield,
      title: "Commercial License",
      description:
        "Full rights to use generated content for commercial purposes"
    },
    {
      icon: Palette,
      title: "Customizable Styles",
      description: "Choose from hundreds of backgrounds and styling options"
    },
    {
      icon: Clock,
      title: "24/7 Generation",
      description: "Create ads anytime with our cloud-based AI system"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Generate ads with text in over 50 languages"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your ad performance with built-in analytics"
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create professional advertisements that
            convert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
