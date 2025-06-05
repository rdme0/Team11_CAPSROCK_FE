import React from "react";
import PropTypes from "prop-types";

const CommonWeeklyForecast = ({
  data,
  headerName,
  iconPosition,
  iconPath,
  isTempMode,
  isIconMode = false,
}) => {
  return (
    <div className="commonWeeklyForecast">
      <div className="weeklyHeader">
        <img alt={"달력 아이콘"} src={`${process.env.PUBLIC_URL}/assets/common/icon/calendar.svg`}/>
        <span>{headerName}</span>
      </div>
      {data.map((day, index) => {
        let underBarDiv;
        if (isTempMode) {
          underBarDiv = (
            <div className="minMaxTempsDiv">
              <div className="minTemp">{Math.round(day.minTemp)}°</div>
              <div className="maxTemp">{Math.round(day.maxTemp)}°</div>
            </div>
          );
        } else if (!isIconMode) {
          underBarDiv = (
            <div className="morningNoonEveningDiv">
              <div className="morning">아침</div>
              <div className="noon">점심</div>
              <div className="evening">저녁</div>
            </div>
          );}
      

        return (
          <div key={index} className="weeklyItem">
            <div className="dayOfWeek">
              {index === 0 ? "오늘" : day.dayOfWeek[0]}
            </div>
            {/* 아이콘 표시 */}
            {(iconPosition === "left" || iconPosition === "both") && (
              <span className="leftIcon">
                <img
                  className="leftIconImage"
                  src={`${process.env.PUBLIC_URL}${iconPath}/${day.leftIcon}.svg`}
                  alt="날씨 아이콘"
                />
                {isIconMode && <div className="leftIcon">{day.leftIconLabelText}</div>}
              </span>
            )}
            {/* 온도 시각화 */}
            <div className="temperatureVisualsContainer">
              {isTempMode && (
                <div
                  className="temperatureBar"
                  style={{
                    backgroundImage: getTemperatureGradient(
                      day.minTemp,
                      day.maxTemp,
                    ),
                  }}
                ></div>
              )}
              {!isIconMode && underBarDiv}
            </div>
            {iconPosition === "both" && (
              <span className="rightIcon">
                <img
                  className="rightIconImage"
                  src={`${process.env.PUBLIC_URL}${iconPath}/${day.rightIcon}.svg`}
                  alt="날씨 아이콘"
                />
                {isIconMode && <div className="rightIconText">{day.rightIconLabelText}</div>}
                
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
      maxTemp: PropTypes.string,
    }),
  ).isRequired, // 주간 데이터는 필수

  headerName: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  tempLabels: PropTypes.shape({
    min: PropTypes.string, // 최저 온도 라벨
    max: PropTypes.string, // 최고 온도 라벨
  }),
  iconPosition: PropTypes.oneOf(["left", "both", "nothing"]).isRequired,
  isTempMode: PropTypes.bool.isRequired,
};

const getTemperatureGradient = (...temperatures) => {
  const getColorForTemp = (temp) => {
    if (temp < -15) {
      return "#191970"; // -15°C 미만: Midnight Blue
    }
    if (temp < -10) {
      return "#000080"; // -10°C 미만: Navy
    }
    if (temp < -5) {
      return "#00008B"; // -5°C 미만: Dark Blue
    }
    if (temp < 0) {
      return "#0051ff"; // 0°C 미만: Blue
    }
    if (temp < 5) {
      return "#1eecff"; // 5°C 미만: Dodger Blue
    }
    if (temp < 10) {
      return "#55ff00"; // 10°C 미만: Deep Sky Blue
    }
    if (temp < 15) {
      return "#beff00"; // 15°C 미만: Cyan
    }
    if (temp < 18) {
      return "#ebff00"; // 18°C 미만: Aquamarine
    }
    if (temp < 20) {
      return "#fff900"; // 20°C 미만: Light Green
    }
    if (temp < 23) {
      return "#ffb700"; // 23°C 미만: Green Yellow
    }
    if (temp < 25) {
      return "#ff8f00"; // 25°C 미만: Yellow
    }
    if (temp < 27) {
      return "#ff6d00"; // 27°C 미만: Gold
    }
    if (temp < 30) {
      return "#ff3900"; // 30°C 미만: Orange
    }
    if (temp < 33) {
      return "#ff5d18"; // 33°C 미만: Dark Orange
    }
    if (temp < 35) {
      return "#ff2800"; // 35°C 미만: Tomato
    }
    if (temp < 40) {
      return "#a60000"; // 40°C 미만: Orange Red
    }
    return "#640000";
  };

  // 주어진 온도 배열에 해당하는 색상을 생성
  const colors = temperatures.map(getColorForTemp);

  // 색상 배열을 그라데이션 포맷으로 변환
  return `linear-gradient(to right, ${colors.join(", ")})`;
};

export default CommonWeeklyForecast;
