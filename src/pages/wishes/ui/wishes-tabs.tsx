import { Flex } from '@/shared/ui';
import { WishesTabItem } from './wishes-tab-item';
import { useTabsStore } from '../model';

export function WishesTabs() {
  const { tabs, activeTab, setActiveTab } = useTabsStore();

  return (
    <Flex gap={2}>
      {tabs.map((tab) => (
        <WishesTabItem key={tab.id} wishTab={tab} active={tab.id === activeTab} onClick={() => setActiveTab(tab.id)} />
      ))}
    </Flex>
  );
}
