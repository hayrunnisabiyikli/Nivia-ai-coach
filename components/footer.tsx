import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
            <Heart className="h-3 w-3 text-white" />
          </span>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Flex Aura. All rights reserved.</p>
        </div>
        <nav className="flex items-center gap-4 text-sm text-gray-500">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="/feedback" className="hover:underline">
            Görüş & Öneri
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  )
}
