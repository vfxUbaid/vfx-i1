"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { WeatherBackground } from "@/components/weather-background"
import { SettingsIcon, Thermometer, Globe, Bell, Palette, Save, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState({
    temperatureUnit: "celsius",
    language: "en",
    notifications: true,
    autoLocation: false,
    refreshInterval: "5",
    colorTheme: "default",
  })

  useEffect(() => {
    setMounted(true)
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("weathersphere-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem("weathersphere-settings", JSON.stringify(settings))
    // Show success message (you could add a toast here)
    alert("Settings saved successfully!")
  }

  const resetSettings = () => {
    const defaultSettings = {
      temperatureUnit: "celsius",
      language: "en",
      notifications: true,
      autoLocation: false,
      refreshInterval: "5",
      colorTheme: "default",
    }
    setSettings(defaultSettings)
    localStorage.setItem("weathersphere-settings", JSON.stringify(defaultSettings))
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (!mounted) {
    return null
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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
              <SettingsIcon className="h-12 w-12 text-cyan-300 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Settings
              </h1>
            </div>
            <p className="text-xl text-white/80 dark:text-white/70 max-w-2xl mx-auto">
              Customize your WeatherSphere experience
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
            {/* Appearance Settings */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <Palette className="h-6 w-6 text-cyan-300 mr-3" />
                <h2 className="text-2xl font-bold text-white">Appearance</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 font-medium mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme("light")}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        theme === "light"
                          ? "bg-white/20 border-cyan-400 text-cyan-300"
                          : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-white/20 border-cyan-400 text-cyan-300"
                          : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        theme === "system"
                          ? "bg-white/20 border-cyan-400 text-cyan-300"
                          : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      System
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Settings */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <Thermometer className="h-6 w-6 text-cyan-300 mr-3" />
                <h2 className="text-2xl font-bold text-white">Weather Preferences</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 font-medium mb-3">Temperature Unit</label>
                  <select
                    value={settings.temperatureUnit}
                    onChange={(e) => updateSetting("temperatureUnit", e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="celsius" className="bg-gray-800">
                      Celsius (°C)
                    </option>
                    <option value="fahrenheit" className="bg-gray-800">
                      Fahrenheit (°F)
                    </option>
                    <option value="kelvin" className="bg-gray-800">
                      Kelvin (K)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-3">Auto Refresh Interval</label>
                  <select
                    value={settings.refreshInterval}
                    onChange={(e) => updateSetting("refreshInterval", e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="1" className="bg-gray-800">
                      1 minute
                    </option>
                    <option value="5" className="bg-gray-800">
                      5 minutes
                    </option>
                    <option value="10" className="bg-gray-800">
                      10 minutes
                    </option>
                    <option value="30" className="bg-gray-800">
                      30 minutes
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white/80 font-medium">Auto-detect Location</label>
                    <p className="text-white/60 text-sm">Automatically get weather for your current location</p>
                  </div>
                  <button
                    onClick={() => updateSetting("autoLocation", !settings.autoLocation)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoLocation ? "bg-cyan-500" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.autoLocation ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Location & Language */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <Globe className="h-6 w-6 text-cyan-300 mr-3" />
                <h2 className="text-2xl font-bold text-white">Location & Language</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 font-medium mb-3">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSetting("language", e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="en" className="bg-gray-800">
                      English
                    </option>
                    <option value="es" className="bg-gray-800">
                      Español
                    </option>
                    <option value="fr" className="bg-gray-800">
                      Français
                    </option>
                    <option value="de" className="bg-gray-800">
                      Deutsch
                    </option>
                    <option value="it" className="bg-gray-800">
                      Italiano
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <Bell className="h-6 w-6 text-cyan-300 mr-3" />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-white/80 font-medium">Weather Alerts</label>
                    <p className="text-white/60 text-sm">Get notified about severe weather conditions</p>
                  </div>
                  <button
                    onClick={() => updateSetting("notifications", !settings.notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications ? "bg-cyan-500" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={saveSettings}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Save className="h-5 w-5" />
                Save Settings
              </button>
              <button
                onClick={resetSettings}
                className="flex-1 flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300"
              >
                <RotateCcw className="h-5 w-5" />
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
