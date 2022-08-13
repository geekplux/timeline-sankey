import { Timeline } from 'src/components/Timeline';
import type { GetStaticProps } from 'next';
import dataGenerator from 'src/data/dataGenerator';

/**
 * Timeline page
 */
export default function TimelinePage({ data }: any) {
  return <Timeline data={data} />;
}

/** Page data */
export const getStaticProps: GetStaticProps = async (context) => {
  const data = dataGenerator(50, [1600, 2022], 10, 10, 3, [
    'peru',
    'lightpink',
    'steelblue',
  ], 3, 3, 6, 6);

  return {
    props: { data }
  };
};
