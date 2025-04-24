import { registerInstructor } from '../controllers/instructor.controller.js';
import { registerStudent } from '../controllers/student.controller.js';

const registerUser = async (req, res) => {
  const { role } = req.body;
  if (role === 'student') {
    return registerStudent(req, res);
  } else if (role === 'instructer') {
    return registerInstructor(req, res);
  } else {
    return res.status(400).json({
      success: false,
      message: 'Invalid role provided',
    });
  }
};

export { registerUser };
