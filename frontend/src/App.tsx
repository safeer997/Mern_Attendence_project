import { Routes, Route } from 'react-router';
import Dashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import InstructerDashboard from './pages/InstructerDashboard';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/student' element={<StudentDashboard />} />
      <Route path='/instructer' element={<InstructerDashboard />} />
    </Routes>
  );
}

export default App;
