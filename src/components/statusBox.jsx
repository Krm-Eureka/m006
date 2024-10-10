import PropTypes from "prop-types";
import CRR from "../assets/svg/bolt-solid.svg";
import MRK from "../assets/svg/map-pin-solid.svg";
import MIC from "../assets/svg/microphone-solid.svg";
import QR from "../assets/svg/qrcode-solid.svg";
import BOX from "../assets/svg/border-all-solid.svg";
import TST from "../assets/svg/test.svg";

const StatusBox = ({ name, status = 4 }) => {
  console.log(name, ":", status);

  const statusMap = {
    acoustictest: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "Testing", className: "bg-blue-500 text-black" },
      2: { text: "PASS", className: "bg-green-500 text-black" },
      3: { text: "FAIL", className: "bg-red-500 text-black" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
    test: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "Testing", className: "bg-blue-500 text-black" },
      2: { text: "PASS", className: "bg-green-500 text-black" },
      3: { text: "FAIL", className: "bg-red-500 text-black" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
    lasermark: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "Marking", className: "bg-blue-500 text-black" },
      2: { text: "Mark Completed", className: "bg-green-500 text-black" },
      3: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
    qrcode: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "Reading", className: "bg-blue-500 text-black" },
      2: { text: "PASS", className: "bg-green-500 text-black" },
      3: { text: "FAIL", className: "bg-red-500 text-black" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
    totalstatus: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "PASS", className: "bg-green-500 text-black" },
      2: { text: "FAIL", className: "bg-red-500 text-black" },
      3: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
    current: {
      0: { text: "Exception", className: "bg-yellow-400 text-black" },
      1: { text: "Reading", className: "bg-blue-500 text-black" },
      2: { text: "PASS", className: "bg-green-500 text-black" },
      3: { text: "FAIL", className: "bg-red-500 text-black" },
      4: { text: "Unknown Status", className: "bg-gray-400 text-gray-600" },
    },
  };

  const statusValue = status >= 0 && status <= 4 ? status : 4;
  const statusData = statusMap[name.toLowerCase()]?.[statusValue] || {
    text: "Unknown Status",
    className: "bg-gray-400 text-gray-600",
  };
  const { text, className } = statusData;

  const iconMap = {
    current: CRR,
    acoustictest: MIC,
    qrcode: QR,
    lasermark: MRK,
    totalstatus: BOX,
    test: TST,
  };

  const icon = iconMap[name.toLowerCase()] || null;

  return (
    <div className="m-4 justify-start">
      <div
        className={`box flex ${className} font-semibold p-4 rounded-lg w-64`}
      >
        {icon && (
          <img
            src={icon}
            alt={name}
            className="mr-4 h-8 w-8 justify-center mt-2"
          />
        )}
        <div className="flex flex-col text-center align-middle">
          <p className="font-bold">{name.toUpperCase()}</p>
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
