import { YEAR_RANGE_KEY } from 'src/lib/consts';
import { useTimeline } from 'src/stores/useTimeline';
import shallow from 'zustand/shallow';
import { useCallback } from 'react';

const menuMap: any = {
  Tags: 'tags',
  'Categories': 'categories',
  Time: YEAR_RANGE_KEY
};

const MenuItems = ({ mainMenu, setMainMenu, stats }: any) => {
  const [filters, setFilters] = useTimeline(
    useCallback((s) => [s.filters, s.setFilters], []),
    shallow
  );
  // because there is no time property in stats, set stats.time is empty set
  stats[YEAR_RANGE_KEY] = new Set();

  const menus = mainMenu
    ? [...stats[menuMap[mainMenu]]].sort()
    : Object.keys(menuMap);

  const select = (item: string) => () => {
    // toggle the main menu
    if (!mainMenu) {
      setMainMenu(item);
      return;
    }

    // toggle the submenu, e.g. filters
    const existFilter = (filters as any)[menuMap[mainMenu]];
    if (existFilter) {
      setFilters({
        ...filters,
        [menuMap[mainMenu]]: existFilter.add(item)
      });
    } else {
      const newFilter = new Set();
      newFilter.add(item);
      setFilters({
        ...filters,
        [menuMap[mainMenu]]: newFilter
      });
    }
  };

  return (
    <>
      {menus.map((item: string, i) => (
        <button
          key={i}
          className="block w-full px-4 py-2 font-bold text-left transition-colors text-md hover:bg-grey-300"
          role="menuitem"
          onClick={select(item)}
        >
          <span className="flex justify-between">
            <span>{item}</span>
            {!mainMenu && '>'}
          </span>
        </button>
      ))}
    </>
  );
};

export default MenuItems;
