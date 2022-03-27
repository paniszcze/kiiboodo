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
  x: number;
  y: number;
  isEliminated: boolean;
}

export interface WordProps {
  // ...
}
