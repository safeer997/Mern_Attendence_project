import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/zodSchema/loginSchema';
import { loginUser } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

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
import '../styles/auth.styles.css';
// import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.phoneNumber, data.password);
      // console.log('login response :', response);
      // console.log('trying to login student');

      if (response?.data?.success && response?.data?.role === 'student') {
        // console.log('this student line is getting console logged !!!');
        dispatch(setUser(response?.data?.user));
        navigate('/student');
      } else if (
        response?.data?.success &&
        response?.data?.role === 'instructer'
      ) {
        // console.log('this instructer line is getting console logged !!!');
        dispatch(setUser(response?.data?.user));
        navigate('/instructer');
      } else {
        // if (!toastMessageShown) {
        //   toast.warning(response?.data?.message);
        //   toastMessageShown = true;
        // }
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder='Phone Number' {...field} />
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
                      <Input
                        placeholder='Password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='auth-buttons'>
                <Button className='auth-button' type='submit'>
                  Login
                </Button>

                <Button
                  className='auth-button'
                  onClick={() => navigate('/signup')}
                  variant='outline'
                  type='button'
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
