import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { getLocationCurrentWeather, getLocationGeocoding, getLocationWeatherForecast } from "../utils/api";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

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
    queryFn: () =>
      getLocationCurrentWeather(coordinate?.lat, coordinate?.lon),
    enabled: !!coordinate?.lat && !!coordinate?.lon,
  });

  // Fetch weather forecast data based on geocoding results
  const fetchWeatherForecast = useQuery({
    queryKey: [`forecast ${coordinate?.name}`],
    queryFn: () =>
      getLocationWeatherForecast(coordinate?.lat, coordinate?.lon),
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

  // Cleanup the timeout on component unmount
  useEffect(() => {
    return () => {
      if (delayQuery.current) {
        clearTimeout(delayQuery.current);
      }
    };
  }, []);

  return (
    <>
      <div className="rounded-lg m-4 focus-within:ring-2 focus-within:ring-primary">
        <div className="flex items-center bg-gray-100 px-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 inline-block" />
          <input
            onChange={handleChange}
            type="text"
            name="Search location"
            aria-label="Search location"
            className={"bg-gray-100 w-full py-2 px-3 outline-none"}
          />
        </div>
      </div>

      {/* Optionally display results */}
      <div>
        {fetchGeocoding.isFetching && <p>Loading geocoding data...</p>}
        {fetchGeocoding.isError && <p>Error fetching geocoding data</p>}
        {fetchGeocoding.data && (
          <div>
            <h2>Geocoding Results:</h2>
            <pre>{JSON.stringify(fetchGeocoding.data, null, 2)}</pre>
          </div>
        )}

        {fetchCurrentWeather.isFetching && <p>Loading weather data...</p>}
        {fetchCurrentWeather.isError && <p>Error fetching weather data</p>}
        {fetchCurrentWeather.data && (
          <div>
            <h2>Current Weather:</h2>
            <pre>{JSON.stringify(fetchCurrentWeather.data, null, 2)}</pre>
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
    </>
  );
}

export default Dashboard;
