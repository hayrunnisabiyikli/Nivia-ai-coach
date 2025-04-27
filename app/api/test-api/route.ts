import { NextResponse } from "next/server"

export async function GET() {
  try {
    // OpenAI API'ye basit bir istek gönderelim
    const apiKey =
      process.env.OPENAI_API_KEY ||
      "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"

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: "Say hello in one word",
          },
        ],
        max_tokens: 10,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenAI API error:", response.status, errorData)
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: "API test successful",
      response: data.choices[0].message.content,
    })
  } catch (error) {
    console.error("API test error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "API test failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
