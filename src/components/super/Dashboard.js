// src/components/Dashboard.js
import React from "react";

const Dashboard = ({ data }) => {
  return (
      <div className="dashboard">
        <div>{data.address.level1}</div>
        <h2>{data.address.level2}</h2>
        <div>{data.temp}°C</div>
        <div> 최고 {data.maxTemp}°C  최저 {data.minTemp}°C</div>
      </div>
  );
};

export default Dashboard;
