import type { Profile } from '@/shared/types/profile';
import { Card, CardContent, CardHeader, Flex, LoadingButton, NavButton, Text } from '@/shared/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useUnit } from 'effector-react';
import { User, UserMinus, UserPlus } from 'lucide-react';
import { $pendingUsersMap, userFollowed, userUnfollowed } from '../model';

interface UserCardProps {
  user: Profile;
}

export function UserCard({ user }: UserCardProps) {
  const [onFollowUser, onUnfollowUser, pendingUsersMap] = useUnit([userFollowed, userUnfollowed, $pendingUsersMap]);

  const isPending = pendingUsersMap[user.id];

  function handleFollowing(userId: string) {
    const handler = user.is_current_user_followed ? onUnfollowUser : onFollowUser;
    handler(userId);
  }

  return (
    <Card className="group gap-2 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <Flex align="center" gap={2}>
          <Avatar>
            <AvatarImage src={user.avatar_url || ''} alt={user.username} />
            <AvatarFallback className="rounded-lg p-2 bg-gradient-to-br from-green-500 to-green-700 text-white">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <Text size="sm" weight="semibold" className="truncate">
            {user.username}
          </Text>
        </Flex>
      </CardHeader>

      <CardContent className="space-y-4">
        <Text size="sm" className="text-muted-foreground line-clamp-2">
          {user.bio || 'Пользователь пока ничего не рассказал о себе...'}
        </Text>
        <Flex gap={2}>
          <LoadingButton
            className="w-1/2"
            startIcon={
              user.is_current_user_followed ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />
            }
            variant={user.is_current_user_followed ? 'outline' : 'default'}
            size="sm"
            loading={isPending}
            onClick={() => handleFollowing(user.id)}
          >
            {user.is_current_user_followed ? 'Отписаться' : 'Подписаться'}
          </LoadingButton>
          <NavButton to={`/users/${user.id}`} className="w-1/2" variant="default" size="sm">
            <User className="h-4 w-4" />
            Посмотреть
          </NavButton>
        </Flex>
      </CardContent>
    </Card>
  );
}
