import express from 'express';
import { UserController } from './UserController';

const userRouter = express.Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.delete('/', UserController.deleteUser)

export default userRouter;
