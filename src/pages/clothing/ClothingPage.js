import React from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import ClothingFeedback from "../../components/clothing/ClothingFeedback";
import { getClothingIcon } from "../../util/iconMappings";


const ClothingPage = () => {
  const renderDashboard = (data) => {
    const { dashboard, havePendingFeedback } = data;
    return (
      <CommonDashboard
        data={dashboard}
        forecastNow={dashboard.feelsLikeTemp.toFixed(1)}
        baseMainIconPath="/assets/clothing/icon/"
        iconName={getClothingIcon(dashboard.clothingId)}
        children={<ClothingFeedback havePendingFeedback={havePendingFeedback} />}
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
          correctedFeelsLikeTemp: item.correctedFeelsLikeTemp,
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
          rightIcon: getClothingIcon(item.maxClothing),
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