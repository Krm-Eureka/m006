import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import ValeoLogo from "../assets/Valeo_Logo.png";

const HeaderLayout = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const timeoutRef = useRef(null);
  const PAGE = props.page;
  // Toggle sidebar function
  // const toggleNav = () => {
  //   setIsOpen(!isOpen);
  //   setInterval(4000)
  // };
  const toggleNav = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

      // Return the opposite of the current state to toggle it
      return !prevIsOpen;
    });
  };
  return (
    <>
      <div className="flex flex-col sticky">
        <div className="flex items-center">
          <div className="logo">
            <img
              className="object-contain justify-center p-0 my-2 h-20 w-50"
              src={ValeoLogo}
              alt="Valeo_Logo_VCDA-M006"
            />
          </div>
          <button className="text-gray-800 p-4" onClick={toggleNav}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <h4 className="text-gray-700 my-4 text-lg md:text-xl font-medium">
            Stellantis OMNI Microphone Assemblyline | {PAGE}
          </h4>
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
              {/* <button className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white">
              <div className="items-center px-2">
                <i className="text-xl fa-solid fa-house"></i>
                <span className="ml-2">HOME</span>
              </div>
            </button> */}
              <Link
                to="/Console/Content_TRCStatus"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-square-poll-vertical"></i>
                  <span className="ml-2">Traceability Status</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_ACT-AutoRun"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-circle-play"></i>
                  <span className="ml-2">AcousticAutoRun</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_ACT-ManualRun"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-file-contract"></i>
                  <span className="ml-2">AcousticManualRun</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_ACT-TestReport"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-file-audio"></i>
                  <span className="ml-2">AcousticTestReport</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_TRCReport"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-folder-tree"></i>
                  <span className="ml-2">Traceability Report</span>
                </div>
              </Link>
              <Link
                to="/Console/Content_Setting"
                className="bg-gray-400 hover:bg-gray-500  px-2 py-2 rounded-md block text-sm font-medium text-gray-700 hover:text-white "
              >
                <div className="items-center px-2">
                  <i className="text-xl fa-solid fa-gears"></i>
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
