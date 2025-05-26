// src/components/CommonLayout.js
import React from "react";
import CommonDashboard from "./CommonDashboard";
import DailyForecast from "../../weather/DailyForecast";
import CommonWeeklyForecast from "././CommonWeeklyForecast";
import '../../../features/weather/styles/weather.css';

const CommonLayout = ({ dashboardData, dailyData, weeklyData }) => {

  const mainWeatherCode = dailyData?.[0]?.weather ?? 7; // 없으면 맑음 기본값

  const backgroundImageUrl = `/assets/weatherCodeImages/${mainWeatherCode}.jpg`;
  
  return (
      <div className="WeatherLayout" style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
        {/* 최상단: 대시보드 */}
        <CommonDashboard dashboardData={dashboardData} dailyWeather={dailyData} />

        {/* 중단: 일일 예보 */}
        <DailyForecast data={dailyData} />

        {/* 하단: 주간 예보 */}
        <CommonWeeklyForecast data={weeklyData} />
      </div>
  );
};

export default CommonLayout;
