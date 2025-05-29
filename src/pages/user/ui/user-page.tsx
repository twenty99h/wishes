import { Button, Card, CardContent, CardHeader, Flex, NavButton, Text } from '@/shared/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useGate, useUnit } from 'effector-react';
import { ArrowLeft, Calendar, Link, UserMinus, UserPlus } from 'lucide-react';
import { useParams } from 'react-router';
import { DateTime } from 'luxon';
import { PageGate, userQuery } from '../model';

export function UserPage() {
  const { userId } = useParams();

  useGate(PageGate, { userId });

  const { data: user, pending, error } = useUnit(userQuery);

  if (pending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!user) return <div>User not found</div>;

  return (
    <Flex direction="column" align="center" className="px-8">
      <Flex width="max" align="center" gap={2} className="h-16">
        <NavButton to="/users" variant="link">
          <ArrowLeft className="h-5 w-5" />К списку пользователей
        </NavButton>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Link className="mr-2 h-4 w-4" />
            Копировать ссылку
          </Button>
        </div>
      </Flex>

      <div className="container py-6">
        <Card className="mb-6">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-muted">
                  <AvatarImage src={user.avatar_url || '/placeholder.svg'} alt={user.username} />
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xl">
                    {user.username
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
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
                <Button variant={user.is_current_user_followed ? 'outline' : 'default'}>
                  {user.is_current_user_followed ? (
                    <UserMinus className="mr-2 h-4 w-4" />
                  ) : (
                    <UserPlus className="mr-2 h-4 w-4" />
                  )}
                  {user.is_current_user_followed ? 'Отписаться' : 'Подписаться'}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Text>{user.bio || 'Пользователь пока ничего не рассказал о себе...'}</Text>
          </CardContent>
        </Card>
      </div>
    </Flex>
  );
}
