import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Auth from './pages/Auth';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
}

export default App;
