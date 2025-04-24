import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Signup from './pages/Signup';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
