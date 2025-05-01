import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import InstructerDashboard from './pages/InstructerDashboard';
import CreateSession from './pages/CreateSession';
import ProtectedRoute from './uiComponents/ProtectedRoute';
import ErrorPage from './uiComponents/ErrorPage';
import AuthLayout from './layout/AuthLayout';
import InstructerDashboardLayout from './layout/InstructerDashboardLayout';
import StudentDashboardLayout from './layout/StudentDashboardLayout';
import PastSessions from './pages/PastSessions';
import AttendenceReport from './pages/AttendenceReport';
import useAuth from './utils/authCustomHook';

function App() {
  useAuth();

  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>

      {/* Protected student dashboard routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/student' element={<StudentDashboard />} />
      </Route>

      {/* Protected instructer dashboard routes */}

      <Route
        element={
          <ProtectedRoute allowedRoles={['instructer']}>
            <InstructerDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/instructer' element={<InstructerDashboard />} />
        <Route path='/create-session' element={<CreateSession />} />
        <Route path='/past-sessions' element={<PastSessions />} />
        <Route path='report' element={<AttendenceReport />} />
      </Route>

      {/* Error route */}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
