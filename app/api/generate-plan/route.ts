import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // This is just a placeholder since we're not actually using the API anymore
    // The plan generation is now handled directly in the frontend with predefined plans

    return NextResponse.json({
      success: true,
      message: "This endpoint is no longer used. Plan generation is handled with predefined templates.",
    })
  } catch (error) {
    console.error("Error in generate-plan API:", error)
    return NextResponse.json(
      {
        error: "Failed to process plan generation request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
