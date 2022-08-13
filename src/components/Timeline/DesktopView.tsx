import FilterBar from 'src/components/FilterBar';
import Sankey from 'src/components/Sankey';
import Years from 'src/components/Years';
import Zoom from 'src/components/Zoom';
import { YEAR_HEIGHT } from 'src/lib/consts';
import { useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { computeCanvasSize, computeStats } from './compute';

export type Props = {
  data: any;
};

const DesktopView = ({ data }: Props) => {
  const [yearHeight, setYearHeight] = useState(YEAR_HEIGHT);
  const { minYear, maxYear, canvasHeight } = computeCanvasSize(
    data,
    yearHeight
  );
  const stats = useMemo(() => computeStats(data), [data]);

  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  return (
    <>
      <Years minYear={minYear} maxYear={maxYear} yearHeight={yearHeight} />
      <div
        className="absolute top-0 w-9/12 canvas"
        style={{ height: canvasHeight }}
        ref={ref as any}
      >
        <Sankey
          width={width}
          height={canvasHeight}
          minYear={minYear}
          maxYear={maxYear}
          data={data}
        />
      </div>
      <FilterBar stats={stats} minYear={minYear} maxYear={maxYear} />
      <Zoom yearHeight={yearHeight} setYearHeight={setYearHeight} />
    </>
  );
};

export default DesktopView;
