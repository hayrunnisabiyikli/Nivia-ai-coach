export default function PrivacyPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            This is a demonstration version of Flex Aura AI Health Coach. This privacy policy explains how we handle
            information in this demo environment.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Demo Version Notice</h2>
          <p>
            This is a demonstration application created for educational and showcase purposes. No personal data is
            permanently stored, collected, or transmitted to external servers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Don't Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal identification information</li>
            <li>Health or medical data</li>
            <li>Contact information</li>
            <li>Usage analytics or tracking data</li>
            <li>Cookies or persistent storage</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How the Demo Works</h2>
          <p>
            All interactions with the AI coach and plan generation happen in your browser session. When you close the
            browser or refresh the page, all data is cleared.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p>
            This demo may use AI services for generating responses, but no personal information is sent to these
            services. All interactions are anonymized.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Medical Disclaimer</h2>
          <p>
            This application provides general wellness information and is not intended as medical advice. Always consult
            with healthcare professionals for medical concerns.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            If you have questions about this demo or privacy practices, you can contact us through the contact page.
          </p>

          <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
