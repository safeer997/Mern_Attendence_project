import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/30 px-6 py-10 text-center'>
      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className='mb-6'
      >
        <AlertCircle className='w-28 h-28 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' />
      </motion.div>

      {/* Text Content */}
      <div className='max-w-2xl space-y-4'>
        <h2 className='text-4xl sm:text-5xl font-extrabold text-white tracking-tight'>
          Oops!
        </h2>
        <p className='text-base sm:text-lg text-gray-400 leading-relaxed'>
          Something went wrong. The page you were looking for might have been
          moved, renamed, or deleted.
        </p>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className='flex flex-col sm:flex-row gap-4 justify-center pt-6'
      >
        <Link to='/login'>
          <Button className='w-full sm:w-auto min-w-[140px] bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'>
            Go to Login
          </Button>
        </Link>
        <Link to='/signup'>
          <Button
            variant='outline'
            className='w-full sm:w-auto min-w-[140px] border-gray-700 hover:bg-gray-800 text-gray-300 transition-all duration-200'
          >
            Sign Up
          </Button>
        </Link>
      </motion.div>

      {/* Footer */}
      <p className='text-xs sm:text-sm text-gray-500 pt-6'>
        Error Code: <span className='text-gray-400'>404 - Page Not Found</span>
      </p>
    </div>
  );
};

export default ErrorPage;
