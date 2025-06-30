import { type NextRequest, NextResponse } from "next/server"

// OpenWeatherMap API configuration
const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Add this function to validate API key
function validateApiKey(): string {
  if (!API_KEY) {
    throw new Error("OPENWEATHER_API_KEY environment variable is not set")
  }

  if (API_KEY === "your_api_key_here") {
    throw new Error("Please replace 'your_api_key_here' with your actual OpenWeatherMap API key")
  }

  // Basic validation for API key format (32 character hex string)
  if (!/^[a-f0-9]{32}$/i.test(API_KEY)) {
    throw new Error("Invalid API key format. OpenWeatherMap API keys should be 32 character hexadecimal strings")
  }

  return API_KEY
}

interface OpenWeatherResponse {
  name: string
  sys: { country: string }
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: { speed: number }
  visibility: number
}

interface ForecastResponse {
  list: Array<{
    dt: number
    main: {
      temp: number
      humidity: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
  }>
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")

    if (!city) {
      return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
    }

    // Validate API key
    let apiKey: string
    try {
      apiKey = validateApiKey()
    } catch (error) {
      console.error("API Key validation error:", error)
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "API key configuration error",
        },
        { status: 500 },
      )
    }

    // Fetch current weather with better error handling
    const currentWeatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    console.log("Fetching weather for:", city) // Debug log

    const currentWeatherResponse = await fetch(currentWeatherUrl)

    if (!currentWeatherResponse.ok) {
      const errorText = await currentWeatherResponse.text()
      console.error("Weather API Error:", currentWeatherResponse.status, errorText)

      if (currentWeatherResponse.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid API key. Please check your OpenWeatherMap API key and ensure it's activated.",
          },
          { status: 401 },
        )
      }

      if (currentWeatherResponse.status === 404) {
        return NextResponse.json({ error: "City not found. Please check the spelling and try again." }, { status: 404 })
      }

      throw new Error(`Weather API error: ${currentWeatherResponse.status} - ${errorText}`)
    }

    const currentWeather: OpenWeatherResponse = await currentWeatherResponse.json()

    // Fetch 5-day forecast with the same error handling
    const forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    const forecastResponse = await fetch(forecastUrl)

    if (!forecastResponse.ok) {
      const errorText = await forecastResponse.text()
      console.error("Forecast API Error:", forecastResponse.status, errorText)

      if (forecastResponse.status === 401) {
        return NextResponse.json(
          {
            error: "Invalid API key for forecast data. Please check your OpenWeatherMap API key.",
          },
          { status: 401 },
        )
      }

      throw new Error(`Forecast API error: ${forecastResponse.status} - ${errorText}`)
    }

    const forecastData: ForecastResponse = await forecastResponse.json()

    // Process forecast data (get one forecast per day at noon)
    const dailyForecasts = forecastData.list
      .filter((item, index) => index % 8 === 0) // Every 8th item (24 hours / 3 hours = 8)
      .slice(0, 5) // Get only 5 days
      .map((item) => ({
        date: new Date(item.dt * 1000).toISOString(),
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
      }))

    // Format response
    const response = {
      current: {
        city: currentWeather.name,
        country: currentWeather.sys.country,
        temperature: currentWeather.main.temp,
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        feelsLike: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
        visibility: currentWeather.visibility,
        pressure: currentWeather.main.pressure,
      },
      forecast: dailyForecasts,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Weather API Error:", error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch weather data. Please try again later.",
      },
      { status: 500 },
    )
  }
}
