import axios from 'axios';

export const createSession = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/classSession/createSession',
      data,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};
