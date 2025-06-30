"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function WeatherBackground() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Animated Background */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          theme === "light"
            ? "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"
            : "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
        }`}
      >
        {/* Floating Weather Icons */}
        <div className="absolute inset-0">
          {/* Large Weather Logo */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
            <svg width="400" height="400" viewBox="0 0 400 400" className="text-white">
              <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Cloud Shape */}
              <path
                d="M100 200 C100 150, 150 100, 200 100 C250 100, 300 150, 300 200 C350 200, 400 250, 400 300 C400 350, 350 400, 300 400 L100 400 C50 400, 0 350, 0 300 C0 250, 50 200, 100 200 Z"
                fill="url(#cloudGradient)"
              />
              {/* Sun behind cloud */}
              <circle cx="320" cy="120" r="40" fill="url(#cloudGradient)" opacity="0.6" />
              {/* Sun rays */}
              <g stroke="currentColor" strokeWidth="3" opacity="0.4">
                <line x1="320" y1="60" x2="320" y2="80" />
                <line x1="360" y1="80" x2="350" y2="90" />
                <line x1="380" y1="120" x2="360" y2="120" />
                <line x1="360" y1="160" x2="350" y2="150" />
                <line x1="320" y1="180" x2="320" y2="160" />
                <line x1="280" y1="160" x2="290" y2="150" />
                <line x1="260" y1="120" x2="280" y2="120" />
                <line x1="280" y1="80" x2="290" y2="90" />
              </g>
            </svg>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 animate-float-slow">
            <div
              className={`w-16 h-16 rounded-full backdrop-blur-sm border ${
                theme === "light" ? "bg-white/20 border-white/30" : "bg-white/5 border-white/10"
              }`}
            ></div>
          </div>
          <div className="absolute top-40 right-20 animate-float-medium">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-full backdrop-blur-sm border border-cyan-400/20"></div>
          </div>
          <div className="absolute bottom-40 left-20 animate-float-fast">
            <div
              className={`w-20 h-20 rounded-full backdrop-blur-sm border ${
                theme === "light" ? "bg-purple-500/20 border-purple-400/30" : "bg-purple-500/5 border-purple-400/10"
              }`}
            ></div>
          </div>
          <div className="absolute bottom-20 right-10 animate-float-slow">
            <div className="w-14 h-14 bg-pink-500/10 rounded-full backdrop-blur-sm border border-pink-400/20"></div>
          </div>

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full animate-twinkle ${
                  theme === "light" ? "bg-white/40" : "bg-white/20"
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
