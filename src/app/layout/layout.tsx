import { SidebarProvider, SidebarTrigger } from '@/shared/ui';
import { Outlet } from 'react-router';
import { AppSidebar } from './sidebar';

export function AppLayout() {
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
