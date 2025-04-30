import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AttendanceReport = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('selectedSession');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
      localStorage.removeItem('selectedSession'); //clean up study about this later
    }
  }, []);

  if (!session) {
    return (
      <div className='p-6 flex flex-col items-start space-y-4'>
        <h2 className='text-xl md:text-3xl font-bold'>No session data available</h2>
        <Button variant='outline' onClick={() => navigate('/past-sessions')}>
          ← Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{session.topic}</CardTitle>
          <p className='text-sm text-muted-foreground'>
            Session Date: {new Date(session.sessionDate).toLocaleDateString()}
          </p>
        </CardHeader>
        <CardContent className='space-y-6'>
          <Section
            title='🟢 Offline Students'
            students={session.offlineStudents}
          />
          <Separator />
          <Section
            title='🔵 Online Students'
            students={session.onlineStudents}
          />
          <Separator />
          <Section
            title='🔴 Absent Students'
            students={session.absentStudents}
          />
        </CardContent>
      </Card>

      <Button variant='secondary' onClick={() => navigate('/past-sessions')}>
        ← Back to Sessions
      </Button>
    </div>
  );
};

const Section = ({ title, students }) => (
  <Card className='shadow-sm'>
    <CardHeader>
      <CardTitle className='text-base font-semibold'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {students.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell className='font-medium'>{student.name}</TableCell>
                <TableCell>{student.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className='text-sm text-muted-foreground'>None</p>
      )}
    </CardContent>
  </Card>
);

export default AttendanceReport;
