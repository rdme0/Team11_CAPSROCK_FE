import './App.css';
import React, { useEffect } from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import { setupAxiosInterceptor } from './api/AxiosInstance';
import { Routes, Route } from 'react-router-dom';

import WeatherPage from "./pages/weather/WeatherPage";
import ClothingPage from "./pages/clothing/ClothingPage";
import FineDustPage from "./pages/finedust/FineDustPage";
import UltravioletPage from "./pages/ultraviolet/UltravioletPage";

import NavigationBar from "./components/common/NavigationBar/NavigationBar";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptor(navigate); 
  }, [navigate]);

  return (
      <div className="App">
        <main className="page-content">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path="/" element={<Navigate to="/weather" />} />
          <Route path='/weather' element={<WeatherPage />} ></Route>
          <Route path='/clothing' element={<ClothingPage />} ></Route>
          <Route path='/finedust' element={<FineDustPage />} ></Route>
          <Route path='/ultraviolet' element={<UltravioletPage />} ></Route>
        </Routes>
        </main>

        <NavigationBar />

      </div>
  );
}

export default App;
