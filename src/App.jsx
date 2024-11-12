import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ContentLayout from "./components/content-component";
import LoginPage from "./components/pages/Login-Page";
import ErrorPage from "./components/pages/Error-Page";
import Setting from "./components/pages/Setting-Page";
import TraceabilityReport from "./components/pages/TraceabilityReport-Page";
import TraceabilityStatus from "./components/pages/TraceabilityStatus-Page";
import AcousticAutoRun from "./components/pages/AcousticAutoRun-page";
import AcousticManualRun from "./components/pages/AcousticManualRun-Page";
import ProtectedRoute from "./services/route-service/ProtectedRoute";
import RedirectIfLoggedIn from "./services/route-service/RedirectIfLoggedIn";
import UserManagement from "./components/pages/userManagementPage";
import UnauthorizedPage from "./components/pages/UnauthorizedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectIfLoggedIn />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/Unauthorized" element={<UnauthorizedPage />} />

        <Route element={<ProtectedRoute requiredRoles={['Admin', 'SuperAdmin']} />}>
          <Route
            path="/Console/Content_USR/user_management"
            element={<UserManagement />}
          />
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route
            path="/Console/Content_TRC/Report"
            element={<TraceabilityReport />}
          />
          <Route
            path="/Console/Content_ACT/AutoRun"
            element={<AcousticAutoRun />}
          />
          <Route
            path="/Console/Content_ACT/ManualRun"
            element={<AcousticManualRun />}
          />
        </Route>
        <Route element={<ProtectedRoute requiredRoles={['Admin']} />}>
          <Route path="/Console/Content_EOLT/Setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
