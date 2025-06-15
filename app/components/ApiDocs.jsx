"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Code,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Key,
  Zap,
  Shield,
  Globe,
  BookOpen,
  ExternalLink
} from "lucide-react"

function CodeBlock({ code, language, title }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-900 rounded-lg border border-white/10 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <span className="text-sm font-medium text-white">{title}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

function Endpoint({ method, path, description, children }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const methodColors = {
    GET: "bg-green-500/20 text-green-400 border-green-500/30",
    POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30"
  }

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border ${methodColors[method]}`}
          >
            {method}
          </span>
          <code className="text-white font-mono">{path}</code>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 text-sm">{description}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/10 p-4">{children}</div>
      )}
    </div>
  )
}

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "authentication", label: "Authentication", icon: Shield },
    { id: "endpoints", label: "Endpoints", icon: Globe },
    { id: "examples", label: "Examples", icon: Code },
    { id: "sdks", label: "SDKs", icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                AdGenius AI API Documentation
              </h1>
              <p className="text-gray-300">
                Integrate AI-powered advertisement generation into your
                applications
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                API Console
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Key className="mr-2 w-4 h-4" />
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    API Overview
                  </h2>
                  <p className="text-gray-300 mb-6">
                    The AdGenius AI API allows you to programmatically generate
                    professional advertisement videos using AI models, custom
                    backgrounds, and promotional content. Perfect for e-commerce
                    platforms, marketing tools, and content management systems.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <Zap className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Fast Generation
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Generate professional ads in under 60 seconds with our
                      optimized AI pipeline.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <Shield className="w-8 h-8 text-green-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Secure & Reliable
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Enterprise-grade security with 99.9% uptime SLA and data
                      encryption.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <Globe className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Global CDN
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Fast content delivery worldwide with edge locations in 50+
                      countries.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Quick Start
                  </h3>
                  <CodeBlock
                    language="bash"
                    code={`# Install the AdGenius AI SDK
npm install @adgenius/ai-sdk

# Or use curl directly
curl -X POST https://api.adgenius.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"product_image": "base64_image_data", "model_type": "female"}'`}
                    title="Quick Start"
                  />
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-lg font-bold text-white mb-2">
                    🚀 Ready to get started?
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Sign up for a free API key and start generating AI
                    advertisements in minutes.
                  </p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Get Free API Key
                  </Button>
                </div>
              </div>
            )}

            {/* Authentication Tab */}
            {activeTab === "authentication" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Authentication
                  </h2>
                  <p className="text-gray-300 mb-6">
                    The AdGenius AI API uses API keys for authentication.
                    Include your API key in the Authorization header of all
                    requests.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Getting Your API Key
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Sign up for an AdGenius AI account</li>
                        <li>Navigate to the API section in your dashboard</li>
                        <li>Click "Generate New API Key"</li>
                        <li>Copy and securely store your API key</li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Authentication Header
                    </h3>
                    <CodeBlock
                      language="http"
                      code={`Authorization: Bearer YOUR_API_KEY`}
                      title="HTTP Header"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Example Request
                    </h3>
                    <CodeBlock
                      language="bash"
                      code={`curl -X GET https://api.adgenius.ai/v1/user/profile \\
  -H "Authorization: Bearer ag_live_1234567890abcdef" \\
  -H "Content-Type: application/json"`}
                      title="cURL Example"
                    />
                  </div>

                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-yellow-400 font-bold mb-2">
                      ⚠️ Security Best Practices
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                      <li>Never expose your API key in client-side code</li>
                      <li>Use environment variables to store API keys</li>
                      <li>Rotate your API keys regularly</li>
                      <li>Use different keys for development and production</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Endpoints Tab */}
            {activeTab === "endpoints" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    API Endpoints
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Complete reference for all available API endpoints. All
                    endpoints use the base URL:
                    <code className="bg-white/10 px-2 py-1 rounded text-purple-300 ml-1">
                      https://api.adgenius.ai/v1
                    </code>
                  </p>
                </div>

                <div className="space-y-4">
                  <Endpoint
                    method="POST"
                    path="/generate"
                    description="Generate a new AI advertisement"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">
                          Request Body
                        </h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "product_image": "base64_encoded_image_data",
  "model_type": "female", // "female" | "male"
  "background_style": "modern_studio", // optional
  "duration": 15, // seconds, optional (default: 15)
  "resolution": "1080p", // "720p" | "1080p" | "4k"
  "promotional_text": {
    "headline": "Limited Time Offer!",
    "subtext": "Get 30% OFF today",
    "cta": "Shop Now"
  },
  "music_style": "upbeat", // optional
  "webhook_url": "https://your-app.com/webhook" // optional
}`}
                          title="Request Body"
                        />
                      </div>

                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "data": {
    "ad_id": "ad_1234567890",
    "status": "processing",
    "estimated_completion": "2024-01-15T10:35:00Z",
    "webhook_url": "https://your-app.com/webhook"
  },
  "credits_used": 1,
  "credits_remaining": 49
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>

                  <Endpoint
                    method="GET"
                    path="/ads/{ad_id}"
                    description="Get advertisement details and status"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">
                          Path Parameters
                        </h4>
                        <div className="bg-white/5 rounded p-3">
                          <code className="text-purple-300">ad_id</code>{" "}
                          <span className="text-gray-400">
                            - The unique identifier of the advertisement
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "data": {
    "ad_id": "ad_1234567890",
    "status": "completed", // "processing" | "completed" | "failed"
    "created_at": "2024-01-15T10:30:00Z",
    "completed_at": "2024-01-15T10:30:45Z",
    "video_url": "https://cdn.adgenius.ai/videos/ad_1234567890.mp4",
    "thumbnail_url": "https://cdn.adgenius.ai/thumbnails/ad_1234567890.jpg",
    "duration": 15,
    "resolution": "1080p",
    "file_size": 2048576,
    "model_used": "female",
    "background_style": "modern_studio"
  }
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>

                  <Endpoint
                    method="GET"
                    path="/ads"
                    description="List all advertisements for your account"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">
                          Query Parameters
                        </h4>
                        <div className="space-y-2">
                          <div className="bg-white/5 rounded p-3">
                            <code className="text-purple-300">limit</code>{" "}
                            <span className="text-gray-400">
                              - Number of results to return (default: 20, max:
                              100)
                            </span>
                          </div>
                          <div className="bg-white/5 rounded p-3">
                            <code className="text-purple-300">offset</code>{" "}
                            <span className="text-gray-400">
                              - Number of results to skip (default: 0)
                            </span>
                          </div>
                          <div className="bg-white/5 rounded p-3">
                            <code className="text-purple-300">status</code>{" "}
                            <span className="text-gray-400">
                              - Filter by status: processing, completed, failed
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "data": {
    "ads": [
      {
        "ad_id": "ad_1234567890",
        "status": "completed",
        "created_at": "2024-01-15T10:30:00Z",
        "video_url": "https://cdn.adgenius.ai/videos/ad_1234567890.mp4",
        "thumbnail_url": "https://cdn.adgenius.ai/thumbnails/ad_1234567890.jpg"
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 20,
      "offset": 0,
      "has_more": true
    }
  }
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>

                  <Endpoint
                    method="DELETE"
                    path="/ads/{ad_id}"
                    description="Delete an advertisement"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "message": "Advertisement deleted successfully"
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>

                  <Endpoint
                    method="GET"
                    path="/user/profile"
                    description="Get user account information"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "data": {
    "user_id": "user_1234567890",
    "email": "developer@example.com",
    "plan": "pro",
    "credits_remaining": 150,
    "credits_used_this_month": 50,
    "api_calls_this_month": 75,
    "account_created": "2024-01-01T00:00:00Z",
    "rate_limits": {
      "requests_per_minute": 60,
      "requests_per_hour": 1000
    }
  }
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>

                  <Endpoint
                    method="GET"
                    path="/models"
                    description="List available AI models"
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2">Response</h4>
                        <CodeBlock
                          language="json"
                          code={`{
  "success": true,
  "data": {
    "models": [
      {
        "id": "female",
        "name": "Emma",
        "description": "Professional female model, perfect for fashion and lifestyle products",
        "style": "Elegant & Modern",
        "available_in_plans": ["starter", "pro", "enterprise"]
      },
      {
        "id": "male",
        "name": "Alex",
        "description": "Versatile male model, great for tech and sports products",
        "style": "Bold & Dynamic",
        "available_in_plans": ["starter", "pro", "enterprise"]
      }
    ]
  }
}`}
                          title="Response"
                        />
                      </div>
                    </div>
                  </Endpoint>
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {activeTab === "examples" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Code Examples
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Ready-to-use code examples in popular programming languages
                    to help you integrate quickly.
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      JavaScript/Node.js
                    </h3>
                    <CodeBlock
                      language="javascript"
                      code={`const AdGeniusAI = require('@adgenius/ai-sdk');

