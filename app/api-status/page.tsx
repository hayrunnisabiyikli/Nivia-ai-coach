"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function ApiStatusPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const simulateRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">System Status</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Chat System Status
          </CardTitle>
          <CardDescription>Using predefined responses - no external API required</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>All Systems Operational</AlertTitle>
            <AlertDescription>
              The chat system is using predefined responses and does not require an external API connection. This
              ensures reliable performance and instant responses.
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">System Information:</h3>
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
                    <td className="px-4 py-2 text-sm">Chat System</td>
                    <td className="px-4 py-2 text-sm text-green-600">Operational</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">Plan Generator</td>
                    <td className="px-4 py-2 text-sm text-green-600">Operational</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">User Interface</td>
                    <td className="px-4 py-2 text-sm text-green-600">Operational</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={simulateRefresh} disabled={isRefreshing} className="flex items-center gap-2">
            {isRefreshing ? "Checking..." : "Check Status"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>About the predefined response system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">1. How It Works</h3>
              <p className="text-sm text-gray-500">
                The system uses a keyword matching algorithm to find the most relevant predefined response to your
                question.
              </p>
            </div>
            <div>
              <h3 className="font-medium">2. Response Coverage</h3>
              <p className="text-sm text-gray-500">
                The system covers common questions about nutrition, fitness, sleep, stress management, and general
                wellness topics.
              </p>
            </div>
            <div>
              <h3 className="font-medium">3. Benefits</h3>
              <p className="text-sm text-gray-500">
                Instant responses, no API dependency, consistent information quality, and reliable performance.
              </p>
            </div>
            <div>
              <h3 className="font-medium">4. Limitations</h3>
              <p className="text-sm text-gray-500">
                The system can only respond to topics it has been programmed to address and may not understand very
                specific or complex questions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
