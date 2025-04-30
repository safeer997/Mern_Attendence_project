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
    console.log('Error creating class session:', error);
    return error.response;
  }
};

export const fetchAllStudents = async () => {
  try {
    const response = await axios.get(`${apiUrl}/students/getAllStudents`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log('Error fetching students list:', error);
    return error.response;
  }
};

export const fetchAllSessionsOfInstructer = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/classSession/getSessionOfInstructer`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(
      'Error fetching sessions of a particular instructer list:',
      error
    );
    return error.response;
  }
};


