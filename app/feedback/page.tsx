"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, MessageSquare, Mail, Clock, User, Heart, Sparkles } from "lucide-react"

interface Feedback {
  id: string
  message: string
  rating: number
  category: string
  timestamp: string
  isAnonymous: boolean
  hasEmail: boolean
}

export default function FeedbackPage() {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [rating, setRating] = useState(5)
  const [category, setCategory] = useState("genel")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newFeedbackId, setNewFeedbackId] = useState<string | null>(null)

  // Feedback'leri yükle
  useEffect(() => {
    loadFeedbacks()
  }, [])

  const loadFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback")
      const data = await response.json()
      if (data.feedbacks) {
        setFeedbacks(data.feedbacks)
      }
    } catch (error) {
      console.error("Feedback yükleme hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAlert(null)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          email: email.trim() || undefined,
          rating,
          category,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAlert({ type: "success", message: data.message })
        setNewFeedbackId(data.feedback.id)

        // Form'u temizle
        setMessage("")
        setEmail("")
        setRating(5)
        setCategory("genel")

        // Feedback'leri yeniden yükle
        loadFeedbacks()

        // 5 saniye sonra yeni feedback vurgusunu kaldır
        setTimeout(() => setNewFeedbackId(null), 5000)
      } else {
        setAlert({ type: "error", message: data.error })
      }
    } catch (error) {
      setAlert({ type: "error", message: "Bir hata oluştu. Lütfen tekrar deneyin." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      genel: "bg-blue-100 text-blue-800",
      oneri: "bg-green-100 text-green-800",
      begeni: "bg-purple-100 text-purple-800",
      sikayet: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || colors.genel
  }

  const getCategoryName = (category: string) => {
    const names = {
      genel: "Genel",
      oneri: "Öneri",
      begeni: "Beğeni",
      sikayet: "Şikayet",
    }
    return names[category as keyof typeof names] || "Genel"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-green-600 animate-pulse" />
            Görüş ve Önerileriniz
          </h1>
          <p className="text-lg text-gray-600">Flex Aura'yı daha iyi hale getirmek için görüşlerinizi paylaşın</p>
          <p className="text-sm text-gray-500 mt-2">💡 Paylaştığınız görüşler kalıcı olarak kaydedilir</p>
        </div>

        {/* Feedback Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Görüşünüzü Paylaşın
            </CardTitle>
            <CardDescription>Görüşleriniz kalıcı olarak kaydedilir ve diğer kullanıcılarla paylaşılır.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kategori Seçimi */}
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="transition-all duration-200 hover:border-green-400 focus:border-green-500">
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genel">Genel</SelectItem>
                    <SelectItem value="oneri">Öneri</SelectItem>
                    <SelectItem value="begeni">Beğeni</SelectItem>
                    <SelectItem value="sikayet">Şikayet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Değerlendirme */}
              <div className="space-y-2">
                <Label>Değerlendirme</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-all duration-200"
                    >
                      <Star
                        className={`h-6 w-6 transition-all duration-200 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-medium">{rating} / 5</span>
                </div>
              </div>

              {/* Mesaj */}
              <div className="space-y-2">
                <Label htmlFor="message">Mesajınız *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Görüş ve önerilerinizi buraya yazın..."
                  className="min-h-[120px] transition-all duration-200 hover:border-green-400 focus:border-green-500 resize-none"
                  maxLength={1000}
                  required
                />
                <div className="text-sm text-gray-500 text-right">{message.length} / 1000</div>
              </div>

              {/* Email (Opsiyonel) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Adresiniz (İsteğe Bağlı)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="transition-all duration-200 hover:border-green-400 focus:border-green-500"
                />
                <p className="text-sm text-gray-500">
                  Email adresinizi bırakırsanız size geri dönüş yapabiliriz. Bırakmazsanız anonim olarak paylaşılır.
                </p>
              </div>

              {/* Alert */}
              {alert && (
                <Alert
                  className={`transition-all duration-300 ${
                    alert.type === "error"
                      ? "border-red-200 bg-red-50 animate-shake"
                      : "border-green-200 bg-green-50 animate-bounce-once"
                  }`}
                >
                  <AlertDescription className={alert.type === "error" ? "text-red-800" : "text-green-800"}>
                    {alert.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Gönderiliyor...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Görüşü Paylaş
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Listesi */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Paylaşılan Görüşler
            </CardTitle>
            <CardDescription>Kullanıcılarımızın paylaştığı görüş ve öneriler</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Görüşler yükleniyor...</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-500">Henüz görüş paylaşılmamış. İlk görüşü siz paylaşın!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbacks.map((feedback, index) => (
                  <div
                    key={feedback.id}
                    className={`border rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] ${
                      feedback.id === newFeedbackId
                        ? "ring-2 ring-green-500 bg-gradient-to-r from-green-50 to-blue-50 animate-pulse shadow-lg"
                        : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${getCategoryColor(feedback.category)} shadow-sm transition-all duration-200 hover:scale-105`}
                        >
                          {getCategoryName(feedback.category)}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 transition-all duration-300 ${
                                star <= feedback.rating
                                  ? "fill-yellow-400 text-yellow-400 drop-shadow-sm animate-twinkle"
                                  : "text-gray-300"
                              }`}
                              style={{ animationDelay: `${star * 100}ms` }}
                            />
                          ))}
                        </div>
                        {feedback.id === newFeedbackId && (
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white animate-bounce shadow-lg">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Yeni!
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        {feedback.isAnonymous ? "Anonim" : "Kayıtlı Kullanıcı"}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">{feedback.message}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {formatDate(feedback.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes bounce-once {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        .animate-bounce-once {
          animation: bounce-once 1s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
