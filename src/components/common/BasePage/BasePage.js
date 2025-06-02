import React from 'react';
import useLocationData from '../../../hooks/useLocationData';
import useWeatherData from '../../../hooks/useWeatherData';
import CommonLayout from '../CommonLayout/CommonLayout';

const BasePage = ({
  apiEndpoint,
  renderDashboard,
  renderDaily,
  renderWeekly
}) => {
  const { longitude, latitude, error: locationError, loading: locationLoading } = useLocationData();
  const { data, error: dataError, loading: dataLoading } = useWeatherData(apiEndpoint, longitude, latitude);

  // 로딩 상태
  if (locationLoading || dataLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태
  if (locationError || dataError) {
    return <div>에러가 발생했습니다: {locationError || dataError}</div>;
  }

  // 데이터가 없는 경우
  if (!data) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <CommonLayout
      dashboardComponent={renderDashboard(data)}
      dailyComponent={renderDaily(data)}
      weeklyComponent={renderWeekly(data)}
      longitude={longitude}
      latitude={latitude}
    />
  );
};

export default BasePage;