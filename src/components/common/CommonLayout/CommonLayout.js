import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // PropType 설정
import "../../../features/weather/styles/weather.css";
import AxiosInstance from "../../../api/AxiosInstance";

const CommonLayout = ({
  dashboardComponent,
  dailyComponent,
  weeklyComponent,
}) => {
  const [weatherNow, setWeatherNow] = useState(null); // 날씨 데이터 상태
  const [locationError, setLocationError] = useState(null); // 위치 에러 상태
  const [backgroundImage, setBackgroundImage] = useState(""); // 배경 이미지 상태

  useEffect(() => {
    const fetchWeatherNow = async () => {
      // 사용자 위치 가져오기
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              // 위도와 경도를 사용해 날씨 API 호출
              const weatherNowResponse = await AxiosInstance.get(
                `/api/weatherNow?longitude=${longitude}&latitude=${latitude}`,
              );
              setWeatherNow(weatherNowResponse.data); // 응답 데이터 상태로 설정

              // 날씨 상태에 따라 배경 이미지 설정
              const backgroundImages = {
                0: "lightning.jpg",
                1: "rainy.jpg",
                2: "rainy.jpg",
                3: "snowy.jpg",
                4: "mist.jpg",
                5: "windy.jpg",
                6: "windy.jpg",
                7: "sunny.jpg",
                8: "littleCloudy.jpg",
                9: "cloudy.jpg",
                10: "rainy.jpg",
              };

              const selectedImage =
                backgroundImages[weatherNowResponse.data.weather] ||
                "sunny.jpg";
              setBackgroundImage(`/assets/common/img/${selectedImage}`); // 이미지 경로 설정
            } catch (error) {
              console.error("Failed to fetch weatherNow data:", error);
              setWeatherNow(null); // 오류 발생 시 null 초기화
            }
          },
          (error) => {
            // 위치 정보 접근 실패 시 에러 처리
            console.error("Error fetching geolocation:", error);
            setLocationError("위치 정보를 가져오지 못했습니다.");
          },
        );
      } else {
        // Geolocation API가 지원되지 않을 경우
        setLocationError(
          "사용자의 브라우저는 위치 서비스를 지원하지 않습니다.",
        );
      }
    };

    fetchWeatherNow(); // 함수 실행
  }, []);

  return (
    <div
      className="WeatherLayout"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div>
        {/* 대시보드 섹션 */}
        <section>{dashboardComponent}</section>

        {/* 일일 예보 섹션 */}
        <section>{dailyComponent}</section>

        {/* 주간 예보 섹션 */}
        <section>{weeklyComponent}</section>
      </div>
    </div>
  );
};

// PropTypes를 사용하여 필수 prop 설정
CommonLayout.propTypes = {
  dashboardComponent: PropTypes.node.isRequired, // 대시보드 컴포넌트
  dailyComponent: PropTypes.node.isRequired, // 일일 예보 컴포넌트
  weeklyComponent: PropTypes.node.isRequired, // 주간 예보 컴포넌트
};

export default CommonLayout;
