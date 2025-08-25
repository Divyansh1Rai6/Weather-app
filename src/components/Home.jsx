import React, { useState } from 'react'
import Today from './Today';
import AirQuality from './AirQuality';
import { useEffect } from 'react';
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import night from '../assets/night.png'
import Hourly from './Hourly';

const Home = () => {

  const [weatherData, setWeatherData] = useState(false)
  const [airData, setairData] = useState(null)
  const [hourlyData, sethourlyData] = useState(null)
  const [City, setCity] = useState()
  const [error, seterror] = useState(null)

  const allIcons = {
    "01d": clear,
    "01n": night,
    "02d": cloud,
    "02n": cloud,
    "03n": humidity,
    "09d": drizzle,
    "04d": rain,
    "04n": snow,
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear
      if (data.cod === '404') {
        seterror("City not found")
        return
      }
      if (data.cod !== 200) {
        seterror(data.message || "Error fetching data")
        return
      }
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
      })



      if (data.coord && data.coord.lat && data.coord.lon) {
        const airPoll = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${import.meta.env.VITE_APP_ID}`
        const airResponse = await fetch(airPoll)
        const airData = await airResponse.json()
        console.log(airData)
        setairData({
          AQI: airData.list[0].main.aqi,
          Co: airData.list[0].components.co,
          No: airData.list[0].components.no,
          No2: airData.list[0].components.no2,
          O3: airData.list[0].components.o3,
          SO2: airData.list[0].components.so2,
        })
        const hourlyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${data.coord.lat}&longitude=${data.coord.lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,dewpoint_2m,visibility,uv_index,cloudcover,precipitation&timezone=auto`
        const hourlyResponse = await fetch(hourlyUrl)
        const hourlyData = await hourlyResponse.json()
        console.log(hourlyData)
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
        })
      } else {
        console.error("No coordinates")
      }


    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    search(City);
  }, [])
  return (
    <div>
      <div className='flex flex-col mt-20 ml-4 mr-4  justify-center items-center'>
        <div className='flex flex-col m-5'>
          <h2 className='text-center text-purple-700 font-bold text-lg'>Check Weather Status {weatherData.location}</h2>
        </div>
        <div className=' flex flex-col gap-5 w-full p-auto'>
          <input type='text' placeholder='Enter your City:' className='p-2 border-none rounded-md' value={City} onChange={(e) => setCity(e.target.value)}></input>
        </div>

        <button className='border-none rounded-md w-full p-3 text-white font-bold mt-7 content-center bg-purple-400 ' onClick={() => search(City)}>Check</button>

      </div>
       {weatherData && <Today weatherData={weatherData} />}
      {airData && <AirQuality airData={airData} />}
      {hourlyData && <Hourly hourlyData={hourlyData} />}
    </div>
  )
}

export default Home