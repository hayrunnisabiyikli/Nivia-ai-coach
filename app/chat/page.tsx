"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, ArrowDown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { findBestMatch } from "@/utils/predefined-answers"

// Message type definition
type Message = {
  id?: string
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // Plan generation state
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [plan, setPlan] = useState<string>("")
  const [showPlanResult, setShowPlanResult] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Clear error after 5 seconds
  useEffect(() => {
    if (apiError) {
      const timer = setTimeout(() => {
        setApiError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [apiError])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check if we should show the scroll button
  useEffect(() => {
    const checkScroll = () => {
      if (!chatContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollButton(!isNearBottom && messages.length > 0)
    }

    const container = chatContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Handle chat form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message to chat
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Find the best matching predefined answer
      const match = findBestMatch(input)

      // Simulate a delay for a more natural conversation flow
      setTimeout(() => {
        // Add assistant response to chat
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: match.answer,
          },
        ])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error processing message:", error)
      setApiError("An error occurred. Please try again later.")
      setIsLoading(false)
    }
  }

  // Handle plan form submission
  const handlePlanSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setApiError(null)

    const formData = {
      age: (document.getElementById("age") as HTMLInputElement).value,
      weight: (document.getElementById("weight") as HTMLInputElement).value,
      height: (document.getElementById("height") as HTMLInputElement).value,
      gender: (document.getElementById("gender") as HTMLSelectElement).value,
      goal: (document.getElementById("goals") as HTMLSelectElement).value,
      dietary: (document.getElementById("dietary") as HTMLSelectElement).value,
      activity: (document.getElementById("activity") as HTMLSelectElement).value,
      additional: (document.getElementById("additional") as HTMLTextAreaElement).value,
    }

    // Validate required fields
    if (
      !formData.age ||
      !formData.weight ||
      !formData.height ||
      !formData.gender ||
      !formData.goal ||
      !formData.dietary ||
      !formData.activity
    ) {
      setApiError("Please fill in all required fields")
      return
    }

    try {
      setIsGeneratingPlan(true)

      // Instead of API call, use a predefined plan based on the goal
      setTimeout(() => {
        let generatedPlan = ""

        switch (formData.goal) {
          case "weight-loss":
            generatedPlan = `# Weight Loss Plan for ${formData.age} year old, ${formData.gender === "male" ? "Male" : "Female"}

## Weekly Meal Plan
- **Breakfast**: Greek yogurt with berries and a sprinkle of nuts
- **Lunch**: Grilled chicken salad with olive oil dressing
- **Dinner**: Baked fish with steamed vegetables
- **Snacks**: Apple slices with a small amount of nut butter

## Exercise Routine
- **Monday**: 30 minutes cardio (walking, jogging, or cycling)
- **Tuesday**: Strength training focusing on upper body
- **Wednesday**: Rest or light activity like yoga
- **Thursday**: 30 minutes cardio (different from Monday)
- **Friday**: Strength training focusing on lower body
- **Saturday**: Longer cardio session (45-60 minutes)
- **Sunday**: Rest day

## Wellness Recommendations
- Drink at least 8 glasses of water daily
- Get 7-8 hours of sleep each night
- Practice stress management through meditation or deep breathing
- Track your food intake using a journal or app

## Progress Metrics
- Weekly weigh-ins (same day, same time)
- Body measurements every 2 weeks
- Energy levels (scale 1-10) daily
- Progress photos monthly`
            break

          case "muscle-gain":
            generatedPlan = `# Muscle Gain Plan for ${formData.age} year old, ${formData.gender === "male" ? "Male" : "Female"}

## Weekly Meal Plan
- **Breakfast**: Protein smoothie with banana, protein powder, milk, and peanut butter
- **Lunch**: Chicken breast with brown rice and vegetables
- **Dinner**: Lean beef or tofu with sweet potatoes and green vegetables
- **Snacks**: Protein shake, nuts, cottage cheese with fruit

## Exercise Routine
- **Monday**: Chest and triceps
- **Tuesday**: Back and biceps
- **Wednesday**: Rest or light cardio
- **Thursday**: Legs and core
- **Friday**: Shoulders and arms
- **Saturday**: Full body or weak points
- **Sunday**: Complete rest

## Wellness Recommendations
- Ensure adequate protein intake (1.6-2g per kg of bodyweight)
- Get 7-9 hours of quality sleep for recovery
- Stay hydrated throughout the day
- Consider creatine supplementation (consult with healthcare provider)

## Progress Metrics
- Weekly weight measurements
- Strength progression (track your lifts)
- Monthly body measurements
- Progress photos every 4 weeks`
            break

          default:
            generatedPlan = `# General Wellness Plan for ${formData.age} year old, ${formData.gender === "male" ? "Male" : "Female"}

## Weekly Meal Plan
- **Breakfast**: Oatmeal with fruits and nuts or eggs with whole grain toast
- **Lunch**: Mixed salad with protein source (chicken, fish, tofu, beans)
- **Dinner**: Balanced plate with lean protein, whole grains, and vegetables
- **Snacks**: Fresh fruit, yogurt, or small handful of nuts

## Exercise Routine
- **Monday**: 30 minutes moderate cardio
- **Tuesday**: Full body strength training
- **Wednesday**: Flexibility work (yoga or stretching)
- **Thursday**: 30 minutes interval training
- **Friday**: Full body strength training
- **Saturday**: Longer activity of choice (hike, bike ride, swim)
- **Sunday**: Rest or gentle walking

## Wellness Recommendations
- Practice mindfulness or meditation for 10 minutes daily
- Establish a consistent sleep schedule
- Stay hydrated throughout the day
- Take short breaks during work to move and stretch

## Progress Metrics
- Energy levels throughout the day
- Sleep quality
- Stress levels
- Overall mood and wellbeing`
        }

        setPlan(generatedPlan)
        setShowPlanResult(true)
        setIsGeneratingPlan(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating plan:", error)
      setApiError("An error occurred. Please try again later.")
      setIsGeneratingPlan(false)
    }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="container flex flex-col flex-1 px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Chat with Your AI Health Coach</h1>

        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="plan">Get a Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: "calc(100vh - 300px)" }}
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500">
                    <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                      <img
                        src="/images/ai-health-coach-realistic.png"
                        alt="AI Health Coach"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Welcome to HealthCoach AI</h3>
                    <p className="max-w-md">
                      You can ask me questions about nutrition, fitness, or health. I can help with meal planning,
                      exercise routines, and healthy lifestyle tips.
                    </p>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md">
                      {[
                        "How many calories are in an avocado?",
                        "What's a good workout for beginners?",
                        "Can you suggest a low-carb meal plan?",
                        "How can I improve my sleep quality?",
                      ].map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="justify-start text-left h-auto py-2"
                          onClick={() => {
                            setInput(suggestion)
                            setTimeout(() => {
                              const form = document.querySelector("form")
                              if (form) form.dispatchEvent(new Event("submit", { cancelable: true }))
                            }, 100)
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-start gap-3 max-w-[80%]",
                        message.role === "user" ? "ml-auto" : "mr-auto",
                      )}
                    >
                      <Avatar
                        className={cn("h-8 w-8", message.role === "user" ? "order-2 bg-green-100" : "bg-transparent")}
                      >
                        {message.role === "user" ? (
                          <User className="h-5 w-5 text-green-700" />
                        ) : (
                          <img
                            src="/images/ai-health-coach-realistic.png"
                            alt="AI"
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                      </Avatar>
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 text-sm",
                          message.role === "user"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                        )}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                      <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {showScrollButton && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-20 right-6 rounded-full shadow-md"
                  onClick={scrollToBottom}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}

              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about nutrition, fitness, or health..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="plan" className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col p-6">
              <h2 className="text-xl font-bold mb-4">Create Your Personalized Plan</h2>
              <p className="text-gray-500 mb-6">
                Fill out the form below to receive a personalized weekly diet and exercise plan tailored to your goals
                and preferences.
              </p>

              {!showPlanResult ? (
                <form className="space-y-4" onSubmit={handlePlanSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-sm font-medium">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <Input id="age" type="number" placeholder="Enter your age" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="weight" className="text-sm font-medium">
                        Weight (kg) <span className="text-red-500">*</span>
                      </label>
                      <Input id="weight" type="number" placeholder="Enter your weight" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="height" className="text-sm font-medium">
                        Height (cm) <span className="text-red-500">*</span>
                      </label>
                      <Input id="height" type="number" placeholder="Enter your height" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="gender" className="text-sm font-medium">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium">
                      Fitness Goals <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="goals"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="">Select your main goal</option>
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="endurance">Improve Endurance</option>
                      <option value="general-health">General Health</option>
                      <option value="stress-reduction">Stress Reduction</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dietary" className="text-sm font-medium">
                      Dietary Preferences <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="dietary"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="">Select dietary preference</option>
                      <option value="omnivore">Omnivore (Meat & Vegetables)</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="pescatarian">Pescatarian (Fish & Vegetables)</option>
                      <option value="keto">Keto</option>
                      <option value="paleo">Paleo</option>
                      <option value="gluten-free">Gluten-Free</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="activity" className="text-sm font-medium">
                      Activity Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="activity"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="">Select your activity level</option>
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Light (1-3 days per week)</option>
                      <option value="moderate">Moderate (3-5 days per week)</option>
                      <option value="active">Active (6-7 days per week)</option>
                      <option value="very-active">Very Active (twice per day)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additional" className="text-sm font-medium">
                      Additional Information
                    </label>
                    <Textarea
                      id="additional"
                      placeholder="Any allergies, injuries, or special preferences we should know about?"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isGeneratingPlan}
                  >
                    {isGeneratingPlan ? (
                      <>
                        <span className="animate-pulse mr-2">●</span>
                        Generating Plan...
                      </>
                    ) : (
                      "Create My Plan"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">Your Personalized Plan</h3>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 whitespace-pre-wrap">{plan}</div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" onClick={() => setShowPlanResult(false)} className="mr-2">
                      Back to Form
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Save Plan</Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
