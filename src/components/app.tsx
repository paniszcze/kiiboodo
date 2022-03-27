import * as React from "react";

import "../styles/app.css";

import Canvas from "./canvas";
import Header from "./header";
import Dashboard from "./dashboard";
import Footer from "./footer";

import { INITIAL_SCORE, MAX_LIVES } from "../utils/constants";

const App = () => {
  const [stats, setStats] = React.useState({
    score: INITIAL_SCORE,
    lives: MAX_LIVES,
  });
  const [isRunning, setIsRunning] = React.useState(false);

  return (
    <div className="App">
      <Canvas stats={stats} setStats={setStats} isRunning={isRunning} setIsRunning={setIsRunning} />
      <div className="sidebar">
        <Header />
        <Dashboard stats={stats} isRunning={isRunning} setIsRunning={setIsRunning} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
