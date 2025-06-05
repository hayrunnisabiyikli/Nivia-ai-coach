import type React from "react"
import Link from "next/link"
import { ArrowRight, Dumbbell, Salad, Brain, Sparkles, Shield, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import HeroImage from "@/components/hero-image"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Demo Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
        <div className="container px-4 py-2">
          <Alert className="border-0 bg-transparent">
            <Shield className="h-4 w-4" />
            <AlertTitle className="text-sm">🚀 Demo Version</AlertTitle>
            <AlertDescription className="text-sm">
              This is a demonstration of Flex Aura AI Health Coach. No personal data is collected or stored. For
              educational purposes only - not medical advice.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100 text-sm font-medium mb-2 w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Gemini AI
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                AI-Powered Health & Wellness Coaching
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Get personalized diet and fitness programs tailored to your unique needs. Chat with our Gemini
                AI-powered coach for real-time guidance and support.
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
                Our Gemini AI-powered wellness coach provides intelligent, personalized guidance to help you achieve
                your health goals.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={<Salad className="h-10 w-10 text-green-600" />}
              title="Smart Nutrition Advice"
              description="Get AI-powered meal plans and nutritional guidance based on your dietary preferences and health goals."
            />
            <FeatureCard
              icon={<Dumbbell className="h-10 w-10 text-blue-600" />}
              title="Personalized Fitness"
              description="Receive intelligent workout routines designed by AI to match your fitness level and objectives."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-purple-600" />}
              title="AI Wellness Insights"
              description="Learn about holistic health approaches with evidence-based recommendations powered by advanced AI."
            />
          </div>
        </div>
      </section>

      {/* Demo Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Demo Features</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Experience the power of AI-driven health coaching in this interactive demonstration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  No Registration Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Start chatting immediately without creating an account. Your privacy is protected - no data is stored.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Instant AI Responses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get immediate, personalized health advice powered by Google's advanced Gemini AI technology.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Safe & Educational
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed for educational purposes with clear disclaimers. Always encourages consulting healthcare
                  professionals.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Try Our AI Health Coach?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Start chatting with our Gemini AI wellness coach today and experience personalized health guidance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/chat">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Try Demo Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
