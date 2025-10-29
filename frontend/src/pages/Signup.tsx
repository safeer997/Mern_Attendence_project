import { signupUser } from '@/api/auth';
import { signupSchema } from '@/zodSchema/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/auth.styles.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signingUp, setSigningUp] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: undefined,
    },
  });

  const onSubmit = async (data) => {
    try {
      setSigningUp(true);
      const response = await signupUser(data);

      if (response?.data?.success && data?.role === 'student') {
        dispatch(setUser(response?.data?.data));
        navigate('/student');
        return;
      }

      if (response?.data?.success && data?.role === 'instructer') {
        dispatch(setUser(response?.data?.data));
        navigate('/instructer');
        return;
      }

      toast.warning(response?.data?.message);
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setSigningUp(false);
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
          src='https://undraw.co/api/illustrations/online_learning?color=ffffff'
          alt='Signup Illustration'
          className='w-48 sm:w-56 md:w-72 h-auto mb-4 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]'
          onError={(e) => {
            const target = e.target as HTMLImageElement | null;
            if (target)
              target.src =
                'https://undraw.co/api/illustrations/team_spirit?color=ffffff';
          }}
        />
        <h1 className='text-5xl font-extrabold mb-4 text-indigo-400 tracking-tight'>
          Join Mark My Attendance
        </h1>
        <p className='text-lg opacity-90 mb-3 max-w-md leading-relaxed'>
          Create your account to manage and mark attendance effortlessly.
        </p>
        <p className='text-sm opacity-70 max-w-md'>
          Students and instructors — simplify your attendance workflow in one
          platform.
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
              Create an Account
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
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your name'
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your email'
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

                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-gray-300'>User Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className='bg-gray-800 text-white border-gray-700 focus:border-indigo-500'>
                            <SelectValue placeholder='Select role' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value='student'>Student</SelectItem>
                              <SelectItem value='instructer'>
                                Instructer
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={signingUp}
                  type='submit'
                  className='w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200'
                >
                  {signingUp ? 'Signing up...' : 'Sign Up'}
                </Button>
              </form>
            </Form>

            <div className='text-center mt-5 text-gray-400'>
              Already a member?{' '}
              <span
                onClick={() => navigate('/login')}
                className='text-indigo-400 hover:underline cursor-pointer'
              >
                Sign In
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
