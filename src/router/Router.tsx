import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import DemoPage from "../pages/DemoPage/DemoPage";
import CameraPage from "../pages/CameraPage/CameraPage";
import VirtualStagingPage from "../pages/VirtualStagingPage/VirtualStagingPage";

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/camera" element={<CameraPage />} />
        <Route path="/virtualStaging" element={<VirtualStagingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
