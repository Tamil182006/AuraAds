import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "E-commerce Store Owner",
      company: "Fashion Forward",
      content:
        "AdGenius AI transformed our product marketing. We went from spending $5000 on photo shoots to creating unlimited professional ads for a fraction of the cost.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director",
      company: "TechGear Pro",
      content:
        "The quality of AI-generated models is incredible. Our conversion rates increased by 40% after switching to AdGenius AI for our product advertisements.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60"
    },
    {
      name: "Emily Watson",
      role: "Small Business Owner",
      company: "Handmade Crafts",
      content:
        "As a small business, I couldn't afford professional models and photographers. AdGenius AI gave me the power to compete with bigger brands.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60"
    }
  ]

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied sellers who've transformed their
            marketing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
