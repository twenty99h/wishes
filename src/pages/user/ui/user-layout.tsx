import { Profile } from '@/shared/types/profile';
import { Card, CardContent, CardHeader, Flex, LoadingButton, NavButton, Skeleton, Text } from '@/shared/ui';
import { UserAvatar } from '@/shared/ui/user-avatar';
import { useUnit } from 'effector-react';
import { ArrowLeft, Calendar, UserMinus, UserPlus } from 'lucide-react';
import { DateTime } from 'luxon';
import { Outlet } from 'react-router';
import { $isFollowed, $isFollowPending, userFollowed, userUnfollowed } from '../model';

export function UserLayout({ user, pending, error }: { user: Profile; pending: boolean; error: Error | null }) {
  const [onFollow, onUnfollow, isFollowPending, isFollowed] = useUnit([
    userFollowed,
    userUnfollowed,
    $isFollowPending,
    $isFollowed,
  ]);

  if (pending) return <UserLayoutSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  if (!user) return <div>User not found</div>;

  function handleFollowing(userId: string) {
    const handler = user.is_current_user_followed ? onUnfollow : onFollow;
    handler(userId);
  }

  return (
    <Flex direction="column" align="center" className="px-8" gap={4}>
      <Flex width="max" align="center" gap={2} className="h-16">
        <NavButton to="/users" variant="link">
          <ArrowLeft className="h-5 w-5" />К списку пользователей
        </NavButton>
      </Flex>

      <Card className="w-full max-w-xl">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar src={user.avatar_url} alt={user.username} size="xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <Flex align="center" gap={1}>
                    <Calendar className="h-4 w-4" />
                    Пользователь с {DateTime.fromISO(user.created_at).toFormat('MMMM yyyy', { locale: 'ru' })}
                  </Flex>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <LoadingButton
                variant={isFollowed ? 'outline' : 'default'}
                startIcon={isFollowed ? <UserMinus className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                loading={isFollowPending}
                onClick={() => handleFollowing(user.id)}
              >
                {isFollowed ? 'Отписаться' : 'Подписаться'}
              </LoadingButton>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Text>{user.bio || 'Пользователь пока ничего не рассказал о себе...'}</Text>
        </CardContent>
      </Card>

      <Outlet />
    </Flex>
  );
}

function UserLayoutSkeleton() {
  return (
    <Flex className="mx-auto px-8" direction="column" gap={6}>
      <Flex className="h-16" width="max" justify="between" align="center">
        <Skeleton className="w-42 h-8" />
      </Flex>
      <Skeleton className="self-center container h-52 w-full" />
    </Flex>
  );
}
