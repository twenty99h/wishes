import { Button, Flex, Input } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { Heart, Search } from 'lucide-react';
import { $followingFilter, $search, searchChanged } from '../model';
import { followingFilterToggled } from '../model/search';

export function UsersSearch() {
  const [search, onSearch, followingFilter, onFollowingFilterToggle] = useUnit([
    $search,
    searchChanged,
    $followingFilter,
    followingFilterToggled,
  ]);

  return (
    <Flex width="max" direction="column" gap={4}>
      <div className="w-full relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Введите ник или email"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>
      <Flex gap={2}>
        <Button
          className="rounded-full border border-transparent"
          variant={followingFilter === 'all' ? 'outline' : 'default'}
          onClick={onFollowingFilterToggle}
        >
          <Heart className="h-3 w-3 fill-current" />
          Мои подписки
        </Button>
      </Flex>
    </Flex>
  );
}
