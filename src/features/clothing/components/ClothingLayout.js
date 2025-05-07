import React from "react";
import ClothingDashboard from "./ClothingDashboard";
import DailyClothingList from "./DailyClothingList";
import {WeeklyClothingList} from "./WeeklyClothingList";
import '../styles/clothing.css';

const ClothingLayout = ({ dashboardData, dailyData, weeklyData }) => {

  const mainWeatherCode = dailyData?.[0]?.weather ?? 7; // 없으면 맑음 기본값

  const backgroundImageUrl = `/assets/weatherCodeImages/${mainWeatherCode}.jpg`;
  
  return (
      <div className="ClothingLayout" style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}>
        {/* 최상단: 대시보드 */}
        <ClothingDashboard dashboardData={dashboardData}/>

        {/* 중단: 일일 예보 */}
        <DailyClothingList data={dailyData} />

        {/* 하단: 주간 예보 */}
        <WeeklyClothingList data={weeklyData} />
      </div>
  );
};

export default ClothingLayout;
