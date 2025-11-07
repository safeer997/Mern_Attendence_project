import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 flex items-center justify-center p-4'>
        <Card className='shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl max-w-md w-full'>
          <CardContent className='p-8'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-center space-y-4'
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className='flex justify-center'
              >
                <div className='w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full' />
              </motion.div>

              <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-white'>Loading</h3>
                <p className='text-sm text-gray-400'>
                  Please wait while we verify your access...
                </p>
                <p className='text-xs text-gray-500 pt-2'>
                  This may take up to 50 seconds
                </p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to='/login' />;
  }

  return children;
}

export default ProtectedRoute;
