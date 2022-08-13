import { YEAR_STEP } from 'src/lib/consts';
import type { Data } from 'src/@types/data';

/**
 * calculate year's range, return maxYear and minYear
 * @param data
 * @returns
 */
export function yearRange(data: Data[]) {
  let minYear = Infinity;
  let maxYear = -Infinity;
  data.map((d: Data) => {
    if (minYear > d.year_start) minYear = d.year_start;
    if (maxYear < d.year_finish) maxYear = d.year_finish;
  });

  const currentYear = new Date().getFullYear();
  if (maxYear > currentYear) {
    maxYear = currentYear;
  }

  return { minYear, maxYear };
}

/**
 * compute the canvas height
 * @param { minYear, maxYear }
 * @returns
 */
export function computeCanvasHeight({
  minYear,
  maxYear,
  yearHeight
}: {
  minYear: number;
  maxYear: number;
  yearHeight: number;
}): number {
  return ((maxYear - minYear) / YEAR_STEP + 1) * yearHeight;
}

export function computeCanvasSize(data: Data[], yearHeight: number) {
  if (!data || !data.length) {
    console.error('No data');
  }

  const { minYear, maxYear } = yearRange(data);
  const canvasHeight = computeCanvasHeight({ minYear, maxYear, yearHeight });
  return { minYear, maxYear, canvasHeight };
}

export function computeStats(data: Data[]) {
  const tags = new Set();
  const categories = new Set();
  const columns = new Set();

  data.map((d) => {
    d.tags.map((t) => tags.add(t.title));
    d.categories.map((t) => categories.add(t.title));
    columns.add(d.column.title);
  });

  return { tags, categories, columns };
}
