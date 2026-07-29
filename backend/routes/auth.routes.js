import express from 'express';
import register from '../controllers/auth/register.controller.js';
import { registerValidator } from '../validators/register.validator.js';
import { validate } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/auth/register', registerValidator, validate, register);

export default router;