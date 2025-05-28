import { useUnit } from 'effector-react';
import { Users } from 'lucide-react';
import { $isUsersPending, usersQuery } from '../model';
import { UserCard } from './user-card';
import { Flex, Text } from '@/shared/ui';

export function UsersList() {
  const { data: users, error } = useUnit(usersQuery);
  const pending = useUnit($isUsersPending);

  if (pending) {
    return <div className="text-muted-foreground p-4">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-destructive p-4">Ошибка: {error.message}</div>;
  }

  if (!users || users?.length === 0) {
    return (
      <Flex className="w-full text-center py-12" justify="center" align="center" direction="column">
        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <Text className="text-lg font-semibold mb-2">Пользователи не найдены</Text>
        <Text className="text-muted-foreground">Попробуйте изменить поисковый запрос или фильтры</Text>
      </Flex>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} isSubscribed={false} />
      ))}
    </div>
  );
}
