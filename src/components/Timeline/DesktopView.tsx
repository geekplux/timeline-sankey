import FilterBar from 'src/components/FilterBar';
import Sankey from 'src/components/Sankey';
import Years from 'src/components/Years';
import Zoom from 'src/components/Zoom';
import { useEffect, useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { computeCanvasSize, computeStats } from './compute';
import { TimelineProps } from 'src/@types/data';

const DesktopView = ({ data, visParams }: TimelineProps) => {
  const {
    yearStep,
    yearHeight: desktopYearHeight,
    nodeGap,
    nodeTitleGap,
    nodeWidth,
    linkDefaultColor,
    crossLinkStrokeDashArray,
    crossLinkTriangleSize,
    gridGap
  } = visParams;
  const [yearHeight, setYearHeight] = useState(desktopYearHeight);
  useEffect(() => {
    setYearHeight(desktopYearHeight);
  }, [desktopYearHeight]);

  const { minYear, maxYear, canvasHeight } = computeCanvasSize(
    data,
    yearHeight,
    yearStep
  );
  const stats = useMemo(() => computeStats(data), [data]);

  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  return (
    <>
      <Years
        minYear={minYear}
        maxYear={maxYear}
        yearHeight={yearHeight}
        yearStep={yearStep}
      />
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
          yearStep={yearStep}
          nodeGap={nodeGap}
          nodeTitleGap={nodeTitleGap}
          nodeWidth={nodeWidth}
          linkDefaultColor={linkDefaultColor}
          crossLinkStrokeDashArray={crossLinkStrokeDashArray}
          crossLinkTriangleSize={crossLinkTriangleSize}
          gridGap={gridGap}
          data={data}
        />
      </div>
      <FilterBar stats={stats} minYear={minYear} maxYear={maxYear} />
      <Zoom yearHeight={yearHeight} setYearHeight={setYearHeight} />
    </>
  );
};

export default DesktopView;
