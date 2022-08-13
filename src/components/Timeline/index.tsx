import { TimelineProps } from 'src/@types/data';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

type Props = TimelineProps & {
  isMobile: boolean;
};

/**
 * ### Timeline visualization component
 */
export function Timeline({ data, visParams, isMobile }: Props) {
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
