import type React from "react"
import Link from "next/link"
import { ArrowRight, Dumbbell, Salad, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroImage from "@/components/hero-image"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100 text-sm font-medium mb-2">
                Your Personal Wellness Journey
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                OpenAI-Powered Health & Wellness Coaching
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Get personalized diet and fitness programs tailored to your unique needs. Chat with our GPT-4o-powered
                AI coach for real-time guidance and support.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/chat">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <HeroImage />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How Our AI Coach Helps You
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered wellness coach provides personalized guidance to help you achieve your health goals.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Salad className="h-10 w-10 text-green-600" />}
              title="Personalized Nutrition"
              description="Get customized meal plans and nutritional advice based on your dietary preferences and goals."
            />
            <FeatureCard
              icon={<Dumbbell className="h-10 w-10 text-blue-600" />}
              title="Fitness Programs"
              description="Receive tailored workout routines designed to match your fitness level and objectives."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="Wellness Insights"
              description="Learn about holistic approaches to health with evidence-based recommendations."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Health?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Start chatting with our AI wellness coach today and take the first step toward a healthier you.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/chat">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Chat with AI Coach <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
