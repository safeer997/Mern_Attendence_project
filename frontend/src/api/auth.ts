import axios from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL || '';

export const loginUser = async (phoneNumber, password) => {
  // console.log("trying to login !")
  try {
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      {
        phoneNumber,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    toast.warning(error?.response?.data?.message || 'Login failed');
    return error.response;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};

//user data as being passed as object from signup page
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/signup`, userData, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};

export const verifyUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/auth/verifyUser`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log('Error verifying user !!:', error);
    return error.response;
  }
};
