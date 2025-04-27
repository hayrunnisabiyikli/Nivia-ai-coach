import OpenAI from "openai"
import { NextResponse } from "next/server"

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
})

export async function GET() {
  try {
    // Test the OpenAI API with a simple request
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: "Hello, are you working? Please respond with a short greeting.",
        },
      ],
      max_tokens: 50,
    })

    const text = completion.choices[0].message.content

    // Get available models
    const models = await openai.models.list()
    const modelList = models.data.map((model) => ({
      id: model.id,
      created: model.created,
      owned_by: model.owned_by,
    }))

    return NextResponse.json({
      success: true,
      message: "OpenAI API test successful",
      response: text,
      availableModels: modelList,
    })
  } catch (error) {
    console.error("Error testing OpenAI API:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to test OpenAI API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
