import { Data } from 'src/@types/data';
import { BREAKPOINTS } from 'src/lib/consts';
import { useBreakpoint } from 'src/lib/hooks';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

export type TimelineProps = {
  data: Data[];
};

/**
 * ### Timeline visualization component
 */
export function Timeline({ data }: TimelineProps) {
  const isMobile = useBreakpoint(`(max-width: ${BREAKPOINTS.lg})`);

  return (
    <div className="relative flex justify-center w-full timeline">
      {isMobile ? <MobileView data={data} /> : <DesktopView data={data} />}
    </div>
  );
}
