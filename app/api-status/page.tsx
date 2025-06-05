"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function ApiStatusPage() {
  const [isChecking, setIsChecking] = useState(false)
  const [apiStatus, setApiStatus] = useState<"unknown" | "operational" | "error">("unknown")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  const checkApiStatus = async () => {
    setIsChecking(true)
    setErrorDetails(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello, are you working?" }],
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setApiStatus("operational")
      } else {
        setApiStatus("error")
        setErrorDetails(data.details || "Unknown error")
      }
    } catch (error) {
      setApiStatus("error")
      setErrorDetails(error instanceof Error ? error.message : "Network error")
    } finally {
      setIsChecking(false)
      setLastChecked(new Date())
    }
  }

  // Check status on component mount
  useEffect(() => {
    checkApiStatus()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">System Status</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {apiStatus === "operational" && <CheckCircle className="h-5 w-5 text-green-500" />}
            {apiStatus === "error" && <XCircle className="h-5 w-5 text-red-500" />}
            {apiStatus === "unknown" && <Loader2 className="h-5 w-5 animate-spin text-gray-500" />}
            Gemini AI Chat System
          </CardTitle>
          <CardDescription>Real-time AI-powered health coaching</CardDescription>
        </CardHeader>
        <CardContent>
          {apiStatus === "operational" && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>System Operational</AlertTitle>
              <AlertDescription>
                The Gemini AI chat system is working properly and ready to provide personalized health guidance.
              </AlertDescription>
            </Alert>
          )}

          {apiStatus === "error" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>System Error</AlertTitle>
              <AlertDescription>
                There's an issue with the AI chat system. {errorDetails && `Details: ${errorDetails}`}
              </AlertDescription>
            </Alert>
          )}

          {apiStatus === "unknown" && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Checking Status</AlertTitle>
              <AlertDescription>Testing the AI chat system connection...</AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">System Components:</h3>
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Component
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-4 py-2 text-sm">Gemini API Connection</td>
                    <td className="px-4 py-2 text-sm">
                      {apiStatus === "operational" && <span className="text-green-600">Operational</span>}
                      {apiStatus === "error" && <span className="text-red-600">Error</span>}
                      {apiStatus === "unknown" && <span className="text-gray-500">Checking...</span>}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Chat Interface</td>
                    <td className="px-4 py-2 text-sm text-green-600">Operational</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Plan Generator</td>
                    <td className="px-4 py-2 text-sm">
                      {apiStatus === "operational" && <span className="text-green-600">Operational</span>}
                      {apiStatus === "error" && <span className="text-red-600">Error</span>}
                      {apiStatus === "unknown" && <span className="text-gray-500">Checking...</span>}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">User Interface</td>
                    <td className="px-4 py-2 text-sm text-green-600">Operational</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {lastChecked && <p className="text-sm text-gray-500 mt-4">Last checked: {lastChecked.toLocaleString()}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={checkApiStatus} disabled={isChecking} className="flex items-center gap-2">
            {isChecking ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              "Check Status"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About the AI System</CardTitle>
          <CardDescription>Powered by Google's Gemini AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">1. AI-Powered Responses</h3>
              <p className="text-sm text-gray-500">
                The system uses Google's Gemini 2.0 Flash model to provide intelligent, contextual responses to your
                health and wellness questions.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Personalized Guidance</h3>
              <p className="text-sm text-gray-500">
                Each response is tailored to your specific question and provides evidence-based health advice.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Real-time Processing</h3>
              <p className="text-sm text-gray-500">
                Questions are processed in real-time, providing immediate responses to your health inquiries.
              </p>
            </div>
            <div>
              <h3 className="font-medium">4. Safety Guidelines</h3>
              <p className="text-sm text-gray-500">
                The AI is programmed to provide general wellness advice and always recommends consulting healthcare
                professionals for medical concerns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
