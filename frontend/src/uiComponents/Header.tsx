import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-950 border-b border-gray-800/60 backdrop-blur-md shadow-lg'
    >
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='flex items-center justify-between h-16'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className='flex items-center gap-2 group'
          >
            <div className='w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>📍</span>
            </div>
            <h1 className='text-xl font-extrabold text-white group-hover:text-indigo-400 transition-colors'>
              Attendance App
            </h1>
          </motion.button>

          <div className='hidden sm:flex items-center gap-4'>
            <span className='text-sm text-gray-400'>
              Smart Attendance System
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
