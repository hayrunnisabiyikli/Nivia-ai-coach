"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, User, ArrowDown, AlertCircle, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { generatePlanPDF, type UserInfo } from "@/utils/pdf-image-generator"
import { renderMarkdownToReact } from "@/utils/markdown-renderer"

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
  const [chatLanguage, setChatLanguage] = useState<"en" | "tr">("en") // Chat language

  // Plan generation state
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false)
  const [plan, setPlan] = useState<string>("")
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [showPlanResult, setShowPlanResult] = useState(false)
  const [planLanguage, setPlanLanguage] = useState<"en" | "tr">("en") // Plan language

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
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)
    setApiError(null)

    try {
      // Send request to our API with selected chat language
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
          language: chatLanguage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || "Failed to get response")
      }

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
        },
      ])
    } catch (error) {
      console.error("Error processing message:", error)
      setApiError(error instanceof Error ? error.message : "An error occurred. Please try again later.")
    } finally {
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
      setApiError(planLanguage === "tr" ? "Lütfen tüm zorunlu alanları doldurun" : "Please fill in all required fields")
      return
    }

    try {
      setIsGeneratingPlan(true)

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          language: planLanguage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.details || "Failed to generate plan")
      }

      setPlan(data.plan)
      setUserInfo(data.userInfo)
      setShowPlanResult(true)
    } catch (error) {
      console.error("Error generating plan:", error)

      // Check if it's a validation error (incomplete plan)
      if (error instanceof Error && error.message.includes("validation failed")) {
        setApiError(
          planLanguage === "tr"
            ? "AI tam 7 günlük plan oluşturmadı. Tam haftalık programınızı almak için lütfen tekrar deneyin!"
            : "The AI didn't create a complete 7-day plan. Please try again to get your full weekly program!",
        )
      } else {
        setApiError(error instanceof Error ? error.message : "An error occurred. Please try again later.")
      }
    } finally {
      setIsGeneratingPlan(false)
    }
  }

  const handleDownloadPDF = () => {
    if (plan && userInfo) {
      generatePlanPDF(plan, userInfo)
    }
  }

  // Language-specific content
  const content = {
    en: {
      chatTitle: "Chat with Your AI Health Coach",
      chatWelcome: "🌟 Welcome to Flex Aura AI",
      chatWelcomeDesc:
        "I'm your AI-powered health and wellness coach. Ask me anything about nutrition, fitness, sleep, or general wellness. I'm here to provide personalized, evidence-based guidance for your health journey!",
      chatPlaceholder: "Ask about nutrition, fitness, or health...",
      aiThinking: "AI is thinking...",
      suggestions: [
        "🥗 How to lose weight safely?",
        "💪 Workout for beginners?",
        "🥛 Daily protein intake?",
        "😴 Improve sleep quality?",
      ],
      planTitle: "Create Your Personalized Plan",
      planSubtitle:
        "Fill out the form below to receive a comprehensive, AI-generated weekly diet and exercise plan tailored specifically to your goals and preferences!",
      planReady: "Your Personalized Plan is Ready!",
      planReadyDesc:
        "Here's your custom wellness plan created just for you. You can download it as a PDF to keep it handy!",
      createAnother: "Create Another Plan",
      downloadPDF: "Download PDF",
      chatLanguage: "Chat Language",
      planLanguage: "Plan Language",
      labels: {
        age: "Age",
        weight: "Weight (kg)",
        height: "Height (cm)",
        gender: "Gender",
        goals: "Fitness Goals",
        dietary: "Dietary Preferences",
        activity: "Activity Level",
        additional: "Additional Information",
        required: "Required",
        createPlan: "Create My Personalized Plan",
        creating: "Creating Your Amazing Plan...",
        additionalPlaceholder: "Any allergies, injuries, or special preferences we should know about? 🤔",
      },
      genders: [
        { value: "", label: "Select gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "non-binary", label: "Non-binary" },
        { value: "prefer-not-to-say", label: "Prefer not to say" },
      ],
      goals: [
        { value: "", label: "Select your main goal" },
        { value: "weight-loss", label: "🔥 Weight Loss" },
        { value: "muscle-gain", label: "💪 Muscle Gain" },
        { value: "endurance", label: "🏃 Improve Endurance" },
        { value: "general-health", label: "🌟 General Health" },
        { value: "stress-reduction", label: "🧘 Stress Reduction" },
      ],
      dietary: [
        { value: "", label: "Select dietary preference" },
        { value: "omnivore", label: "🥩 Omnivore (Meat & Vegetables)" },
        { value: "vegetarian", label: "🥬 Vegetarian" },
        { value: "vegan", label: "🌱 Vegan" },
        { value: "pescatarian", label: "🐟 Pescatarian (Fish & Vegetables)" },
        { value: "keto", label: "🥑 Keto" },
        { value: "paleo", label: "🦴 Paleo" },
        { value: "gluten-free", label: "🌾 Gluten-Free" },
      ],
      activity: [
        { value: "", label: "Select your activity level" },
        { value: "sedentary", label: "😴 Sedentary (little or no exercise)" },
        { value: "light", label: "🚶 Light (1-3 days per week)" },
        { value: "moderate", label: "🏃 Moderate (3-5 days per week)" },
        { value: "active", label: "💪 Active (6-7 days per week)" },
        { value: "very-active", label: "🔥 Very Active (twice per day)" },
      ],
    },
    tr: {
      chatTitle: "AI Sağlık Koçunuzla Sohbet Edin",
      chatWelcome: "🌟 Flex Aura AI'ya Hoş Geldiniz",
      chatWelcomeDesc:
        "Ben AI destekli sağlık ve wellness koçunuzum. Beslenme, fitness, uyku veya genel wellness hakkında her şeyi sorabilirsiniz. Sağlık yolculuğunuzda kişiselleştirilmiş, kanıt temelli rehberlik sağlamak için buradayım!",
      chatPlaceholder: "Beslenme, fitness veya sağlık hakkında sorun...",
      aiThinking: "AI düşünüyor...",
      suggestions: [
        "🥗 Güvenli kilo verme?",
        "💪 Yeni başlayan egzersizleri?",
        "🥛 Günlük protein ihtiyacı?",
        "😴 Uyku kalitesini artırma?",
      ],
      planTitle: "Kişiselleştirilmiş Planınızı Oluşturun",
      planSubtitle:
        "Hedeflerinize ve tercihlerinize özel olarak tasarlanmış kapsamlı, AI tarafından oluşturulan haftalık diyet ve egzersiz planı almak için aşağıdaki formu doldurun!",
      planReady: "Kişiselleştirilmiş Planınız Hazır!",
      planReadyDesc:
        "İşte sizin için özel olarak oluşturulan wellness planınız. El altında bulundurmak için PDF olarak indirebilirsiniz!",
      createAnother: "Başka Plan Oluştur",
      downloadPDF: "PDF İndir",
      chatLanguage: "Sohbet Dili",
      planLanguage: "Plan Dili",
      labels: {
        age: "Yaş",
        weight: "Kilo (kg)",
        height: "Boy (cm)",
        gender: "Cinsiyet",
        goals: "Fitness Hedefleri",
        dietary: "Diyet Tercihleri",
        activity: "Aktivite Seviyesi",
        additional: "Ek Bilgiler",
        required: "Zorunlu",
        createPlan: "Kişiselleştirilmiş Planımı Oluştur",
        creating: "Harika Planınız Oluşturuluyor...",
        additionalPlaceholder: "Bilmemiz gereken alerji, yaralanma veya özel tercihler var mı? 🤔",
      },
      genders: [
        { value: "", label: "Cinsiyet seçin" },
        { value: "male", label: "Erkek" },
        { value: "female", label: "Kadın" },
        { value: "non-binary", label: "Non-binary" },
        { value: "prefer-not-to-say", label: "Belirtmek istemiyorum" },
      ],
      goals: [
        { value: "", label: "Ana hedefinizi seçin" },
        { value: "weight-loss", label: "🔥 Kilo Verme" },
        { value: "muscle-gain", label: "💪 Kas Kazanımı" },
        { value: "endurance", label: "🏃 Dayanıklılık Artırma" },
        { value: "general-health", label: "🌟 Genel Sağlık" },
        { value: "stress-reduction", label: "🧘 Stres Azaltma" },
      ],
      dietary: [
        { value: "", label: "Diyet tercihinizi seçin" },
        { value: "omnivore", label: "🥩 Omnivor (Et ve Sebze)" },
        { value: "vegetarian", label: "🥬 Vejetaryen" },
        { value: "vegan", label: "🌱 Vegan" },
        { value: "pescatarian", label: "🐟 Pesketaryen (Balık ve Sebze)" },
        { value: "keto", label: "🥑 Keto" },
        { value: "paleo", label: "🦴 Paleo" },
        { value: "gluten-free", label: "🌾 Glütensiz" },
      ],
      activity: [
        { value: "", label: "Aktivite seviyenizi seçin" },
        { value: "sedentary", label: "😴 Hareketsiz (az veya hiç egzersiz)" },
        { value: "light", label: "🚶 Hafif (haftada 1-3 gün)" },
        { value: "moderate", label: "🏃 Orta (haftada 3-5 gün)" },
        { value: "active", label: "💪 Aktif (haftada 6-7 gün)" },
        { value: "very-active", label: "🔥 Çok Aktif (günde iki kez)" },
      ],
    },
  }

  const currentContent = content[chatLanguage]
  const currentPlanContent = content[planLanguage]

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="container flex flex-col flex-1 px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">{currentContent.chatTitle}</h1>

        {apiError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="chat">💬 Chat</TabsTrigger>
            <TabsTrigger value="plan">📋 Get a Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{currentContent.chatLanguage}:</span>
                  <select
                    value={chatLanguage}
                    onChange={(e) => setChatLanguage(e.target.value as "en" | "tr")}
                    className="text-sm rounded-md border border-input bg-background px-2 py-1"
                  >
                    <option value="en">🇺🇸 English</option>
                    <option value="tr">🇹🇷 Türkçe</option>
                  </select>
                </div>
              </div>

              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: "calc(100vh - 350px)" }}
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
                    <h3 className="text-lg font-medium mb-2">{currentContent.chatWelcome}</h3>
                    <p className="max-w-md mb-6">{currentContent.chatWelcomeDesc}</p>
                    <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-md">
                      {currentContent.suggestions.map((suggestion, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          className="justify-start text-left h-auto py-2 px-3 whitespace-normal"
                          onClick={() => {
                            setInput(suggestion)
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
                          "rounded-lg px-4 py-2 text-sm whitespace-pre-wrap",
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
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-green-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-green-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">🤖 {currentContent.aiThinking}</span>
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
                    placeholder={currentContent.chatPlaceholder}
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
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">🎯 {currentPlanContent.planTitle}</h2>
                <p className="text-gray-500">{currentPlanContent.planSubtitle}</p>
              </div>

              {!showPlanResult ? (
                <form className="space-y-6" onSubmit={handlePlanSubmit}>
                  {/* Language Selection First */}
                  <div className="space-y-2">
                    <label htmlFor="planLanguage" className="text-sm font-medium flex items-center gap-2">
                      🌐 {currentPlanContent.planLanguage} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="planLanguage"
                      value={planLanguage}
                      onChange={(e) => setPlanLanguage(e.target.value as "en" | "tr")}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="tr">🇹🇷 Türkçe</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-sm font-medium flex items-center gap-2">
                        👤 {currentPlanContent.labels.age} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="age"
                        type="number"
                        placeholder={planLanguage === "tr" ? "Yaşınızı girin" : "Enter your age"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="weight" className="text-sm font-medium flex items-center gap-2">
                        ⚖️ {currentPlanContent.labels.weight} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder={planLanguage === "tr" ? "Kilonuzu girin" : "Enter your weight"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="height" className="text-sm font-medium flex items-center gap-2">
                        📏 {currentPlanContent.labels.height} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="height"
                        type="number"
                        placeholder={planLanguage === "tr" ? "Boyunuzu girin" : "Enter your height"}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="gender" className="text-sm font-medium flex items-center gap-2">
                        🚻 {currentPlanContent.labels.gender} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        {currentPlanContent.genders.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="goals" className="text-sm font-medium flex items-center gap-2">
                      🎯 {currentPlanContent.labels.goals} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="goals"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      {currentPlanContent.goals.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dietary" className="text-sm font-medium flex items-center gap-2">
                      🍽️ {currentPlanContent.labels.dietary} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="dietary"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      {currentPlanContent.dietary.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="activity" className="text-sm font-medium flex items-center gap-2">
                      🏃 {currentPlanContent.labels.activity} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="activity"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      {currentPlanContent.activity.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="additional" className="text-sm font-medium flex items-center gap-2">
                      📝 {currentPlanContent.labels.additional}
                    </label>
                    <Textarea id="additional" placeholder={currentPlanContent.labels.additionalPlaceholder} rows={3} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                    disabled={isGeneratingPlan}
                  >
                    {isGeneratingPlan ? (
                      <>
                        <span className="animate-pulse mr-2">🤖</span>
                        {currentPlanContent.labels.creating}
                      </>
                    ) : (
                      <>🎯 {currentPlanContent.labels.createPlan}</>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">🎉 {currentPlanContent.planReady}</h3>
                    <p className="text-gray-500">{currentPlanContent.planReadyDesc}</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border max-h-96 overflow-y-auto">
                    <div className="text-sm space-y-2">{renderMarkdownToReact(plan)}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPlanResult(false)
                        setPlan("")
                        setUserInfo(null)
                      }}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      {currentPlanContent.createAnother}
                    </Button>
                    <Button
                      onClick={handleDownloadPDF}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />📄 {currentPlanContent.downloadPDF}
                    </Button>
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
