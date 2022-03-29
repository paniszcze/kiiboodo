export type Delay = number | null;

export type Callback = (...args: any[]) => void;

export interface Stats {
  stats: {
    score: number;
    lives: number;
  };
}

export interface DashboardProps extends Stats {
  isRunning: boolean;
  setIsRunning: Function;
}

export interface CanvasProps extends Stats {
  setStats: Function;
  isRunning: boolean;
  setIsRunning: Function;
}

export interface WordInterface {
  text: string;
  value: number;
  x: number;
  y: number;
  isEliminated: boolean;
}
