# Weather App

A beautiful and fully functional full-stack weather application built with Next.js, featuring real-time weather data and 5-day forecasts.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 🔍 City search functionality
- 📊 Current weather conditions with detailed metrics
- 📅 5-day weather forecast
- 📱 Fully responsive design
- 🎨 Modern, beautiful UI with glassmorphism effects
- ⚡ Fast and optimized with Next.js
- 🛡️ Comprehensive error handling
- 🌐 Server-side API integration for security

## Setup Instructions

### Prerequisites

- Node.js 18+ installed on your machine
- A free OpenWeatherMap API key

### 1. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the API keys section
4. Copy your API key

### 2. Install and Run

1. **Download the project** using the "Download Code" button above
2. **Navigate to the project directory:**
   \`\`\`bash
   cd weather-app
   \`\`\`

3. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

4. **Set up environment variables:**
   - Rename `.env.local.example` to `.env.local`
   - Replace `your_api_key_here` with your actual OpenWeatherMap API key:
   \`\`\`
   OPENWEATHER_API_KEY=your_actual_api_key_here
   \`\`\`

5. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser** and visit `http://localhost:3000`

## Usage

1. Enter a city name in the search box
2. Press Enter or click the search button
3. View current weather conditions and 5-day forecast
4. The app handles errors gracefully if a city is not found

## Project Structure

\`\`\`
weather-app/
├── app/
│   ├── api/weather/route.ts    # Backend API endpoint
│   ├── page.tsx                # Main frontend page
│   └── layout.tsx              # App layout
├── components/
│   ├── weather-card.tsx        # Current weather display
│   ├── forecast-card.tsx       # Forecast day display
│   └── loading-spinner.tsx     # Loading animation
├── .env.local                  # Environment variables
└── README.md                   # This file
\`\`\`

## API Endpoints

- `GET /api/weather?city={cityName}` - Fetches current weather and 5-day forecast

## Technologies Used

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Weather Data:** OpenWeatherMap API
- **Icons:** Lucide React
- **Styling:** Custom CSS with Tailwind, Glassmorphism effects

## Error Handling

The app includes comprehensive error handling for:
- Invalid city names
- Network connectivity issues
- API rate limits
- Missing API keys
- Server errors

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
