import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // This is just a placeholder since we're not actually using the API anymore
    // The chat functionality is now handled directly in the frontend with predefined answers
    return NextResponse.json({
      success: true,
      message: "This endpoint is no longer used. Chat functionality is handled with predefined answers.",
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
