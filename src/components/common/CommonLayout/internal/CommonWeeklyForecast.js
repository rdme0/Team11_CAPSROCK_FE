import React from "react";
import PropTypes from "prop-types";

const CommonWeeklyForecast = ({
  headerName,
  data, // 주간 데이터
  getTemperatureGradient, // 온도 그래디언트 계산 함수
  iconPosition,
  iconPath,
  isTempMode,
}) => {
  return (
    <div className="commonWeeklyForecast">
      <div className="weeklyHeader">
        <span>{headerName}</span>
      </div>
      {data.map((day, index) => {
        let underBarDiv;
        if (isTempMode) {
          underBarDiv = (
            <div className="minMaxTempsDiv">
              <div className="minTemp">${Math.round(day.minTemp)}</div>
              <div className="maxTemp">${Math.round(day.maxTemp)}</div>
            </div>
          );
        } else {
          underBarDiv = (
            <div className="morningNoonEveningDiv">
              <div className="morning">아침</div>
              <div className="noon">점심</div>
              <div className="evening">저녁</div>
            </div>
          );
        }

        return (
          <div key={index} className="weeklyItem">
            {/* 요일 */}
            <span className="dayOfWeek">
              {index === 0 ? "오늘" : day.dayOfWeek[0]}
            </span>

            {/* 아이콘: 선택적으로 표시 */}
            {(iconPosition === "left" || iconPosition === "both") && (
              <span className="leftIcon">
                <img
                  className="leftIconImage"
                  src={`${iconPath}/${day.leftIcon}.svg`}
                  alt="날씨 아이콘"
                />
              </span>
            )}
            {/* 온도 시각화 */}
            <div className="temperatureVisualsContainer">
              {/* 온도바 */}
              <div
                className="temperatureBar"
                style={{ backgroundImage: getTemperatureGradient }}
              ></div>
              {/*underBarLabel*/}
              {underBarDiv}
            </div>
            {/* 아이콘: 선택적으로 표시 */}
            {iconPosition === "both" && (
              <span className="rightIcon">
                <img
                  className="rightIconImage"
                  src={`${iconPath}/${day.rightIcon}.svg`}
                  alt="날씨 아이콘"
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
// PropTypes 설정
CommonWeeklyForecast.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dayOfWeek: PropTypes.string.isRequired, // 요일
      leftIcon: PropTypes.string,
      rightIcon: PropTypes.string,
      minTemp: PropTypes.string,
      maxTemp: PropTypes.string
    }),
  ).isRequired, // 주간 데이터는 필수

  headerName: PropTypes.string.isRequired,
  getTemperatureGradient: PropTypes.func.isRequired, // 유연한 온도 그래디언트 함수
  iconPath: PropTypes.string.isRequired,
  tempLabels: PropTypes.shape({
    min: PropTypes.string, // 최저 온도 라벨
    max: PropTypes.string, // 최고 온도 라벨
  }),
  iconPosition: PropTypes.oneOf(["left", "both", "nothing"]).isRequired,
  isTempMode: PropTypes.bool.isRequired,
};

export default CommonWeeklyForecast;
