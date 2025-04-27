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
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white dark:from-green-900 dark:to-background opacity-30"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/images/ai-health-coach-realistic.png"
          alt="AI health coach helping with nutrition planning"
          className="object-contain h-[250px] md:h-[350px] lg:h-[450px] rounded-lg"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24"></div>
    </div>
  )
}
