import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, allowedRoles }) {
  // const user = useSelector((state) => state.auth.user);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen text-xl'>
        Loading...it may take 50 seconds ...please wait !
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
