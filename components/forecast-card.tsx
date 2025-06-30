import { Droplets, Calendar } from "lucide-react"

interface ForecastData {
  date: string
  temperature: number
  description: string
  icon: string
  humidity: number
}

interface ForecastCardProps {
  forecast: ForecastData
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      day: date.toLocaleDateString("en-US", { day: "numeric" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
    }
  }

  const dateInfo = formatDate(forecast.date)

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 hover:scale-105 transition-all duration-300 shadow-xl">
      {/* Date */}
      <div className="mb-4">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="h-4 w-4 text-cyan-300 mr-2" />
          <span className="text-white/80 font-semibold">{dateInfo.weekday}</span>
        </div>
        <div className="text-white/60 text-sm">
          {dateInfo.month} {dateInfo.day}
        </div>
      </div>

      {/* Weather Icon */}
      <div className="mb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-lg"></div>
        <img
          src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
          alt={forecast.description}
          className="relative w-16 h-16 mx-auto drop-shadow-lg"
        />
      </div>

      {/* Temperature */}
      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-3">
        {Math.round(forecast.temperature)}°
      </div>

      {/* Description */}
      <div className="text-sm text-white/70 capitalize mb-4 font-medium">{forecast.description}</div>

      {/* Humidity */}
      <div className="flex items-center justify-center bg-white/10 rounded-lg py-2 px-3 border border-white/20">
        <Droplets className="h-4 w-4 text-blue-300 mr-2" />
        <span className="text-white/80 text-sm font-medium">{forecast.humidity}%</span>
      </div>
    </div>
  )
}
