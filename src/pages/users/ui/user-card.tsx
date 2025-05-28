import type { Profile } from '@/shared/types/profile';
import { Button, Card, CardContent, CardHeader, Flex, Text } from '@/shared/ui';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { UserPlus, Gift } from 'lucide-react';

interface UserCardProps {
  user: Profile;
  isSubscribed: boolean;
  loading?: boolean;
  onSubscribe?: (userId: string) => void;
  onUnsubscribe?: (userId: string) => void;
}

const isFollowed = false;

export function UserCard({ user, isSubscribed, loading, onSubscribe, onUnsubscribe }: UserCardProps) {
  return (
    <Card className="group gap-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
        {/* <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-sm font-semibold">{user.wishlistsCount}</div>
            <div className="text-xs text-muted-foreground">Списков</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{user.friendsCount}</div>
            <div className="text-xs text-muted-foreground">Друзей</div>
          </div>
          <div>
            <div className="text-sm font-semibold">{user.followersCount}</div>
            <div className="text-xs text-muted-foreground">Подписчиков</div>
          </div>
        </div> */}
        <Flex gap={2}>
          <Button variant={isFollowed ? 'outline' : 'default'} size="sm" className="flex-1">
            <UserPlus className="mr-2 h-4 w-4" />
            {isFollowed ? 'Отписаться' : 'Подписаться'}
          </Button>
          <Button variant="outline" size="sm">
            <Gift className="h-4 w-4" />
          </Button>
        </Flex>
      </CardContent>
    </Card>
  );
}
