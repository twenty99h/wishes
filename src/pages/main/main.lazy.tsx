import { ThemeSwitcher } from '@/app/theme-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/ui/sidebar';
import { createLazyRoute, Outlet } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createLazyRoute('/')({
  component: MainPage,
});

function MainPage() {
  return <Layout />;
}

function Layout() {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Wishbekes</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
