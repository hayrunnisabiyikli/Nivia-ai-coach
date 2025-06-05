import { NextResponse } from "next/server"

const GEMINI_API_KEY = "AIzaSyAvxvWmZQqR_4T32oA69sEhp6AUkMWkSQw"

export async function POST(req: Request) {
  try {
    const { messages, language = "en" } = await req.json()

    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json({ error: "No user message found" }, { status: 400 })
    }

    // Create language-specific system prompts
    const systemPrompts = {
      en: `You are a professional AI health and wellness coach. Your role is to provide helpful, evidence-based advice on nutrition, fitness, sleep, stress management, and general wellness. 

Guidelines:
- Always provide practical, actionable advice
- Base recommendations on scientific evidence
- Encourage users to consult healthcare professionals for medical concerns
- Keep responses concise but informative (2-4 paragraphs max)
- Be supportive and motivating
- Focus on sustainable, healthy lifestyle changes
- If asked about specific medical conditions, recommend consulting a doctor
- Respond in English

User question: ${lastMessage.content}`,

      tr: `Sen profesyonel bir AI sağlık ve wellness koçusun. Rolün beslenme, fitness, uyku, stres yönetimi ve genel wellness konularında yardımcı, kanıt temelli tavsiyeler vermek.

Kurallar:
- Her zaman pratik, uygulanabilir tavsiyeler ver
- Önerilerini bilimsel kanıtlara dayandır
- Kullanıcıları tıbbi endişeler için sağlık uzmanlarına danışmaya teşvik et
- Yanıtlarını kısa ama bilgilendirici tut (maksimum 2-4 paragraf)
- Destekleyici ve motive edici ol
- Sürdürülebilir, sağlıklı yaşam tarzı değişikliklerine odaklan
- Belirli tıbbi durumlar hakkında sorulursa doktora danışmayı öner
- Türkçe yanıt ver

Kullanıcı sorusu: ${lastMessage.content}`,
    }

    // Make request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                  text: systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API error:", response.status, errorText)
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error("Invalid response from Gemini API")
    }

    const aiResponse = data.candidates[0].content.parts[0].text

    return NextResponse.json({
      success: true,
      message: aiResponse,
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
