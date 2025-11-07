import DashboardCard from '@/uiComponents/DashboardCard';
import useAuth from '@/utils/authCustomHook';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchAllSessionsOfInstructer } from '@/api/instructer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const InstructerDashboard = () => {
  useAuth();
  const navigate = useNavigate();
  const [recentSessions, setRecentSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getRecentSessions() {
      try {
        setIsLoading(true);
        const response = await fetchAllSessionsOfInstructer();
        const allSessions = response?.data?.data || [];

        // Filter sessions created within last 15 days
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 7);

        const filteredSessions = allSessions
          .filter((session) => new Date(session.createdAt) >= fifteenDaysAgo)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          // .slice(0, 3); // Show only top 3 recent sessions

        setRecentSessions(filteredSessions);
      } catch (error) {
        console.error('Error fetching recent sessions:', error);
        toast.error('Failed to load recent sessions');
      } finally {
        setIsLoading(false);
      }
    }
    getRecentSessions();
  }, []);

  function handleCreateSession() {
    navigate('/create-session');
  }

  function handleViewPastSessions() {
    navigate('/past-sessions');
  }

  function handleGetDetailedReport(session) {
    localStorage.setItem('selectedSession', JSON.stringify(session));
    navigate('/report');
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

  const sessionCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  return (
    <main className='min-h-screen w-full p-4 sm:p-6 lg:p-8 flex flex-col'>
      <div className='w-full space-y-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-2'
        >
          <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
            Instructor Dashboard
          </h1>
          <p className='text-gray-400 text-sm sm:text-base'>
            Manage your sessions and student records
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
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
              title='Manage Past Sessions'
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
              description='Track student attendance patterns and performance across sessions.'
              buttonName='View Records'
              buttonAction={() => console.log('viewing student records')}
            />
          </motion.div>
        </div>

        {/* Recent Sessions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='w-full space-y-4'
        >
          <div className='space-y-2'>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-white tracking-tight'>
              Recent Sessions
            </h2>
            <p className='text-gray-400 text-sm sm:text-base'>
              Sessions created in the last 7 days
            </p>
          </div>

          {isLoading ? (
            <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
              <CardContent className='p-6 sm:p-8 text-center'>
                <p className='text-gray-400'>Loading recent sessions...</p>
              </CardContent>
            </Card>
          ) : recentSessions.length > 0 ? (
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {recentSessions.map((session, index) => (
                <motion.div
                  key={session._id}
                  custom={index}
                  initial='hidden'
                  animate='visible'
                  variants={sessionCardVariants}
                >
                  <Card className='h-full shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl hover:border-indigo-500/50 transition-all duration-300'>
                    <CardHeader>
                      <CardTitle className='text-lg sm:text-xl text-white truncate'>
                        {session.topic}
                      </CardTitle>
                      <CardDescription className='text-gray-400 text-sm'>
                        {new Date(session.sessionDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      <div className='text-sm space-y-2 text-gray-300'>
                        <div className='flex justify-between'>
                          <span>🟢 Offline:</span>
                          <span className='font-semibold'>
                            {session.offlineStudents?.length || 0}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>🔵 Online:</span>
                          <span className='font-semibold'>
                            {session.onlineStudents?.length || 0}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>🔴 Absent:</span>
                          <span className='font-semibold'>
                            {session.absentStudents?.length || 0}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleGetDetailedReport(session)}
                        variant='outline'
                        className='w-full border-gray-700 hover:bg-indigo-600 hover:border-indigo-500 text-gray-300 hover:text-white transition-all duration-200'
                        disabled={session.status === 'draft'}
                      >
                        Get Report
                      </Button>

                      {session.status === 'draft' && (
                        <p className='text-xs text-gray-500 text-center'>
                          Report available in 1 hour
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
              <CardContent className='p-6 sm:p-8 text-center'>
                <p className='text-gray-400 text-base sm:text-lg'>
                  No sessions created in the last 15 days
                </p>
                <Button
                  onClick={handleCreateSession}
                  className='mt-4 bg-indigo-600 hover:bg-indigo-700'
                >
                  Create Your First Session
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default InstructerDashboard;
