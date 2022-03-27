import * as React from "react";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";
import { generateWord } from "../utils/dict";
import { CASCADE_STEP, CANVAS_HEIGHT } from "../utils/constants";

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
    setWords((prevWords) => [...prevWords, newWord]);
  };

  const findWord = (entry: string): number =>
    words.findIndex((word) => word.text === entry);

  const removeWord = (index: number) => {
    setWords((prevWords) => {
      let newWords = [...prevWords];
      newWords[index] = { ...prevWords[index], isEliminated: true };
      return newWords;
    });
  };

  const moveWords = () => {
    setWords((prevWords) =>
      prevWords.map((word) => {
        if (!word.isEliminated) {
          let newPosition = word.y + CASCADE_STEP;
          return {
            ...word,
            y: newPosition,
            isEliminated: newPosition > CANVAS_HEIGHT ? true : false,
          };
        } else {
          return { ...word };
        }
      })
    );
  };

  React.useEffect(() => {
    if (isRunning) {
      addWord();
      moveWords();
    }
  }, [isRunning]);

  return (
    <div className="Canvas">
      {words.length !== 0 &&
        words
          .filter((word) => !word.isEliminated)
          .map((word, index) => (
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
