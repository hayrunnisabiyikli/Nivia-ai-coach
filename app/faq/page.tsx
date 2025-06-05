import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Flex Aura AI Health Coach?",
      answer:
        "Flex Aura is an AI-powered health and wellness coaching platform that provides personalized nutrition advice, fitness programs, and wellness guidance using advanced artificial intelligence technology.",
    },
    {
      question: "Is this a medical service?",
      answer:
        "No, Flex Aura is not a medical service. We provide general wellness information and guidance. Always consult with healthcare professionals for medical concerns, diagnoses, or treatment decisions.",
    },
    {
      question: "How does the AI generate personalized plans?",
      answer:
        "Our AI analyzes your personal information including age, weight, height, fitness goals, dietary preferences, and activity level to create customized meal and exercise plans tailored to your specific needs.",
    },
    {
      question: "Is my personal data safe?",
      answer:
        "Yes, we take data privacy seriously. This is a demo version and no personal data is permanently stored. In a full version, we would implement industry-standard security measures to protect your information.",
    },
    {
      question: "Can I use this if I have medical conditions?",
      answer:
        "While our AI provides general wellness advice, if you have any medical conditions, allergies, or health concerns, you should consult with your healthcare provider before following any fitness or nutrition recommendations.",
    },
    {
      question: "How accurate is the AI advice?",
      answer:
        "Our AI is trained on evidence-based health and wellness information. However, individual needs vary, and the advice should be considered as general guidance rather than personalized medical advice.",
    },
  ]

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About Flex Aura AI Health Coach</CardTitle>
            <CardDescription>Find answers to common questions about our AI-powered wellness platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
            <CardDescription>
              If you couldn't find the answer you're looking for, feel free to contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              You can reach out to us through our contact page or start a conversation with our AI coach to get
              immediate assistance with health and wellness questions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
