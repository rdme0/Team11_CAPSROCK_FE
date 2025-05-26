// src/components/CommonWeeklyForecast.js
import React from "react";
import '../../../features/weather/styles/weather.css';
import { getTemperatureGradient } from '../../clothing/WeeklyClothingList';

const CommonWeeklyForecast = ({ data }) => {

  return (
    
      <div className="weekly-forecast">
        {data.map((day, index) => {

        const minTemp = Math.round(day.minTemp);
        const maxTemp = Math.round(day.maxTemp);
        
        const temperatureBarGradient = getTemperatureGradient(minTemp, maxTemp);
        
        return(
        <div key={index} className="weekly-item">

        <span className="day-of-week">{index === 0 ? "오늘" : day.dayOfWeek[0]}</span>
        
        <span className="weekly-icon"><img className="icon" src={`/assets/weatherCodeImages/${day.weather}.svg`}></img></span> 

        <div className="temperature-visuals-container">
            {/* 온도바 */}
            <div
                className="temperature-bar"
                style={{ backgroundImage: temperatureBarGradient }} 
            ></div>
            
            <div className="temperature-range-labels">
            {/* 최저 온도 표시 예시 */}
            <span className="min-temp">{Math.round(day.minTemp)}°</span>
            {/* 최고 온도 표시 예시 */}
            <span className="max-temp">{Math.round(day.maxTemp)}°</span>
            </div>

            </div>
        </div>
        );
})}
      </div>
  );
};

export default CommonWeeklyForecast;
