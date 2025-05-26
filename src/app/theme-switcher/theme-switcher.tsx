import { Moon, Sun } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  SidebarMenuButton,
  Text,
} from '@/shared/ui';
import { useTheme } from './theme-provider';

const THEME_LABEL = {
  light: 'Светлая',
  dark: 'Темная',
};

const THEME_ICON = {
  light: <Sun size={18} />,
  dark: <Moon size={18} />,
};

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Flex align="center" justify="center" className="p-1 w-8 h-8">
            {THEME_ICON[theme]}
          </Flex>
          <Text size="sm">{THEME_LABEL[theme]}</Text>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun /> Светлая
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon />
          Темная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
