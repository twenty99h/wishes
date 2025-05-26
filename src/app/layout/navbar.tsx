import { cn } from '@/shared/lib/utils';
import { Flex, Text } from '@/shared/ui';
import { Gift, Users } from 'lucide-react';
import { NavLink } from 'react-router';
import { ThemeSwitcher } from '../theme-switcher';
import { User } from './user';

const NAVBAR_ITEMS = [
  {
    text: 'Желания',
    url: '/wishes',
    icon: Gift,
  },
  {
    text: 'Пользователи',
    url: '/users',
    icon: Users,
  },
];

export function Navbar() {
  return (
    <Flex align="center" justify="between" className="w-full px-10 py-4">
      <Text size="xl" weight="medium">
        Вишбекс
      </Text>
      <Flex align="center" gap={4}>
        {NAVBAR_ITEMS.map((item) => {
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={({ isActive }) =>
                cn(
                  'flex gap-2 items-center  py-2 px-4 rounded-full text-primary bg-transparent border border-primary',
                  isActive && 'text-primary-foreground bg-primary'
                )
              }
            >
              <item.icon />
              <Text size="sm" className="text-currentColor">
                {item.text}
              </Text>
            </NavLink>
          );
        })}
      </Flex>
      <Flex className="w-64" align="center" justify="end" gap={4}>
        <ThemeSwitcher />
        <User />
      </Flex>
    </Flex>
  );
}
