import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { registerUser } from '../middleware/registerUser.middleware.js';

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/signup').post(registerUser);

export default router;
