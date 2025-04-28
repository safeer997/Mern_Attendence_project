import { Outlet } from 'react-router-dom';
import AppSidebar from '../uiComponents/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

function StudentDashboardLayout() {
  return (
    <div className="w-full flex justify-center  min-h-screen">
      <AppSidebar />
      <SidebarTrigger />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
}

export default StudentDashboardLayout;
