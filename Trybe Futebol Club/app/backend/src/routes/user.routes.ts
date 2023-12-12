import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validate from '../middlewares/Validate';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', Validate.Fields, Validate.Login, (req, res) => userController.login(req, res));
userRouter.get('/role', Validate.Token, (req, res) => userController.role(req, res));

export default userRouter;
