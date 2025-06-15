"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How realistic are the AI-generated models?",
      answer:
        "Our AI models are incredibly realistic and diverse. We use cutting-edge technology to create photorealistic human models that look natural wearing your products. Each model is carefully crafted to represent different demographics and styles."
    },
    {
      question: "What file formats do you accept for product uploads?",
      answer:
        "We accept JPG, PNG, and GIF images up to 10MB, as well as MP4 and MOV videos up to 100MB. For 360° videos, we support standard 360° formats. All uploads are processed automatically by our AI."
    },
    {
      question: "How long does it take to generate an advertisement?",
      answer:
        "Most advertisements are generated within 30-60 seconds. Complex requests with custom backgrounds or multiple models may take up to 2-3 minutes. You'll receive real-time updates on the generation progress."
    },
    {
      question: "Can I use the generated ads for commercial purposes?",
      answer:
        "Yes! All Professional and Enterprise plans include full commercial licensing. You own the rights to use the generated advertisements for marketing, social media, websites, and any other commercial purposes."
    },
    {
      question: "What if I'm not satisfied with the generated ad?",
      answer:
        "You can regenerate ads unlimited times with different models, backgrounds, and styles. We also offer a 14-day money-back guarantee if you're not completely satisfied with our service."
    },
    {
      question: "Do you offer API access for developers?",
      answer:
        "Yes, our Enterprise plan includes full API access. You can integrate our AI advertisement generation directly into your e-commerce platform, app, or workflow. Documentation and SDKs are provided."
    }
  ]

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about AdGenius AI
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
