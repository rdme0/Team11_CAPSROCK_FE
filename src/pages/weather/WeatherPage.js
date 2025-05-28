import React from "react";
import BasePage from "../../components/common/BasePage/BasePage";
import CommonDashboard from "../../components/common/CommonLayout/internal/CommonDashboard";
import CommonDailyForecast from "../../components/common/CommonLayout/internal/CommonDailyForecast";
import CommonWeeklyForecast from "../../components/common/CommonLayout/internal/CommonWeeklyForecast";
import { getWeatherIcon } from "../../util/iconMappings";
import "./WeatherPage.css";

const WeatherPage = () => {
  const renderDashboard = (data) => {
    const { dashboard, nextFewHoursWeathers } = data;
    return (
      <CommonDashboard
        data={dashboard}
        forecastNow={nextFewHoursWeathers[0].temp.toFixed(1)}
        baseMainIconPath="/assets/weather/icon/"
        iconName={getWeatherIcon(nextFewHoursWeathers[0].weather)}
        children={getMinMaxDiv(dashboard)}
      />
    );
  };

  const renderDaily = (data) => {
    const { nextFewHoursWeathers } = data;
    return (
      <CommonDailyForecast
        data={nextFewHoursWeathers.map((item) => ({
          time: item.time,
          temp: item.temp,
          rainOrSnowPossibility: item.rainOrSnowPossibility,
          icon: getWeatherIcon(item.weather),
        }))}
        iconPath="/assets/weather/icon/"
        renderExtraContent={(item) => (
          <div className="weatherExtraContent">
            {parseFloat(item.rainOrSnowPossibility) > 0 && (
              <span className="rainOrSnowPossibility">
                {item.rainOrSnowPossibility}%
              </span>
            )}
            {/* item.temp는 이미 문자열이므로 직접 사용 */}
            <span className="temp">{Math.round(parseFloat(item.temp))}°</span>
          </div>
        )}
      />
    );
  };

  const renderWeekly = (data) => {
    const { nextFewDaysWeathers } = data;
    return (
      <CommonWeeklyForecast
        data={nextFewDaysWeathers.map((item) => ({
          dayOfWeek: item.dayOfWeek,
          maxTemp: item.maxTemp,
          minTemp: item.minTemp,
          leftIcon: getWeatherIcon(item.weather),
        }))}
        headerName="주간 날씨"
        iconPath="/assets/weather/icon/"
        iconPosition="left"
        isTempMode={true}
      />
    );
  };

  return (
    <BasePage
      apiEndpoint="/api"
      renderDashboard={renderDashboard}
      renderDaily={renderDaily}
      renderWeekly={renderWeekly}
    />
  );
};

const getMinMaxDiv = (dashboard) => {
  return (
    <div className="dashboardMinMax">
      <span>최고 {Math.round(dashboard.maxTemp)}°</span>
      <span>최저 {Math.round(dashboard.minTemp)}°</span>
    </div>
  );
};

export default WeatherPage;