import { Dispatch, SetStateAction } from "react";

export type Stats = {
  score: number;
  lives: number;
};

export type WordInterface = {
  text: string;
  value: number;
  x: number;
  y: number;
  isEliminated: boolean;
};

export type DelayType = number | null;

export type CallbackType = (...args: any[]) => void;

export interface DashboardProps {
  stats: Stats;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

export interface CanvasProps {
  stats: Stats;
  setStats: Dispatch<SetStateAction<Stats>>;
  isRunning: boolean;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}
