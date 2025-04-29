import { Router } from 'express';
import {
  getAllStudents,
  getStudent,
  getTodaySessions,
  registerStudent,
} from '../controllers/student.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { authorizeInstructor } from '../middleware/authorizeInstructer.middleware.js';
const router = Router();

router.route('/registerStudent').post(registerStudent);
router
  .route('/getAllStudents')
  .get(authenticateUser, authorizeInstructor, getAllStudents);
router.route('/getStudent/:studentId').get(getStudent);
router.route('/todaySessions').get(getTodaySessions);

export default router;
