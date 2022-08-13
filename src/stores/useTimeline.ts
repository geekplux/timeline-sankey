import create from 'zustand';

type Filters = {
  tags?: Set<string>;
  categories?: Set<string>;
  yearRange?: string[];
};
type UseTimeline = {
  filters: Filters;
  setFilters(filters: Filters): void;
};

export const useTimeline = create<UseTimeline>((set) => {
  return {
    filters: {},
    setFilters: (filters) => set({ filters })
  };
});
