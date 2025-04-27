"use client"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function HeroImage() {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Replace this with your actual leaf image with AI text */}
        <div className="relative">
          <img
            src={isMobile ? "/images/ai-leaf-small.png" : "/images/ai-leaf.png"}
            alt="AI on a green leaf"
            className="object-contain h-[200px] md:h-[300px]"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24"></div>
    </div>
  )
}
