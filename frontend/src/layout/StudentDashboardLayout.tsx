import { Outlet } from 'react-router-dom';
import StudentSidebar from '../uiComponents/StudentSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

function StudentDashboardLayout() {
  return (
    <div className='flex h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30'>
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content Wrapper */}
      <main className='flex-1 flex flex-col w-full overflow-hidden'>
        {/* Mobile Header with Trigger */}
        <div className='md:hidden flex items-center gap-4 px-4 py-3 border-b border-gray-800/60 bg-gray-900/50 backdrop-blur-md'>
          <SidebarTrigger className='text-white hover:text-cyan-400' />
          <h1 className='text-lg font-semibold text-white'>
            Mark My Attendance
          </h1>
        </div>

        {/* Desktop trigger - always visible top-left */}
        {/* Desktop trigger - always visible top-left */}
        <div className='hidden md:flex items-center justify-between px-6 py-3 border-b border-gray-800/60 bg-gray-900/50 backdrop-blur-md'>
          <div className='flex items-center gap-3'>
            <SidebarTrigger className='text-white hover:text-cyan-400 transition-colors' />
          </div>

          <h1 className='absolute left-1/2 transform -translate-x-1/2 text-2xl font-semibold text-white'>
            Mark My Attendance
          </h1>

          {/* spacer div to balance flex alignment */}
          <div className='w-8'></div>
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

export default StudentDashboardLayout;
