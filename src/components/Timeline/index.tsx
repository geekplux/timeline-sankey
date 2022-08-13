import { TimelineProps } from 'src/@types/data';
import { BREAKPOINTS } from 'src/lib/consts';
import { useBreakpoint } from 'src/lib/hooks';
import DesktopView from './DesktopView';
import MobileView from './MobileView';


/**
 * ### Timeline visualization component
 */
export function Timeline({ data, visParams }: TimelineProps) {
  const isMobile = useBreakpoint(`(max-width: ${BREAKPOINTS.lg})`);

  return (
    <div className="relative flex justify-center w-full timeline">
      {isMobile ? (
        <MobileView data={data} visParams={visParams} />
      ) : (
        <DesktopView data={data} visParams={visParams} />
      )}
    </div>
  );
}
