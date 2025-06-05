"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, MessageSquare, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render the navbar after mounting to avoid hydration mismatch
  if (!mounted) {
    return <header className="h-16 border-b"></header> // Placeholder to avoid layout shift
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "API Status", href: "/api-status" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </span>
            <span className="font-bold text-xl">Flex Aura</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">DEMO</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="mr-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/chat">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Start Chatting
              </Button>
            </Link>
          </div>

          <Button variant="ghost" size="icon" aria-label="Toggle menu" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}

            <Link href="/chat" onClick={closeMenu}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" /> Start Chatting
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
