import { MAX_YEAR_HEIGHT, MIN_YEAR_HEIGHT } from 'src/lib/consts';

export default function Zoom({ yearHeight, setYearHeight }) {
  const zoomOut = () => {
    if (yearHeight / 1.5 > MIN_YEAR_HEIGHT) setYearHeight(yearHeight / 1.5);
  };

  const zoomIn = () => {
    if (yearHeight * 1.5 < MAX_YEAR_HEIGHT) setYearHeight(yearHeight * 1.5);
  };

  return (
    <div className="zoom fixed bottom-10 flex flex-col shadow-card left-20">
      <button
        className="px-4 py-2 font-bold transition-colors bg-white border-b border-gray-300 font-sans-md tracking-squeeze btn-add hover:bg-black hover:text-white"
        onClick={zoomIn}
      >
        +
      </button>
      <button
        className="px-4 py-1 text-xl font-extrabold transition-colors bg-white font-sans-md tracking-squeeze btn-add hover:bg-black hover:text-white"
        onClick={zoomOut}
      >
        -
      </button>
    </div>
  );
}
