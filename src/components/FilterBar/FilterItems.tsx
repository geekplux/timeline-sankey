import { useTimeline } from 'src/stores/useTimeline';
import { useCallback } from 'react';
import shallow from 'zustand/shallow';

const FilterItems = () => {
  const [filters, setFilters] = useTimeline(
    useCallback((s) => [s.filters, s.setFilters], []),
    shallow
  );

  if (!filters) return null;
  const { yearRange, ...otherItems } = filters;

  // clear filter when clicking them
  const clearFilter = (filter: string) => () => {
    const newFilters = Object.assign({}, filters);
    if (filter == 'yearRange') {
      delete newFilters.yearRange;
    }

    Object.keys(newFilters).map((k) => {
      if (k === 'yearRange') return;
      (newFilters as any)[k].delete(filter);
    });

    setFilters(newFilters);
  };

  const Close = () => (
    <div className="inline w-4 ml-2 stroke-current text-grey-700">X</div>
  );
  const FilterButton = ({ children, ...props }: any) => (
    <button
      className="px-[12px] py-3 mb-2 mr-2 font-bold bg-white rounded-md shadow-md oval font-sans-md tracking-squeeze btn-add hover:bg-black hover:text-white transition-colors"
      {...props}
    >
      {children}
    </button>
  );

  return (
    <>
      {Object.keys(otherItems).map((k) =>
        [...(filters as any)[k]].map((f) => (
          <FilterButton key={`${k}-${f}`} onClick={clearFilter(f)}>
            {f}
            <Close />
          </FilterButton>
        ))
      )}
      {yearRange && (
        <FilterButton onClick={clearFilter('yearRange')}>
          {`${yearRange[0]} - ${yearRange[1]}`}
          <Close />
        </FilterButton>
      )}
    </>
  );
};

export default FilterItems;
