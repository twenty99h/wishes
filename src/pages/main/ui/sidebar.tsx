import { ThemeSwitcher } from '@/app/theme-switcher';
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
import { Gift } from 'lucide-react';

const SIDEBAR_ITEMS = [
  {
    text: 'Желания',
    url: '/wishes',
    icon: Gift,
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
            <SidebarMenu>
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
      </SidebarFooter>
    </Sidebar>
  );
}
