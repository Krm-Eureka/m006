import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContentLayout from "./components/content-component";
import { useState } from "react";
import ValeoLogo from "./assets/Valeo_Logo.png";
import "./App.css";
import LoginPage from "./components/pages/Login-Page";
import ErrorPage from "./components/pages/Error-Page";
import Setting from "./components/pages/Setting-Page";
import TraceabilityReport from "./components/pages/TraceabilityReport-Page";
import TraceabilityStatus from "./components/pages/TraceabilityStatus-Page";
import AcousticAutoRun from "./components/pages/AcousticAutoRun-page";
import AcousticManualRun from "./components/pages/AcousticManualRun-Page";
import ProtectedRoute from "./services/route-service/ProtectedRoute";
import RedirectIfLoggedIn from "./services/route-service/RedirectIfLoggedIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<RedirectIfLoggedIn />} />
        <Route path="*" element={<ErrorPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          {/* <Route element={<ProtectedRoute />}> */}
          {/* <Route path="/Console/Content" element={<ContentLayout />} /> */}
          <Route path="/Console/Content_EOLT/Setting" element={<Setting />} />
          <Route path="/Console/Content_TRC/Report" element={<TraceabilityReport />} />
          <Route path="/Console/Content_TRC/Status" element={<TraceabilityStatus/>} />
          <Route path="/Console/Content_ACT/AutoRun" element={<AcousticAutoRun/>} />
          <Route path="/Console/Content_ACT/ManualRun" element={<AcousticManualRun/>} />
          {/* <Route path="/Console/Content_ACT/TESTReport" element={<Acoustic} /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
