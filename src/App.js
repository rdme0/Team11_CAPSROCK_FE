import './App.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptor } from './api/AxiosInstance';
import { Routes, Route } from 'react-router-dom';

import WeatherPage from "./pages/WeatherPage";
import ClothingPage from "./pages/ClothingPage";
import HamburgerMenu from "./components/HamburgerMenu/HamburgerMenu"

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptor(navigate); 
  }, [navigate]);

  return (
      <div className="App">
        <HamburgerMenu />
        
        <Routes>
          <Route path='/' element={<WeatherPage />} ></Route>
          <Route path='/clothing' element={<ClothingPage />} ></Route>
        </Routes>

      </div>
  );
}

export default App;
