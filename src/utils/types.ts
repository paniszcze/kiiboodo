export interface Stats {
  stats: {
    score: number;
    lives: number;
  };
}

export interface CanvasProps extends Stats {
  setStats: Function;
}

export interface WordInterface {
  text: string;
  value: number;
  x: number;
  y: number;
  isEliminated: boolean;
}
