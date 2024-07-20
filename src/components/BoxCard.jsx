import React from "react";
import PropTypes from "prop-types";

BoxCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }),
    main: PropTypes.shape({
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
    }),
    clouds: PropTypes.shape({
      all: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

function BoxCard({ title, data }) {
  let value;

  switch (title) {
    case "Wind":
      value = `${data.wind.speed}m/s`;
      break;
    case "Humidity":
      value = `${data.main.humidity}%`;
      break;
    case "Pressure":
      value = `${data.main.pressure}hpa`;
      break;
    case "Max °C":
      value = `${Math.round(data.main.temp_max)}°C`;
      break;
    case "Min °C":
      value = `${Math.round(data.main.temp_min)}°C`;
      break;
    case "Cloudiness":
      value = `${data.clouds.all}%`;
      break;
    default:
      break;
  }
  return (
    <div data-testid="box-card" className="bg-[#ECF3F8] rounded-3xl">
      <div className="flex p-6 justify-between items-center ">
        <div className="">
          <p className="text-black text-xl">{title}</p>
          <p className="text-[#A6B6BF] text-sm">Today</p>
        </div>
        <p className="text-black text-xl font-thin">{value}</p>
      </div>
    </div>
  );
}
export default BoxCard;
