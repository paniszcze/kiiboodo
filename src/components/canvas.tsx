import * as React from "react";
import { useInterval } from "../hooks/useInterval";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";
import { generateWord } from "../utils/dict";
import {
  CASCADE_STEP,
  CANVAS_HEIGHT,
  MIN_LAUNCH_DELAY,
  CASCADE_PERIOD,
} from "../utils/constants";

const Canvas = ({
  stats: { score, lives },
  setStats,
  isRunning,
  setIsRunning,
}: CanvasProps) => {
  const [words, setWords] = React.useState<WordInterface[]>([]);
  const [userInput, setUserInput] = React.useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const findWord = (entry: string): number =>
    words.findIndex((word) => word.text === entry);

  const addWord = () => {
    let newWord: WordInterface, index: number;
    do {
      newWord = generateWord();
      index = findWord(newWord.text);
    } while (words.length !== 0 && index !== -1);
    setWords((prevWords) => [...prevWords, newWord]);
  };

  const removeWord = (entry: string) => {
    let index = findWord(entry);
    if (index !== -1) {
      setWords((prevWords) => {
        let newWords = [...prevWords];
        newWords[index] = { ...prevWords[index], isEliminated: true };
        return newWords;
      });
    }
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

  useInterval(addWord, isRunning ? MIN_LAUNCH_DELAY : null);
  useInterval(moveWords, isRunning ? CASCADE_PERIOD : null);

  return (
    <div className="Canvas">
      {words.length !== 0 &&
        words
          .filter((word) => !word.isEliminated)
          .map((word) => (
            <div
              key={word.text}
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
