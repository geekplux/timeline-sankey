import Input from './Input';
import { useCallback, useState } from 'react';
import { YEAR_RANGE_KEY } from 'src/lib/consts';
import { useTimeline } from 'src/stores/useTimeline';
import shallow from 'zustand/shallow';

const YearRange = ({ minYear, maxYear }: any) => {
  const [filters, setFilters] = useTimeline(
    useCallback((s) => [s.filters, s.setFilters], []),
    shallow
  );
  const [fromYear, setFromYear] = useState(minYear);
  const [toYear, setToYear] = useState(maxYear);

  const handleFromYearChange = (event: any) => setFromYear(event.target.value);
  const handleToYearChange = (event: any) => setToYear(event.target.value);
  const handleEnter = (event: any) => {
    setFilters({ ...filters, [YEAR_RANGE_KEY]: [fromYear, toYear] });
  };

  return (
    <form className="font-bold time-span-form">
      <div className="px-4 py-2 border-b border-gray-200">
        <label htmlFor="from-year">From</label>
        <Input
          className="block w-full text-2xl text-black border-0 outline-none placeholder-text-light-grey"
          type="number"
          id="from-year"
          placeholder={`${minYear}`}
          value={fromYear}
          onChange={handleFromYearChange}
          onEnter={handleEnter}
        />
      </div>
      <div className="px-4 py-2">
        <label htmlFor="to-year">To</label>
        <Input
          className="block w-full text-2xl text-black border-0 outline-none placeholder-text-light-grey"
          type="number"
          id="to-year"
          placeholder={`${maxYear}`}
          value={toYear}
          onChange={handleToYearChange}
          onEnter={handleEnter}
        />
      </div>
    </form>
  );
};

export default YearRange;
