import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './NavigationBar.css';

function NavigationBar() {
return (
    <nav className="navigation-bar">
      {/* NavLink 사용: 'to' 경로와 현재 경로가 일치하면 'active' 클래스 자동 추가 */}
      <NavLink to="/" exact> {/* exact: 경로가 정확히 일치할 때만 active */}
        <img src="/assets/common/navigationBar/weather.svg" alt="날씨" />
    </NavLink>

    <NavLink to="/clothing">
        <img src="/assets/common/navigationBar/clothing.svg" alt="옷차림" />
    </NavLink>

    <NavLink to="/mask">
        <img src="/assets/common/navigationBar/finedust.svg" alt="마스크" />
    </NavLink>

    <NavLink to="/sun">
        <img src="/assets/common/navigationBar/ultraviolet.svg" alt="자외선" />
    </NavLink>
    </nav>
);
}

export default NavigationBar;