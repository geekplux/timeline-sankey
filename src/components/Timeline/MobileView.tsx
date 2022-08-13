import Sankey from 'src/components/Sankey';
import Years from 'src/components/Years';
import { useMemo, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useSwipeable } from 'react-swipeable';
import { LeftButton, RightButton } from './buttons';
import { computeCanvasSize, computeStats } from './compute';
import { TimelineProps } from 'src/@types/data';

const MobileView = ({ data, visParams }: TimelineProps) => {
  const {
    yearStep,
    mobileYearHeight,
    nodeGap,
    nodeTitleGap,
    mobileNodeWidth,
    linkDefaultColor,
    gridGap
  } = visParams;
  const [viewCursor, setViewCursor] = useState(0);
  const { minYear, maxYear, canvasHeight } = computeCanvasSize(
    data,
    mobileYearHeight,
    yearStep
  );
  const stats = useMemo(() => computeStats(data), [data]);
  const views = [...stats.columns].sort();

  const { width, ref } = useResizeDetector({
    handleHeight: false
  });

  const slideLeft = () => {
    if (viewCursor >= views.length - 1) return;
    setViewCursor(viewCursor + 1);
  };
  const slideRight = () => {
    if (viewCursor <= 0) return;
    setViewCursor(viewCursor - 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: (e) => slideLeft(),
    onSwipedRight: (e) => slideRight(),
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <>
      <Years
        minYear={minYear}
        maxYear={maxYear}
        yearHeight={mobileYearHeight}
        yearStep={yearStep}
      />
      <div
        className="absolute top-0 w-full pl-16 pr-2 overflow-hidden"
        {...handlers}
      >
        <div className="canvas" ref={ref} style={{ height: canvasHeight }}>
          <Sankey
            width={width * views.length}
            height={canvasHeight}
            minYear={minYear}
            maxYear={maxYear}
            yearStep={yearStep}
            nodeGap={nodeGap}
            nodeTitleGap={nodeTitleGap}
            nodeWidth={mobileNodeWidth}
            linkDefaultColor={linkDefaultColor}
            gridGap={gridGap}
            data={data}
            containerProps={{
              style: {
                transform: `translate(${-width * viewCursor}px, 0)`,
                transition: 'transform 0.5s'
              }
            }}
          />
        </div>
      </div>
      <div className="fixed flex items-center w-11/12 px-4 py-2 text-center text-white rounded-md px bottom-10 bg-black shadow-card">
        <LeftButton onClick={() => slideRight()} />
        <span className="w-full font-bold">{(views as any)[viewCursor]}</span>
        <RightButton onClick={() => slideLeft()} />
      </div>
    </>
  );
};

export default MobileView;
