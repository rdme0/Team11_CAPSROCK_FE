import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/common/CommonLayout/CommonLayout";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import AxiosInstance from "../../api/AxiosInstance";
import "./WeatherPage.css";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null); // 날씨 데이터
  const [error, setError] = useState(null); // 에러 저장
  const [longitude, setLongitude] = useState(null); // 위도 저장
  const [latitude, setLatitude] = useState(null); // 경도 저장

  // 일반 날씨 데이터 요청 (대시보드, 시간/주간 예보)
  useEffect(() => {
    const fetchWeatherData = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            try {
              // 날씨 데이터 API 호출
              const response = await AxiosInstance.get(
                `/api?longitude=${longitude}&latitude=${latitude}`,
              );
              setWeatherData(response.data); // 전체 날씨 데이터 저장
            } catch (err) {
              console.error("Failed to fetch weather data:", err);
              setError("날씨 데이터를 불러오지 못했습니다."); // 에러 메시지 저장
            }
          },
          (err) => {
            console.error("Failed to get user location:", err);
            setError("위치 정보를 가져오지 못했습니다.");
          },
        );
      } else {
        setError("Geolocation을 지원하지 않는 브라우저입니다.");
      }
    };

    fetchWeatherData(); // 함수 실행
  }, []); // 의존성 배열

  // 에러/로딩 상태 처리
  if (error) {
    return <div>에러가 발생했습니다: {error}</div>;
  }
  if (!weatherData) {
    return <div>로딩 중...</div>;
  }

  // weatherData 구조 분해
  const { dashboard, nextFewHoursWeathers, nextFewDaysWeathers } = weatherData;

  return (
    <CommonLayout
      // 대시보드 데이터
      dashboardComponent={
        <CommonDashboard
          data={dashboard} // 현재 날씨 관련 데이터
          forecastNow={nextFewHoursWeathers[0]} // 현재 시각의 예보 데이터
          baseMainIconPath={"/assets/weather/icon/"}
          iconName={getWeatherIcon(nextFewHoursWeathers[0]["weather"])}
          children={getMinMaxDiv(dashboard)}
        />
      }
      // 시간별 예보 데이터
      dailyComponent={
        <CommonDailyForecast
          data={nextFewHoursWeathers.map((item) => ({
            time: item.time, // 시간
            temp: item.temp.toFixed(1), // 온도
            rainOrSnowPossibility: item.rainOrSnowPossibility, // 강수 확률
            icon: `${getWeatherIcon(item.weather)}`, // 날씨 아이콘
          }))}
          iconPath="/assets/weather/icon/" // 아이콘 경로
          renderExtraContent={(item) => (
            <div className="weatherExtraContent">
              {/* rainOrSnowPossibility 0 초과일 때만 표시 */}
              {item.rainOrSnowPossibility > 0 && (
                <p className="rainOrSnowPossibility">
                  {item.rainOrSnowPossibility}%
                </p>
              )}
              <p className="temp">{Math.round(item.temp)}°</p>
            </div>
          )}
        />
      }
      // 주간 예보 데이터
      weeklyComponent={
        <CommonWeeklyForecast
          data={nextFewDaysWeathers.map((item) => ({
            dayOfWeek: item.dayOfWeek, // 요일
            maxTemp: item.maxTemp, // 최고 온도
            minTemp: item.minTemp, // 최저 온도
            leftIcon: `${getWeatherIcon(item.weather)}`, // 아이콘
          }))}
          headerName="주간 날씨"
          iconPath="/assets/weather/icon/"
          iconPosition="left"
          isTempMode={true}
        />
      }
      longitude={longitude}
      latitude={latitude}
    />
  );
};

// 날씨 상태와 아이콘 경로 매핑
const getWeatherIcon = (weatherCode) => {
  const weatherIcons = {
    0: "lightning",
    1: "rainy",
    2: "rainy",
    3: "snowy",
    4: "mist",
    5: "windy",
    6: "windy",
    7: "sunny",
    8: "littleCloudy",
    9: "cloudy",
    10: "rainy",
  };
  return weatherIcons[weatherCode] || "sunny"; // 기본 sunny 아이콘 반환
};

const getMinMaxDiv = (dashboard) => {
  return (
    <div className={"dashboardMinMax"}>
      <span>최고 {Math.round(dashboard.maxTemp)}°</span>
      <span>최저 {Math.round(dashboard.minTemp)}°</span>
    </div>
  );
};

export default WeatherPage;
