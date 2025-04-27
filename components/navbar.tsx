"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, MessageSquare, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import UserAuthNav from "@/components/user-auth-nav"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Mock user state - in a real app, this would come from an auth context
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Simulate checking auth state
  useEffect(() => {
    // Check if we're on a page that would have a logged-in user
    if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/chat/")) {
      setUser({
        name: "John Doe",
        email: "john@example.com",
      })
    } else {
      setUser(null)
    }
  }, [pathname])

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

  // Add the API Status link to the navItems array
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "API Status", href: "/api-status" },
  ]

  // Add dashboard link if user is logged in
  if (user) {
    navItems.push({ name: "Dashboard", href: "/dashboard" })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </span>
            <span className="font-bold text-xl">NiVia Health Coach AI</span>
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

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/chat">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" /> Chat Now
                </Button>
              </Link>
              <UserAuthNav user={user} />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <UserAuthNav />
            </div>
          )}

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

            {user ? (
              <>
                <Link href="/chat" onClick={closeMenu}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageSquare className="mr-2 h-4 w-4" /> Chat Now
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    closeMenu()
                    setUser(null)
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={closeMenu}>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
