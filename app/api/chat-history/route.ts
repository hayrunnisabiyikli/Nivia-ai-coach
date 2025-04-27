import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // In a real application, you would:
    // 1. Get the user ID from the session
    // 2. Fetch the chat history from the database

    // For demo purposes, we'll just return mock data
    const chatHistory = [
      {
        id: "1",
        title: "Nutrition advice for weight loss",
        preview: "I need help creating a meal plan for weight loss...",
        date: new Date(2023, 3, 15).toISOString(),
        messageCount: 12,
      },
      {
        id: "2",
        title: "Workout routine for beginners",
        preview: "What's a good workout routine for someone just starting...",
        date: new Date(2023, 3, 10).toISOString(),
        messageCount: 8,
      },
      {
        id: "3",
        title: "Sleep improvement strategies",
        preview: "I've been having trouble sleeping lately. Can you suggest...",
        date: new Date(2023, 3, 5).toISOString(),
        messageCount: 15,
      },
    ]

    return NextResponse.json({ success: true, chatHistory })
  } catch (error) {
    console.error("Error in chat history API:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch chat history" }, { status: 500 })
  }
}
