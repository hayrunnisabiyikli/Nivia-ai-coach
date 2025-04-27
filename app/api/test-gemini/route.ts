export async function GET() {
  const API_KEY = "AIzaSyDDEZNuV-1_rietz3Ql2e0HXpEmCgKrZb8"

  try {
    // Try to list available models
    console.log("Attempting to list available models...")

    const modelsResponse = await fetch("https://generativelanguage.googleapis.com/v1/models?key=" + API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!modelsResponse.ok) {
      throw new Error(`Models API request failed with status ${modelsResponse.status}: ${await modelsResponse.text()}`)
    }

    const modelsData = await modelsResponse.json()
    console.log("Available models:", modelsData)

    // Simple test prompt using direct API call
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY,
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
                  text: "Hello, are you working? Please respond with a short greeting.",
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${await response.text()}`)
    }

    const data = await response.json()
    const text = data.candidates[0].content.parts[0].text

    return new Response(
      JSON.stringify({
        success: true,
        message: "Gemini API test successful",
        response: text,
        availableModels: modelsData,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Error testing Gemini API:", error)

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to test Gemini API",
        details: error.message,
        errorObject: JSON.stringify(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
