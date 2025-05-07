import React, { useEffect, useState } from "react";
import { fetchWeatherByCoords } from '../api/weatherApi';

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await fetchWeatherByCoords(latitude, longitude); // API 함수 호출
          setWeatherData(data);
        } catch (err) {
          console.error(err); // 실제 에러 로깅
          setError("날씨 정보를 불러오는 데 실패했습니다.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err); // 실제 에러 로깅
        // 사용자가 위치 권한 거부 등 다양한 에러 케이스 처리
        if (err.code === 1) {
          setError("위치 정보 접근 권한이 필요합니다.");
        } else {
          setError("위치 정보를 가져올 수 없습니다.");
        }
        setLoading(false);
      }
    );
  }, []); // 마운트 시 한 번만 실행

  // 훅은 필요한 상태와 함수들을 객체로 반환
  return { weatherData, loading, error };
};

export default useWeatherData;
