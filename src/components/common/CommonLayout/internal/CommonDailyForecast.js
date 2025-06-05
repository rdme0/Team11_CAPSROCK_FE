import React from "react";
import PropTypes from "prop-types"; // PropTypes를 활용해 Prop 강제 설정

const CommonDailyForecast = ({ data, iconPath, renderExtraContent }) => {
  return (
    <div className="commonDailyForecast">
      <div className="forecastList">
        {data.map((item, index) => (
          <div key={index} className="forecastItem">
            {/* 시간 */}
            <span className="time">{item.time.split(" ")[1].slice(0, 5)}</span>
            <div className="IconAndExtraContentContainer">
              {/* 아이콘: 경로를 유동적으로 설정 */}
              <img className="dailyForecastIcon"
                   src={`${process.env.PUBLIC_URL}${iconPath}${item.icon}.svg`} alt="아이콘" />

              {/* 필수적으로 표시할 콘텐츠 */}
              {renderExtraContent(item)}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

// PropTypes 설정
CommonDailyForecast.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired, // 시간 정보
      icon: PropTypes.string.isRequired // 아이콘 이름
    })
  ).isRequired, // 데이터는 필수
  iconPath: PropTypes.string.isRequired, // 아이콘 경로
  renderExtraContent: PropTypes.func.isRequired // 필수로 받아야 하는 콘텐츠 렌더링 함수
};

export default CommonDailyForecast;