import { Flex } from '@/shared/ui';
import { useGate } from 'effector-react';
import { PageGate } from '../model';
import { UsersList } from './users-list';
import { UsersSearch } from './users-search';

export function UsersPage() {
  useGate(PageGate);

  return (
    <Flex className="p-8" direction="column" gap={6}>
      <UsersSearch />
      <UsersList />
    </Flex>
  );
}
