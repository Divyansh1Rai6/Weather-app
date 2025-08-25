import React from 'react'


const Today = ({weatherData}) => {
  if(!weatherData || Object.keys(weatherData).length === 0) {
     return <></>
  }
 const getWeatherDescription = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear' :
        return 'Clear Sky';
        case 'clouds' :
          return 'Partly Cloudly';
          case 'rain' :
            return 'Rainy';
            case 'snow' : 
            return 'Snowy';
            case 'drizzle' : 
            return 'Drizzling'; 
            default:
              return 'Weather Condition';
    }
  };
  const weatherDescription = getWeatherDescription(weatherData?.weatherMain);
  return (
    <div>
      <div className='mt-20 ml-2 mr-2 p-auto border-4 border-solid border-purple-400 rounded-md bg-gray-50'>
        <h3 className='top-5 text-purple-600 font-bold text-center h-8'>Today's Weather</h3>
        <hr className='h-1 bg-purple-400'></hr>
        <div className='flex mt-2 justify-start gap-3'>
          <img src={weatherData.icon} alt='weather' className='size-7 inline-flex'></img><p>Day <b>Hi:{weatherData.temp_Max || 'N/A'}°C</b></p>
        </div>
        <div className=' flex gap-3'>
          <img src={weatherData.icon} alt='weather' className='size-8 inline-flex'></img><p>Tonight: <b>Lo: {weatherData.temp_Min || 'N/A'}°C</b></p>
        </div>
      </div>
      <div className='mt-10 ml-2 mr-2 p-auto border-4 border-solid border-purple-400 rounded-md bg-gray-50'>
        <h3 className='top-5 text-purple-600 font-bold text-center h-8'>Current Weather</h3>
        <hr className='h-1 bg-purple-400'></hr>
        <div className='flex'>

          <img src={weatherData.icon} alt='weather' className='size-32 p-auto'></img>
          <div className='flex flex-col mt-10'>
            <p className='font-bold'>{weatherData.temperature} °C</p>
            <p className='font-bold'>{weatherDescription}</p>
          </div>
          <div className='flex-col m-auto text-center'> 
            <ul>
              <li>Wind Speed<b> {weatherData.windSpeed}Km/h</b></li>
              <li>Wind Gusts<b> {weatherData.windgust} km/h</b></li>
              <li>Air Quality<b> Fair</b></li>
            </ul>
          </div>
        </div>
      </div>
     
    </div>

  )
}

export default Today