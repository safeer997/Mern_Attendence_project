import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchAllSessionsOfInstructer } from '@/api/instructer';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PastSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getSessions() {
      try {
        setIsLoading(true);
        const response = await fetchAllSessionsOfInstructer();
        const sortedSessions = response?.data?.data?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setSessions(sortedSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
        toast.error('Failed to load sessions');
      } finally {
        setIsLoading(false);
      }
    }
    getSessions();
  }, []);

  function handleGetDetailedReport(session) {
    localStorage.setItem('selectedSession', JSON.stringify(session));
    navigate('/report');
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <div className='w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col'>
      <div className='w-full space-y-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-2'
        >
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
            Past Sessions
          </h2>
          <p className='text-gray-400 text-sm sm:text-base'>
            View and manage your session history
          </p>
        </motion.div>

        {/* Sessions */}
        {isLoading ? (
          <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
            <CardContent className='p-6 text-center'>
              <p className='text-gray-400'>Loading sessions...</p>
            </CardContent>
          </Card>
        ) : sessions.length > 0 ? (
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {sessions.map((session, index) => (
              <motion.div
                key={session._id}
                custom={index}
                initial='hidden'
                animate='visible'
                variants={cardVariants}
              >
                <Card className='h-full shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl hover:border-indigo-500/50 transition-all duration-300'>
                  <CardHeader className='space-y-1'>
                    {/* Topic Label */}
                    <p className='text-xs uppercase text-indigo-400 font-medium tracking-wide'>
                      Topic
                    </p>
                    <CardTitle className='text-lg sm:text-xl text-white truncate'>
                      {session.topic}
                    </CardTitle>

                    {/* Date Label */}
                    <p className='text-xs uppercase text-indigo-400 font-medium tracking-wide mt-2'>
                      Date
                    </p>
                    <CardDescription className='text-gray-400 text-sm'>
                      {new Date(session.sessionDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='space-y-4'>
                    <div className='text-sm space-y-2 text-gray-300'>
                      <div className='flex justify-between'>
                        <span className='flex items-center gap-2'>
                          <span className='text-green-400'>🟢</span> Offline
                        </span>
                        <span className='font-semibold'>
                          {session.offlineStudents.length}
                        </span>
                      </div>

                      <div className='flex justify-between'>
                        <span className='flex items-center gap-2'>
                          <span className='text-blue-400'>🔵</span> Online
                        </span>
                        <span className='font-semibold'>
                          {session.onlineStudents.length}
                        </span>
                      </div>

                      <div className='flex justify-between'>
                        <span className='flex items-center gap-2'>
                          <span className='text-red-400'>🔴</span> Absent
                        </span>
                        <span className='font-semibold'>
                          {session.absentStudents.length}
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
            <CardContent className='p-6 text-center'>
              <p className='text-gray-400 text-base sm:text-lg'>
                No sessions found
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PastSessions;
