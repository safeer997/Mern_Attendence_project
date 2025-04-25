import axios from 'axios';

export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/login',
      {
        phoneNumber,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    // console.log('Error logging in:', error);
    return error.response;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/auth/logout',
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
    const response = await axios.post(
      'http://localhost:3000/auth/signup',
      userData,
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};
