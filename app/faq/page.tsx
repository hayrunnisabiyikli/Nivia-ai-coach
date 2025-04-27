import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "How does the AI wellness coach work?",
      answer:
        "Our AI wellness coach is powered by OpenAI's GPT-4o technology and uses advanced natural language processing to understand your questions and provide personalized health and fitness guidance. It draws from a knowledge base of nutrition, exercise science, and wellness research to offer evidence-based recommendations tailored to your specific needs and goals.",
    },
    {
      question: "Is my conversation with the AI coach private?",
      answer:
        "Yes, your privacy is important to us. Currently, conversations are not stored on our servers beyond your session, and no login is required. Conversation history is only stored locally in your browser for the duration of your session to maintain context for better responses.",
    },
    {
      question: "Can the AI coach replace my doctor or nutritionist?",
      answer:
        "No, our AI wellness coach is designed to provide general health and wellness guidance but is not a substitute for professional medical advice. Always consult with qualified healthcare professionals for medical concerns, diagnoses, or treatment plans.",
    },
    {
      question: "How accurate is the nutritional information provided?",
      answer:
        "Our AI coach provides nutritional information based on established databases and research. While we strive for accuracy, variations can occur in food composition. For precise nutritional tracking, especially for medical conditions like diabetes, consult with a registered dietitian.",
    },
    {
      question: "Can I get a personalized meal and workout plan?",
      answer:
        "Yes! You can generate a personalized weekly diet and workout plan by providing information about your age, weight, dietary preferences, fitness goals, and other relevant details in the 'Get a Plan' tab of the chat interface.",
    },
    {
      question: "Does the AI coach remember my previous conversations?",
      answer:
        "The AI coach maintains context within a single session, allowing for coherent back-and-forth conversations. However, once you close your browser or clear your cache, the conversation history is not preserved for privacy reasons.",
    },
    {
      question: "What types of questions can I ask the AI coach?",
      answer:
        "You can ask questions about nutrition (e.g., 'How many calories are in this meal?'), fitness (e.g., 'What's a good workout for beginners?'), general wellness (e.g., 'How can I improve my sleep?'), and request personalized recommendations based on your health goals.",
    },
    {
      question: "How often is the AI coach's knowledge updated?",
      answer:
        "Our OpenAI-powered coach's knowledge is continuously updated with the latest information. OpenAI's GPT-4o model incorporates recent research and guidelines in nutrition, fitness, and wellness, ensuring you receive the most current and evidence-based information available.",
    },
  ]

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h1>

        <Accordion type="single" collapsible className="mb-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Try asking our AI wellness coach directly or contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                Chat with AI Coach <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
