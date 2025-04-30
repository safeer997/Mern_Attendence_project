import { verifyUser } from '@/api/auth';
import { setUser, stopLoading } from '@/redux/features/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log('my custom hook running !!!');
        const response = await verifyUser();
        console.log('hook api res :', response);
        if (response?.data?.success) {
          dispatch(setUser(response.data.data));
        } else {
          dispatch(stopLoading()); // fallback
        }
      } catch (err) {
        console.error('Auth init failed:', err);
        dispatch(stopLoading()); // critical line!
      }
    };

    loadUser();
  }, []);
};

export default useAuth;
