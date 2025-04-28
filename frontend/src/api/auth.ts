import axios from 'axios';

export const loginUser = async (phoneNumber, password) => {
  // console.log("trying to login !")
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
    console.log('Error logging in:', error);
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

export const verifyUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/auth/verifyUser', {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log('Error verifying user on app load:', error);
    return error.response;
  }
};
