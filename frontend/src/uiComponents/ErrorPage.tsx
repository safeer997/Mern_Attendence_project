import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-4xl font-bold text-red-500 mb-4'>
        Oops! Something went wrong.
      </h2>
      <p className='text-lg  mb-6'>
        We couldn't find the page you were looking for.
      </p>
      <Link to='/signup'>
       <Button>Sign Up</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
