import { Router } from 'express';

import {
  getCurrentUser,
  login,
  logout,
  register,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import {
  loginValidator,
  registerValidator,
} from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/logout', logout);
router.get('/me', protect, getCurrentUser);

export default router;
