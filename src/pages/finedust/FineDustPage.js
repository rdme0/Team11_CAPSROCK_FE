import React from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import { getFineDustIcon } from "../../util/iconMappings";
import "./FineDustPage.css";

const FineDustPage = () => {
  // 미세먼지 레벨에 따른 텍스트 매핑
  const getFineDustLevel = (level) => {
    const levelMappings = {
      1: "좋음",      // Good
      2: "보통",      // Fair
      3: "주의",      // Moderate
      4: "나쁨",      // Poor
      5: "매우나쁨"   // Very Poor
    };
    
    return levelMappings[level] || "보통";
  };

  const renderDashboard = (data) => {
    const { dashboard } = data;
    return (
      <CommonDashboard
        data={dashboard}
        forecastNow={getFineDustLevel(dashboard.fineDustLevel)}
        baseMainIconPath="/assets/finedust/icon/"
        iconName={getFineDustIcon(dashboard.fineDustLevel)}
        showTempNow={false}
        customContent={
          <div className="fineDustLevels">
            <div className="fineDustInfo">
              <span className="fineDustLabel">미세먼지</span>
              <span className="fineDustValue">{getFineDustLevel(dashboard.fineDustLevel)}</span>
            </div>
            <div className="ultraFineDustInfo">
              <span className="ultraFineDustLabel">초미세먼지</span>
              <span className="ultraFineDustValue">{getFineDustLevel(dashboard.ultraFineDustLevel)}</span>
            </div>
          </div>
        }
        children={null}
      />
    );
  };

  const renderDaily = (data) => {
    const { next23HoursFineDustLevels } = data;
    return (
      <CommonDailyForecast
        data={next23HoursFineDustLevels.map((item) => ({
          time: item.time,
          level: item.FineDustLevel,
          icon: getFineDustIcon(item.FineDustLevel),
        }))}
        iconPath="/assets/finedust/icon/"
        renderExtraContent={(item) => (
          <div className="IconAndExtraContentContainer">
            <div className="fineDustExtraContent">
              <span className="fineDustLevelText">
                {getFineDustLevel(item.level)}
              </span>
            </div>
          </div>
        )}
      />
    );
  };

  // 그라데이션 생성 함수 (데이터 불완전성 처리)
  const createGradientBackground = (levels) => {
    const dustLevelColors = {
      1: "#0000FF", // 좋음
      2: "#00FF00", // 보통
      3: "#FFFF00", // 주의
      4: "#FFA500", // 나쁨
      5: "#FF0000", // 매우나쁨
    };

    if (levels.length === 0) {
      return dustLevelColors[2]; // 보통 수준
    }
    
    if (levels.length === 1) {
      return dustLevelColors[levels[0]] || dustLevelColors[2];
    }

    const validLevels = levels.filter(level => level != null && level >= 1 && level <= 5);
    
    if (validLevels.length === 0) {
      return dustLevelColors[2]; // 모든 데이터가 유효하지 않으면 보통 수준
    }
    
    if (validLevels.length === 1) {
      return dustLevelColors[validLevels[0]];
    }

    const colorStops = validLevels.map((level, index) => {
      const percentage = (index / (validLevels.length - 1)) * 100;
      return `${dustLevelColors[level] || dustLevelColors[2]} ${percentage}%`;
    });

    return `linear-gradient(to right, ${colorStops.join(", ")})`;
  };

  const renderWeekly = (data) => {
    const { next5DaysFineDustLevels } = data;

    return (
      <div className="commonWeeklyForecast">
        <div className="weeklyHeader">
          <img alt={"달력 아이콘"} src="/assets/common/icon/calendar.svg"/>
          <span>주간 미세먼지</span>
        </div>
        {next5DaysFineDustLevels.map((day, index) => {
          const times = Object.keys(day.dailyFineDustLevel || {});
          const levels = times.map(time => day.dailyFineDustLevel[time]);
          
          return (
            <div key={index} className="weeklyItem">
              <div className="dayOfWeek">
                {index === 0 ? "오늘" : day.dayOfWeek[0]}
              </div>

              <div className="temperatureVisualsContainer">
                <div className="morningNoonEveningDiv">
                  <div className="morning">아침</div>
                  <div className="noon">점심</div>
                  <div className="evening">저녁</div>
                </div>
                
                <div 
                  className="temperatureBar"
                  style={{ 
                    background: createGradientBackground(levels)
                  }}
                  title={`${day.dayOfWeek} - 시간별 미세먼지 레벨 (${times.length}개 시간대)`}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <BasePage
      apiEndpoint="/api/finedust"
      renderDashboard={renderDashboard}
      renderDaily={renderDaily}
      renderWeekly={renderWeekly}
    />
  );
};

export default FineDustPage;