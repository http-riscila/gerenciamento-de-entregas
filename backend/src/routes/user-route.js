import { Router } from 'express';
import UserController from '../controllers/user-controller.js';

const userRoutes = new Router();

userRoutes.post('/users', UserController.store);

export default userRoutes;