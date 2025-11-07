import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, description, buttonName, buttonAction }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className='flex flex-col h-full shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl hover:border-indigo-500/50 transition-all duration-300'>
        <CardContent className='flex flex-col flex-1 gap-4 p-6'>
          <CardTitle className='text-xl font-semibold text-white'>
            {title}
          </CardTitle>
          <CardDescription className='flex-1 text-gray-400 leading-relaxed'>
            {description}
          </CardDescription>

          <div className='flex justify-end pt-2'>
            <Button
              onClick={buttonAction}
              className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'
            >
              {buttonName}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard;
