import { useState } from "react";
// import SideBarLayout from "./sideBar-component"; // import the sidebar layout
import ValeoLogo from "../assets/Valeo_Logo.png";
import AcousticAutoRun from "./pages/AcousticAutoRun-page";
import AcousticManualRun from "./pages/AcousticManualRun-Page";
import ErrorPage from "./pages/Error-Page";
import HeaderLayout from "./Header-Component.jsx";
import LoginPage from "./pages/Login-Page";
import Setting from "./pages/Setting-Page";
import TracibilityReport from "./pages/TracibilityReport-Page";
import TracibilityStatus from "./pages/TracibilityStatus-Page";

const ContentLayout = () => {
  // State to control sidebar visibility
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Toggle sidebar function
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <div className="flex flex-col ">
        {/* <div className="flex flex-col">
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
              Stellantis OMNI Microphone Assemblyline
            </h4>
          </div>
          <HeaderLayout isOpen={isNavOpen} />
        </div> */}
        <div
          className={`bg-white flex-1 px-4 py-4 md:px-2 md:py-2 md:w-1000px transition-all duration-300 w-screen h-screen overflow-x-auto overflow-y-hidden`}
        >
          {/* Render your content here */}
          {/* <ErrorPage/> */}
          {/* <LoginPage /> */}
          <Setting />
          <TracibilityReport />
          {/* <TracibilityStatus /> */}
          {/* <AcousticAutoRun /> */}
          {/* <AcousticManualRun /> */}
        </div>
      </div>
    </>
  );
};

export default ContentLayout;
