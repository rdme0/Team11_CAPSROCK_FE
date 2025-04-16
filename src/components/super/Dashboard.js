// src/components/Dashboard.js
import React from "react";
import './super.css';

const Dashboard = ({ dashboardData, dailyWeather }) => {

  const WeatherNow = dailyWeather[0]; // 첫 시간대 날씨
  
  return (
      <div className="dashboard">
        <div><span><img className="cursorIcon" src={"assets/icon/fluent_cursor-24-filled.svg"}></img> </span>{dashboardData.address.level2}</div>
        <h2>{dashboardData.address.level1}</h2>
        <div className="tempNow"><img className="mainIcon" src={`assets/icon/${WeatherNow.weather}.svg`}></img>{dashboardData.temp}°</div>
        <div className="tempMinMax"> 최고 {dashboardData.maxTemp}°  최저 {dashboardData.minTemp}°</div>
      </div>
  );
};

export default Dashboard;
