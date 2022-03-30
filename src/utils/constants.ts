// INITIAL STATS
export const INITIAL_SCORE = 0;
export const MAX_LIVES = 4;

// LIFE BAR ICONS MAPPING VALUES
export const SKULL = 0;
export const HEART = 1;

// WORD CONSTANTS
export const MIN_LEN = 2;
export const MAX_LEN = 9;
export const INITIAL_LEN = 4;

// THRESHOLDS FOR DICTIONARY RANDOMISATION
export const KATAKANA_RATIO = 0.05;
export const LOWER_TRESHOLD = 0.2;
export const UPPER_TRESHOLD = 0.7;

// CANVAS POSITIONING
export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 650;
export const FONT_WIDTH = 14;
export const BORDER_WIDTH = 3;
export const PADDING = 2 * (BORDER_WIDTH + 1);
export const STARTING_POSITION = -(FONT_WIDTH + PADDING - BORDER_WIDTH);

// WORD CASCADE
export const CASCADE_STEP = 3;
export const CASCADE_PERIOD = 250;
export const MIN_LAUNCH_DELAY =
  Math.ceil(FONT_WIDTH / CASCADE_STEP) * CASCADE_PERIOD;
export const MAX_LAUNCH_DELAY = MIN_LAUNCH_DELAY * 2.2;
