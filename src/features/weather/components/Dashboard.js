// src/components/Dashboard.js
import React from "react";
import '../styles/weather.css';


const Dashboard = ({ dashboardData, dailyWeather }) => {

  const WeatherNow = dailyWeather[0]; // 첫 시간대 날씨
  
  return (
      <div className="dashboard">
        <h2>{dashboardData.address.level1} {dashboardData.address.level2} </h2>
        <div className="tempNow"><img className="mainIcon" src={`/assets/weatherCodeImages/${WeatherNow.weather}.svg`}/>{dashboardData.temp}°</div>
        <div className="tempMinMax"> 최고 {dashboardData.maxTemp}°  최저 {dashboardData.minTemp}°</div>
      </div>
  );
};

export default Dashboard;
