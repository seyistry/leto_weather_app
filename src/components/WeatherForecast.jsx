import { formatDateTime } from "../utils/helpers";
import PropTypes from "prop-types";

WeatherForecast.propTypes = {
  data: PropTypes.shape({
    dt: PropTypes.number.isRequired,
    main: PropTypes.shape({
      pressure: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.array.isRequired,
  }).isRequired,
};

function WeatherForecast({ data }) {
  return (
    <div className="flex justify-between items-center mb-4 p-2 border-b last:border-b-0">
      <div>
        <p className="font-bold text-primary text-lg">
          {formatDateTime(data.dt)}
        </p>
        <p className="font-thin text-sm">
          Temperature: {Math.round(data.main.temp)} °C
        </p>
        <p className="font-thin text-sm">
          Weather: {data.weather[0].description}
        </p>
        <p className="font-thin text-sm">Humidity: {data.main.humidity}%</p>
        <p className="font-thin text-sm">Wind Speed: {data.wind.speed} m/s</p>
        <p className="font-thin text-sm">Pressure: {data.main.pressure} hPa</p>
      </div>
      <div className="bg-primary-200 bg-opacity-40 flex justify-center items-center rounded-3xl h-[100px] w-[100px]">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>
    </div>
  );
}

export default WeatherForecast;
