import { NextResponse } from "next/server"

export async function GET() {
  const API_KEY = "AIzaSyDJSBTKZlonM4AXUxRscituulYk9NzJAfo"

  try {
    // Test the Gemini API with a simple request
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Provide a short health tip about nutrition in 50 words or less.",
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed with status ${response.status}: ${errorText}`)
    }

    const data = await response.json()

    // Also get available models to check API access
    const modelsResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=" + API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const modelsData = modelsResponse.ok ? await modelsResponse.json() : { error: "Could not fetch models" }

    return NextResponse.json({
      success: true,
      message: "Gemini API test completed",
      response: data,
      availableModels: modelsData,
    })
  } catch (error) {
    console.error("Error testing Gemini API:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to test Gemini API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
