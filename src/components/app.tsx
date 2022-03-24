import * as React from "react";

import "../styles/app.css";

import Canvas from "./canvas";
import Header from "./header";
import Dashboard from "./dashboard";

const App = () => (
  <div className="App">
    <Canvas />
    <div className="sidebar">
      <Header />
      <Dashboard />
      <footer>
        built by <a
          href="https://github.com/paniszcze/kiiboodo"
          rel="noreferrer"
          target="_blank">paniszcze</a>, 2022
      </footer>
    </div>
  </div>
);

export default App;
