import * as React from "react";

import "../styles/dashboard.css";

const Dashboard = () => (
  <div className="Dashboard">
    <button className="pixel-border">START</button>
    <div className="life-bar">
      <div className="heart"></div>
      <div className="heart"></div>
      <div className="heart"></div>
      <div className="skull"></div>
    </div>
    Score: 0
  </div>
);

export default Dashboard;
