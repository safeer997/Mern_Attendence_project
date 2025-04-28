import { useEffect, useState } from 'react';
import { getTodaySessions, markAttendance } from '@/api/student';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await getTodaySessions();
        console.log('api res:', response);
        setSessions(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSessions();
  }, []);

  const handleMarkAttendance = async (sessionId) => {
    try {
      const response = await markAttendance(sessionId);
      console.log('mark attendence :', response);
      toast.success(response?.data?.message || 'Attendance marked!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark attendance');
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Today's Sessions</h1>
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
