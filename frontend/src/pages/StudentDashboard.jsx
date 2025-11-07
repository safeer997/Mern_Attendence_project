import { useEffect, useState } from 'react';
import { getTodaySessions, markAttendance } from '@/api/student';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import useAuth from '@/utils/authCustomHook';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useAuth();

  useEffect(() => {
    async function fetchSessions() {
      try {
        setIsLoading(true);
        const response = await getTodaySessions();
        const sortedSessions = response?.data?.data?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setSessions(sortedSessions);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load sessions');
      } finally {
        setIsLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const handleMarkAttendance = async (sessionId) => {
    try {
      const response = await markAttendance(sessionId);
      toast.success(response?.data?.message || 'Attendance marked!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark attendance');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className='w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col'>
      <div className='w-full space-y-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-2'
        >
          <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight'>
            Recent Sessions
          </h1>
          <p className='text-gray-400 text-sm sm:text-base'>
            Mark your attendance for today's classes
          </p>
        </motion.div>

        {/* Sessions List */}
        <div className='w-full space-y-4'>
          {isLoading ? (
            <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
              <CardContent className='p-6 sm:p-8 text-center'>
                <p className='text-gray-400'>Loading sessions...</p>
              </CardContent>
            </Card>
          ) : sessions.length > 0 ? (
            sessions.map((session, index) => (
              <motion.div
                key={session._id}
                custom={index}
                initial='hidden'
                animate='visible'
                variants={cardVariants}
              >
                <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl hover:border-indigo-500/50 transition-all duration-300'>
                  <CardContent className='p-4 sm:p-6'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                      {/* Left Side - Session Info */}
                      <div className='flex flex-col gap-3 flex-1'>
                        {/* Topic */}
                        <div>
                          <h3 className='text-gray-400 text-xs font-medium uppercase tracking-wide'>Topic</h3>
                          <CardTitle className='text-xl font-bold text-white mt-1'>
                            {session.topic}
                          </CardTitle>
                        </div>

                        {/* Date and Instructor in a row */}
                        <div className='flex flex-col sm:flex-row sm:gap-8 gap-3'>
                          {/* Date */}
                          <div>
                            <h3 className='text-gray-400 text-xs font-medium uppercase tracking-wide'>Date</h3>
                            <p className='text-white text-base mt-1'>
                              {new Date(session.sessionDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>

                          {/* Instructor */}
                          <div>
                            <h3 className='text-gray-400 text-xs font-medium uppercase tracking-wide'>Instructor</h3>
                            <p className='text-white text-base font-semibold mt-1'>
                              {session.instructor?.name || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Button */}
                      <div className='flex items-center sm:self-center'>
                        <Button
                          onClick={() => handleMarkAttendance(session._id)}
                          className='w-full sm:w-auto px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-indigo-500/50'
                        >
                          Mark Attendance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
              <CardContent className='p-6 sm:p-8 text-center'>
                <p className='text-gray-400 text-base sm:text-lg'>
                  No sessions available for today
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
