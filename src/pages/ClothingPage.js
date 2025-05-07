// pages/ClothingPage.js
import React from 'react';
import useClothingData from '../features/clothing/hooks/useClothingData';
import ClothingLayout from '../features/clothing/components/ClothingLayout';

const ClothingPage = () => {
  const { clothingData, loading, error } = useClothingData();

  if (loading) {
    return <div>옷차림 정보를 불러오는 중입니다...</div>; // 로딩 중 UI
  }
  if (error) {
    return <div>오류 발생: {error}</div>; // 에러 발생 시 UI
  }
  
    return (
      <ClothingLayout
        dashboardData={clothingData.dashboard}
        dailyData={clothingData.next23HoursWeathers}
        weeklyData={clothingData.nextFewDaysWeathers}
      />
    );
};

export default ClothingPage;