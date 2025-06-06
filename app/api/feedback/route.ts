import { type NextRequest, NextResponse } from "next/server"
// import { randomBytes } from "crypto" // Remove this line

// Basit küfür filtresi - gerçek uygulamada daha kapsamlı olmalı
const badWords = [
  "küfür",
  "hakaret",
  "aptal",
  "salak",
  "gerizekalı",
  "mal",
  "ahmak",
  "stupid",
  "idiot",
  "damn",
  "shit",
  "fuck",
  "bitch",
  "asshole",
]

// Feedback verileri için basit in-memory storage (gerçek uygulamada database kullanın)
const feedbacks: Array<{
  id: string
  message: string
  email?: string
  rating: number
  category: string
  timestamp: string
  isAnonymous: boolean
  // deleteToken: string // Remove this line
}> = []

function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase()
  return badWords.some((word) => lowerText.includes(word.toLowerCase()))
}

// Benzersiz silme tokeni oluştur
// function generateDeleteToken(): string { // Remove this entire function
//   return randomBytes(16).toString("hex")
// }

export async function POST(request: NextRequest) {
  try {
    const { message, email, rating, category } = await request.json()

    // Validation
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: "Mesaj boş olamaz" }, { status: 400 })
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: "Mesaj 1000 karakterden uzun olamaz" }, { status: 400 })
    }

    // Küfür kontrolü
    if (containsBadWords(message)) {
      return NextResponse.json(
        {
          error: "Bu şekilde paylaşım yapılamaz. Lütfen nezaket kurallarına uyun.",
          type: "inappropriate_content",
        },
        { status: 400 },
      )
    }

    // Email kontrolü (opsiyonel)
    if (email && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json({ error: "Geçerli bir email adresi giriniz" }, { status: 400 })
      }
    }

    // Silme tokeni oluştur
    // const deleteToken = generateDeleteToken() // Remove this line

    // Yeni feedback oluştur
    const newFeedback = {
      id: Date.now().toString(),
      message: message.trim(),
      email: email?.trim() || undefined,
      rating: rating || 5,
      category: category || "genel",
      timestamp: new Date().toISOString(),
      isAnonymous: !email || email.trim().length === 0,
      // deleteToken, // Remove this line
    }

    feedbacks.unshift(newFeedback) // En yeni feedback'i başa ekle

    return NextResponse.json({
      success: true,
      message: "Görüşünüz başarıyla kaydedildi. Teşekkür ederiz!",
      feedback: {
        id: newFeedback.id,
        // deleteToken: newFeedback.deleteToken, // Remove this line
      },
    })
  } catch (error) {
    console.error("Feedback API error:", error)
    return NextResponse.json({ error: "Bir hata oluştu. Lütfen tekrar deneyin." }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Son 50 feedback'i döndür
    const recentFeedbacks = feedbacks.slice(0, 50).map((feedback) => ({
      id: feedback.id,
      message: feedback.message,
      rating: feedback.rating,
      category: feedback.category,
      timestamp: feedback.timestamp,
      isAnonymous: feedback.isAnonymous,
      // Email'i gizle, sadece anonim olup olmadığını göster
      hasEmail: !!feedback.email,
      // Silme tokenini gönderme
    }))

    return NextResponse.json({
      feedbacks: recentFeedbacks,
      total: feedbacks.length,
    })
  } catch (error) {
    console.error("Get feedbacks error:", error)
    return NextResponse.json({ error: "Feedback'ler yüklenirken hata oluştu" }, { status: 500 })
  }
}
