import { Routes, Route } from 'react-router';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import InstructerDashboard from './pages/InstructerDashboard';
import CreateSession from './pages/CreateSession';
import { useEffect } from 'react';
import { verifyUser } from './api/auth';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyUser();
        // console.log(' app load response:', response);
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/student' element={<StudentDashboard />} />
      <Route path='/instructer' element={<InstructerDashboard />} />
      <Route path='/create-session' element={<CreateSession />} />
    </Routes>
  );
}

export default App;
