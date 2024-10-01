import PropTypes from "prop-types";
import CRR from "../assets/svg/bolt-solid.svg";
import MRK from "../assets/svg/map-pin-solid.svg";
import MIC from "../assets/svg/microphone-solid.svg";
import QR from "../assets/svg/qrcode-solid.svg";
import BOX from "../assets/svg/border-all-solid.svg";

const StatusBox = ({ name, status }) => {
  const getStatusTextAndClass = (name, status) => {
    console.log("Name:", name);
    console.log("Status:", status);
    switch (name.toLowerCase()) {
      case "acoustictest":
        switch (status) {
          case 0:
            return {
              text: "Exception",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 1:
            return {
              text: "Testing",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 2:
            return {
              text: "PASS",
              className: "bg-green-500 text-white font-semibold",
            };
          case 3:
            return {
              text: "FAIL",
              className: "bg-red-500 text-white font-semibold",
            };
          default:
            return {
              text: "Exception",
              className: "bg-yellow-400 text-white font-semibold",
            };
        }

      case "lasermark":
        switch (status) {
          case 0:
            return {
              text: "Exception",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 1:
            return {
              text: "Marking",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 2:
            return {
              text: "COMPLETE",
              className: "bg-green-500 text-white font-semibold",
            };
          default:
            return {
              text: "Exception",
              className: "bg-yellow-400 text-white font-semibold",
            };
        }

      case "qrcode":
        switch (status) {
          case 0:
            return {
              text: "Exception",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 1:
            return {
              text: "Reading",
              className: "bg-yellow-500 text-white font-semibold",
            };
          case 2:
            return {
              text: "OK",
              className: "bg-green-500 text-white font-semibold",
            };
          case 3:
            return {
              text: "NG",
              className: "bg-red-500 text-white font-semibold",
            };
          default:
            return {
              text: "Exception",
              className: "bg-yellow-400 text-white font-semibold",
            };
        }

      default:
        return {
          text: "Unknown",
          className: "bg-gray-400 text-white font-semibold",
        };
    }
  };

  const { text, className } = getStatusTextAndClass(name, status);

  const icon =
    typeof name === "string"
      ? name.toLowerCase() === "current"
        ? CRR
        : name.toLowerCase() === "acoustictest"
        ? MIC
        : name.toLowerCase() === "qrcode"
        ? QR
        : name.toLowerCase() === "lasermark"
        ? MRK
        : name.toLowerCase() === "totalstatus"
        ? BOX
        : null
      : null;

  return (
    <div className="m-4 justify-start">
      <div className={`box flex ${className} p-4 rounded-lg w-64`}>
        <img
          src={icon}
          alt={name}
          className="mr-4 h-8 w-8 justify-center mt-2"
        />
        <div className="flex flex-col text-center align-middle">
          <p>{name}</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

StatusBox.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

export default StatusBox;
