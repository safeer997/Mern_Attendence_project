import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/zodSchema/loginSchema';
import { loginUser } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';
import { useState } from 'react';
import '../styles/auth.styles.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggingIn, setLoggingIn] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoggingIn(true);
      const response = await loginUser(data.phoneNumber, data.password);

      if (response?.data?.success && response?.data?.role === 'student') {
        dispatch(setUser(response?.data?.user));
        navigate('/student');
      } else if (
        response?.data?.success &&
        response?.data?.role === 'instructer'
      ) {
        dispatch(setUser(response?.data?.user));
        navigate('/instructer');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-[85vh] rounded-2xl overflow-hidden text-white gap-y-6 p-4 md:p-0'>
      {/* Left Section */}
      <motion.div
        className='flex w-full md:w-1/2 flex-col justify-center items-center text-center px-4 md:px-12 py-6 md:py-0 bg-gradient-to-br from-gray-900 to-indigo-950'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <img
          src='https://undraw.co/api/illustrations/classroom?color=ffffff'
          alt='Attendance Illustration'
          className='w-48 sm:w-56 md:w-72 h-auto mb-4 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]'
          onError={(e) => {
            const target = e.target as HTMLImageElement | null;
            if (target)
              target.src =
                'https://undraw.co/api/illustrations/team_spirit?color=ffffff';
          }}
        />
        <h1 className='text-5xl font-extrabold mb-4 text-indigo-400 tracking-tight'>
          Mark My Attendance
        </h1>
        <p className='text-lg opacity-90 mb-3 max-w-md leading-relaxed'>
          Seamless attendance tracking for students and instructors.
        </p>
        <p className='text-sm opacity-70 max-w-md'>
          Digital attendance made easy, efficient, and accessible for all.
        </p>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className='flex w-full md:w-1/2 justify-center items-center bg-gray-950/60 backdrop-blur-md px-4 md:px-0 py-6 md:py-0'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Card className='w-full max-w-md md:w-96 shadow-2xl border border-gray-800/60 bg-gray-900/70 backdrop-blur-md rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-center text-2xl font-semibold text-white'>
              Login to Continue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your phone number'
                          className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Enter password'
                          className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex flex-col gap-3 pt-2'>
                  <Button
                    disabled={loggingIn}
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'
                    type='submit'
                  >
                    {loggingIn ? 'Signing in...' : 'Login'}
                  </Button>
                  <Button
                    className='w-full border-gray-700 hover:bg-gray-800 text-gray-300 transition-all duration-200'
                    variant='outline'
                    type='button'
                    onClick={() => navigate('/signup')}
                  >
                    Create Account
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
