import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Flex, Skeleton, Text } from '@/shared/ui';
import { useGate, useUnit } from 'effector-react';
import { ArrowLeft, Link } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { $isWishPending, $wish, $wishError, PageGate } from '../model';
import { WishPageMode } from '../types';
import { WishForm } from './wish-form';
import { WishParsing } from './wish-parsing';

const TEXT_VARIANTS: Record<
  WishPageMode,
  {
    title: string;
    description: string;
  }
> = {
  create: {
    title: 'Новое желание',
    description: 'Добавьте новое желание в ваш список!',
  },
  edit: {
    title: 'Ваше желание',
    description: 'Отредактируйте ваше желание!',
  },
};

export function WishPage() {
  const { wishId } = useParams();
  const navigate = useNavigate();

  useGate(PageGate, { wishId });

  const [wish, pending, error] = useUnit([$wish, $isWishPending, $wishError]);

  if (pending) {
    return <WishPageSkeleton />;
  }

  if (error) return <Text>Error: {error.message}</Text>;

  const currentMode: WishPageMode = wishId ? 'edit' : 'create';

  function goBack() {
    navigate(-1);
  }

  return (
    <Flex width="max" justify="center" align="center" className="p-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <Button className="justify-start max-w-24 mb-6" variant="outline" type="button" onClick={goBack}>
            <ArrowLeft />
            Назад
          </Button>
          <CardTitle>
            {TEXT_VARIANTS[currentMode].title} {currentMode === 'edit' && wish && `- ${wish.title}`}
          </CardTitle>
          <CardDescription>{TEXT_VARIANTS[currentMode].description}</CardDescription>
        </CardHeader>
        {currentMode === 'create' && (
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Добавить товар по ссылке
            </CardTitle>
            <CardDescription>
              Вставьте ссылку на товар с маркетплейса <strong className="text-primary">Wildberries</strong> для
              автоматического парсинга
            </CardDescription>
            <WishParsing />
          </CardHeader>
        )}
        <CardContent>
          <WishForm mode={currentMode} initialValues={wish} />
        </CardContent>
      </Card>
    </Flex>
  );
}

function WishPageSkeleton() {
  return (
    <Flex width="max" justify="center" align="center" className="p-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <Skeleton className="h-10 w-24 mb-6" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </CardHeader>
        <CardHeader>
          <Skeleton className="h-6 w-64 mb-2" />
          <Skeleton className="h-5 w-full mb-4" />
          <Flex direction="column" gap={2} className="w-full">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-32 self-end" />
          </Flex>
        </CardHeader>
        <CardContent>
          <Flex direction="column" gap={4} className="mb-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Flex width="max" gap={4} className="flex-col md:flex-row">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </Flex>
            <Skeleton className="h-10 w-full" />
          </Flex>
          <Flex justify="between">
            <Skeleton className="h-10 w-24" />
            <Flex gap={8}>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </Flex>
          </Flex>
        </CardContent>
      </Card>
    </Flex>
  );
}
