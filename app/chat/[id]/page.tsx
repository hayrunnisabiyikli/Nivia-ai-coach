"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Send, User, Bot, ArrowDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ChatPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the chat history based on the ID
  const chatId = params.id

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    id: chatId,
    // In a real app, we would initialize with the chat history
    initialMessages: [
      {
        id: "1",
        role: "system",
        content: "You are an AI wellness coach specializing in nutrition, fitness, and health advice.",
      },
      {
        id: "2",
        role: "user",
        content: "I need help with creating a balanced meal plan.",
      },
      {
        id: "3",
        role: "assistant",
        content:
          "I'd be happy to help you create a balanced meal plan! To provide the most personalized recommendations, could you share some information about your goals, dietary preferences, and any restrictions you might have?",
      },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px-64px)] bg-gray-50 dark:bg-gray-900">
      <div className="container flex flex-col flex-1 px-4 py-8 mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Chat with Your AI Wellness Coach</h1>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            {messages
              .filter((message) => message.role !== "system")
              .map((message, i) => (
                <div
                  key={i}
                  className={cn("flex items-start gap-3 max-w-[80%]", message.role === "user" ? "ml-auto" : "mr-auto")}
                >
                  <Avatar className={cn("h-8 w-8", message.role === "user" ? "order-2 bg-green-100" : "bg-green-600")}>
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-green-700" />
                    ) : (
                      <Bot className="h-5 w-5 text-white" />
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
              ))}
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
                placeholder="Ask about nutrition, fitness, or wellness..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
