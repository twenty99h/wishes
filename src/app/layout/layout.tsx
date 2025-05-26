import { Outlet } from 'react-router';
import { Navbar } from './navbar';

export function AppLayout() {
  // return (
  //   <SidebarProvider>
  //     <div className="w-full flex">
  //       <AppSidebar />
  //       <main className="w-full">
  //         <SidebarTrigger />
  //         <Outlet />
  //       </main>
  //     </div>
  //   </SidebarProvider>
  // );
  return (
    <div className="w-full ">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
