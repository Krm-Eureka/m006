import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContentLayout from "./components/content-component";
import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import ValeoLogo from "./assets/Valeo_Logo.png";
// import ValeoLogo from "../assets/Valeo_Logo.png";
import "./App.css";
import LoginPage from "./components/pages/Login-Page";
import ErrorPage from "./components/pages/Error-Page";
// import SideBarLayout from "./components/sideBar-component";
// import HeaderLayout from "./components/Header-component";
import HeaderLayout from "./components/Header-Component";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Toggle sidebar function
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // const [count, setCount] = useState(0);
  // const bgr = 1;
  return (
    <>
    <div className="flex flex-col sticky">
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
            <button className="text-gray-800 p-4" onClick={toggleNav}>
              <i className="fa-solid fa-bars"></i>
            </button>
            <h4 className="text-gray-700 my-4 text-lg md:text-xl font-medium">
              Stellantis OMNI Microphone Assemblyline
            </h4>
          </div>
          <HeaderLayout isOpen={isNavOpen} />
        </div>

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Landing_Content" element={<ContentLayout />} />
          <Route path="*" element={<ErrorPage />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
