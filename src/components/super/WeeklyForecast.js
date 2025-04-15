// src/components/WeeklyForecast.js
import React from "react";
import './super.css';

const WeeklyForecast = ({ data }) => {
  return (
      <div className="weekly-forecast">
        {data.map((day, index) => (
            <div key={index}>
              <span>{index === 0 ? "오늘" : day.dayOfWeek[0]}</span>
              <span weekly-icon><img className="icon" src={`assets/icon/${day.weather}.svg`}></img></span> 
              <span>{day.minTemp}°C ~ {day.maxTemp}°C</span>
            </div>
        ))}
      </div>
  );
};

export default WeeklyForecast;
