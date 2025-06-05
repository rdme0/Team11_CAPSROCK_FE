import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './NavigationBar.css';

function NavigationBar() {
return (
    <nav className="navigationBar">
      <NavLink to="/weather" className="weatherIcon">
        <img src={`${process.env.PUBLIC_URL}/assets/common/navigationBar/weather.svg`} alt="날씨" />
    </NavLink>

    <NavLink to="/clothing" className="clothingIcon">
        <img src={`${process.env.PUBLIC_URL}/assets/common/navigationBar/clothing.svg`} alt="옷차림" />
    </NavLink>

    <NavLink to="/finedust" className="finedustIcon">
        <img src={`${process.env.PUBLIC_URL}/assets/common/navigationBar/finedust.svg`} alt="마스크" />
    </NavLink>

    <NavLink to="/ultraviolet" className="ultravioletIcon">
        <img src={`${process.env.PUBLIC_URL}/assets/common/navigationBar/ultraviolet.svg`} alt="자외선" />
    </NavLink>
    </nav>
);
}

export default NavigationBar;