import React from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import { getUltravioletIcon } from "../../util/iconMappings";
import getUVLevelTag from "../../components/ultraviolet/getUltravioletLevelTag";
import "./UltravioletPage.css";

const UltravioletPage = () => {
  const renderDashboard = (data) => {
    
    const { dashboard, next23HoursUltravioletLevels } = data;
    return (
      <CommonDashboard
        data={dashboard}
        showTempNow = {false}
        baseMainIconPath="/assets/ultraviolet/icon/"
        iconName={getUltravioletIcon(next23HoursUltravioletLevels[0].ultravioletLevel)}
        children={getUVLevelTag (dashboard.ultravioletLevel,true)}
      />
    );
  };

  const renderDaily = (data) => {
    
    const { next23HoursUltravioletLevels } = data;
    return (
      <CommonDailyForecast
        data={next23HoursUltravioletLevels.map((item) => ({
          time: item.time,
          ultravioletLevel: item.ultravioletLevel,
          icon: getUltravioletIcon(item.ultravioletLevel),
          ultravioletLevelTag: getUVLevelTag(item.ultravioletLevel),
        }))}
        iconPath="/assets/ultraviolet/icon/"
        renderExtraContent={(item) => (
          <div className="ultravioletLevel">
            <span className="ultravioletLevelTag">{item.ultravioletLevelTag}</span>
          </div>
        )}
      />
    );
  };

  const renderWeekly = (data) => {
    
    const { nextFewDaysUltravioletLevels } = data;
    return (
      <CommonWeeklyForecast
        data={nextFewDaysUltravioletLevels.map((item) => ({
          dayOfWeek: item.dayOfWeek,
          leftIconLabelText: getUVLevelTag(item.ultravioletLevels[0]),
          rightIconLabelText: getUVLevelTag(item.ultravioletLevels[1]),
          leftIcon: getUltravioletIcon(item.ultravioletLevels[0]),
          rightIcon: getUltravioletIcon(item.ultravioletLevels[1]),
        }))}
        headerName="주간 자외선"
        iconPath="/assets/ultraviolet/icon/"
        iconPosition="both"
        isTempMode={false}
        isIconMode={true}
      />
    );
  };

  return (
    <BasePage
      apiEndpoint="/api/ultraviolet"
      renderDashboard={renderDashboard}
      renderDaily={renderDaily}
      renderWeekly={renderWeekly}
    />
  );
};

export default UltravioletPage;