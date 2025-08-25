import React from 'react'

const AirQuality = ({ airData }) => {
  if (!airData || !airData.AQI) {
    return <></>
  }

  
  const getAirQualityDetails = (AQI) => {
    switch (AQI) {
      case 1:
        return {
          label: "Good",
          description: "Air quality is considered satisfactory, and air pollution poses little or no risk."
        }
      case 2:
        return {
          label: "Fair",
          description: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
        }
      case 3:
        return {
          label: "Moderate",
          description: "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
        }
      case 4:
        return {
          label: "Poor",
          description: "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
        }
      case 5:
        return {
          label: "Very Poor",
          description: "Health alert: The risk of health effects is increased for everyone."
        }
      default:
        return { label: "Unknown", description: "Air quality data unavailable." }
    }
  }

  const { label, description } = getAirQualityDetails(airData.AQI)

  return (
    <div>
      {/* Current AQI Card */}
      <div className="flex flex-col mt-20 ml-4 mr-4 p-4 justify-around border-4 border-solid border-purple-400 rounded-md bg-gray-50">
        <h4 className="p-2 font-bold">CURRENT AIR QUALITY</h4>
        <hr className="bg-purple-400 h-1"></hr>
        <div className="mt-4 mb-4 text-center">
          <p className="text-2xl font-bold">AQI: {airData.AQI}</p>
          <p className="text-lg">{label}</p>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Pollutants Data */}
      <div className="flex flex-col mt-10 mb-10 ml-4 mr-4 border-4 border-solid border-purple-400 rounded-md bg-gray-50">
        <div className="flex justify-between mt-2 p-4">
          <h4 className="font-bold">Current Pollutants</h4>
          <h4 className="font-bold">Value (µg/m³)</h4>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="p-4 border-2 border-solid border-purple-400 rounded-md">
            <h3>CO</h3>
            <p className="font-bold">{airData.Co} µg/m³</p>
          </div>

          <div className="p-4 border-2 border-solid border-purple-400 rounded-md">
            <h3>NO</h3>
            <p className="font-bold">{airData.No} µg/m³</p>
          </div>

          <div className="p-4 border-2 border-solid border-purple-400 rounded-md">
            <h3>NO₂</h3>
            <p className="font-bold">{airData.No2} µg/m³</p>
          </div>

          <div className="p-4 border-2 border-solid border-purple-400 rounded-md">
            <h3>O₃</h3>
            <p className="font-bold">{airData.O3} µg/m³</p>
          </div>

          <div className="p-4 border-2 border-solid border-purple-400 rounded-md">
            <h3>SO₂</h3>
            <p className="font-bold">{airData.SO2} µg/m³</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirQuality
