// src/components/WeeklyForecast.js
import React from "react";
import './super.css';

const WeeklyForecast = ({ data }) => {
  return (
      <div className="weekly-forecast">
        <h3>주간 예보</h3>
        {data.map((day, index) => (
            <div key={index}>
              <span>{day.dayOfWeek}</span> - <span>{day.weather}</span> - <span>{day.minTemp}°C ~ {day.maxTemp}°C</span>
            </div>
        ))}
      </div>
  );
};

export default WeeklyForecast;
