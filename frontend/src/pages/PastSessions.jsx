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

const PastSessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const [sessionStatusDraft, setSessionStatusDraft] = useState(false);

  useEffect(() => {
    async function getSessions() {
      const response = await fetchAllSessionsOfInstructer();
      const sortedSessions = response?.data?.data?.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setSessions(sortedSessions);
      console.log('sessions set use state hook !!', sortedSessions);
    }
    getSessions();
  }, []);

  function handleGetDetailedReport(session) {
    localStorage.setItem('selectedSession', JSON.stringify(session));
    navigate('/report');
  }

  return (
    <div className='w-full max-w-6xl mx-auto p-4 md:p-8 space-y-6'>
      <h2 className='text-2xl md:text-3xl font-bold'>Past Sessions</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 '>
        {sessions.map((session) => (
          <Card key={session._id} className='rounded-2xl shadow-md'>
            <CardHeader>
              <CardTitle className='text-lg'>{session.topic}</CardTitle>
              <CardDescription>
                {new Date(session.sessionDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='text-sm space-y-1'>
                <div>🟢 Offline: {session.offlineStudents.length}</div>
                <div>🔵 Online: {session.onlineStudents.length}</div>
                <div>🔴 Absent: {session.absentStudents.length}</div>
              </div>
              <Button
                onClick={() => handleGetDetailedReport(session)}
                variant='outline'
                className='w-full'
                disabled={session.status === 'draft'}
              >
                Get Detailed Report
              </Button>
              {session.status === 'draft' && (
                <p className='text-sm text-muted-foreground'>
                  Report will be available in 1 hour after session creation.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastSessions;
