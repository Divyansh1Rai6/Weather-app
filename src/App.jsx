import Header from './components/Header'
import Home from './components/Home'
import Today from './components/Today'
import AirQuality from './components/AirQuality'
import Hourly from './components/Hourly'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [airData, setAirData] = useState(null);
  const [hourlyData, sethourlyData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=New Delhi&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;
        const response = await fetch(url);
        const data = await response.json();

        //  store weather data
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          windgust: data.wind.gust,
          temperature: Math.floor(data.main.temp),
          temp_Max: Math.ceil(data.main.temp_max),
          temp_Min: Math.floor(data.main.temp_min),
          location: data.name,
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          weatherMain: data.weather[0].main,
          lat: data.coord.lat,
          lon: data.coord.lon,
        });

        //  fetch air quality using coords
        fetchAir(data.coord.lat, data.coord.lon);
         fetchHourly(data.coord.lat, data.coord.lon);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const fetchAir = async (lat, lon) => {
      try {
        const airPoll = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_APP_ID
        }`;

        const airResponse = await fetch(airPoll);
        const airData = await airResponse.json();
        setAirData({
          AQI: airData.list[0].main.aqi,
          Co: airData.list[0].components.co,
          No: airData.list[0].components.no,
          No2: airData.list[0].components.no2,
          O3: airData.list[0].components.o3,
          SO2: airData.list[0].components.so2,
        });
      } catch (err) {
        console.error('Error fetching air quality:', err);
      }
    };
    const fetchHourly = async (lat, lon) => {
      try {
        const hourlyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,cloudcover,windspeed_10m,uv_index,dewpoint_2m&timezone=auto`;
        
        const hourlyResponse = await fetch(hourlyUrl);
        const hourlyData = await hourlyResponse.json();
        sethourlyData({
          HT : hourlyData.hourly.time,
          temmp : hourlyData.hourly.temperature_2m,
          precp: hourlyData.hourly.precipitation,
          winds : hourlyData.hourly.windspeed_10m,
          UV : hourlyData.hourly.uv_index,
          Hum: hourlyData.hourly.relativehumidity_2m,
          dew : hourlyData.hourly.dewpoint_2m,
          cloudcover: hourlyData.hourly.cloudcover,
          Visibility : hourlyData.hourly.visibility,
        }); // ✅ store only hourly block
      } catch (err) {
        console.error('Error fetching hourly forecast:', err);
      }
    };

    fetchWeather();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Home weatherData={weatherData} setWeatherData={setWeatherData} />
        </>
      ),
    },
    {
      path: '/today',
      element: (
        <>
          <Header />
          <Today weatherData={weatherData} />
        </>
      ),
    },
    {
      path: '/airquality',
      element: (
        <>
          <Header />
          <AirQuality airData={airData} />
        </>
      ),
    },
    {
      path: '/hourly',
      element: (
        <>
          <Header />
          <Hourly  hourlyData={hourlyData} />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
