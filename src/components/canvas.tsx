import * as React from "react";

import "../styles/canvas.css";

import Input from "./input";

const Canvas = () => {
  const [words, setWords] = React.useState<string[]>([]);
  const [userInput, setUserInput] = React.useState("");

  const addWord = (word: string) => {
    setWords((prevWords) => [...prevWords, word]);
  };

  return (
    <div className="Canvas pixel-border">
      <Input userInput={userInput} setUserInput={setUserInput} />
    </div>
  );
};

export default Canvas;
