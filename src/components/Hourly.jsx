const Hourly = ({ hourlyData }) => {
  if (!hourlyData ||
    !hourlyData.HT ||
    !hourlyData.temmp ||
    hourlyData.HT.length === 0) return <p>Loading hourly forecast...</p>;

  return (
    <div className="mt-20 p-4">
      <h2 className="mb-6 text-center text-2xl font-bold">Hourly Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hourlyData.HT.slice(0, 24).map((HT, index) => (
          <div key={HT} className="flex justify-between border-2 border-purple-400 p-2 rounded-xl shadow bg-gray-50">
            <h3 className="font-bold text-lg mb-2">{new Date(HT).getHours()}:00</h3>
            <div className="  ml-4 grid grid-cols-2 gap-2 text-sm">
            <p> Temp: <span className="font-semibold">{hourlyData.temmp?.[index]}°C</span></p>
            <p> Rain: <span className="font-semibold">{hourlyData.precp?.[index]} mm</span></p>
            <p> Humidity: <span className="font-semibold">{hourlyData.Hum?.[index]}%</span></p>
            <p> Clouds: <span className="font-semibold">{hourlyData.cloudcover?.[index]}%</span></p>
            <p> Wind: <span className="font-semibold">{hourlyData.winds?.[index]} km/h</span></p>
            <p> UV Index: <span className="font-semibold">{hourlyData.UV?.[index]}</span></p>
            <p> Dew: <span className="font-semibold">{hourlyData.dew?.[index]}°C</span></p>
            <p> Visiblity: <span className="font-semibold">{hourlyData.Visibility?.[index]} m</span></p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Hourly