export interface User {
  id: string
  email: string
  name: string
  credits: number
  createdAt: string
}

export interface GeneratedAd {
  id: string
  userId: string
  title: string
  productName: string
  modelUsed: "female" | "male"
  backgroundStyle: string
  createdAt: string
  videoUrl: string
  thumbnailUrl: string
  duration: number
  format: string
  resolution: string
  feedback?: {
    rating: number
    comment?: string
  }
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  generatedAds: GeneratedAd[]
}
