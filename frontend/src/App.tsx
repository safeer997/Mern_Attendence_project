import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import InstructerDashboard from './pages/InstructerDashboard';
import CreateSession from './pages/CreateSession';
import { useEffect } from 'react';
import { verifyUser } from './api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, stopLoading } from './redux/features/authSlice';
import ProtectedRoute from './uiComponents/ProtectedRoute';
import ErrorPage from './uiComponents/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth); //swiglly line due to type checking !!!

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyUser();
        console.log('data when app loads:', response);
        dispatch(setUser(response?.data?.data));
      } catch (error) {
        console.error('Error verifying user:', error);
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen text-xl'>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path='/student'
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/instructer'
        element={
          <ProtectedRoute allowedRoles={['instructer']}>
            <InstructerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/create-session'
        element={
          <ProtectedRoute allowedRoles={['instructer']}>
            <CreateSession />
          </ProtectedRoute>
        }
      />

      {/* error route  */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
