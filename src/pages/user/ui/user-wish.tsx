import { Wish } from '@/shared/types/wish';
import { Button, Card, CardContent, CardFooter, CardHeader, Flex, NavButton, Skeleton, Text } from '@/shared/ui';
import { useGate, useUnit } from 'effector-react';
import { ArrowLeft, CalendarClock, Check, ExternalLink } from 'lucide-react';
import { DateTime } from 'luxon';
import { useParams } from 'react-router';
import { UserWishPageGate, userWishQuery } from '../model';
import { UserWishReservationActions } from './user-wish-reservation-actions';

export function UserWish() {
  const { userId, userWishlistId, userWishId } = useParams();

  useGate(UserWishPageGate, { id: userWishId });

  const { data: wish, pending: wishPending, error: wishError } = useUnit(userWishQuery);

  if (wishPending) return <UserWishSkeleton />;

  if (wishError) {
    const errorMessage = wishError instanceof Error ? wishError.message : 'Unknown error occurred';
    return <div>Error: {errorMessage}</div>;
  }

  if (!wish) return <div>Wish not found</div>;

  return (
    <Flex align="center" justify="center" width="max" className="px-8 pb-6">
      <Flex direction="column" align="center" justify="center" width="max" className="max-w-4xl" gap={4}>
        <Flex width="max" align="center" className="h-16">
          <NavButton variant="link" to={`/users/${userId}/${userWishlistId}`}>
            <ArrowLeft className="h-5 w-5" />
            Назад к вишлисту
          </NavButton>
        </Flex>

        <Card className="w-full">
          <CardHeader>
            <Flex justify="between" align="center">
              <Text size="3xl" weight="bold">
                {wish.title}
              </Text>
              <WishStatusBadge status={wish.status} />
            </Flex>
          </CardHeader>

          <CardContent>
            <Flex direction="column" gap={6}>
              {wish.image_url && (
                <div className="w-full overflow-hidden rounded-lg">
                  <img src={wish.image_url} alt={wish.title} className="w-full h-auto max-h-[500px] object-cover" />
                </div>
              )}

              <Flex direction="column" gap={4}>
                {wish.description && (
                  <div>
                    <Text size="lg" weight="semibold" className="mb-2">
                      Описание
                    </Text>
                    <Text>{wish.description}</Text>
                  </div>
                )}

                {wish.price && (
                  <div>
                    <Text size="lg" weight="semibold" className="mb-2">
                      Цена
                    </Text>
                    <Text size="xl">{wish.price.toLocaleString('ru-RU')} ₽</Text>
                  </div>
                )}

                {wish.product_url && (
                  <div>
                    <Text size="lg" weight="semibold" className="mb-2">
                      Ссылка на товар
                    </Text>
                    <a
                      href={wish.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Перейти к товару
                    </a>
                  </div>
                )}

                <div>
                  <Text size="lg" weight="semibold" className="mb-2">
                    Информация
                  </Text>
                  <Flex direction="column" gap={2}>
                    <Flex align="center" gap={2} className="text-muted-foreground">
                      <CalendarClock className="h-4 w-4" />
                      <Text>
                        Добавлено{' '}
                        {DateTime.fromISO(wish.created_at.toString()).toFormat('dd MMMM yyyy', { locale: 'ru' })}
                      </Text>
                    </Flex>

                    {wish.purchased_at && (
                      <Flex align="center" gap={2} className="text-muted-foreground">
                        <Check className="h-4 w-4" />
                        <Text>
                          Куплено{' '}
                          {DateTime.fromISO(wish.purchased_at.toString()).toFormat('dd MMMM yyyy', { locale: 'ru' })}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </CardContent>

          <CardFooter>
            <Flex gap={2}>
              <UserWishReservationActions wish={wish} />
              {wish.product_url && (
                <Button variant="outline" asChild>
                  <a href={wish.product_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Перейти к товару
                  </a>
                </Button>
              )}
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
}

function WishStatusBadge({ status }: { status: Wish['status'] }) {
  switch (status) {
    case 'available':
      return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Доступно</span>;
    case 'reserved':
      return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Зарезервировано</span>;
    case 'purchased':
      return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Куплено</span>;
    default:
      return null;
  }
}

function UserWishSkeleton() {
  return (
    <Flex align="center" justify="center" width="max" className="px-8 pb-6">
      <Flex direction="column" align="center" justify="center" width="max" className="max-w-4xl" gap={4}>
        <Flex width="max" align="center" gap={2} className="h-16">
          <Skeleton className="w-42 h-8" />
        </Flex>

        <Card className="w-full max-w-4xl">
          <CardHeader>
            <Skeleton className="h-10 w-3/4" />
          </CardHeader>

          <CardContent>
            <Flex direction="column" gap={6}>
              <Skeleton className="h-[300px] w-full rounded-lg" />

              <Flex direction="column" gap={4}>
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-20 w-full" />
                </div>

                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </div>

                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </Flex>
            </Flex>
          </CardContent>

          <CardFooter>
            <Flex gap={2}>
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </Flex>
  );
}
