"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, Star, Send, CheckCircle, AlertCircle } from "lucide-react"

interface FeedbackData {
  username: string
  rating: number
  category: string
  message: string
}

interface FormErrors {
  username?: string
  message?: string
}

export function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    username: "",
    rating: 5,
    category: "general",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const categories = [
    { value: "general", label: "General Feedback" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "ui", label: "User Interface" },
    { value: "performance", label: "Performance" },
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!feedbackData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (feedbackData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters"
    }

    if (!feedbackData.message.trim()) {
      newErrors.message = "Feedback message is required"
    } else if (feedbackData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFeedbackData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleRatingClick = (rating: number) => {
    setFeedbackData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Feedback Submitted:", feedbackData)
    alert("Feedback Submitted Successfully!\n" + JSON.stringify(feedbackData, null, 2))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success
    setTimeout(() => {
      setFeedbackData({ username: "", rating: 5, category: "general", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return "text-red-400"
    if (rating <= 3) return "text-yellow-400"
    if (rating <= 4) return "text-blue-400"
    return "text-green-400"
  }

  const getRatingText = (rating: number) => {
    const texts = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"]
    return texts[rating] || ""
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Thank You!</h3>
          <p className="text-gray-600 dark:text-gray-300">Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Username</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="username"
                value={feedbackData.username}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.username
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 dark:border-gray-600 focus:ring-orange-200 dark:focus:ring-orange-800"
                } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                placeholder="Enter your username"
              />
            </div>
            {errors.username && (
              <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.username}</span>
              </div>
            )}
          </div>

          {/* Rating Field */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Rating</label>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || feedbackData.rating)
                          ? `${getRatingColor(hoveredRating || feedbackData.rating)} fill-current`
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className={`text-sm font-medium ${getRatingColor(feedbackData.rating)}`}>
                {getRatingText(feedbackData.rating)}
              </span>
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Category</label>
            <select
              name="category"
              value={feedbackData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-800 text-gray-900 dark:text-white transition-all duration-300"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value} className="bg-white dark:bg-gray-700">
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Your Feedback</label>
            <textarea
              name="message"
              value={feedbackData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                errors.message
                  ? "border-red-300 focus:ring-red-200"
                  : "border-gray-300 dark:border-gray-600 focus:ring-orange-200 dark:focus:ring-orange-800"
              } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
              placeholder="Share your thoughts, suggestions, or report issues..."
            />
            <div className="flex justify-between items-center">
              {errors.message && (
                <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.message}</span>
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 ml-auto">{feedbackData.message.length}/500</div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </div>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
