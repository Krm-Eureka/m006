import PropTypes from "prop-types";
import CRR from "../assets/svg/bolt-solid.svg";
import MRK from "../assets/svg/map-pin-solid.svg";
import MIC from "../assets/svg/microphone-solid.svg";
import QR from "../assets/svg/qrcode-solid.svg";
import BOX from "../assets/svg/border-all-solid.svg";

const StatusBox = ({ name, status }) => {
  const getStatusTextAndClass = (name, status) => {
    let text = "Exception";
    let className = "bg-yellow-400 text-white font-semibold";

    switch (name) {
      case 'acoustictest':
        switch (status) {
          case 0:
            text = "Exception";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 1:
            text = "Testing";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 2:
            text = "PASS";
            className = "bg-green-500 text-white font-semibold";
            break;
          case 3:
            text = "FAIL";
            className = "bg-red-500 text-white font-semibold";
            break;
          default:
            break;
        }
        break;
      case 'lasermark':
        switch (status) {
          case 0:
            text = "Exception";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 1:
            text = "Marking";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 2:
            text = "COMPLETE";
            className = "bg-green-500 text-white font-semibold";
            break;
          default:
            break;
        }
        break;
      case 'qrcode':
        switch (status) {
          case 0:
            text = "Exception";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 1:
            text = "Reading";
            className = "bg-yellow-500 text-white font-semibold";
            break;
          case 2:
            text = "OK";
            className = "bg-green-500 text-white font-semibold";
            break;
          case 3:
            text = "FAIL";
            className = "bg-red-500 text-white font-semibold";
            break;
          default:
            break;
        }
        break;
      default:
        text = "Unknown Status";
        className = "bg-gray-400 text-white font-semibold";
        break;
    }

    return { text, className };
  };

  const { text, className } = getStatusTextAndClass(name, status);
  const iconMap = {
    current: CRR,
    acoustictest: MIC,
    qrcode: QR,
    lasermark: MRK,
    totalstatus: BOX
  };
  
  const icon = iconMap[name.toLowerCase()] || null;

  return (
    <div className="m-4 justify-start">
      <div className={`box flex ${className} p-4 rounded-lg w-64`}>
        {icon && (
          <img
            src={icon}
            alt={name}
            className="mr-4 h-8 w-8 justify-center mt-2"
          />
        )}
        <div className="flex flex-col text-center align-middle">
          <p className="font-bold">{name}</p>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

StatusBox.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};

export default StatusBox;
