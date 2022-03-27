import * as React from "react";

import "../styles/dashboard.css";

import { MAX_LIVES, SKULL, HEART } from "../utils/constants";
import { DashboardProps } from "../utils/types";

const Dashboard = ({
  stats: { score, lives },
  isRunning,
  setIsRunning,
}: DashboardProps) => {
  const handleClick = () => {
    setIsRunning((prevState: boolean) => !prevState);
  };

  console.log(isRunning);

  return (
    <div className="Dashboard">
      <button className="pixel-border out" onClick={handleClick}>
        {isRunning ? "STOP" : "START"}
      </button>
      <div className="life-bar">
        {Array(MAX_LIVES)
          .fill(SKULL)
          .fill(HEART, 0, lives)
          .map((item, index) => (
            <div key={index} className={`${item ? "heart" : "skull"}`}></div>
          ))}
      </div>
      Score: {score}
    </div>
  );
};

export default Dashboard;
