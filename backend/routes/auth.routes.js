import express from 'express';
import register from '../controllers/auth/register.controller.js';
import login from '../controllers/auth/login.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/auth/register', registerValidator, validate, register);
router.post('/auth/login', loginValidator, validate, login);

export default router;