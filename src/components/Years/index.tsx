import { YEAR_STEP } from 'src/lib/consts';
import range from 'lodash/range';
import type { HTMLProps } from 'react';

export type YearsProps = {
  yearHeight: number;
  minYear: number;
  maxYear: number;
} & HTMLProps<HTMLDivElement>;

export default function Years({
  yearHeight,
  minYear,
  maxYear,
  className = ''
}: YearsProps) {
  const years = range(minYear, maxYear, YEAR_STEP).reverse();

  return (
    <div className="w-full years">
      {years.map((y: any, i: number) => (
        <section
          key={y}
          className="flex items-center w-full"
          style={{
            height: yearHeight,
            background: `${i % 2 == 1 ? 'rgba(242, 240, 234, 0.5)' : 'white'}`
          }}
        >
          <span className="absolute left-5 2sm:text-sm md:text-md">
            {`${y}s`}
          </span>
        </section>
      ))}
    </div>
  );
}
