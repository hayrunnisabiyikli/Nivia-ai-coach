import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🚨 Important Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  This AI health coach is for informational and educational purposes only. It is NOT a substitute for
                  professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or
                  other qualified health provider with any questions you may have regarding a medical condition.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demo Version Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>This is a demonstration version of NiVia Health Coach AI. By using this demo, you agree that:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>This is for demonstration purposes only</li>
                <li>No medical advice is being provided</li>
                <li>You will not rely on this for medical decisions</li>
                <li>You understand this is an AI system with limitations</li>
                <li>No personal data is collected or stored</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                The creators of this demo shall not be liable for any direct, indirect, incidental, special, or
                consequential damages arising from the use of this AI health coach demo. Use at your own risk and
                discretion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Limitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Please understand that this AI system:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>May provide inaccurate or incomplete information</li>
                <li>Cannot replace professional medical consultation</li>
                <li>Should not be used for emergency medical situations</li>
                <li>May not be suitable for individuals with specific medical conditions</li>
                <li>Provides general wellness information only</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Situations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  If you are experiencing a medical emergency, do not use this AI coach. Call emergency services
                  immediately (911 in the US, 112 in Europe, or your local emergency number).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                For questions about these terms, contact us at{" "}
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
