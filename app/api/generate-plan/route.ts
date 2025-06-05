import { NextResponse } from "next/server"

const GEMINI_API_KEY = "AIzaSyAvxvWmZQqR_4T32oA69sEhp6AUkMWkSQw"

export async function POST(req: Request) {
  try {
    const { formData, language = "en" } = await req.json()

    // Create language-specific prompts
    const planPrompts = {
      en: `You are an expert health and wellness coach creating a personalized plan. Use emojis throughout to make it motivational and engaging!

USER PROFILE:
👤 Age: ${formData.age} years old
⚖️ Weight: ${formData.weight} kg
📏 Height: ${formData.height} cm
🚻 Gender: ${formData.gender}
🎯 Primary Goal: ${formData.goal}
🍽️ Dietary Preference: ${formData.dietary}
🏃 Activity Level: ${formData.activity}
📝 Additional Notes: ${formData.additional || "None provided"}

Create a comprehensive, motivational, and personalized weekly health plan with the following structure. IMPORTANT: You MUST include ALL 7 DAYS for both meal and exercise plans. Do not cut short - provide complete 7-day plans.

# 🌟 YOUR PERSONALIZED WELLNESS JOURNEY

## 👋 Welcome Message
Start with a personalized, encouraging welcome message acknowledging their goals.

## 📊 YOUR HEALTH PROFILE SUMMARY
Summarize their current stats and what this means for their journey.

## 🎯 YOUR GOALS & WHAT TO EXPECT
Break down their goals and set realistic expectations with timelines.

## 🍽️ WEEKLY MEAL PLAN
Create a detailed 7-day meal plan with:

### 📅 Day 1 (Monday)
- 🌅 **Breakfast:** [specific meal with calories]
- 🌞 **Mid-Morning Snack:** [specific snack]
- 🌤️ **Lunch:** [specific meal with calories]
- 🌆 **Afternoon Snack:** [specific snack]
- 🌙 **Dinner:** [specific meal with calories]

### 📅 Day 2 (Tuesday)
[Continue same format for all 7 days]

### 📅 Day 3 (Wednesday)
[Continue same format]

### 📅 Day 4 (Thursday)
[Continue same format]

### 📅 Day 5 (Friday)
[Continue same format]

### 📅 Day 6 (Saturday)
[Continue same format]

### 📅 Day 7 (Sunday)
[Continue same format]

## 💪 WEEKLY EXERCISE PLAN
Design a 7-day workout schedule with:

### 🏃 Day 1 (Monday): [Workout Type]
- **Warm-up:** [5-10 minutes]
- **Main workout:** [specific exercises with sets/reps/duration]
- **Cool-down:** [5-10 minutes]

### 🏃 Day 2 (Tuesday): [Workout Type]
[Continue same format for all 7 days]

### 🏃 Day 3 (Wednesday): [Workout Type]
[Continue same format]

### 🏃 Day 4 (Thursday): [Workout Type]
[Continue same format]

### 🏃 Day 5 (Friday): [Workout Type]
[Continue same format]

### 🏃 Day 6 (Saturday): [Workout Type]
[Continue same format]

### 🏃 Day 7 (Sunday): [Workout Type]
[Continue same format]

## 💧 HYDRATION & WELLNESS HABITS
- Daily water intake goals
- Sleep recommendations
- Stress management tips
- Mindfulness practices

## 📈 PROGRESS TRACKING
- What to measure and when
- How to track progress
- Milestone celebrations

## 🎉 MOTIVATION & TIPS
- Daily affirmations
- Success tips
- How to overcome challenges
- Reward system

## ⚠️ IMPORTANT REMINDERS
- Safety guidelines
- When to consult professionals
- Adjustment recommendations

CRITICAL: Make sure to include ALL 7 DAYS for both meal and exercise plans. Do not abbreviate or cut short. Provide complete, detailed plans for the entire week. Respond in English.`,

      tr: `Sen uzman bir sağlık ve wellness koçusun ve kişiselleştirilmiş bir plan oluşturuyorsun. Motive edici ve ilgi çekici olması için emojiler kullan!

KULLANICI PROFİLİ:
👤 Yaş: ${formData.age} yaşında
⚖️ Kilo: ${formData.weight} kg
📏 Boy: ${formData.height} cm
🚻 Cinsiyet: ${formData.gender}
🎯 Ana Hedef: ${formData.goal}
🍽️ Diyet Tercihi: ${formData.dietary}
🏃 Aktivite Seviyesi: ${formData.activity}
📝 Ek Notlar: ${formData.additional || "Belirtilmemiş"}

Aşağıdaki yapıda kapsamlı, motive edici ve kişiselleştirilmiş haftalık sağlık planı oluştur. ÖNEMLİ: Hem yemek hem de egzersiz planları için TÜM 7 GÜNÜ dahil etmelisin. Kısa kesme - tam 7 günlük planlar sağla.

# 🌟 KİŞİSELLEŞTİRİLMİŞ WELLNESS YOLCULUĞUNUZ

## 👋 Hoş Geldin Mesajı
Hedeflerini kabul eden kişiselleştirilmiş, cesaret verici bir hoş geldin mesajıyla başla.

## 📊 SAĞLIK PROFİLİ ÖZETİN
Mevcut istatistiklerini ve bunun yolculuğun için ne anlama geldiğini özetle.

## 🎯 HEDEFLERİN VE BEKLEYECEKLERIN
Hedeflerini parçala ve zaman çizelgeleriyle gerçekçi beklentiler belirle.

## 🍽️ HAFTALIK YEMEK PLANI
Detaylı 7 günlük yemek planı oluştur:

### 📅 1. Gün (Pazartesi)
- 🌅 **Kahvaltı:** [kalori ile birlikte belirli yemek]
- 🌞 **Kuşluk Atıştırmalığı:** [belirli atıştırmalık]
- 🌤️ **Öğle Yemeği:** [kalori ile birlikte belirli yemek]
- 🌆 **İkindi Atıştırmalığı:** [belirli atıştırmalık]
- 🌙 **Akşam Yemeği:** [kalori ile birlikte belirli yemek]

### 📅 2. Gün (Salı)
[Tüm 7 gün için aynı formatı devam ettir]

### 📅 3. Gün (Çarşamba)
[Aynı formatı devam ettir]

### 📅 4. Gün (Perşembe)
[Aynı formatı devam ettir]

### 📅 5. Gün (Cuma)
[Aynı formatı devam ettir]

### 📅 6. Gün (Cumartesi)
[Aynı formatı devam ettir]

### 📅 7. Gün (Pazar)
[Aynı formatı devam ettir]

## 💪 HAFTALIK EGZERSİZ PLANI
7 günlük antrenman programı tasarla:

### 🏃 1. Gün (Pazartesi): [Antrenman Türü]
- **Isınma:** [5-10 dakika]
- **Ana antrenman:** [set/tekrar/süre ile belirli egzersizler]
- **Soğuma:** [5-10 dakika]

### 🏃 2. Gün (Salı): [Antrenman Türü]
[Tüm 7 gün için aynı formatı devam ettir]

### 🏃 3. Gün (Çarşamba): [Antrenman Türü]
[Aynı formatı devam ettir]

### 🏃 4. Gün (Perşembe): [Antrenman Türü]
[Aynı formatı devam ettir]

### 🏃 5. Gün (Cuma): [Antrenman Türü]
[Aynı formatı devam ettir]

### 🏃 6. Gün (Cumartesi): [Antrenman Türü]
[Aynı formatı devam ettir]

### 🏃 7. Gün (Pazar): [Antrenman Türü]
[Aynı formatı devam ettir]

## 💧 HİDRASYON VE WELLNESS ALIŞKANLIKLARI
- Günlük su alımı hedefleri
- Uyku önerileri
- Stres yönetimi ipuçları
- Farkındalık uygulamaları

## 📈 İLERLEME TAKİBİ
- Neyi ne zaman ölçeceğin
- İlerlemeyi nasıl takip edeceğin
- Kilometre taşı kutlamaları

## 🎉 MOTİVASYON VE İPUÇLARI
- Günlük olumlamalar
- Başarı ipuçları
- Zorlukların üstesinden nasıl gelineceği
- Ödül sistemi

## ⚠️ ÖNEMLİ HATIRLATMALAR
- Güvenlik kuralları
- Ne zaman uzmanlara danışılacağı
- Ayarlama önerileri

KRİTİK: Hem yemek hem de egzersiz planları için TÜM 7 GÜNÜ dahil ettiğinden emin ol. Kısaltma veya kısa kesme yapma. Tüm hafta için tam, detaylı planlar sağla. Türkçe yanıt ver.`,
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
                  text: planPrompts[language as keyof typeof planPrompts] || planPrompts.en,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192, // Increased significantly to allow full plans
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

    const generatedPlan = data.candidates[0].content.parts[0].text

    // Validate that the plan contains all 7 days
    const dayCount = (generatedPlan.match(/Day [1-7]|Gün|[1-7]\. Gün/g) || []).length
    const uniqueDays = new Set(generatedPlan.match(/Day [1-7]|Gün|[1-7]\. Gün/g) || []).size

    if (dayCount < 10 || uniqueDays < 7) {
      // Should have at least 10 mentions (7 for meals, 7+ for exercises)
      return NextResponse.json(
        {
          error: "Incomplete plan generated",
          message:
            language === "tr"
              ? "AI tam 7 günlük plan oluşturmadı. Tam haftalık programınızı almak için lütfen tekrar deneyin."
              : "The AI didn't generate a complete 7-day plan. Please try again for a full weekly plan.",
          details: `Plan validation failed: Found ${dayCount} day mentions, ${uniqueDays} unique days`,
        },
        { status: 422 },
      )
    }

    return NextResponse.json({
      success: true,
      plan: generatedPlan,
      userInfo: formData,
    })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json(
      {
        error: "Failed to generate plan",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
