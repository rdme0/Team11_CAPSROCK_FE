// src/components/WeatherLayout.js
import React from "react";
import Dashboard from "./Dashboard";
import DailyForecast from "./DailyForecast";
import WeeklyForecast from "./WeeklyForecast";
import '../styles/weather.css';

const WeatherLayout = ({ dashboardData, dailyData, weeklyData }) => {

  const mainWeatherCode = dailyData?.[0]?.weather ?? 7; // 없으면 맑음 기본값

  const backgroundImageUrl = `/assets/weatherCodeImages/${mainWeatherCode}.jpg`;
  
  return (
      <div className="layout" style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
        {/* 최상단: 대시보드 */}
        <Dashboard dashboardData={dashboardData} dailyWeather={dailyData} />

        {/* 중단: 일일 예보 */}
        <DailyForecast data={dailyData} />

        {/* 하단: 주간 예보 */}
        <WeeklyForecast data={weeklyData} />
      </div>
  );
};

export default WeatherLayout;
