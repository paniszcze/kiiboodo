import * as React from "react";

import "../styles/dashboard.css";

type Props = {
  lives: number;
  count: number;
};

const Dashboard = (props: Props) => (
  <div className="Dashboard">
    <button className="pixel-border">START</button>
    <div className="life-bar">
      <div className="heart"></div>
      <div className="heart"></div>
      <div className="heart"></div>
      <div className="skull"></div>
    </div>
    Score: {props.count}
  </div>
);

export default Dashboard;
