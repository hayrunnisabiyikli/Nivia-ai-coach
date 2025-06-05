"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ApiTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testGeminiApi = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/test-gemini-new")
      const data = await response.json()

      if (data.success) {
        setResult(data)
      } else {
        setError(data.details || "An error occurred while testing the API")
      }
    } catch (err) {
      setError("Failed to connect to the test endpoint")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">API Test Page</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gemini API Test</CardTitle>
          <CardDescription>Test your Gemini API connection</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This will test if your Gemini API key is working correctly by making a simple request to generate content.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                API connection successful!
                {result.response?.candidates?.[0]?.content?.parts?.[0]?.text && (
                  <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded border">
                    <p className="font-medium">Generated response:</p>
                    <p className="mt-1">{result.response.candidates[0].content.parts[0].text}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={testGeminiApi} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing...
              </>
            ) : (
              "Test Gemini API"
            )}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>API Response Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-96">
              <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