const client = new AdGeniusAI({
  apiKey: process.env.ADGENIUS_API_KEY
});

async function generateAd() {
  try {
    // Generate advertisement
    const result = await client.generate({
      product_image: 'base64_encoded_image_data',
      model_type: 'female',
      resolution: '1080p',
      promotional_text: {
        headline: 'Summer Sale!',
        subtext: 'Up to 50% OFF',
        cta: 'Shop Now'
      }
    });

    console.log('Ad generation started:', result.ad_id);

    // Poll for completion
    const ad = await client.waitForCompletion(result.ad_id);
    console.log('Ad completed:', ad.video_url);

  } catch (error) {
    console.error('Error generating ad:', error);
  }
}

generateAd();`}
                      title="Node.js Example"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Python
                    </h3>
                    <CodeBlock
                      language="python"
                      code={`import adgenius_ai
import base64
import time

# Initialize client
client = adgenius_ai.Client(api_key="your_api_key_here")

def generate_ad_from_file(image_path):
    # Read and encode image
    with open(image_path, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    
    # Generate advertisement
    result = client.generate(
        product_image=encoded_image,
        model_type="female",
        resolution="1080p",
        promotional_text={
            "headline": "New Collection",
            "subtext": "Available Now",
            "cta": "Discover More"
        }
    )
    
    print(f"Ad generation started: {result['ad_id']}")
    
    # Wait for completion
    while True:
        ad = client.get_ad(result['ad_id'])
        if ad['status'] == 'completed':
            print(f"Ad completed: {ad['video_url']}")
            return ad
        elif ad['status'] == 'failed':
            raise Exception("Ad generation failed")
        
        time.sleep(5)  # Wait 5 seconds before checking again

# Usage
ad = generate_ad_from_file("product.jpg")
print(f"Download your ad: {ad['video_url']}")`}
                      title="Python Example"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">PHP</h3>
                    <CodeBlock
                      language="php"
                      code={`<?php
require_once 'vendor/autoload.php';

use AdGeniusAI\\Client;

$client = new Client([
    'api_key' => $_ENV['ADGENIUS_API_KEY']
]);

function generateAd($imagePath) {
    global $client;
    
    // Encode image
    $imageData = base64_encode(file_get_contents($imagePath));
    
    // Generate advertisement
    $result = $client->generate([
        'product_image' => $imageData,
        'model_type' => 'male',
        'resolution' => '1080p',
        'promotional_text' => [
            'headline' => 'Limited Edition',
            'subtext' => 'Only 100 pieces left',
            'cta' => 'Order Now'
        ]
    ]);
    
    echo "Ad generation started: " . $result['ad_id'] . "\\n";
    
    // Poll for completion
    do {
        sleep(5);
        $ad = $client->getAd($result['ad_id']);
        echo "Status: " . $ad['status'] . "\\n";
    } while ($ad['status'] === 'processing');
    
    if ($ad['status'] === 'completed') {
        echo "Ad completed: " . $ad['video_url'] . "\\n";
        return $ad;
    } else {
        throw new Exception('Ad generation failed');
    }
}

// Usage
$ad = generateAd('product.jpg');
?>`}
                      title="PHP Example"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">cURL</h3>
                    <CodeBlock
                      language="bash"
                      code={`#!/bin/bash

API_KEY="your_api_key_here"
BASE_URL="https://api.adgenius.ai/v1"

# Generate advertisement
RESPONSE=$(curl -s -X POST "$BASE_URL/generate" \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "product_image": "base64_encoded_image_data",
    "model_type": "female",
    "resolution": "1080p",
    "promotional_text": {
      "headline": "Flash Sale!",
      "subtext": "24 hours only",
      "cta": "Buy Now"
    }
  }')

AD_ID=$(echo $RESPONSE | jq -r '.data.ad_id')
echo "Ad generation started: $AD_ID"

# Poll for completion
while true; do
  STATUS_RESPONSE=$(curl -s -X GET "$BASE_URL/ads/$AD_ID" \\
    -H "Authorization: Bearer $API_KEY")
  
  STATUS=$(echo $STATUS_RESPONSE | jq -r '.data.status')
  echo "Status: $STATUS"
  
  if [ "$STATUS" = "completed" ]; then
    VIDEO_URL=$(echo $STATUS_RESPONSE | jq -r '.data.video_url')
    echo "Ad completed: $VIDEO_URL"
    break
  elif [ "$STATUS" = "failed" ]; then
    echo "Ad generation failed"
    exit 1
  fi
  
  sleep 5
done`}
                      title="Bash/cURL Example"
                    />
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
                  <h3 className="text-blue-400 font-bold mb-2">💡 Pro Tips</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                    <li>
                      Use webhooks for real-time notifications instead of
                      polling
                    </li>
                    <li>Implement exponential backoff for retry logic</li>
                    <li>Cache model information to reduce API calls</li>
                    <li>Use batch processing for multiple advertisements</li>
                  </ul>
                </div>
              </div>
            )}

            {/* SDKs Tab */}
            {activeTab === "sdks" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Official SDKs
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Use our official SDKs to integrate AdGenius AI into your
                    applications with ease. All SDKs include TypeScript
                    definitions, error handling, and automatic retries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-black font-bold text-sm">JS</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          JavaScript/Node.js
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Official SDK for JavaScript and Node.js
                        </p>
                      </div>
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`npm install @adgenius/ai-sdk`}
                    />
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Documentation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">PY</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Python</h3>
                        <p className="text-gray-400 text-sm">
                          Official SDK for Python 3.7+
                        </p>
                      </div>
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`pip install adgenius-ai`}
                    />
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Documentation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        PyPI
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          PHP
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">PHP</h3>
                        <p className="text-gray-400 text-sm">
                          Official SDK for PHP 7.4+
                        </p>
                      </div>
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`composer require adgenius/ai-sdk`}
                    />
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Documentation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Packagist
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">RB</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Ruby</h3>
                        <p className="text-gray-400 text-sm">
                          Official SDK for Ruby 2.7+
                        </p>
                      </div>
                    </div>
                    <CodeBlock
                      language="bash"
                      code={`gem install adgenius-ai`}
                    />
                    <div className="mt-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Documentation
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        RubyGems
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    SDK Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white font-bold mb-2">
                        🔄 Automatic Retries
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Built-in retry logic with exponential backoff for failed
                        requests.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white font-bold mb-2">
                        📝 TypeScript Support
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Full TypeScript definitions for better development
                        experience.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white font-bold mb-2">
                        🔔 Webhook Helpers
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Utilities for handling and validating webhook payloads.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="text-white font-bold mb-2">
                        ⚡ Async/Await
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Modern async patterns for non-blocking operations.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    Community SDKs
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Community-maintained SDKs for additional programming
                    languages:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            GO
                          </span>
                        </div>
                        <div>
                          <span className="text-white font-medium">Go</span>
                          <p className="text-gray-400 text-sm">
                            Community-maintained Go SDK
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        GitHub
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            RS
                          </span>
                        </div>
                        <div>
                          <span className="text-white font-medium">Rust</span>
                          <p className="text-gray-400 text-sm">
                            Community-maintained Rust SDK
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        Crates.io
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/20">
                  <h3 className="text-green-400 font-bold mb-2">
                    🤝 Want to contribute?
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We welcome community contributions! If you'd like to create
                    an SDK for your favorite language, check out our
                    contribution guidelines.
                  </p>
                  <Button
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Contribution Guide
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
