import express from 'express';
import authUser from '../middleware/auth.js';
import { loginUser, registerUser, getCurrentUser, loginAdmin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/me', authUser, getCurrentUser);
userRouter.post('/admin/login', loginAdmin);

export default userRouter;