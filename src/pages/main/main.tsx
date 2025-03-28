import { ThemeSwitcher } from '@/app/theme-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar';
import { createLazyRoute, Link, Outlet } from '@tanstack/react-router';
import { Gift } from 'lucide-react';

export const Route = createLazyRoute('/')({
  component: MainPage,
});

export function MainPage() {
  return <Layout />;
}

function Layout() {
  return (
    <SidebarProvider>
      <div className="w-full flex">
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

// const SIDEBAR_ITEMS = [
//   {
//     text: 'Home',
//     url: '#',
//     icon: Gift,
//   },
// ];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Wishbekes</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {SIDEBAR_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/wishes">
                    <Gift />
                    <span>Желания</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
