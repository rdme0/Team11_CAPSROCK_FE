import React from "react";
import '../../pages/clothing/clothing.css';


const ClothingDashboard = ({ dashboardData}) => {

  return (
    
    <div className="ClothingDashboard">
        <h2>{dashboardData.address.level1} {dashboardData.address.level2} </h2>

        <div className="feels-temp-container">
        <img className="clothIcon" src={`/assets/clothingCodeImages/${dashboardData.cloth}.svg`}/>
        <div className="feelsLikeTemp"> {Math.round(dashboardData.feelsLikeTemp)}° </div>
        <sup className="correction" >+{dashboardData.correction}
        <div className="ai">AI 보정치</div> </sup>
        </div>


        <div className="separator-line"></div>

        
        <div className="evaluation-section"> 
          <p className="evaluation-text">저번 옷차림 추천을 평가해주세요</p> 
          <button className="evaluation-button">평가하기</button>
        </div>
    </div>

    
  );
};

export default ClothingDashboard;
