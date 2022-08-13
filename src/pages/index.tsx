import { useEffect, useState } from 'react';
import { Timeline } from 'src/components/Timeline';
import { Data } from 'src/@types/data';
import { useControls } from 'leva';
import dataGenerator from 'src/lib/dataGenerator';
import { Leva } from 'leva';

/**
 * Timeline page
 */
export default function TimelinePage() {
  const [data, setData] = useState<Data[]>([]);
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
  } = useControls('Random Data Generation', {
    nodeCount: 50,
    yearRange: {
      min: 1600,
      max: 2022,
      value: [1600, 2022]
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
  });

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
      <Timeline data={data} />
      <Leva
        theme={{
          sizes: {
            rootWidth: '400px',
          }
        }}
      />
    </>
  );
}
