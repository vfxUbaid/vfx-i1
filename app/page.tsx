"use client"

import type React from "react"
import { useState } from "react"
import { Search, MapPin, Thermometer, Cloud } from "lucide-react"
import { WeatherCard } from "@/components/weather-card"
import { ForecastCard } from "@/components/forecast-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Navigation } from "@/components/navigation"
import { WeatherBackground } from "@/components/weather-background"

interface WeatherData {
  city: string
  country: string
  temperature: number
  description: string
  icon: string
  feelsLike: number
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
}

interface ForecastData {
  date: string
  temperature: number
  description: string
  icon: string
  humidity: number
}

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const searchWeather = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data")
      }

      setWeather(data.current)
      setForecast(data.forecast)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setWeather(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }

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
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Cloud className="h-12 w-12 text-cyan-300 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                WeatherSphere
              </h1>
            </div>
            <p className="text-xl text-white/80 dark:text-white/70 max-w-2xl mx-auto">
              Experience weather like never before with our immersive 3D weather platform
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-lg mx-auto mb-12">
            <form onSubmit={searchWeather} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-1">
                <div className="flex items-center">
                  <MapPin className="absolute left-6 h-6 w-6 text-cyan-300 z-10" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name..."
                    className="w-full px-16 py-4 bg-transparent text-white placeholder-white/60 focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {loading ? <LoadingSpinner /> : <Search className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-lg mx-auto mb-8">
              <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <p className="text-center font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Current Weather */}
          {weather && (
            <div className="mb-12 transform hover:scale-105 transition-all duration-500">
              <WeatherCard weather={weather} />
            </div>
          )}

          {/* 5-Day Forecast */}
          {forecast.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                5-Day Forecast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {forecast.map((day, index) => (
                  <div key={index} className="transform hover:scale-105 transition-all duration-300">
                    <ForecastCard forecast={day} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Welcome Message */}
          {!weather && !loading && !error && (
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6 shadow-2xl">
                    <Thermometer className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Welcome to WeatherSphere
                </h2>
                <p className="text-white/80 dark:text-white/70 text-lg leading-relaxed">
                  Enter a city name to explore immersive weather conditions and detailed forecasts in our beautiful 3D
                  environment.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 dark:bg-black/40 backdrop-blur-md border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="h-6 w-6 text-cyan-300 mr-2" />
            <span className="text-white/90 font-semibold">WeatherSphere</span>
          </div>
          <p className="text-white/60">Powered by OpenWeatherMap API • Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
