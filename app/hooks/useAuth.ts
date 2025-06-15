"use client"

import { useState, useEffect } from "react"
import type { User, GeneratedAd, AuthState } from "../types/user"

const STORAGE_KEYS = {
  AUTH_STATE: "adgenius_auth_state",
  USER_DATA: "adgenius_user_data",
  GENERATED_ADS: "adgenius_generated_ads",
}

// Dummy data for generated ads
const DUMMY_ADS: GeneratedAd[] = [
  {
    id: "1",
    userId: "user1",
    title: "Summer Fashion Collection",
    productName: "Floral Dress",
    modelUsed: "female",
    backgroundStyle: "Beach Sunset",
    createdAt: "2024-01-15T10:30:00Z",
    videoUrl: "/placeholder-video.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: 15,
    format: "MP4",
    resolution: "1080p",
    feedback: { rating: 5, comment: "Perfect for our summer campaign!" },
  },
  {
    id: "2",
    userId: "user1",
    title: "Tech Gadget Showcase",
    productName: "Wireless Headphones",
    modelUsed: "male",
    backgroundStyle: "Modern Studio",
    createdAt: "2024-01-14T15:45:00Z",
    videoUrl: "/placeholder-video.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: 20,
    format: "MP4",
    resolution: "1080p",
  },
  {
    id: "3",
    userId: "user1",
    title: "Fitness Apparel Ad",
    productName: "Athletic Wear Set",
    modelUsed: "female",
    backgroundStyle: "Gym Environment",
    createdAt: "2024-01-13T09:15:00Z",
    videoUrl: "/placeholder-video.mp4",
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    duration: 18,
    format: "MP4",
    resolution: "4K",
  },
]

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    generatedAds: [],
  })

  useEffect(() => {
    // Load auth state from localStorage on mount
    const savedAuthState = localStorage.getItem(STORAGE_KEYS.AUTH_STATE)
    const savedUserData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    const savedAds = localStorage.getItem(STORAGE_KEYS.GENERATED_ADS)

    if (savedAuthState === "true" && savedUserData) {
      const user = JSON.parse(savedUserData)
      const ads = savedAds ? JSON.parse(savedAds) : DUMMY_ADS

      setAuthState({
        isAuthenticated: true,
        user,
        generatedAds: ads,
      })
    }
  }, [])

  const login = (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Dummy login logic - accept any email/password
        const user: User = {
          id: "user1",
          email,
          name: email.split("@")[0],
          credits: 10,
          createdAt: new Date().toISOString(),
        }

        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.AUTH_STATE, "true")
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
        localStorage.setItem(STORAGE_KEYS.GENERATED_ADS, JSON.stringify(DUMMY_ADS))

        setAuthState({
          isAuthenticated: true,
          user,
          generatedAds: DUMMY_ADS,
        })

        resolve(true)
      }, 1000)
    })
  }

  const signup = (email: string, password: string, name: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        const user: User = {
          id: "user1",
          email,
          name,
          credits: 10, // Start with 10 free credits
          createdAt: new Date().toISOString(),
        }

        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.AUTH_STATE, "true")
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
        localStorage.setItem(STORAGE_KEYS.GENERATED_ADS, JSON.stringify([]))

        setAuthState({
          isAuthenticated: true,
          user,
          generatedAds: [],
        })

        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATE)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    localStorage.removeItem(STORAGE_KEYS.GENERATED_ADS)

    setAuthState({
      isAuthenticated: false,
      user: null,
      generatedAds: [],
    })
  }

  const useCredit = () => {
    if (authState.user && authState.user.credits > 0) {
      const updatedUser = {
        ...authState.user,
        credits: authState.user.credits - 1,
      }

      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser))

      setAuthState((prev) => ({
        ...prev,
        user: updatedUser,
      }))

      return true
    }
    return false
  }

  const addGeneratedAd = (ad: Omit<GeneratedAd, "id" | "userId" | "createdAt">) => {
    if (!authState.user) return

    const newAd: GeneratedAd = {
      ...ad,
      id: Date.now().toString(),
      userId: authState.user.id,
      createdAt: new Date().toISOString(),
    }

    const updatedAds = [newAd, ...authState.generatedAds]

    localStorage.setItem(STORAGE_KEYS.GENERATED_ADS, JSON.stringify(updatedAds))

    setAuthState((prev) => ({
      ...prev,
      generatedAds: updatedAds,
    }))
  }

  const deleteAd = (adId: string) => {
    const updatedAds = authState.generatedAds.filter((ad) => ad.id !== adId)

    localStorage.setItem(STORAGE_KEYS.GENERATED_ADS, JSON.stringify(updatedAds))

    setAuthState((prev) => ({
      ...prev,
      generatedAds: updatedAds,
    }))
  }

  const addFeedback = (adId: string, rating: number, comment?: string) => {
    const updatedAds = authState.generatedAds.map((ad) =>
      ad.id === adId ? { ...ad, feedback: { rating, comment } } : ad,
    )

    localStorage.setItem(STORAGE_KEYS.GENERATED_ADS, JSON.stringify(updatedAds))

    setAuthState((prev) => ({
      ...prev,
      generatedAds: updatedAds,
    }))
  }

  return {
    ...authState,
    login,
    signup,
    logout,
    useCredit,
    addGeneratedAd,
    deleteAd,
    addFeedback,
  }
}
