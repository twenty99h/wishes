import { LogIn, LogOut } from 'lucide-react';

import { $isUserPending, $user, $userData, logout } from '@/entities/user';
import { Flex, SidebarMenuButton, Skeleton, Text } from '@/shared/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { useUnit } from 'effector-react';
import { Link } from 'react-router';

export function User() {
  const [user, userData, isUserPending, onLogout] = useUnit([$user, $userData, $isUserPending, logout]);

  if (isUserPending) {
    return (
      <Flex className="w-full px-2" gap={2}>
        <Skeleton className="min-w-8 h-8 rounded-lg" />
        <Skeleton className="w-full h-8 rounded-md" />
      </Flex>
    );
  }

  if (!user || !userData) {
    return (
      <SidebarMenuButton asChild>
        <Link to="/auth/login">
          <Flex align="center" justify="center" className="p-1 w-8 h-8">
            <LogIn size={18} />
          </Flex>
          Войти
        </Link>
      </SidebarMenuButton>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Flex align="center" gap={2} className="text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватарка" />
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-green-500 to-green-700 text-white">
                {userData.display_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Flex direction="column" className="text-left text-sm leading-tight">
              <Text size="sm" weight="semibold" className="truncate">
                {userData.display_name}
              </Text>
            </Flex>
          </Flex>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
