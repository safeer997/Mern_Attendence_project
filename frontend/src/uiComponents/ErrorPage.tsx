import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 flex flex-col items-center justify-center p-6'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className='text-center max-w-md space-y-6'
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          className='flex justify-center'
        >
          <AlertCircle className='w-16 h-16 text-red-500' />
        </motion.div>

        <div className='space-y-2'>
          <h2 className='text-4xl font-extrabold text-white tracking-tight'>
            Oops!
          </h2>
          <p className='text-lg text-gray-400'>
            Something went wrong. We couldn't find the page you were looking for.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className='flex flex-col sm:flex-row gap-3 justify-center pt-4'
        >
          <Link to='/login'>
            <Button className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'>
              Go to Login
            </Button>
          </Link>
          <Link to='/signup'>
            <Button
              variant='outline'
              className='w-full sm:w-auto border-gray-700 hover:bg-gray-800 text-gray-300 transition-all duration-200'
            >
              Sign Up
            </Button>
          </Link>
        </motion.div>

        <p className='text-sm text-gray-500 pt-4'>
          Error Code: 404 - Page Not Found
        </p>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
