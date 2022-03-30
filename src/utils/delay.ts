import { MIN_LAUNCH_DELAY, MAX_LAUNCH_DELAY } from "./constants";

export const randomiseDelay = (): number =>
  Math.random() * (MAX_LAUNCH_DELAY - MIN_LAUNCH_DELAY) + MIN_LAUNCH_DELAY;
