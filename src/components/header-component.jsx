import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faDiagramProject,
  faFileContract,
  faFolderTree,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
import ValeoLogo from "../assets/Valeo_Logo.png";
import OUT from "../assets/svg/logout.svg";
import BAR from "../assets/svg/barssolid.svg";
import AUTO from "../assets/svg/circlePlaySolid.svg";
import RTS from "../assets/svg/fileContractSolid.svg";
import RPT from "../assets/svg/folderTreeSolid.svg";
import STG from "../assets/svg/gears-solid.svg";
import QMD from "../assets/svg/diagram-project-solid.svg";
import packageJson from "../../package.json";

const HeaderLayout = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const PAGE = props.page;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("USER");
    setUser(storedUser);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("USER");
    localStorage.removeItem("userRole");
    navigate("/auth/login");
  };
  const toggleNav = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setIsOpen(false);
        }, 4000);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

      return !prevIsOpen;
    });
  };
  return (
    <>
      <div className="z-50 flex flex-col top-0 sticky dark:text-gray-700 bg-white shadow-md max-w-screen">
        <div className="flex justify-between items-center">
          <div className="l flex flew-row items-center">
            <div className="logo cursor-pointer">
              <img
                className="object-contain justify-center p-0 my-2 h-20 w-50 hover:pointer"
                src={ValeoLogo}
                alt="Valeo_Logo_VCDA-M006"
                onClick={() => navigate("/Console/content_ACT/autorun")}
              />
            </div>
            <button
              className="text-gray-800 p-4 dark:text-gray-700"
              onClick={toggleNav}
            >
              {/* <i className="fa-solid fa-bars"></i> */}
              <img className="w-5 h-5" src={BAR} alt="NavBar" />
            </button>
            <h4 className="text-gray-700 my-4 text-lg md:text-xl font-medium dark:text-gray-700">
              Stellantis OMNI Microphone Assemblyline | {PAGE}
            </h4>
            <p className="pl-2 text-xs pt-2">v{packageJson.version}</p>
            {/*
            1 software upgrade
            0 hardwawre upgrade
            0 new software modules
            1 minor software changes
            */}
          </div>
          <div className="r px-4 flex flew-row items-center">
            <Link
              to="/auth/login"
              className="bg-white-400 hover:bg-gray-300  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-gray-600 "
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <p className="flex items-center text-lg align-baseline">
                  {user}
                </p>
                <img
                  src={OUT}
                  alt={"Logout"}
                  className="mx-2 h-5 w-5 justify-center mt-1"
                />
                <span className="font-semibold text-lg">Logout</span>
              </div>
            </Link>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "block lg:relative opacity-100" : "hidden opacity-0"
          }card-content bg-gray-400 mx-4 mb-4  rounded-md w-90% h-fit text-white`}
        >
          <div className="title bg-gray-700 p-2 rounded-t-md font-bold ">
            <p>Navigation</p>
          </div>
          <div className="content p-1 items-center">
            <div className=" flex flex-between flex-wrap justify-start">
              {/* <Link
                to="/Console/Content_TRC/Status"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-square-poll-vertical"></i>
                  <span className="ml-2">Traceability Status</span>
                </div>
              </Link> */}
              <Link
                to="/Console/Content_ACT/AutoRun"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2 flex">
                  {/* <i className="text-xl fa-solid fa-circle-play"></i> */}
                  <FontAwesomeIcon className="text-xl" icon={faCirclePlay} />
                  {/* <img className="w-5 h-5" src={AUTO} alt="" /> */}
                  <span className="ml-2">AcousticAutoRun</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_ACT/ManualRun"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2 flex">
                  {/* <i className="text-xl fa-solid fa-file-contract"></i> */}
                  {/* <img className="w-5 h-5" src={RTS} alt="Retest" /> */}
                  <FontAwesomeIcon className="text-xl" icon={faFileContract} />
                  <span className="ml-2">AcousticRetest</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_ACT/QMode"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2 flex">
                  {/* <i className="text-xl fa-solid fa-diagram-project"></i> */}
                  <FontAwesomeIcon
                    className="text-xl"
                    icon={faDiagramProject}
                  />
                  {/* <img className="w-5 h-5" src={QMD} alt="QualityMode" /> */}
                  <span className="ml-2">Quality TestMode</span>
                </div>
              </Link>
              {/* <Link
                to="/Console/Content_ACT/TestReport"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-file-audio"></i>
                  <span className="ml-2">AcousticTestReport</span>
                </div>
              </Link> */}
              <Link
                to="/Console/Content_TRC/Report"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2 flex">
                  {/* <i className="text-xl fa-solid fa-folder-tree"></i> */}
                  <FontAwesomeIcon className="text-xl" icon={faFolderTree} />
                  {/* <img className="w-5 h-5" src={RPT} alt="Report" /> */}
                  <span className="ml-2">Traceability Report</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_EOLT/Setting"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2 flex">
                  {/* <i className="text-xl fa-solid fa-gears"></i> */}
                  <FontAwesomeIcon className="text-xl" icon={faGears} />
                  {/* <img className="w-5 h-5" src={STG} alt="Setting" /> */}
                  <span className="ml-2">Setting</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
HeaderLayout.propTypes = {
  page: PropTypes.string.isRequired,
};
export default HeaderLayout;
