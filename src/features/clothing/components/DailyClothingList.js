import React from 'react'; 
import '../styles/clothing.css';

const DailyClothingList = ({data}) => { 
  return (
    <div className="daily-clothing">
        <div className="clothing-list">
        {data.map((item, index) => (
            <div key={index} className="clothing-item">
            <span className="time">{item.time.split(" ")[1].slice(0,5)}</span> 
            <img className="icon" src={`/assets/clothingCodeImages/${item.clothing}.svg`}></img>
            <span className="temp">{Math.round(item.feelsLikeTemp)}°C</span>
            </div>
        ))}
        </div>
      </div>
  );
};

export default DailyClothingList;