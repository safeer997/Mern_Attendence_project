import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className='bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800/60 backdrop-blur-md mt-auto'
    >
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='text-center sm:text-left'>
            <p className='text-sm text-gray-400'>
              © {currentYear} Attendance App. All rights reserved.
            </p>
          </div>

          <div className='flex items-center gap-6 text-sm'>
            <a
              href='#'
              className='text-gray-400 hover:text-indigo-400 transition-colors'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-indigo-400 transition-colors'
            >
              Terms of Service
            </a>
            <a
              href='#'
              className='text-gray-400 hover:text-indigo-400 transition-colors'
            >
              Contact
            </a>
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-gray-800/40 text-center'>
          <p className='text-xs text-gray-500'>
            Built with ❤️ for seamless attendance management
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
