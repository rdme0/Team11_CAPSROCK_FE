import React, { useState, useCallback } from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard
  from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast
  from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast
  from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import ClothingFeedback from "../../components/clothing/ClothingFeedback";
import { getClothingIcon } from "../../util/iconMappings";
import "./ClothingPage.css";

const ClothingPage = () => {
  const [pendingFeedbackOverride, setPendingFeedbackOverride] = useState(null);

  const handleFeedbackSubmitted = useCallback(() => {
    setPendingFeedbackOverride(false);
  }, []);

  const renderDashboard = (data) => {
    const { dashboard, havePendingFeedback } = data;
    // 피드백 제출 후에는 override 값을 사용
    const actualHavePendingFeedback = pendingFeedbackOverride !== null
      ? pendingFeedbackOverride
      : havePendingFeedback;

    return (
      <CommonDashboard
        data={dashboard}
        showTempNow={false}
        showMainIcon={false}
        // forecastNow={dashboard.feelsLikeTemp.toFixed(1)}
        baseMainIconPath="/assets/clothing/icon/"
        iconName={getClothingIcon(dashboard.clothingId)}
        children={
          <div className="clothingChildren">
            <div className="mainIconContainer">
              <img
                className="mainIcon"
                src={`${process.env.PUBLIC_URL}/assets/clothing/icon/${getClothingIcon(
                  dashboard.clothingId)}.svg`}
                alt="메인 아이콘"
              />
              <div className="forecastCenter">
                <span className="feelslike">체감</span>
                <div className="tempNow">{dashboard.feelsLikeTemp.toFixed(1)}°</div>
                <div className="correction">
                  <span className="plusOrMinus">
                    {dashboard.correction >= 0 ? "+" : "-"}{Math.abs(
                    dashboard.correction).toFixed(1)} 보정
                  </span>
                </div>
              </div>
            </div>

            <ClothingFeedback
              havePendingFeedback={actualHavePendingFeedback}
              onFeedbackSubmitted={handleFeedbackSubmitted}
            />
          </div>
        }
      />
    );
  };

  const renderDaily = (data) => {
    const { next23HoursClothing } = data;
    return (
      <CommonDailyForecast
        data={next23HoursClothing.map((item) => ({
          time: item.time,
          temp: item.correctedFeelsLikeTemp.toFixed(1),
          icon: getClothingIcon(item.clothingId),
          correctedFeelsLikeTemp: item.correctedFeelsLikeTemp
        }))}
        iconPath="/assets/clothing/icon/"
        renderExtraContent={(item) => (
          <div className="temp">
            {item.correctedFeelsLikeTemp.toFixed(1)}°
          </div>
        )}
      />
    );
  };

  const renderWeekly = (data) => {
    const { nextFewDaysClothing } = data;
    return (
      <CommonWeeklyForecast
        data={nextFewDaysClothing.map((item) => ({
          dayOfWeek: item.dayOfWeek,
          maxTemp: item.maxFeelsLike,
          minTemp: item.minFeelsLike,
          leftIcon: getClothingIcon(item.minClothing),
          rightIcon: getClothingIcon(item.maxClothing)
        }))}
        headerName="주간 옷차림"
        iconPath="/assets/clothing/icon/"
        iconPosition="both"
        isTempMode={true}
      />
    );
  };

  return (
    <BasePage
      apiEndpoint="/api/clothing"
      renderDashboard={renderDashboard}
      renderDaily={renderDaily}
      renderWeekly={renderWeekly}
    />
  );
};

export default ClothingPage;