import { Router } from 'express';
import UserController from '../controllers/user-controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';
import { authorize } from '../middlewares/role-middleware.js';

const userRoutes = new Router();

userRoutes.get('/users/by-email', UserController.getByEmail);

userRoutes.use(authMiddleware);

userRoutes.get('/users/:id', authorize(['ADMIN', 'LOGISTICS', 'DRIVER']), UserController.getById);
userRoutes.get('/users', authorize(['ADMIN']), UserController.getAll);
userRoutes.patch('/users/:id', authorize(['ADMIN']), UserController.update);
userRoutes.delete('/users/:id', authorize(['ADMIN']), UserController.remove);

export default userRoutes;