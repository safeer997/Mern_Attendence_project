import DashboardCard from '@/uiComponents/DashboardCard';
import { useNavigate } from 'react-router-dom';

const InstructerDashboard = () => {
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

  return (
    <main className='p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      <DashboardCard
        title='Create a New Session'
        description='Easily create new sessions for your classes. Set the title, start time, and description.'
        buttonName='Create Session'
        buttonAction={handleCreateSession}
      />
      <DashboardCard
        title='View Past Sessions'
        description='View and manage all your past sessions. See attendance and session details.'
        buttonName='View Past Sessions'
        buttonAction={handleViewPastSessions}
      />
      <DashboardCard
        title='View Student Records'
        description='Access student attendance and performance data for each session.'
        buttonName='View Students Record'
        buttonAction={handleViewStudentRecords}
      />
    </main>
  );
};

export default InstructerDashboard;
