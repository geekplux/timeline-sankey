export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '2000px'
};

export const MAX_YEAR_HEIGHT: number = 200; // max height of per year, for zoom function
export const MIN_YEAR_HEIGHT: number = 40; // min height of per year, for zoom function
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
