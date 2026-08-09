import express from 'express';
import {get, update, create, destroy} from '../controllers/product.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', get);
router.put('/:id', protect, authorize('admin', 'owner'), update);
router.post('/', protect, authorize('admin', 'owner'), create);
router.delete('/:id', protect, authorize('admin', 'owner'), destroy);

export default router;
