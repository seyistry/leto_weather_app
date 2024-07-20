import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilWind } from "@iconscout/react-unicons";
import { UilTear } from "@iconscout/react-unicons";
import { UilCelsius } from "@iconscout/react-unicons";
import { formatDateTime } from "../utils/helpers";

import PropTypes from "prop-types";

MainBoard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }),
    main: PropTypes.shape({
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
    }),
    weather: PropTypes.shape([
      {
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      },
    ]).isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
    dt: PropTypes.number.isRequired,
  }).isRequired,
};

function MainBoard({ data }) {
  return (
    <div className="bg-[#bcdfff] rounded-3xl">
      <div className="flex p-6 gap-4">
        <div className="flex-1">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <UilLocationPoint size="28" color="#24609B" />
              <p className="ml-2 font-bold text-xl text-primary">{`${data.name}, ${data.sys.country}`}</p>
            </div>
            <div className="bg-white py-1 px-4 rounded-2xl shadow-sm">
              <p className="text-sm text-primary font-bold">
                Today {formatDateTime(data.dt)}
              </p>
            </div>
          </div>
          <p className="flex items-center justify-center text-primary text-[90px] mt-[30px]">
            {Math.round(data.main.temp)}
            <UilCelsius size="80" color="#24609B" />
          </p>
          <p className=" text-center text-primary text-md font-bold">
            {`${data.weather[0].description}`}
          </p>
          <div className="flex justify-between mt-[40px]">
            <div className="flex items-center">
              <UilWind size="24" color="#24609B" />
              <p className="ml-2 text-primary text-sm font-bold">
                {data.main.pressure} hPa
              </p>
            </div>
            <div className="flex items-center">
              <UilTear size="24" color="#24609B" />
              <p className="ml-2 text-primary text-sm font-bold">
                {data.main.humidity}%
              </p>
            </div>
            <div className="flex items-center">
              <UilWind size="24" color="#24609B" />
              <p className="ml-2 text-primary text-sm font-bold">
                {data.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
        <div className="hidden sm:hidden md:block flex-1 bg-white rounded-xl bg-opacity-20">
          <p className="p-4 text-primary font-bold text-xl">Cloud feels</p>
          <div className="flex items-center justify-center">
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt=""
              className="w-40 h-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBoard;
