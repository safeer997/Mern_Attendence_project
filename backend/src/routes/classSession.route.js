import { Router } from 'express';

import {
  createSession,
  getAllSessions,
  getSession,
  getSessionOfInstructer,
} from '../controllers/classSession.controller.js';
import { authorizeInstructor } from '../middleware/authorizeInstructer.middleware.js';
import { authenticateUser } from '../middleware/auth.middleware.js';
const router = Router();

router
  .route('/createSession')
  .post(authenticateUser, authorizeInstructor, createSession);
// router.route('/createSession').post(createSession);
router.route('/getAllSessions').get(getAllSessions);
router.route('/getSession/:sessionId').get(getSession);
router
  .route('/getSessionOfInstructer')
  .get(authenticateUser, authorizeInstructor, getSessionOfInstructer);

export default router;
