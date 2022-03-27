import * as React from "react";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";

const Canvas = ({ stats: { score, lives }, setStats }: CanvasProps) => {
  const [words, setWords] = React.useState<WordInterface[]>([]);
  const [userInput, setUserInput] = React.useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // addWord
  // removeWord
  // populateWords

  return (
    <div className="Canvas">
      {words.length !== 0 &&
        words.map((word, index) => (
          <div
            key={index}
            className="word"
            style={{ top: `${word.y}px`, left: `${word.x}px` }}
          >
            {word.text}
          </div>
        ))}
      <input
        type="text"
        name="text"
        placeholder="..."
        value={userInput}
        onChange={handleInput}
      />
    </div>
  );
};

export default Canvas;
