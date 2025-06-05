export default function TermsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Terms of Service</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            These terms apply to the demonstration version of Flex Aura AI Health Coach.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Demo Version</h2>
          <p>
            This is a demonstration application created for educational and showcase purposes. It is not a commercial
            product or service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Acceptable Use</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the demo for educational and evaluation purposes only</li>
            <li>Do not attempt to exploit or misuse the system</li>
            <li>Do not rely on the demo for actual medical or health decisions</li>
            <li>Respect the demonstration nature of the application</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Medical Disclaimer</h2>
          <p>
            This application is for demonstration purposes only and does not provide medical advice. The AI-generated
            content is for educational purposes and should not be used as a substitute for professional medical advice,
            diagnosis, or treatment.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>
            This demo is provided "as is" without warranties of any kind. The creators are not liable for any damages or
            issues arising from the use of this demonstration.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>
            This demonstration showcases AI and web development capabilities. All content is created for demonstration
            purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
          <p>
            These terms may be updated as the demo evolves. Continued use of the demo constitutes acceptance of any
            changes.
          </p>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
