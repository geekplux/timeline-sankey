import { onKeyAction } from 'src/lib/utils';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import FilterItems from './FilterItems';
import MenuItems from './MenuItems';
import YearRange from './YearRange';

export type FilterProps = {
  stats: any;
  minYear: number;
  maxYear: number;
};

export default function Filter({ stats, minYear, maxYear }: FilterProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [mainMenu, setMainMenu] = useState<string>('');
  const menuRef = useRef(null);

  // display or undisplay all menus
  const toggleMenus = () => {
    if (menuVisible) {
      setMainMenu('');
    }
    setMenuVisible(!menuVisible);
  };

  useClickAway(menuRef, () => {
    setMainMenu('');
    setMenuVisible(false);
  });

  return (
    <div
      ref={menuRef}
      className="filter-bar text-sm fixed bottom-10 right-20 text-right"
    >
      {menuVisible && (
        <div className="absolute right-0 w-56 my-2 text-left bg-white rounded-md shadow-md bottom-full">
          {mainMenu && (
            <button
              className="block w-full px-4 py-2 font-bold text-left text-gray-500 transition-colors text-md hover:bg-grey-300 hover:text-grey-900"
              role="menuitem"
              onClick={() => setMainMenu('')}
              onKeyDown={onKeyAction(() => setMainMenu(''))}
            >
              Back
            </button>
          )}
          <div
            className="py-1 overflow-y-auto max-h-96"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {mainMenu == 'Time' ? (
              <YearRange minYear={minYear} maxYear={maxYear} />
            ) : (
              <MenuItems
                mainMenu={mainMenu}
                setMainMenu={setMainMenu}
                stats={stats}
              />
            )}
          </div>
        </div>
      )}
      <FilterItems />
      <button
        className="px-6 py-3 font-bold transition-colors bg-white rounded-md shadow-md oval font-sans-md tracking-squeeze btn-add hover:bg-black hover:text-white"
        onClick={toggleMenus}
        onKeyDown={onKeyAction(toggleMenus)}
      >
        {menuVisible ? `Close` : `Add Filter`}
      </button>
    </div>
  );
}
