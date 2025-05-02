import './App.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { setupAxiosInterceptor } from './api/AxiosInstance';
import WeatherPage from "./pages/WeatherPage";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptor(navigate); 
  }, [navigate]);

  return (
      <div className="App">
        <WeatherPage />
      </div>
  );
}

export default App;
