import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { registerUser } from '../middleware/registerUser.middleware.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/signup').post(registerUser);

//changing style to help frontend verify user when frontend loads (who will write a separete conrolller , or may be i will write later someday !!)
router.get('/verifyUser', authenticateUser, (req, res) => {
  return res.status(201).json({
    success: true,
    message: 'User is logged in',
    data: req.user,
  });
});

export default router;
