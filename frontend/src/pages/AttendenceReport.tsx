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
import { motion } from 'framer-motion';

const AttendanceReport = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('selectedSession');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
      localStorage.removeItem('selectedSession');
    }
  }, []);

  if (!session) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 p-6 flex flex-col items-center justify-center'>
        <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl p-8'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            No session data available
          </h2>
          <Button
            variant='outline'
            onClick={() => navigate('/past-sessions')}
            className='border-gray-700 hover:bg-gray-800 text-gray-300'
          >
            ← Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 p-6'>
      <div className='max-w-5xl mx-auto space-y-6'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant='outline'
            onClick={() => navigate('/past-sessions')}
            className='mb-4 border-gray-700 hover:bg-gray-800 text-gray-300'
          >
            ← Back to Sessions
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
            <CardHeader>
              <CardTitle className='text-3xl font-bold text-white'>
                {session.topic}
              </CardTitle>
              <p className='text-sm text-gray-400'>
                Session Date: {new Date(session.sessionDate).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent className='space-y-6'>
              <Section
                title='🟢 Offline Students'
                students={session.offlineStudents}
              />
              <Separator className='bg-gray-800' />
              <Section
                title='🔵 Online Students'
                students={session.onlineStudents}
              />
              <Separator className='bg-gray-800' />
              <Section
                title='🔴 Absent Students'
                students={session.absentStudents}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, students }) => (
  <div className='space-y-4'>
    <h3 className='text-lg font-semibold text-white'>{title}</h3>
    {students.length > 0 ? (
      <div className='rounded-lg border border-gray-800 bg-gray-800/30'>
        <Table>
          <TableHeader>
            <TableRow className='border-gray-700 hover:bg-gray-800/50'>
              <TableHead className='text-gray-300'>Name</TableHead>
              <TableHead className='text-gray-300'>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student._id}
                className='border-gray-700 hover:bg-gray-800/30'
              >
                <TableCell className='font-medium text-white'>
                  {student.name}
                </TableCell>
                <TableCell className='text-gray-400'>
                  {student.phoneNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <p className='text-sm text-gray-500 italic'>None</p>
    )}
  </div>
);

export default AttendanceReport;
