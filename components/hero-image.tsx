"use client"

import { useState } from "react"
import Image from "next/image"

export default function HeroImage() {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏃‍♀️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">AI Health Coach</h3>
            <p className="text-sm text-gray-500">Your wellness journey starts here</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md h-64">
        <Image
          src="/images/ai-health-coach-realistic.png"
          alt="AI Health Coach"
          fill
          className="object-contain rounded-lg"
          onError={() => setImageError(true)}
          priority
        />
      </div>
    </div>
  )
}
