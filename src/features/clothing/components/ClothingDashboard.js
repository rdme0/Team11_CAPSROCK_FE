import React from "react";
import '../styles/clothing.css';


const ClothingDashboard = ({ dashboardData,feedback}) => {

  return (
    
    <div className="ClothingDashboard">
        <h2>{dashboardData.address.level1} {dashboardData.address.level2} </h2>
        <div className="feelsLikeTemp"><img className="clothIcon" src={`/assets/clothingCodeImages/${dashboardData.cloth}.svg`}/>{Math.round(dashboardData.feelsLikeTemp)}°</div>
        
        <div className="separator-line"></div>

        
        <div className="evaluation-section"> 
          <p className="evaluation-text">저번 옷차림 추천을 평가해주세요</p> 
          <button className="evaluation-button">평가하기</button>
        </div>
    </div>

    
  );
};

export default ClothingDashboard;
