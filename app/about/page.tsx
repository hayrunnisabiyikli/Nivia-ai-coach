import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Award, BookOpen, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center mb-8">About the Coach</h1>

        <div className="flex flex-col items-center mb-12">
          <Avatar className="h-32 w-32 mb-4">
            <img src="/images/ai-health-coach-realistic.png" alt="AI Coach" className="rounded-full object-cover" />
          </Avatar>
          <h2 className="text-2xl font-bold mb-2">Flex Aura AI</h2>
          <p className="text-gray-500 text-center mb-4">
            Your personal AI-powered wellness assistant, designed to provide evidence-based health guidance.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Nutrition</Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Fitness</Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Wellness</Badge>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Lifestyle</Badge>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p>
            Flex Aura AI combines cutting-edge artificial intelligence with evidence-based health and wellness knowledge
            to provide personalized guidance for your unique journey. Unlike generic advice found online, our AI coach
            adapts to your specific needs, preferences, and goals.
          </p>
          <p>
            Powered by OpenAI's advanced GPT-4o technology, our coach is continuously learning and improving to deliver
            the most accurate and helpful wellness recommendations.
          </p>
          <p>
            Developed by a team of health professionals, nutritionists, and fitness experts, HealthCoach AI is
            continuously learning and improving to deliver the most accurate and helpful wellness recommendations.
          </p>
          <p>
            While our AI coach provides valuable guidance, it&apos;s important to note that it doesn&apos;t replace
            professional medical advice. Always consult with healthcare professionals for medical concerns.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle>Holistic Wellness</CardTitle>
                <CardDescription>Mind, body, and nutrition</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              We believe true wellness encompasses physical, mental, and nutritional health working in harmony.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle>Evidence-Based</CardTitle>
                <CardDescription>Science-backed guidance</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Our recommendations are grounded in scientific research and established health principles.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle>Continuous Learning</CardTitle>
                <CardDescription>Always improving</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              Our AI coach is constantly learning from new research and user interactions to provide better guidance.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Clock className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle>Sustainable Change</CardTitle>
                <CardDescription>Long-term results</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              We focus on gradual, sustainable lifestyle changes rather than quick fixes or extreme approaches.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
