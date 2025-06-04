import React from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import FineDustWeeklyForecast from "../../components/finedust/FineDustWeeklyForecast"; // 새로 추가된 import
import { getFineDustIcon } from "../../util/iconMappings";
import "./FineDustPage.css";

const FineDustPage = () => {
  // 미세먼지 레벨에 따른 텍스트 매핑
  const getFineDustLevel = (level) => {
    const levelMappings = {
      1: "좋음",      // Good
      2: "보통",      // Fair
      3: "한때나쁨",   // Moderate
      4: "나쁨",      // Poor
      5: "매우나쁨"   // Very Poor
    };
    
    return levelMappings[level] || "보통";
  };

  const renderDashboard = (data) => {
    const { dashboard } = data;
    const maxLevel = Math.max(dashboard.fineDustLevel, dashboard.ultraFineDustLevel);
    return (
      <CommonDashboard
        data={dashboard}
        forecastNow={getFineDustLevel(dashboard.fineDustLevel)}
        baseMainIconPath="/assets/finedust/icon/"
        iconName={getFineDustIcon(maxLevel)}
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

  const renderWeekly = (data) => {
    return <FineDustWeeklyForecast data={data} />;
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