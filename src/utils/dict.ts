import { dict as Dictionary } from "../data/dictionary";
import {
  MIN_LEN,
  MAX_LEN,
  INITIAL_LEN,
  KATAKANA_RATIO,
  LOWER_TRESHOLD,
  UPPER_TRESHOLD,
  CANVAS_WIDTH,
  FONT_WIDTH,
  STARTING_POSITION,
  PADDING,
} from "./constants";
import { Word } from "./types";

const randomiseKana = (): string =>
  Math.random() < KATAKANA_RATIO ? "katakana" : "hiragana";

const randomiseLength = (): number => {
  let len = INITIAL_LEN;
  let tmp_len: number;
  do {
    tmp_len = len;
    let randomNum = Math.random();
    if (randomNum > UPPER_TRESHOLD && len < MAX_LEN) {
      len += 1;
    } else if (randomNum < LOWER_TRESHOLD && len > MIN_LEN) {
      len -= 1;
    }
  } while (len !== tmp_len);
  return len;
};

const chooseRandomEntry = (): string => {
  let kana = randomiseKana();
  let len = randomiseLength();
  let index = Math.floor(Math.random() * Dictionary[kana][len].length);
  return Dictionary[kana][len][index];
};

export const generateWord = (): Word => {
  let entry = chooseRandomEntry();
  let len = entry.length;

  return {
    text: entry,
    value: len,
    x: Math.floor(
      Math.random() * (CANVAS_WIDTH - len * FONT_WIDTH - PADDING) +
        (len * FONT_WIDTH + PADDING) / 2
    ),
    y: STARTING_POSITION,
    isEliminated: false,
  };
};
