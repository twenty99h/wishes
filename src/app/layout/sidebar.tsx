import { ThemeSwitcher } from '@/app/theme-switcher';
import { User } from '@/app/layout/user';
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  Sidebar,
  Text,
  NavButton,
} from '@/shared/ui';
import { Gift, Users } from 'lucide-react';

const SIDEBAR_ITEMS = [
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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Text size="lg" weight="bold">
          Вишбекс
        </Text>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {SIDEBAR_ITEMS.map((item) => {
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <NavButton to={item.url} className="rounded-full p-5 justify-start">
                        <item.icon />
                        {item.text}
                      </NavButton>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
        <User />
      </SidebarFooter>
    </Sidebar>
  );
}
