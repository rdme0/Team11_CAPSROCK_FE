import React from "react";
import PropTypes from "prop-types"; // PropTypes를 활용해 Prop 강제 설정

const CommonDashboard = ({
  data, // 대시보드 데이터
  forecastNow, // 첫 시간대의 데이터
  showMainIcon = true, // mainIcon 표시 여부
  showTempNow = true, // 현재 온도 표시 여부
  baseMainIconPath, // 메인 아이콘 기본 경로
  customContent, // 대체 콘텐츠 (필수)
  children, // 추가 렌더링 내용
  iconName,
}) => {
  return (
    <div className="dashboard">
      {/* 주소 표시 */}
      <span className="level2Address">
        <img className="gpsIcon" src={`${process.env.PUBLIC_URL}/assets/common/icon/gpsIcon.svg`} alt="gps 아이콘" />
        {data.address.level2}
      </span>
      <span className="level1Address">{data.address.level1}</span>

      {/* 현재 온도 및 메인 아이콘 */}
      {showMainIcon || showTempNow ? (
        <div className="mainIconContainer">
          {showMainIcon && (
            <img
              className="mainIcon"
              src={`${process.env.PUBLIC_URL}${baseMainIconPath}${iconName}.svg`}
              alt="메인 아이콘"
            />
          )}
          {showTempNow && (
            <div className="tempNow">{forecastNow}°</div>
          )}
        </div>
      ) : null}

      {/* 커스텀 콘텐츠 - 필수 */}
      <div className="custom-content">{customContent}</div>

      {/* 추가적인 사용자 정의 렌더링 */}
      {children}
    </div>
  );
};

// PropTypes 설정
CommonDashboard.propTypes = {
  data: PropTypes.shape({
    address: PropTypes.shape({
      level1: PropTypes.string.isRequired,
      level2: PropTypes.string.isRequired,
    }).isRequired,
    temp: PropTypes.number.isRequired,
  }).isRequired, // data는 필수
  forecastNow: PropTypes.shape({
    weather: PropTypes.string.isRequired, // 사용될 weather 데이터
  }),
  showMainIcon: PropTypes.bool,
  showTempNow: PropTypes.bool,
  mainIconPath: PropTypes.string, // 메인 아이콘의 경로를 유동적으로 설정 가능
  children: PropTypes.node.isRequired,
  iconName: PropTypes.string.isRequired,
  baseMainIconPath: PropTypes.string.isRequired,
};

export default CommonDashboard;
