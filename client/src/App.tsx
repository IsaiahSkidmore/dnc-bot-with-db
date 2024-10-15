import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import UserRegistration from "./pages/UserRegistration";
import Home from "./pages/Home"
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the main page */}

        <Route path="/agent" element={<Home />} />

        {/* Route for the login page */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<UserRegistration />} />



        {/* Catch-all route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
