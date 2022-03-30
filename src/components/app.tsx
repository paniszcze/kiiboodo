import * as React from "react";

import "../styles/app.css";

import Canvas from "./canvas";
import Header from "./header";
import Dashboard from "./dashboard";
import Footer from "./footer";

import { INITIAL_SCORE, MAX_LIVES } from "../utils/constants";
import { Stats } from "../utils/types";

const App = () => {
  const [stats, setStats] = React.useState<Stats>({
    score: INITIAL_SCORE,
    lives: MAX_LIVES,
  });
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [gameOver, setGameOver] = React.useState<boolean>(false);

  // CHECK FOR DEFEAT
  React.useEffect(() => {
    if (stats.lives <= 0) {
      setIsRunning(false);
      setGameOver(true);
    }
  }, [stats.lives]);

  // RESET STATS ON RE-RUN
  React.useEffect(() => {
    if (gameOver && isRunning) {
      setStats({
        score: INITIAL_SCORE,
        lives: MAX_LIVES,
      });
    }
  }, [gameOver, isRunning]);

  return (
    <div className="App">
      <Canvas
        stats={stats}
        setStats={setStats}
        isRunning={isRunning}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <div className="sidebar">
        <Header />
        <Dashboard
          stats={stats}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          gameOver={gameOver}
        />
        <Footer />
      </div>
    </div>
  );
};

export default App;
