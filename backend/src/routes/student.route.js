import { Router } from 'express';
import {
  getAllStudents,
  getStudent,
  getTodaySessions,
  registerStudent,
} from '../controllers/student.controller.js';
const router = Router();

router.route('/registerStudent').post(registerStudent);
router.route('/getAllStudents').get(getAllStudents);
router.route('/getStudent/:studentId').get(getStudent);
router.route('/todaySessions').get(getTodaySessions);

export default router;
