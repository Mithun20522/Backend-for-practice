import exppress from 'express';
import { login, logout, register, update } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/user.middleware.js';

const UserRouter = exppress.Router();

UserRouter.post('/register', register);
UserRouter.post('/login', login);
UserRouter.get('/logout', logout);
UserRouter.patch('/update/:id', verifyUser, update);

export default UserRouter;

