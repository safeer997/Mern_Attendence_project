import axios from 'axios';

export const loginUser = async (phoneNumber, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      phoneNumber,
      password,
    });
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};
