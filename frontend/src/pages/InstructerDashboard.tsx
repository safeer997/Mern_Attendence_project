import DashboardCard from '@/uiComponents/DashboardCard';
import useAuth from '@/utils/authCustomHook';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const InstructerDashboard = () => {
  useAuth();
  const navigate = useNavigate();

  function handleCreateSession() {
    navigate('/create-session');
  }

  function handleViewPastSessions() {
    navigate('/past-sessions');
  }

  function handleViewStudentRecords() {
    console.log('viewing student records');
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 p-6'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mb-8'
      >
        <h1 className='text-4xl font-extrabold text-white mb-2 tracking-tight'>
          Instructor Dashboard
        </h1>
        <p className='text-gray-400'>Manage your sessions and student records</p>
      </motion.div>

      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        <motion.div
          custom={0}
          initial='hidden'
          animate='visible'
          variants={cardVariants}
        >
          <DashboardCard
            title='Create a New Session'
            description='Easily create new sessions for your classes. Set the title, start time, and description.'
            buttonName='Create Session'
            buttonAction={handleCreateSession}
          />
        </motion.div>

        <motion.div
          custom={1}
          initial='hidden'
          animate='visible'
          variants={cardVariants}
        >
          <DashboardCard
            title='View Past Sessions'
            description='View and manage all your past sessions. See attendance and session details.'
            buttonName='View Past Sessions'
            buttonAction={handleViewPastSessions}
          />
        </motion.div>

        <motion.div
          custom={2}
          initial='hidden'
          animate='visible'
          variants={cardVariants}
        >
          <DashboardCard
            title='View Student Records'
            description='Feature coming soon ...'
            buttonName='View Students Record'
            buttonAction={handleViewStudentRecords}
          />
        </motion.div>
      </div>
    </main>
  );
};

export default InstructerDashboard;
