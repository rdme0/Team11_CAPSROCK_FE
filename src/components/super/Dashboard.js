// src/components/Dashboard.js
import React from "react";

const Dashboard = ({ title, data }) => {
  return (
      <div className="dashboard">
        <h2>{title}</h2>
        <div>온도: {data.temp}°C</div>
        <div>최고: {data.maxTemp}°C / 최저: {data.minTemp}°C</div>
      </div>
  );
};

export default Dashboard;
