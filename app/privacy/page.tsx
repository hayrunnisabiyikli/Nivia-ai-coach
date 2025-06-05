import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🔒 Demo Version Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                This is a demonstration version of NiVia Health Coach AI. No personal data is collected, stored, or
                processed by our systems. All interactions are temporary and not saved.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Don't Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>In this demo version, we do not collect:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Personal identification information</li>
                <li>Health data or medical information</li>
                <li>Chat conversations or messages</li>
                <li>Generated wellness plans</li>
                <li>User accounts or profiles</li>
                <li>Cookies for tracking purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Temporary Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Any information you enter during your session (such as age, weight, height for plan generation) is only
                used temporarily to generate your personalized plan and is not stored anywhere. This data is discarded
                when you close your browser or navigate away from the page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                This demo uses Google's Gemini AI API to generate responses and wellness plans. Your queries are sent to
                Google's servers for processing but are not associated with your identity and are not stored by us.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this privacy policy, please contact us at{" "}
                <a href="mailto:hayrunnisabiyikli2@gmail.com" className="text-green-600 hover:underline">
                  hayrunnisabiyikli2@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
