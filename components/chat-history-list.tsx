"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for chat history
const mockChatHistory = [
  {
    id: "1",
    title: "Nutrition advice for weight loss",
    preview: "I need help creating a meal plan for weight loss...",
    date: new Date(2023, 3, 15),
    messageCount: 12,
  },
  {
    id: "2",
    title: "Workout routine for beginners",
    preview: "What's a good workout routine for someone just starting...",
    date: new Date(2023, 3, 10),
    messageCount: 8,
  },
  {
    id: "3",
    title: "Sleep improvement strategies",
    preview: "I've been having trouble sleeping lately. Can you suggest...",
    date: new Date(2023, 3, 5),
    messageCount: 15,
  },
  {
    id: "4",
    title: "Stress management techniques",
    preview: "What are some effective ways to manage daily stress?",
    date: new Date(2023, 2, 28),
    messageCount: 10,
  },
  {
    id: "5",
    title: "Healthy snack options",
    preview: "Can you recommend some healthy snacks for work?",
    date: new Date(2023, 2, 20),
    messageCount: 6,
  },
]

export default function ChatHistoryList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = mockChatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-2 text-lg font-medium">No conversations found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Start a new conversation with the AI coach"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredHistory.map((chat) => (
            <div key={chat.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start">
                <Link href={`/chat/${chat.id}`} className="flex-1">
                  <h3 className="font-medium hover:underline">{chat.title}</h3>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{chat.preview}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>{formatDistanceToNow(chat.date, { addSuffix: true })}</span>
                <span>{chat.messageCount} messages</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
