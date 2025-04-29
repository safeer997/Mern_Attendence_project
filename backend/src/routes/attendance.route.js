import { Router } from 'express';
import { markAttendance } from '../controllers/attendence.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { authorizeInstructor } from '../middleware/authorizeInstructer.middleware.js';
import { getSessionAttendance } from '../services/getAttendenceReport.js';

const router = Router();

router.route('/:sessionId').post(authenticateUser, markAttendance);
router
  .route('/getAttendenceReport/:sessionId')
  .get(authenticateUser, authorizeInstructor, getSessionAttendance);

export default router;
