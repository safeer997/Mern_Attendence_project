import { Router } from 'express';
import { markAttendance } from '../controllers/attendence.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/:sessionId').post(authenticateUser, markAttendance);

export default router;
