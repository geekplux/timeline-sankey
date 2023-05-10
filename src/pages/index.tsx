import { useEffect, useState } from 'react';
import { Timeline } from 'src/components/Timeline';
import { Data } from 'src/@types/data';
import { useControls } from 'leva';
import dataGenerator from 'src/lib/dataGenerator';
import { Leva } from 'leva';
import { MAX_YEAR_HEIGHT, MIN_YEAR_HEIGHT } from 'src/lib/consts';
import { BREAKPOINTS } from 'src/lib/consts';
import { useBreakpoint } from 'src/lib/hooks';

/**
 * Timeline page
 */
export default function TimelinePage() {
  const [data, setData] = useState<Data[]>([]);
  const isMobile = useBreakpoint(`(max-width: ${BREAKPOINTS.lg})`);
  const visParams = useControls('Visualization Parameters', {
    yearStep: {
      value: 10,
      min: 5,
      max: 50,
      step: 5
    },
    yearHeight: {
      value: 60, // height of per year
      min: MIN_YEAR_HEIGHT,
      max: MAX_YEAR_HEIGHT,
      step: 10
    },
    nodeWidth: {
      value: 12,
      min: 5,
      max: 30,
      step: 1
    },
    linkDefaultColor: 'rgba(220, 220, 220, 1)',
    gridGap: {
      value: 80,
      min: 20,
      max: 200,
      step: 5
    },
    nodeGap: {
      value: 30, // the minimum gap height between nodes in each column. which is for the space of node title, unit: pixel
      min: 10,
      max: 60,
      step: 5
    },
    nodeTitleGap: {
      value: 30, // the vertical gap height between node and its title, unit: pixel
      min: 10,
      max: 50,
      step: 5
    },
    crossLinkStrokeDashArray: {
      value: 1,
      min: 1,
      max: 20,
      step: 1
    },
    crossLinkTriangleSize: {
      value: 7,
      min: 5,
      max: 20,
      step: 1
    },
    mobileYearHeight: {
      value: 50, // height of per year
      min: 20,
      max: 100,
      step: 5
    },
    mobileNodeWidth: {
      value: 8,
      min: 3,
      max: 30,
      step: 1
    }
  });

  const {
    nodeCount,
    yearRange,
    tagMaxCount,
    categoryMaxCount,
    columnCount,
    color1,
    color2,
    color3,
    color4,
    color5,
    influencedMaxCount,
    influencedByMaxCount,
    crossInfluencedMaxCount,
    crossInfluencedByMaxCount
  } = useControls(
    'Random Data Generation Parameters',
    {
      nodeCount: {
        value: 40,
        min: 10,
        max: 100,
        step: 10
      },
      yearRange: {
        min: 1600,
        max: 2022,
        value: [1800, 2022]
      },
      columnCount: {
        value: 3,
        min: 2,
        max: 5,
        step: 1
      },
      tagMaxCount: 10,
      categoryMaxCount: 10,
      color1: { value: 'peru', render: (get) => get('columnCount') >= 1 },
      color2: { value: 'lightpink', render: (get) => get('columnCount') >= 2 },
      color3: { value: 'steelblue', render: (get) => get('columnCount') >= 3 },
      color4: { value: 'red', render: (get) => get('columnCount') >= 4 },
      color5: { value: 'limegreen', render: (get) => get('columnCount') >= 5 },
      influencedMaxCount: 3,
      influencedByMaxCount: 3,
      crossInfluencedMaxCount: 6,
      crossInfluencedByMaxCount: 6
    },
    {
      collapsed: true
    }
  );

  useEffect(() => {
    setData(
      dataGenerator(
        nodeCount,
        yearRange,
        tagMaxCount,
        categoryMaxCount,
        columnCount,
        [color1, color2, color3, color4, color5],
        influencedMaxCount,
        influencedByMaxCount,
        crossInfluencedMaxCount,
        crossInfluencedByMaxCount
      )
    );
  }, [
    nodeCount,
    yearRange,
    tagMaxCount,
    categoryMaxCount,
    columnCount,
    color1,
    color2,
    color3,
    color4,
    color5,
    influencedMaxCount,
    influencedByMaxCount,
    crossInfluencedMaxCount,
    crossInfluencedByMaxCount
  ]);

  return (
    <>
      <Timeline data={data} visParams={visParams} isMobile={isMobile} />
      <Leva
        theme={{
          sizes: {
            rootWidth: isMobile ? '80%' : '400px'
          }
        }}
      />
    </>
  );
}
