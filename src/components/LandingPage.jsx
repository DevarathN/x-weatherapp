const { useState, useEffect } = require("react");

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [cityWeatherDetails, setCityWeatherDetails] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const API_KEY = `4d8bded79d904b2787e72117251508`;
  useEffect(() => {}, []);
  const getCityWeather = async () => {
    setLoading(true);
    try {
      if (!selectedCity) {
        alert("Enter a city name");
        return;
      }
      const cityWeatherRes = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}`
      );
      const cityWeatherData = await cityWeatherRes.json();
      console.log(cityWeatherData);
      if (cityWeatherData.error) {
        setCityWeatherDetails(null);

        setTimeout(() => setLoading(false), 3000);
        alert("Failed to fetch weather data");

        return;
      }
      setTimeout(() => setLoading(false), 3000);
      setCityWeatherDetails(cityWeatherData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="weather-app-container">
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="City"
            onChange={(e) => setSelectedCity(e.target.value)}
          />
        </div>
        <div className="search-button-container">
          <button
            type="button"
            className=""
            onClick={() => {
              getCityWeather();
            }}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : !loading && cityWeatherDetails ? (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature</p>
            {cityWeatherDetails.current.temp_c}°C
          </div>
          <div className="weather-card">
            <p>Humidity</p>
            {cityWeatherDetails.current.humidity}%
          </div>
          <div className="weather-card">
            <p>Condition</p>
            <p>{cityWeatherDetails.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed</p>
            <p>{cityWeatherDetails.current.wind_kph} kph</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default LandingPage;
