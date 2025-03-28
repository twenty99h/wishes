import { WishTab } from '@/shared/types/wish';
import { create } from 'zustand';

type TabsState = {
  tabs: WishTab[];
  activeTab: number;
  setActiveTab: (id: number) => void;
  setTabs: (tabs: WishTab[]) => void;
};

const TABS_MOCK: WishTab[] = [
  { id: 1, title: 'All' },
  { id: 2, title: 'Fulfilled' },
  { id: 3, title: 'Not Fulfilled' },
];

export const useTabsStore = create<TabsState>((set) => ({
  tabs: TABS_MOCK,
  activeTab: 1,
  setActiveTab: (activeTab: number) => set({ activeTab }),
  setTabs: (tabs: WishTab[]) => set({ tabs }),
}));
