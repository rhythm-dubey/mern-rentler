import express from 'express';
import register from '../controllers/auth/register.controller.js';
import login from '../controllers/auth/login.controller.js';
import me from '../controllers/auth/me.controller.js';
import logout from '../controllers/auth/logout.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/auth/register', registerValidator, validate, register);
router.post('/auth/login', loginValidator, validate, login);
router.get('/auth/me', protect, me);
router.post('/auth/logout', protect, logout);

export default router;