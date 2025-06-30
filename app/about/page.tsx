"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { WeatherBackground } from "@/components/weather-background"
import { Users, Globe, Zap, Shield, Heart } from "lucide-react"

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access weather data for over 200,000 cities worldwide with real-time updates.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant search results and smooth 3D animations.",
    },
    {
      icon: Shield,
      title: "Reliable Data",
      description: "Powered by OpenWeatherMap API, trusted by millions of developers globally.",
    },
    {
      icon: Heart,
      title: "User Focused",
      description: "Designed with accessibility and user experience as our top priorities.",
    },
  ]

  const stats = [
    { number: "200K+", label: "Cities Covered" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Data Updates" },
    { number: "5-Day", label: "Forecasts" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Weather Background */}
      <WeatherBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-pink-900/80 backdrop-blur-sm dark:from-indigo-950/90 dark:via-purple-950/80 dark:to-pink-950/90"></div>

      {/* Navigation */}
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
              <Users className="h-12 w-12 text-cyan-300 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                About WeatherSphere
              </h1>
            </div>
            <p className="text-xl text-white/80 dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
              WeatherSphere is a revolutionary weather platform that combines cutting-edge technology with beautiful
              design to deliver the most immersive weather experience on the web.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-lg text-white/80 dark:text-white/70 text-center leading-relaxed">
                We believe weather information should be beautiful, accessible, and engaging. Our mission is to
                transform how people interact with weather data by creating an immersive 3D experience that makes
                checking the weather a delightful part of your day.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-all duration-300 shadow-xl"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Why Choose WeatherSphere?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg mr-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                Built with Modern Technology
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Next.js 14</h3>
                  <p className="text-white/70 text-sm">React framework for production</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">TS</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">TypeScript</h3>
                  <p className="text-white/70 text-sm">Type-safe development</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3D</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">3D Effects</h3>
                  <p className="text-white/70 text-sm">Immersive animations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
