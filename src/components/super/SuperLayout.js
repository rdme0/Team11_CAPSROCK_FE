// src/components/WeatherLayout.js
import React from "react";
import Dashboard from "./Dashboard";
import DailyForecast from "./DailyForecast";
import WeeklyForecast from "./WeeklyForecast";
import './super.css';


const WeatherLayout = ({ dashboardData, dailyData, weeklyData }) => {

  const mainWeatherCode = dailyData?.[0]?.weather ?? 7; // 없으면 맑음 기본값

  const bgClass = `weather${mainWeatherCode}`;
  
  return (
      <div className={`layout ${bgClass}`}>
        {/* 최상단: 대시보드 */}
        <Dashboard data={dashboardData} />

        {/* 중단: 일일 예보 */}
        <DailyForecast data={dailyData} />

        {/* 하단: 주간 예보 */}
        <WeeklyForecast data={weeklyData} />
      </div>
  );
};

export default WeatherLayout;
