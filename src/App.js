import './App.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptor } from './api/AxiosInstance';
import { Routes, Route } from 'react-router-dom';

import WeatherPage from "./pages/WeatherPage";
import ClothingPage from "./pages/ClothingPage";
import FineDustPage from "./pages/FineDustPage";
import UltravioletPage from "./pages/UltravioletPage"; 

import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu"
import NavigationBar from "./components/NavigationBar/NavigationBar";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptor(navigate); 
  }, [navigate]);

  return (
      <div className="App">
        <HamburgerMenu />
        
        <main className="page-content">
        <Routes>
          <Route path='/' element={<WeatherPage />} ></Route>
          <Route path='/clothing' element={<ClothingPage />} ></Route>
          <Route path='/mask' element={<FineDustPage />} ></Route>       {/* <-- /mask 경로에 MaskPage 연결 */}
          <Route path='/sun' element={<UltravioletPage />} ></Route> 
        </Routes>
        </main>

        <NavigationBar />

      </div>
  );
}

export default App;
