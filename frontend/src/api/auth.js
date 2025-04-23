import axios from "axios";

export const loginUser = async ({ phoneNumber, password }) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      phoneNumber,
      password,
    });
    return response; // returning full axios response
  } catch (error) {
    console.log('Error logging in:', error);
    return error.response; // also returning full response object from backend
  }
};
