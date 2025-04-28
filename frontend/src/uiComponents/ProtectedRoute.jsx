// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
