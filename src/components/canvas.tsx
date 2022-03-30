import * as React from "react";
import { useInterval } from "../hooks/useInterval";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";
import { generateWord } from "../utils/dict";
import { randomiseDelay } from "../utils/delay";
import {
  CASCADE_STEP,
  CANVAS_HEIGHT,
  CASCADE_PERIOD,
  MIN_LAUNCH_DELAY,
} from "../utils/constants";

const Canvas = ({ stats, setStats, isRunning, setIsRunning }: CanvasProps) => {
  const [words, setWords] = React.useState<WordInterface[]>([]);
  const [userInput, setUserInput] = React.useState<string>("");
  const [launchDelay, setLaunchDelay] =
    React.useState<number>(MIN_LAUNCH_DELAY);
  const [gameOver, setGameOver] = React.useState<boolean>(false);

  // SINGLE WORD ACTIONS
  const findWord = React.useCallback(
    (entry: string): number => words.findIndex((word) => word.text === entry),
    [words]
  );

  const addWord = () => {
    let newWord: WordInterface, index: number;
    do {
      newWord = generateWord();
      index = findWord(newWord.text);
    } while (words.length !== 0 && index !== -1);
    setWords((prevWords) => [...prevWords, newWord]);
  };

  const removeWord = React.useCallback(
    (entry: string): number => {
      let index = findWord(entry);
      let value = 0;
      if (index !== -1) {
        value = words[index].value;
        setWords((prevWords) => {
          let newWords = [...prevWords];
          newWords.splice(index, 1);
          return newWords;
        });
      }
      return value;
    },
    [findWord, words]
  );

  const launchWord = () => {
    addWord();
    setLaunchDelay(randomiseDelay());
  };

  // WORDS ARRAY HANDLING
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

  const cleanWords = () => {
    words
      .filter((word) => word.isEliminated)
      .forEach((word) => {
        removeWord(word.text);
        setStats((prevStats) => {
          return { ...stats, lives: prevStats.lives - 1 };
        });
      });
  };

  // PERIODIC BEHAVIOUR
  useInterval(launchWord, isRunning ? launchDelay : null);
  useInterval(
    () => {
      moveWords();
      cleanWords();
    },
    isRunning ? CASCADE_PERIOD : null
  );

  // INPUT HANDLING
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  React.useEffect(() => {
    if (!gameOver) {
      let value = removeWord(userInput);
      if (value !== 0) {
        setStats((prevStats) => {
          return { ...stats, score: prevStats.score + value };
        });
      }
    }
  }, [gameOver, removeWord, userInput, stats, setStats]);

  // CHECK FOR DEFEAT
  React.useEffect(() => {
    if (stats.lives <= 0) {
      setIsRunning(false);
      setGameOver(true);
    }
  }, [stats.lives, setIsRunning]);

  // RESET GAME ON RE-RUN
  React.useEffect(() => {
    if (gameOver && isRunning) {
      setGameOver(false);
      setWords([]);
    }
  }, [gameOver, isRunning]);

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
