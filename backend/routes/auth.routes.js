import express from 'express';
import register from '../controllers/auth/register.controller.js';
import login from '../controllers/auth/login.controller.js';
import me from '../controllers/auth/me.controller.js';
import logout from '../controllers/auth/logout.controller.js';
import updateProfile from '../controllers/auth/profile.controller.js';
import changePassword from '../controllers/auth/password.controller.js';
import forgotPassword from '../controllers/auth/forgot-password.controller.js';
import { loginValidator, registerValidator, updateProfileValidator, changePasswordValidator, forgotPasswordValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/auth/register', registerValidator, validate, register);
router.post('/auth/login', loginValidator, validate, login);
router.get('/auth/me', protect, me);
router.post('/auth/logout', protect, logout);
router.put('/auth/profile', protect, updateProfileValidator, validate, updateProfile);
router.patch('/auth/profile', protect, updateProfileValidator, validate, updateProfile);
router.put('/auth/password', protect, changePasswordValidator, validate, changePassword);
router.patch('/auth/password', protect, changePasswordValidator, validate, changePassword);
router.post('/auth/forgot-password', forgotPasswordValidator, validate, forgotPassword);

export default router;
