import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || '';

export const createSession = async (data) => {
  try {
    const response = await axios.post(
      `${apiUrl}/classSession/createSession`,
      data,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response;
  }
};
