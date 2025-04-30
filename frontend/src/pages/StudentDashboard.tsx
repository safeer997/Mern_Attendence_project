import { useEffect, useState } from 'react';
import { getTodaySessions, markAttendance } from '@/api/student';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useAuth from '@/utils/authCustomHook';

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);

  useAuth(); //check whetr user is logged in !!!

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await getTodaySessions();
        const sortedSessions = response?.data?.data?.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setSessions(sortedSessions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, []);

  const handleMarkAttendance = async (sessionId) => {
    try {
      const response = await markAttendance(sessionId);
      // console.log('mark attendence :', response);
      toast.success(response?.data?.message || 'Attendance marked!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark attendance');
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Recent Sessions</h1>
      <div className='space-y-4'>
        {sessions.map((session) => (
          <div
            key={session._id}
            className='border p-4 rounded-md flex justify-between items-center'
          >
            <div>
              <p className='font-semibold'>{session.topic}</p>
              <p className='text-gray-500'>
                {new Date(session.sessionDate).toLocaleDateString()}
              </p>
            </div>
            <Button onClick={() => handleMarkAttendance(session._id)}>
              Mark Attendance
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
