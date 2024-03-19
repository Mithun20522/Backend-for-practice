import exppress from 'express';
import { register } from '../controllers/user.controller.js';

const router = exppress.Router();

router.post('/register', register);

export default router;

