// src/pages/WeatherPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperLayout from "../super/SuperLayout";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const response = await axios.get("/api", {
              params: {
                latitude,
                longitude
              }
            });

            setWeatherData(response.data);
          } catch (err) {
            setError("날씨 정보를 불러오는 데 실패했습니다.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("위치 정보를 가져올 수 없습니다.");
          setLoading(false);
        }
    );
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return <div>날씨 정보를 가져올 수 없습니다.</div>;

  return (
      <SuperLayout
          dashboardData={weatherData.dashboard}
          dailyData={weatherData.next23HoursWeathers}
          weeklyData={weatherData.next7DaysWeathers}
      />
  );
};

export default WeatherPage;
