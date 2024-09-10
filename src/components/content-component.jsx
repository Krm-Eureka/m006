import { useState } from "react";
// import SideBarLayout from "./sideBar-component"; // import the sidebar layout
import ValeoLogo from "../assets/Valeo_Logo.png";
import AcousticAutoRun from "./pages/AcousticAutoRun-page";
import AcousticManualRun from "./pages/AcousticManualRun-Page";
// import ErrorPage from "./pages/Error-Page";
import HomePage from "./pages/Home-Page";
// import LoginPage from "./pages/Login-Page";
import Setting from "./pages/Setting-Page";
import TracibilityReport from "./pages/TracibilityReport-Page";
import TracibilityStatus from "./pages/TracibilityStatus-Page";

const ContentLayout = () => {
  // State to control sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
   <div className="flex h-screen">
      
      <div className={`bg-white flex-1 px-4 py-4 md:px-8 md:py-6 transition-all duration-300 w-screen h-screen overflow-x-auto`} >
        <div className="flex items-center">
          {/* {!isSidebarOpen && ( */}
            <div className="logo">
              <img
                className="object-contain justify-center p-0 my-2 h-20 w-50"
                src={ValeoLogo}
                alt="Valeo_Logo_VCDA-M006"
              />
            </div>
          {/* )} */}
          <button className="text-gray-800 p-4" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <h4 className="text-gray-700 my-4 text-lg md:text-xl font-medium">
            Stellantis OMNI Microphone Assemblyline
          </h4>
        </div>

        {/* Render your content here */}
        {/* <ErrorPage/> */}
        {/* <LoginPage /> */}
        <HomePage isOpen={isSidebarOpen}/>
        {/* <Setting /> */}
        <TracibilityReport />
        {/* <TracibilityStatus />
        <AcousticAutoRun />
        <AcousticManualRun /> */}
      </div>
    </div>
    </>
  );
};

export default ContentLayout;
