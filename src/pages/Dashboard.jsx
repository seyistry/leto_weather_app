import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import {
  getLocationCurrentWeather,
  getLocationGeocoding,
  getLocationWeatherForecast,
} from "../utils/api";

import { UilSearch } from "@iconscout/react-unicons";
import MainBoard from "../components/MainBoard";
import BoxCard from "../components/BoxCard";
import { formatDateTime } from "../utils/helpers";

function Dashboard() {
  const [query, setQuery] = useState("");
  const delayQuery = useRef(null);

  // Fetch geocoding data based on the query
  const fetchGeocoding = useQuery({
    queryKey: [query],
    queryFn: () => getLocationGeocoding(query),
    enabled: !!query,
  });

  // Get the first result from the geocoding query
  const coordinate = fetchGeocoding.data?.[0] ?? null;

  // Fetch current weather data based on geocoding results
  const fetchCurrentWeather = useQuery({
    queryKey: [`current ${coordinate?.name}`],
    queryFn: () => getLocationCurrentWeather(coordinate?.lat, coordinate?.lon),
    enabled: !!coordinate?.lat && !!coordinate?.lon,
  });

  // Fetch weather forecast data based on geocoding results
  const fetchWeatherForecast = useQuery({
    queryKey: [`forecast ${coordinate?.name}`],
    queryFn: () => getLocationWeatherForecast(coordinate?.lat, coordinate?.lon),
    enabled: !!coordinate?.lat && !!coordinate?.lon,
  });

  // Handle input change with debouncing
  const handleChange = (e) => {
    // Debounce the query input
    if (delayQuery.current) {
      clearTimeout(delayQuery.current);
    }

    delayQuery.current = setTimeout(() => {
      setQuery(e.target.value);
    }, 1000);
  };

  // list of weather attribute
  const currentWeatherAttributeList = [
    "Wind",
    "Humidity",
    "Pressure",
    "Max °C",
    "Min °C",
    "Cloudiness",
  ];

  // Cleanup the timeout on component unmount
  useEffect(() => {
    return () => {
      if (delayQuery.current) {
        clearTimeout(delayQuery.current);
      }
    };
  }, []);

  return (
    <div className="px-4">
      <div className="rounded-3xl my-4 focus-within:ring-2 focus-within:ring-primary-200">
        <div className="rounded-3xl flex py-1 items-center bg-gray-50 px-4">
          <UilSearch size="24" color="gray" />
          <input
            onChange={handleChange}
            type="text"
            name="Search location"
            aria-label="Search location"
            className={"bg-gray-50 w-full py-2 px-3 outline-none"}
            placeholder="Search for places..."
          />
        </div>
      </div>

      {/* Optionally display results */}
      {fetchCurrentWeather.isFetching && <p>Loading weather data...</p>}
      {fetchCurrentWeather.isError && <p>Error fetching weather data</p>}
      {fetchCurrentWeather.data && (
        <>
          <MainBoard data={fetchCurrentWeather.data} />
          <div className="mt-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentWeatherAttributeList.map((title, index) => (
                <BoxCard
                  key={index}
                  title={title}
                  data={fetchCurrentWeather.data}
                />
              ))}
            </div>
          </div>

          <hr className="my-6" />
        </>
      )}

      {fetchWeatherForecast.isFetching && <p>Loading weather forecast...</p>}
      {fetchWeatherForecast.isError && <p>Error fetching weather forecast</p>}

      {fetchWeatherForecast.data && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow-lg">
          <h2 className="text-lg font-bold mb-4">Weather Forecast</h2>
          {fetchWeatherForecast.data.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="mb-4 p-2 border-b last:border-b-0">
              <p className="font-bold">{formatDateTime(forecast.dt)}</p>
              <p>Temperature: {Math.round(forecast.main.temp)} °C</p>
              <p>Weather: {forecast.weather[0].description}</p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Wind Speed: {forecast.wind.speed} m/s</p>
              <p>Pressure: {forecast.main.pressure} hPa</p>
            </div>
          ))}
        </div>
      )}

      <div>
        {fetchGeocoding.isFetching && <p>Loading geocoding data...</p>}
        {fetchGeocoding.isError && <p>Error fetching geocoding data</p>}
        {fetchGeocoding.data && (
          <div>
            <h2>Geocoding Results:</h2>
            <pre>{JSON.stringify(fetchGeocoding.data, null, 2)}</pre>
          </div>
        )}

        {fetchWeatherForecast.isFetching && <p>Loading weather data...</p>}
        {fetchWeatherForecast.isError && <p>Error fetching weather data</p>}
        {fetchWeatherForecast.data && (
          <div>
            <h2>Weather forecast:</h2>
            <pre>{JSON.stringify(fetchWeatherForecast.data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
