import { signupUser } from '@/api/auth';
import { signupSchema } from '@/zodSchema/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import '../styles/auth.styles.css';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { toast } from 'sonner';

const Signup = () => {
  const [signupFailureMessage, setSignupFailureMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await signupUser(data);
      // console.log("signup res :",response)
      if (response?.data?.success === true && data?.role === 'student') {
        navigate('/student');
      } else if (
        response?.data?.success === true &&
        data?.role === 'instructer'
      ) {
        navigate('/instructer');
      } else {
        toast.warning( response?.data?.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleSignin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className='auth-container'>
        <Card className='auth-card'>
          <CardHeader>
            <CardTitle className='auth-title'>Mark My Attendence</CardTitle>
          </CardHeader>
          <CardContent className='auth-content'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='name' {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='email' {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder='phone number' {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='password' {...field} />
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
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Please select one' />
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
                {signupFailureMessage && (
                  <div className='error-message '>
                    <p className='text-red-500'>{signupFailureMessage}</p>
                  </div>
                )}
                <Button type='submit'>Sign Up</Button>
              </form>
            </Form>
            <div className='auth-link'>
              <p>
                Already a member ?<span onClick={handleSignin}>Sign In</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Signup;
