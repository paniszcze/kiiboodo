import * as React from "react";

import "../styles/app.css";

import Canvas from "./canvas";
import Header from "./header";
import Dashboard from "./dashboard";
import Footer from "./footer";

import { MAX_LIVES } from "../utils/constants";

const App = () => {
  const [lives, setLives] = React.useState(MAX_LIVES);
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <Canvas />
      <div className="sidebar">
        <Header />
        <Dashboard lives={lives} count={count} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
