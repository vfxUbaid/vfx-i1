"use client"
import { Menu, X, Home, Info, Settings, Cloud, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export function Navigation({ mobileMenuOpen, setMobileMenuOpen }: NavigationProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Info, label: "About", href: "/about" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg shadow-lg">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                WeatherSphere
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-2 transition-all duration-300 hover:bg-white/10 px-3 py-2 rounded-lg ${
                    isActive(item.href) ? "text-cyan-300 bg-white/10" : "text-white/80 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-yellow-300" />
                  ) : (
                    <Moon className="h-4 w-4 text-blue-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center space-x-3 transition-colors duration-300 hover:bg-white/10 px-4 py-3 rounded-lg ${
                      isActive(item.href) ? "text-cyan-300 bg-white/10" : "text-white/80 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg">{item.label}</span>
                  </Link>
                ))}

                {/* Mobile Theme Toggle */}
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setTheme("light")}
                    className={`flex items-center space-x-2 rounded-lg p-3 transition-colors ${
                      theme === "light" ? "bg-white/20 text-yellow-300" : "bg-white/10 text-white/80"
                    }`}
                  >
                    <Sun className="h-5 w-5" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`flex items-center space-x-2 rounded-lg p-3 transition-colors ${
                      theme === "dark" ? "bg-white/20 text-blue-300" : "bg-white/10 text-white/80"
                    }`}
                  >
                    <Moon className="h-5 w-5" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
