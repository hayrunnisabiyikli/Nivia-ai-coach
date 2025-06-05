interface Answer {
  keywords: string[]
  answer: string
  category: string
}

const predefinedAnswers: Answer[] = [
  {
    keywords: ["weight", "lose", "loss", "diet"],
    answer:
      "For healthy weight loss, focus on creating a moderate calorie deficit through a combination of balanced nutrition and regular exercise. Aim to lose 1-2 pounds per week. Include plenty of vegetables, lean proteins, and whole grains in your diet. Stay hydrated and get adequate sleep. Always consult with a healthcare professional before starting any weight loss program.",
    category: "weight-management",
  },
  {
    keywords: ["protein", "daily", "intake", "much"],
    answer:
      "The general recommendation for protein intake is 0.8-1.2 grams per kilogram of body weight for sedentary adults, and 1.2-2.0 grams per kilogram for active individuals. Good protein sources include lean meats, fish, eggs, dairy, legumes, nuts, and seeds. Spread your protein intake throughout the day for optimal absorption.",
    category: "nutrition",
  },
  {
    keywords: ["workout", "exercise", "beginner", "start"],
    answer:
      "For beginners, start with 2-3 days per week of moderate exercise. Begin with 20-30 minutes of walking, light jogging, or bodyweight exercises like squats, push-ups, and planks. Focus on proper form over intensity. Gradually increase duration and intensity as your fitness improves. Always warm up before and cool down after exercise.",
    category: "fitness",
  },
  {
    keywords: ["sleep", "quality", "improve", "better"],
    answer:
      "To improve sleep quality: maintain a consistent sleep schedule, create a relaxing bedtime routine, keep your bedroom cool and dark, avoid screens 1 hour before bed, limit caffeine after 2 PM, and get regular exercise (but not close to bedtime). Aim for 7-9 hours of sleep per night.",
    category: "wellness",
  },
  {
    keywords: ["calories", "avocado"],
    answer:
      "A medium avocado (about 150g) contains approximately 234 calories. Avocados are rich in healthy monounsaturated fats, fiber, potassium, and vitamins K, C, and E. They're a nutritious addition to a balanced diet when consumed in moderation.",
    category: "nutrition",
  },
]

export function findBestMatch(userInput: string): { answer: string; category: string } {
  const input = userInput.toLowerCase()

  let bestMatch = predefinedAnswers[0]
  let maxMatches = 0

  for (const answer of predefinedAnswers) {
    const matches = answer.keywords.filter((keyword) => input.includes(keyword.toLowerCase())).length

    if (matches > maxMatches) {
      maxMatches = matches
      bestMatch = answer
    }
  }

  if (maxMatches === 0) {
    return {
      answer:
        "I'm here to help with health and wellness questions! You can ask me about nutrition, fitness, weight management, sleep, or general wellness topics. For specific medical concerns, please consult with a healthcare professional.",
      category: "general",
    }
  }

  return {
    answer: bestMatch.answer,
    category: bestMatch.category,
  }
}
