"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ContactPage() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Create mailto link
    const mailtoLink = `mailto:hayrunnisabiyikli2@gmail.com?subject=${encodeURIComponent(
      `[NiVia Health Coach] ${subject}`,
    )}&body=${encodeURIComponent(`
Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from NiVia Health Coach AI Demo
    `)}`

    // Open email client
    window.location.href = mailtoLink

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">{t.success}!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your email client should have opened with a pre-filled message. Please send the email to complete your
            contact request.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">{t.contactTitle}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t.contactSubtitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              We'd love to hear your feedback, suggestions, or answer any questions you might have about our AI health
              coach.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t.contactName} <span className="text-red-500">*</span>
                  </label>
                  <Input id="name" name="name" placeholder="Your full name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t.contactEmail} <span className="text-red-500">*</span>
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {t.contactSubject} <span className="text-red-500">*</span>
                </label>
                <Input id="subject" name="subject" placeholder="What's this about?" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t.contactMessage} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your question, suggestion, or feedback..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Send className="mr-2 h-4 w-4 animate-pulse" />
                    Opening Email Client...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {t.sendMessage}
                  </>
                )}
              </Button>
            </form>

            <Alert className="mt-6">
              <Mail className="h-4 w-4" />
              <AlertTitle>How it works</AlertTitle>
              <AlertDescription>
                When you click "Send Message", your default email client will open with a pre-filled message to{" "}
                <strong>hayrunnisabiyikli2@gmail.com</strong>. Simply send the email to reach us!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <span>🔒</span> {t.demoNotice}
            </AlertTitle>
            <AlertDescription>{t.demoNoticeText}</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
