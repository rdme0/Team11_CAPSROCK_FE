// src/components/DailyForecast.js
import React from "react";
import '../styles/weather.css';

export const weatherMap = {
  0: "번개",
  1: "이슬비",
  2: "비",
  3: "눈",
  4: "안개",
  5: "돌풍",
  6: "태풍",
  7: "맑음",
  8: "구름 조금",
  9: "흐림",
  10: "눈비",
};

const DailyForecast = ({ data }) => {
  return (
      <div className="daily-forecast">
        <div className="forecast-list">
        {data.map((item, index) => (
            <div key={index} className="forecast-item">
              <span className="time">{item.time.split(" ")[1].slice(0,5)}</span> 
              <img className="icon" src={`/assets/weatherCodeImages/${item.weather}.svg`}></img>
              <span className="temp">{item.temp}°C</span>
            </div>
        ))}
        </div>
      </div>
  );
};

export default DailyForecast;
