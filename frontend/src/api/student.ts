import axios from 'axios';

export const getTodaySessions = async () => {
  try {
    const response = await axios.get(
      'http://localhost:3000/students/todaySessions',
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log('Error fetching today attendence:', error);
    return error.response;
  }
};

export const markAttendance = async (sessionId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/attendance/${sessionId}`,
      sessionId,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log('Error markigng attendence:', error);
    return error.response;
  }
};
