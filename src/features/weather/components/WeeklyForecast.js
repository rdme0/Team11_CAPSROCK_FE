// src/components/WeeklyForecast.js
import React from "react";
import '../styles/weather.css';

const WeeklyForecast = ({ data }) => {
  return (
      <div className="weekly-forecast">
        {data.map((day, index) => (
            <div key={index}>
              <span>{index === 0 ? "오늘" : day.dayOfWeek[0]}</span>
              <span className="weekly-icon"><img className="icon" src={`/assets/weatherCodeImages/${day.weather}.svg`}></img></span> 
              <span>{day.minTemp}°C ~ {day.maxTemp}°C</span>
            </div>
        ))}
      </div>
  );
};

export default WeeklyForecast;
