import { Router } from 'express';
import UserController from '../controllers/user-controller.js';

const userRoutes = new Router();

userRoutes.get('/users', UserController.getAll);
userRoutes.get('/users/by-email', UserController.getByEmail);

userRoutes.get('/users/:id', UserController.getById);
userRoutes.patch('/users/:id', UserController.update);
userRoutes.delete('/users/:id', UserController.remove);

export default userRoutes;