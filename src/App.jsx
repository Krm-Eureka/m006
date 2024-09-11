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
import Setting from "./components/pages/Setting-Page";
import TracibilityReport from "./components/pages/TracibilityReport-Page";
import TracibilityStatus from "./components/pages/TracibilityStatus-Page";
import AcousticAutoRun from "./components/pages/AcousticAutoRun-page";
import AcousticManualRun from "./components/pages/AcousticManualRun-Page";

function App() {
  return (
    <>
 {/* how to create structure routes for admin, user and public   */}

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Console/Content" element={<ContentLayout />} />
          <Route path="/Console/Content_Setting" element={<Setting />} />
          <Route path="/Console/Content_TRCReport" element={<TracibilityReport />} />
          <Route path="/Console/Content_TRCStatus" element={<TracibilityStatus/>} />
          <Route path="/Console/Content_ACT-AutoRun" element={<AcousticAutoRun/>} />
          <Route path="/Console/Content_ACT-ManualRun" element={<AcousticManualRun/>} />
          {/* <Route path="/Console/Content_ACT-TEST-Report" element={<Acoustic} /> */}
          <Route path="*" element={<ErrorPage />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
