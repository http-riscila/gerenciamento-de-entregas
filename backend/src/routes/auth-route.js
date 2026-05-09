import { Router } from 'express';
import AuthController from '../controllers/auth-controller.js';
//import { authMiddleware } from '../middlewares/auth-middleware.js';
//import { authorize } from '../middlewares/role-middleware.js';

const authRoutes = new Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/register', AuthController.register);


export default authRoutes;