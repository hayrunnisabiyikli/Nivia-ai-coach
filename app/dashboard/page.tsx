"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, BarChart, Settings, Clock } from "lucide-react"
import ChatHistoryList from "@/components/chat-history-list"

export default function DashboardPage() {
  // Mock user data - would come from authentication context in a real app
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "January 2023",
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}!</p>
          </div>
          <Link href="/chat">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              New Conversation <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Chat History</TabsTrigger>
            <TabsTrigger value="plans">My Plans</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Conversations</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 since last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Nutrition, Fitness, Wellness</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78/100</div>
                  <p className="text-xs text-muted-foreground">+12 since you started</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent interactions with the AI coach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Nutrition Plan Discussion",
                      time: "2 hours ago",
                      description: "Discussed low-carb meal options for breakfast",
                    },
                    {
                      title: "Workout Routine",
                      time: "Yesterday",
                      description: "Created a 30-minute home workout routine",
                    },
                    {
                      title: "Sleep Improvement",
                      time: "3 days ago",
                      description: "Analyzed sleep patterns and suggested improvements",
                    },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                        <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        <p className="text-sm">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chat History</CardTitle>
                <CardDescription>Your previous conversations with the AI coach</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatHistoryList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Wellness Plans</CardTitle>
                <CardDescription>Your personalized health and wellness plans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Weekly Nutrition Plan",
                      date: "Created on April 15, 2023",
                      status: "Active",
                    },
                    {
                      title: "Fitness Routine - Strength Training",
                      date: "Created on March 28, 2023",
                      status: "Active",
                    },
                    {
                      title: "Stress Management Plan",
                      date: "Created on February 10, 2023",
                      status: "Completed",
                    },
                  ].map((plan, i) => (
                    <div key={i} className="flex flex-col space-y-2 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{plan.title}</h3>
                        <Badge variant={plan.status === "Active" ? "default" : "secondary"}>{plan.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{plan.date}</p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <Avatar className="h-20 w-20">
                    <img
                      src="/images/ai-health-coach-realistic.png"
                      alt="Profile"
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="font-medium text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Member since {user.joinedDate}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Account Settings</h4>
                  <div className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" /> Change Password
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" /> Notification Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
