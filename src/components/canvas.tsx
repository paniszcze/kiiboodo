import * as React from "react";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";
import { generateWord } from "../utils/dict";

const Canvas = ({
  stats: { score, lives },
  setStats,
  isRunning,
  setIsRunning,
}: CanvasProps) => {
  const [words, setWords] = React.useState<WordInterface[]>([]);
  const [userInput, setUserInput] = React.useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const addWord = () => {
    let newWord = generateWord();
    // TODO: check for duplicates
    setWords((prevWords) => [...prevWords, newWord]);
  };

  // TODOS:
  // findWord
  // removeWord
  // ...

  React.useEffect(() => {
    addWord();
  }, []);

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
