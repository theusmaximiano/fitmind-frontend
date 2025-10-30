import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TrainingPage from "./pages/TrainingPage";
import AboutPage from "./pages/AboutPage";
import WaterPage from "./pages/WaterPage";
import FoodPage from "./pages/FoodPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/water" element={<WaterPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
