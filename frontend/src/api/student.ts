import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getTodaySessions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/students/todaySessions`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log('Error fetching today attendence:', error);
    return error.response;
  }
};

export const markAttendance = async (sessionId) => {
  try {
    const response = await axios.post(
      `${apiUrl}/attendance/${sessionId}`,
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
