import exppress from 'express';
import { login, register } from '../controllers/user.controller.js';

const UserRouter = exppress.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
export default UserRouter;

