import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import '../styles/auth.styles.css';
import { useState } from 'react';
import { loginUser, logout } from '../api/auth';
import { useNavigate } from 'react-router';

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await loginUser(phoneNumber, password);
      console.log(response);

      if (response?.data?.success) {
        console.log('Login Success:', response.data);
        navigate('/dashboard');
      } else {
        console.log('Login failed:', response.data);
        setError(response?.data?.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    console.log('logout res : ', response);
  };

  return (
    <div className='auth-container'>
      <Card className='auth-card'>
        <CardHeader>
          <CardTitle className='auth-title'>Mark My Attendence</CardTitle>
        </CardHeader>
        <CardContent className='auth-content'>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type='tel'
            placeholder='Phone Number'
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
          />
          {error && <p className='auth-error'>{error}</p>}

          <div className='auth-buttons'>
            <Button className='auth-button' onClick={handleLogin}>
              Login
            </Button>
            <Button className='auth-button' variant='outline'>
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
