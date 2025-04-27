export type PredefinedQA = {
  keywords: string[]
  question: string
  answer: string
}

export const predefinedAnswers: PredefinedQA[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    question: "Hello",
    answer: "Hello! I'm your Health Coach AI assistant. How can I help you with your health and wellness goals today?",
  },
  {
    keywords: ["how", "are", "you"],
    question: "How are you?",
    answer:
      "I'm functioning well, thank you for asking! I'm here to help you with your health and wellness questions. What can I assist you with today?",
  },
  {
    keywords: ["calories", "calorie", "avocado"],
    question: "How many calories are in an avocado?",
    answer:
      "A medium-sized avocado (about 150 grams) contains approximately 240 calories. Avocados are nutrient-dense and rich in healthy fats, fiber, vitamins, and minerals. They're a great addition to a balanced diet!",
  },
  {
    keywords: ["workout", "exercise", "beginner", "start"],
    question: "What's a good workout for beginners?",
    answer:
      "For beginners, I recommend starting with a mix of cardio and basic strength training. Try walking or light jogging for 20-30 minutes, 3 times a week. Add bodyweight exercises like squats, push-ups (can be modified against a wall), and planks. Start with 2 sets of 8-10 repetitions, and gradually increase as you build strength. Remember to warm up before and stretch after your workout!",
  },
  {
    keywords: ["diet", "meal", "plan", "low", "carb"],
    question: "Can you suggest a low-carb meal plan?",
    answer:
      "Here's a simple low-carb meal plan:\n\nBreakfast: Scrambled eggs with spinach and cheese\nLunch: Grilled chicken salad with olive oil dressing\nSnack: A handful of nuts or Greek yogurt\nDinner: Baked salmon with roasted vegetables\n\nFocus on proteins, healthy fats, and non-starchy vegetables. Limit grains, starchy vegetables, and sugars. Remember to adjust portions based on your specific caloric needs.",
  },
  {
    keywords: ["sleep", "better", "improve", "quality"],
    question: "How can I improve my sleep quality?",
    answer:
      "To improve sleep quality:\n\n1. Maintain a consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Make your bedroom cool, dark, and quiet\n4. Avoid screens 1-2 hours before bed\n5. Limit caffeine and alcohol\n6. Exercise regularly, but not close to bedtime\n7. Consider relaxation techniques like deep breathing or meditation\n\nIf sleep problems persist, consider consulting a healthcare professional.",
  },
  {
    keywords: ["water", "drink", "hydration", "hydrate"],
    question: "How much water should I drink daily?",
    answer:
      "A general guideline is to drink about 8 cups (64 ounces) of water per day, but individual needs vary based on factors like activity level, climate, and overall health. A good indicator of proper hydration is having pale yellow urine. Remember that foods with high water content (like fruits and vegetables) also contribute to your hydration status.",
  },
  {
    keywords: ["protein", "sources", "vegetarian", "vegan"],
    question: "What are good protein sources for vegetarians?",
    answer:
      "Great vegetarian protein sources include:\n\n1. Legumes (beans, lentils, chickpeas)\n2. Tofu, tempeh, and edamame\n3. Greek yogurt and cottage cheese\n4. Eggs (for ovo-vegetarians)\n5. Quinoa and other whole grains\n6. Nuts and seeds (especially hemp seeds and chia seeds)\n7. Plant-based protein powders\n\nCombining different plant proteins throughout the day helps ensure you get all essential amino acids.",
  },
  {
    keywords: ["stress", "reduce", "management", "anxiety"],
    question: "How can I reduce stress?",
    answer:
      "Effective stress management techniques include:\n\n1. Regular physical activity\n2. Mindfulness meditation or deep breathing exercises\n3. Adequate sleep\n4. Limiting caffeine and alcohol\n5. Connecting with supportive friends and family\n6. Time management and setting boundaries\n7. Engaging in hobbies and activities you enjoy\n8. Spending time in nature\n\nIf stress becomes overwhelming, consider speaking with a mental health professional.",
  },
  {
    keywords: ["weight", "loss", "lose", "healthy"],
    question: "What's a healthy way to lose weight?",
    answer:
      "Healthy weight loss involves:\n\n1. Creating a moderate calorie deficit (about 500 calories/day for 1-2 pounds/week)\n2. Eating nutrient-dense whole foods\n3. Including protein with each meal to maintain muscle mass\n4. Regular physical activity (both cardio and strength training)\n5. Adequate sleep and stress management\n6. Staying hydrated\n7. Being patient and consistent\n\nAvoid crash diets or extreme restrictions, as they're typically unsustainable and can be harmful to your health.",
  },
  {
    keywords: ["vitamin", "supplements", "need", "take"],
    question: "Do I need to take vitamin supplements?",
    answer:
      "Whether you need supplements depends on your diet, health status, age, and other factors. Many people can get sufficient nutrients from a varied, balanced diet. However, certain groups may benefit from supplements, including pregnant women, older adults, those with specific medical conditions, or restricted diets. Common supplements to consider include vitamin D (especially with limited sun exposure), B12 (particularly for vegans), and omega-3s. It's best to consult with a healthcare provider before starting any supplement regimen.",
  },
  {
    keywords: ["help", "assistance", "support"],
    question: "Can you help me?",
    answer:
      "I'd be happy to help! I can provide information on nutrition, exercise, sleep, stress management, and general wellness topics. Please let me know what specific health or wellness question you have, and I'll do my best to assist you.",
  },
  {
    keywords: ["thanks", "thank", "you"],
    question: "Thank you",
    answer:
      "You're welcome! If you have any other health or wellness questions in the future, feel free to ask. I'm here to help you on your wellness journey!",
  },
  {
    keywords: ["run", "running", "jog", "jogging"],
    question: "How to start running?",
    answer:
      "To start running safely and effectively:\n\n1. Begin with a walk-run approach: alternate between walking and short running intervals\n2. Start with just 5-10 minutes of running, gradually increasing by 10% each week\n3. Invest in proper running shoes that suit your foot type\n4. Focus on proper form: land midfoot, maintain short strides, and keep a slight forward lean\n5. Follow a beginner-friendly plan like Couch to 5K\n6. Allow for recovery days between runs\n7. Stay hydrated and listen to your body\n\nConsistency is key - even short, regular runs will build your endurance over time.",
  },
  {
    keywords: ["breakfast", "healthy", "morning", "meal"],
    question: "What are some healthy breakfast options?",
    answer:
      "Healthy breakfast options include:\n\n1. Oatmeal topped with fruits and nuts\n2. Greek yogurt parfait with berries and granola\n3. Whole grain toast with avocado and eggs\n4. Smoothie with spinach, banana, protein powder, and milk\n5. Overnight chia pudding with fruit\n6. Vegetable omelet with whole grain toast\n7. Cottage cheese with fruit and a sprinkle of nuts\n\nAim for a combination of protein, complex carbs, and healthy fats to keep you energized throughout the morning.",
  },
  {
    keywords: ["stretch", "stretching", "flexibility", "mobility"],
    question: "How important is stretching?",
    answer:
      "Stretching is an important component of physical fitness that:\n\n1. Improves flexibility and range of motion\n2. Enhances physical performance\n3. Decreases risk of injuries\n4. Improves posture and alignment\n5. Helps reduce muscle tension and stress\n\nFor best results, perform dynamic stretches (moving stretches) before workouts and static stretches (held positions) after exercise when muscles are warm. Aim to stretch major muscle groups 2-3 times per week, holding each stretch for 15-30 seconds.",
  },
  {
    keywords: ["sugar", "reduce", "cut", "less"],
    question: "How can I reduce sugar in my diet?",
    answer:
      "To reduce sugar in your diet:\n\n1. Read food labels - sugar hides under many names (ending in '-ose')\n2. Cut back on sugary beverages - switch to water, unsweetened tea, or coffee\n3. Choose plain yogurt and add fresh fruit instead of buying flavored varieties\n4. Reduce portions of sweet treats gradually\n5. Use spices like cinnamon, nutmeg, or vanilla extract to add sweetness\n6. Choose whole fruits over fruit juices or dried fruits\n7. Be aware of condiments and sauces that often contain hidden sugars\n8. Gradually reduce sugar in recipes - most can be cut by 1/3 without noticing\n\nRemember that your taste buds will adapt over time, making less sweet foods more satisfying.",
  },
  {
    keywords: ["default"],
    question: "",
    answer:
      "I'm here to help with health and wellness questions. I can provide information about nutrition, fitness, sleep, stress management, and other wellness topics. Could you please ask a specific question about health or wellness?",
  },
]

export function findBestMatch(input: string): PredefinedQA {
  // Convert input to lowercase and remove punctuation for better matching
  const normalizedInput = input.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
  const inputWords = normalizedInput.split(/\s+/)

  // Check each predefined answer for keyword matches
  let bestMatch: PredefinedQA | null = null
  let highestScore = 0

  for (const qa of predefinedAnswers) {
    // Skip the default answer when searching for matches
    if (qa.keywords.includes("default")) continue

    // Calculate match score based on keyword presence
    let score = 0
    for (const keyword of qa.keywords) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        // Give more weight to exact matches
        score += 2
      } else {
        // Check if any input word starts with this keyword
        for (const word of inputWords) {
          if (word.startsWith(keyword.toLowerCase()) || keyword.toLowerCase().startsWith(word)) {
            score += 1
            break
          }
        }
      }
    }

    // If this is a better match than what we've found so far, update bestMatch
    if (score > highestScore) {
      highestScore = score
      bestMatch = qa
    }
  }

  // If no good match was found (score too low), return the default answer
  if (highestScore < 1) {
    return predefinedAnswers.find((qa) => qa.keywords.includes("default"))!
  }

  return bestMatch!
}
