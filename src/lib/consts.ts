export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '2000px'
};

export const YEAR_STEP: number = 10;
export const YEAR_HEIGHT: number = 110; // height of per year
export const MOBILE_YEAR_HEIGHT: number = 50; // height of per year
export const MAX_YEAR_HEIGHT: number = 200;
export const MIN_YEAR_HEIGHT: number = 40;
export const NODE_GAP: number = 30; // the minimum gap height between nodes in each column. which is for the space of node title, unit: pixel
export const NODE_TITLE_GAP: number = 30;
export const NODE_WIDTH: number = 12;
export const MOBILE_NODE_WIDTH: number = 8;
export const GRID_GAP: number = 80;
export const STROKE_DASH_ARRAY: number = 1;
export const LINK_TRIANGLE_SIZE: number = 7;
export const YEAR_RANGE_KEY: string = 'yearRange';

export const DIRECT_LINK_KEYS = {
  source: 'influenced',
  target: 'influenced_by'
};
export const CROSS_LINK_KEYS = {
  source: 'cross_influenced',
  target: 'cross_influenced_by'
};
export const LINK_DEFAULT_COLOR = 'rgba(220, 220, 220, 1)';
