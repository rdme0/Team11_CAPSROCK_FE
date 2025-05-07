import React from 'react'; 
import '../styles/clothing.css';

const WeeklyClothingList = ({data}) => {
  return (
    <div className="weekly-clothing">
    {data.map((day,index) => {
        const minFeelsLike = day.feelsLikeMinTemp;
        const maxFeelsLike = day.feelsLikeMaxTemp;

        const temperatureBarGradient = getTemperatureGradient(minFeelsLike, maxFeelsLike);      
        
        //map 콜백 함수 결과 반환
        return ( 
            <div key={index} className="weekly-item">
        
            <span className="day-of-week">{index === 0 ? "오늘" : day.dayOfWeek}</span>
            

            <div className="temperature-visuals-container">
            {/* 온도바 */}
            <div
                className="temperature-bar"
                style={{ backgroundImage: temperatureBarGradient }} 
            ></div>
            
            <div className="temperature-range-labels">
            {/* 최저 체감 온도 표시 예시 */}
            <span className="min-temp">{Math.round(minFeelsLike)}°</span>
            {/* 최고 체감 온도 표시 예시 */}
            <span className="max-temp">{Math.round(maxFeelsLike)}°</span>
            </div>
            </div>

            </div>
        );
    })}
</div>
);
};

const getTemperatureGradient = (minTemp, maxTemp) => {
    const getColorForTemp = (temp) => {
        if (temp < -5) return '#000080';   // -5°C 미만: 아주 추움 (아주 진한 파랑)
        if (temp < 0) return '#0000FF';    // 0°C 미만: 추움 (파랑)
        if (temp < 5) return '#ADD8E6';    // 5°C 미만: 쌀쌀함 (밝은 파랑)
        if (temp < 10) return '#00FFFF';   // 10°C 미만: 시원함 (하늘색)
        if (temp < 15) return '#90EE90';  // 15°C 미만: 선선함 (밝은 녹색)
        if (temp < 20) return '#FFFF00';   // 20°C 미만: 온화함 (노랑)
        if (temp < 25) return '#FFA500';   // 25°C 미만: 따뜻함 (주황)
        if (temp < 30) return '#FF4500';   // 30°C 미만: 더움 (레드 오렌지)
        return '#FF0000'; // 30°C 이상: 매우 더움 (빨강)
    };

    const startColor = getColorForTemp(minTemp);
    const endColor = getColorForTemp(maxTemp);

    // 선형 그라데이션 문자열 생성 (왼쪽에서 오른쪽으로)
    // 필요하다면 중간 색상 스톱을 추가하여 더 부드러운 변화를 만들 수 있습니다.
    return `linear-gradient(to right, ${startColor}, ${endColor})`;
  };

export { WeeklyClothingList,getTemperatureGradient };