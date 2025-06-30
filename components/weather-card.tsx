import { MapPin, Eye, Wind, Droplets, Gauge, Thermometer } from "lucide-react"

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

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Weather Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
        {/* Location Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-white/10 rounded-full px-6 py-3 border border-white/20">
            <MapPin className="h-6 w-6 text-cyan-300 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              {weather.city}, {weather.country}
            </h2>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Temperature Section */}
          <div className="text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30"></div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.description}
                className="relative w-32 h-32 mx-auto drop-shadow-2xl"
              />
            </div>
            <div className="space-y-2">
              <div className="text-7xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                {Math.round(weather.temperature)}°
              </div>
              <div className="text-xl text-white/90 capitalize font-medium">{weather.description}</div>
              <div className="flex items-center justify-center text-white/70">
                <Thermometer className="h-4 w-4 mr-2" />
                <span>Feels like {Math.round(weather.feelsLike)}°C</span>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Wind className="h-6 w-6 text-cyan-300 mr-3" />
                <span className="text-white/70 font-medium">Wind</span>
              </div>
              <div className="text-2xl font-bold text-white">{weather.windSpeed}</div>
              <div className="text-sm text-white/60">m/s</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Droplets className="h-6 w-6 text-blue-300 mr-3" />
                <span className="text-white/70 font-medium">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-white">{weather.humidity}</div>
              <div className="text-sm text-white/60">%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Eye className="h-6 w-6 text-purple-300 mr-3" />
                <span className="text-white/70 font-medium">Visibility</span>
              </div>
              <div className="text-2xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)}</div>
              <div className="text-sm text-white/60">km</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Gauge className="h-6 w-6 text-pink-300 mr-3" />
                <span className="text-white/70 font-medium">Pressure</span>
              </div>
              <div className="text-2xl font-bold text-white">{weather.pressure}</div>
              <div className="text-sm text-white/60">hPa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
