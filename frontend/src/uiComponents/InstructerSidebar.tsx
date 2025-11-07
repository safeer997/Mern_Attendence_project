import { LogOut, Home, Users, BarChart3, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/api/auth';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function InstructorSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await logoutUser();
      console.log('Logout API response:', response.data);
      dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    {
      icon: <Home className='w-4 h-4' />,
      label: 'Dashboard',
      action: () => navigate('/instructer'),
    },
    {
      icon: <FileText className='w-4 h-4' />,
      label: 'Create Session',
      action: () => navigate('/create-session'),
    },
    {
      icon: <BarChart3 className='w-4 h-4' />,
      label: 'Past Sessions',
      action: () => navigate('/past-sessions'),
    },
    {
      icon: <Users className='w-4 h-4' />,
      label: 'Students',
      action: () => navigate('/students'),
    },
    {
      icon: <Home className='w-4 h-4' />,
      label: 'Profile',
      action: () => navigate('/profile'),
    },
    {
      icon: <LogOut className='w-4 h-4' />,
      label: 'Logout',
      action: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <Sidebar className='h-screen bg-gray-900/40 backdrop-blur-md border-r border-gray-800/50 shadow-[0_0_25px_rgba(0,0,0,0.4)]'>
      <SidebarContent className='flex flex-col h-full space-y-0'>
        {/* Header */}

        {/* Menu Items */}
        <SidebarGroup className='flex-1 px-0'>
          <SidebarGroupContent>
            <SidebarMenu className='space-y-2 px-2'>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={item.action}
                      disabled={isLoggingOut && item.isLogout}
                      className={`
                        h-10 px-3 rounded-lg
                        text-gray-400 hover:text-white
                        transition-all duration-200
                        ${
                          item.isLogout
                            ? 'hover:bg-red-600/20 hover:text-red-400'
                            : 'hover:bg-indigo-600/20 hover:text-indigo-400'
                        }
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:scale-95
                      `}
                    >
                      <span className='flex-shrink-0 w-4 h-4'>{item.icon}</span>
                      <span className='font-medium text-sm ml-2'>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='mt-auto pt-4 border-t border-indigo-500/20 px-4 py-4'
        >
          <p className='text-xs text-gray-500 text-center'>
            © 2025 Attendance App
          </p>
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}

export default InstructorSidebar;
