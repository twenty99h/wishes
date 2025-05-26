import { Moon, Sun } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui';
import { useTheme } from './theme-provider';

const THEME_ICON = {
  light: <Sun size={18} />,
  dark: <Moon size={18} />,
};

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          {THEME_ICON[theme]}
        </Button>
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
