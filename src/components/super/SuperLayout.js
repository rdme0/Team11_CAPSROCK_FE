// src/components/WeatherLayout.js
import React from "react";
import Dashboard from "./Dashboard";
import DailyForecast from "./DailyForecast";
import WeeklyForecast from "./WeeklyForecast";

const WeatherLayout = ({ title, dashboardData, dailyData, weeklyData }) => {
  return (
      <div className="weather-layout">
        {/* 최상단: 대시보드 */}
        <Dashboard title={title} data={dashboardData} />

        {/* 중단: 일일 예보 */}
        <DailyForecast data={dailyData} />

        {/* 하단: 주간 예보 */}
        <WeeklyForecast data={weeklyData} />
      </div>
  );
};

export default WeatherLayout;
