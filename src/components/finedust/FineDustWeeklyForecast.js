import React from "react";

const FineDustWeeklyForecast = ({ data }) => {
  const { next5DaysFineDustLevels } = data;

  // 24시간 기준 그라데이션 생성 함수 (값이 없을 때 투명색 처리)
  const createGradientBackground = (dailyFineDustLevel) => {
    const dustLevelColors = {
      1: "#0000FF", // 좋음
      2: "#00FF00", // 보통
      3: "#FFFF00", // 한때나쁨
      4: "#FFA500", // 나쁨
      5: "#FF0000", // 매우나쁨
    };

    // 24시간 전체 배열 생성 (0시부터 23시까지)
    const fullDayLevels = [];
    for (let hour = 0; hour < 24; hour++) {
      const timeKey = `${hour.toString().padStart(2, '0')}:00`;
      const level = dailyFineDustLevel?.[timeKey];
      fullDayLevels.push(level != null ? level : null);
    }

    const colorStops = fullDayLevels.map((level, index) => {
      const percentage = (index / 23) * 100; // 24시간이므로 23으로 나눔
      const color = level != null ? (dustLevelColors[level] || dustLevelColors[2]) : "transparent";
      return `${color} ${percentage}%`;
    });

    return `linear-gradient(to right, ${colorStops.join(", ")})`;
  };

  return (
    <div className="fineDustWeeklyForecast">
      <div className="fineDustWeeklyHeader">
        <img alt={"달력 아이콘"} src="/assets/common/icon/calendar.svg"/>
        <span>주간 미세먼지</span>
      </div>
      {next5DaysFineDustLevels.map((day, index) => {
        const availableTimes = Object.keys(day.dailyFineDustLevel || {});
        
        return (
          <div key={index} className="fineDustWeeklyItem">
            <div className="fineDustDayOfWeek">
              {index === 0 ? "오늘" : day.dayOfWeek[0]}
            </div>

            <div className="fineDustVisualsContainer">
              <div className="fineDustTimeLabelsDiv">
                <div className="fineDustMorning">아침</div>
                <div className="fineDustNoon">점심</div>
                <div className="fineDustEvening">저녁</div>
              </div>
              
              <div 
                className="fineDustLevelBar"
                style={{ 
                  background: createGradientBackground(day.dailyFineDustLevel)
                }}
                title={`${day.dayOfWeek} - 시간별 미세먼지 레벨 (${availableTimes.length}개 시간대)`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FineDustWeeklyForecast;