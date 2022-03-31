import { Dispatch, SetStateAction } from "react";

export type Stats = {
  score: number;
  lives: number;
};

export type Word = {
  text: string;
  value: number;
  x: number;
  y: number;
  isEliminated: boolean;
};

export type DelayType = number | null;

export type CallbackType = (...args: any[]) => void;

export interface CanvasProps {
  stats: Stats;
  setStats: Dispatch<SetStateAction<Stats>>;
  isRunning: boolean;
  gameOver: boolean;
}

export interface DashboardProps {
  stats: Stats;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean;
}
