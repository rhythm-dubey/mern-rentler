import express from 'express';
import {get, update, create, destroy} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', get);
router.put('/:id', update);
router.post('/', create);
router.delete('/:id', destroy);

export default router;