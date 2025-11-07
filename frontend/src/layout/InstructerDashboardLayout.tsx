import { Outlet } from 'react-router-dom';
import InstructorSidebar from '../uiComponents/InstructerSidebar.tsx';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

function InstructerDashboardLayout() {
  return (
    <div className='flex h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30'>
      {/* Sidebar */}
      <InstructorSidebar />

      {/* Main Content Wrapper */}
      <main className='flex-1 flex flex-col w-full overflow-hidden'>
        {/* Mobile Header with Trigger */}
        <div className='md:hidden flex items-center gap-4 px-4 py-3 border-b border-gray-800/60 bg-gray-900/50 backdrop-blur-md'>
          <SidebarTrigger className='text-white hover:text-indigo-400' />
          <h1 className='text-lg font-semibold text-white'>Attendance App</h1>
        </div>

        {/* Desktop trigger - always visible top-left */}
        <div className='hidden md:flex items-center px-4 py-3 border-b border-gray-800/60 bg-gray-900/30 backdrop-blur-md'>
          <SidebarTrigger className='text-white hover:text-indigo-400' />
        </div>

        {/* Content Area - Takes remaining space */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='flex-1 w-full overflow-y-auto'
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

export default InstructerDashboardLayout;
