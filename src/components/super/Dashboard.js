// src/components/Dashboard.js
import React from "react";
import './super.css';

const Dashboard = ({ data }) => {
  return (
      <div className="dashboard">
        <div><span><img src={"assets/icon/fluent_cursor-24-filled.svg"}></img></span>{data.address.level2}</div>
        <h2>{data.address.level1}</h2>
        <div>{data.temp}°C</div>
        <div> 최고 {data.maxTemp}°C  최저 {data.minTemp}°C</div>
      </div>
  );
};

export default Dashboard;
