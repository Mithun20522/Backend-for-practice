import exppress from 'express';
import { login, register } from '../controllers/user.controller.js';

const router = exppress.Router();

router.post('/register', register);
router.post('/login', login);
export default router;

