import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <h3 className="font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}
