import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexto de usuário
import { UserProvider } from "./context/UserContext"; // ajuste o caminho se necessário

// Páginas
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TrainingPage from "./pages/TrainingPage";
import AboutPage from "./pages/AboutPage";
import WaterPage from "./pages/WaterPage";
import FoodPage from "./pages/FoodPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailPage from "./pages/HistoryDetailPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/water" element={<WaterPage />} />
          <Route path="/food" element={<FoodPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<HistoryDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
