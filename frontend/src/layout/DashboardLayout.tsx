import { Outlet } from 'react-router-dom';
import AppSidebar from '../uiComponents/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

function DashboardLayout() {
  return (
    <div className='flex'>
      <AppSidebar />
      <SidebarTrigger />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
