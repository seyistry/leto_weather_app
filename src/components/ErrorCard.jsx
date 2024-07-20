import PropTypes from "prop-types";
import { UilExclamationTriangle } from "@iconscout/react-unicons";

const ErrorCard = ({ errorMessage }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <UilExclamationTriangle size="70" color="#AAAAAA" />
      <p className="font-bold text-md text-[#AAAAAA]">{errorMessage}</p>
    </div>
  );
};

ErrorCard.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorCard;
