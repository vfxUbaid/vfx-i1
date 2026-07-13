"use client"
import { RegistrationForm } from "@/components/registration-form"
import { FeedbackForm } from "@/components/feedback-form"
import { TypeIcon as FormIcon, Users, MessageSquare } from "lucide-react"

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <FormIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Forms
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Beautiful & Responsive Form Components</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Modern Form Components</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our collection of responsive, accessible, and beautifully designed React forms with validation,
              animations, and modern UI patterns.
            </p>
          </div>

          {/* Forms Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Registration Form Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Registration Form</h3>
                  <p className="text-gray-600 dark:text-gray-300">Create new user accounts with validation</p>
                </div>
              </div>
              <RegistrationForm />
            </div>

            {/* Feedback Form Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Feedback Form</h3>
                  <p className="text-gray-600 dark:text-gray-300">Collect user feedback and ratings</p>
                </div>
              </div>
              <FeedbackForm />
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Form Features</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">📱</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Fully Responsive</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Forms adapt perfectly to all screen sizes, from mobile phones to desktop computers.
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">✅</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Smart Validation</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Real-time validation with helpful error messages and visual feedback indicators.
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-xl">🎨</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Modern Design</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Beautiful glassmorphism effects, smooth animations, and contemporary UI patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Built with React, Next.js, and Tailwind CSS • Modern Form Components
          </p>
        </div>
      </footer>
    </div>
  )
}
