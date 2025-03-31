// src/components/DailyForecast.js
import React from "react";

const DailyForecast = ({ data }) => {
  return (
      <div className="daily-forecast">
        <h3>시간별 예보</h3>
        {data.map((item, index) => (
            <div key={index}>
              <span>{item.time}</span> - <span>{item.weather}</span> - <span>{item.temp}°C</span>
            </div>
        ))}
      </div>
  );
};

export default DailyForecast;
