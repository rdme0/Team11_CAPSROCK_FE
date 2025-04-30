// src/pages/WeatherPage.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SuperLayout from "../features/weather/components/SuperLayout";

import React from 'react';
import useWeatherData from '../features/weather/hooks/useWeatherData'; // 커스텀 훅 import
import WeatherLayout from '../features/weather/components/WeatherLayout'; // 리팩토링된 레이아웃 import
import styles from '../features/weather/styles/weather.css'; 

const WeatherPage = () => {
  // 커스텀 훅을 호출하여 상태와 데이터를 가져옴
  const { weatherData, loading, error } = useWeatherData();

  // 로딩 및 에러 상태 처리
  if (loading) return <div className={styles.loading}>로딩 중...</div>; // CSS Module 적용 예시
  if (error) return <div className={styles.error}>{error}</div>;
  if (!weatherData) return <div className={styles.error}>날씨 정보를 가져올 수 없습니다.</div>;

  // 성공 시, 날씨 레이아웃 렌더링
  return (
    <WeatherLayout
      dashboardData={weatherData.dashboard}
      dailyData={weatherData.next23HoursWeathers}
      weeklyData={weatherData.next7DaysWeathers}
    />
  );
};

export default WeatherPage;