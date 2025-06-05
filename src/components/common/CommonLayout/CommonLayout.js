import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // PropType 설정
import "./CommonLayout.css";
import Header from "../header/header";
import axiosInstance from "../../../api/AxiosInstance";

const CommonLayout = ({
  dashboardComponent,
  dailyComponent,
  weeklyComponent,
  longitude,
  latitude,
}) => {
  const [weatherNow, setWeatherNow] = useState(null); // 날씨 데이터 상태
  const [locationError, setLocationError] = useState(null); // 위치 에러 상태
  const [backgroundImage, setBackgroundImage] = useState(""); // 배경 이미지 상태

  useEffect(() => {
    const fetchWeatherNow = async () => {
      // 사용자 위치 가져오기

      try {
        // 위도와 경도를 사용해 날씨 API 호출
        const weatherNowResponse = await axiosInstance.get(
          `/api/weatherNow?longitude=${longitude}&latitude=${latitude}`
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
          backgroundImages[weatherNowResponse.data.weather] || "sunny.jpg";
        setBackgroundImage(`/assets/common/img/${selectedImage}`); // 이미지 경로 설정
      } catch (error) {
        console.error("Failed to fetch weatherNow data:", error);
        setWeatherNow(null); // 오류 발생 시 null 초기화
      }
    };
    fetchWeatherNow(); // 함수 실행
  }, []);

  return (
    <div
      className="WeatherLayout"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Header></Header>
      <div className="WeatherContainer">
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
  longitude: PropTypes.number.isRequired, // 위도
  latitude: PropTypes.number.isRequired, // 경도
};



export default CommonLayout;
