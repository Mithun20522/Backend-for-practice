import exppress from 'express';
import { login, logout, register } from '../controllers/user.controller.js';

const UserRouter = exppress.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/logout', logout);
export default UserRouter;

