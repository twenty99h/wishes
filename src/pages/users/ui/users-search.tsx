import { Input } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { Search } from 'lucide-react';
import { $search, searchChanged } from '../model';

export function UsersSearch() {
  const [search, onSearch] = useUnit([$search, searchChanged]);

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Введите ник или email"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex gap-2">
        {/* <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Популярные</SelectItem>
                <SelectItem value="recent">Недавние</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="friends">Друзья</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[120px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Фильтр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="online">Онлайн</SelectItem>
                <SelectItem value="friends">Друзья</SelectItem>
                <SelectItem value="following">Подписки</SelectItem>
              </SelectContent>
            </Select> */}
      </div>
    </div>
  );
}
