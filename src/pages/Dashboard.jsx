// eslint-disable-next-line no-unused-vars
import React from "react";
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
import WeatherForecast from "../components/WeatherForecast";
import ErrorCard from "../components/ErrorCard";
import Loading from "../components/Loading";

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
  let coordinate = fetchGeocoding.data?.[0] ?? fetchGeocoding.data ?? null;

  // Fetch current weather data based on geocoding results
  const fetchCurrentWeather = useQuery({
    queryKey: [`current ${coordinate?.name}`],
    queryFn: () => getLocationCurrentWeather(coordinate?.lat, coordinate?.lon),
    enabled: !!coordinate,
  });

  // Fetch weather forecast data based on geocoding results
  const fetchWeatherForecast = useQuery({
    queryKey: [`forecast ${coordinate?.name}`],
    queryFn: () => getLocationWeatherForecast(coordinate?.lat, coordinate?.lon),
    enabled: !!coordinate,
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
      <div
        className={`${
          query.length > 0 ? "" : "translate-y-[30vh] ease-in-out duration-300"
        }`}
      >
        <div className={`${query.length > 0 ? "hidden" : "flex"}`}>
          <p className="text-3xl font-bold text-primary ml-4 uppercase animate-bounce">
            Leto
          </p>
          <p className="pl-2 text-gray-200">Weather app</p>
        </div>

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
      </div>

      {/* Optionally display results */}
      <div>
        {fetchGeocoding.isError && (
          <ErrorCard
            data-testid="error-state"
            errorMessage="Error fetching current weather data"
          />
        )}
        {fetchGeocoding.isLoading ? (
          <Loading />
        ) : !fetchGeocoding.isLoading &&
          fetchGeocoding.data &&
          fetchGeocoding.data.length === 0 ? (
          <ErrorCard data-testid="error-state" errorMessage="No result found" />
        ) : null}
      </div>

      {fetchCurrentWeather.isFetching && (
        <Loading data-testid="loading-state" />
      )}
      {fetchCurrentWeather.isError && (
        <ErrorCard
          data-testid="error-state"
          errorMessage="Error fetching current weather data"
        />
      )}
      {fetchCurrentWeather.data && (
        <>
          <MainBoard data-testid="main-board" data={fetchCurrentWeather.data} />
          <div className="mt-6">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {currentWeatherAttributeList.map((title, index) => (
                <BoxCard
                  data-testid="main-board"
                  key={index}
                  title={title}
                  data={fetchCurrentWeather.data}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {fetchWeatherForecast.isFetching && (
        <Loading data-testid="loading-state" />
      )}
      {fetchWeatherForecast.isError && (
        <ErrorCard
          data-testid="error-state"
          errorMessage="Error fetching weather forecast"
        />
      )}

      {fetchWeatherForecast.data && (
        <>
          <h2 className="text-lg font-bold my-4 text-primary">
            Weather Forecast
          </h2>
          <div className="mt-4 bg-[#ECF3F8] rounded-xl p-4">
            {fetchWeatherForecast.data.list
              .slice(0, 5)
              .map((forecast, index) => (
                <WeatherForecast key={index} data={forecast} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
