import * as React from "react";
import { useInterval } from "../hooks/useInterval";

import "../styles/canvas.css";

import { CanvasProps, WordInterface } from "../utils/types";
import { generateWord } from "../utils/dict";
import { randomiseDelay } from "../utils/delay";
import {
  CANVAS_HEIGHT,
  CASCADE_STEP,
  CASCADE_PERIOD,
  MIN_LAUNCH_DELAY,
  BORDER_WIDTH,
} from "../utils/constants";

const Canvas = ({
  stats,
  setStats,
  isRunning,
  gameOver,
  setGameOver,
}: CanvasProps) => {
  const [words, setWords] = React.useState<WordInterface[]>([]);
  const [userInput, setUserInput] = React.useState<string>("");
  const [launchDelay, setLaunchDelay] =
    React.useState<number>(MIN_LAUNCH_DELAY);

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
            isEliminated:
              newPosition > CANVAS_HEIGHT - BORDER_WIDTH ? true : false,
          };
        } else {
          return { ...word };
        }
      })
    );
  };

  const scanWords = () => {
    words
      .filter((word) => word.isEliminated)
      .forEach((word) => {
        removeWord(word.text);
        setStats((prevStats) => {
          return { ...stats, lives: prevStats.lives - 1 };
        });
      });
  };

  // INPUT HANDLING
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // GAME LOGIC
  // a) add new words at random intervals
  useInterval(launchWord, isRunning ? launchDelay : null);
  // b) move words downward, check for missed ones and update lives count
  useInterval(
    () => {
      moveWords();
      scanWords();
    },
    isRunning ? CASCADE_PERIOD : null
  );
  // c) eliminate guessed words and update score
  React.useEffect(() => {
    if (!gameOver && isRunning) {
      let value = removeWord(userInput);
      if (value !== 0) {
        setStats((prevStats) => {
          return { ...stats, score: prevStats.score + value };
        });
      }
    }
  }, [gameOver, isRunning, removeWord, userInput, stats, setStats]);
  // d) reset state on re-run
  React.useEffect(() => {
    if (gameOver && isRunning) {
      setGameOver(false);
      setWords([]);
      setUserInput("");
      setLaunchDelay(MIN_LAUNCH_DELAY);
    }
  }, [gameOver, isRunning, setGameOver]);

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
              lang="ja"
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
        lang="ja"
      />
      {!isRunning && !gameOver && words.length !== 0 && (
        <div className="modal">
          <div className="modal-content">
            <strong>PAUSED</strong>
            <span lang="ja">がんばってね！</span>
          </div>
        </div>
      )}
      {gameOver && (
        <div className="modal">
          <div className="modal-content">
            <strong>GAME OVER</strong>
            Your score: <span className="score">{stats.score}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
